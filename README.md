# 先生用席申込システム（クラス選択対応）

## 概要
8クラス × 2日間 × 3公演（計6枠/クラス）に対応。クラスごとに時間が異なる構成で、座席スプレッドシートは「クラス×時間帯」で個別、ログは全クラス共通の1つに統一しています。
- フロントエンド: GitHub Pages
- サーバー: Google Apps Script (GAS)
- 通信: JSONP
- 時間帯表示: クラス別に `config.js` で管理

## ファイル構成
- `class_selection.html` - クラス選択ページ
- `timeslot.html` - 時間帯選択ページ（クラス別の時間/演目を表示）
- `parent_multi.html` - 座席申込ページ
- `index.html` - エントリーポイント（`class_selection.html` にリダイレクト）
- `config.js` - GAS URL / ベース時間帯 / クラス別公演情報
- `main.gs` - GASメインスクリプト（座席取得/申込/締切）

## セットアップ手順

### 1. Google Apps Script の設定
1. `main.gs`
   - `SEAT_SHEETS[timeslotId][classNo]` にクラス×時間帯の座席スプレッドシートIDを設定
   - `LOG_SPREADSHEET_ID` に共通ログ用スプレッドシートIDを設定
2. GAS を「ウェブアプリ」としてデプロイしてデプロイURLを取得

### 2. フロントエンドの設定
1. `config.js` の `GAS_URL` を取得したデプロイURLに設定
2. 必要に応じて `CLASS_EVENT_INFO` にクラス別の開演時間・演目・キャスト・スタッフを設定
3. ファイルをホスティング（GitHub Pages など）

## 時間帯・公演情報の管理
- ベースの6枠定義は `config.js` の `TIMESLOT_CONFIG`（ラベル用）
- クラスごとの時間/演目は `config.js` の `CLASS_EVENT_INFO[classNo][timeslotId]`
  - 例: `CLASS_EVENT_INFO['1'].day1_performance1.time // '9:15'`
- `timeslot.html` は選択クラスに応じて時間/演目を表示
- `parent_multi.html` も選択クラスの時間をヘッダに反映

## 使用方法（利用者フロー）
1. `class_selection.html` でクラスを選ぶ
2. `timeslot.html` で時間帯を選ぶ（クラス別の時間/演目が表示）
3. `parent_multi.html` で座席を選んで申込

## バックエンドAPI（GAS）
- `action=timeslots` : 利用可能な時間帯ID一覧を返す
- `action=seats&timeslot={id}&classNo={1..8}` : 座席一覧を取得（クラス必須）
- `action=submit&timeslot={id}&classNo={1..8}&name=...&mail=...&selectedSeats=[...]` : 申込
- `action=deadline` : 受付締切のタイムスタンプを返す

## 技術的特徴
- 座席シートIDは「クラス×時間帯」で個別管理（`SEAT_SHEETS`）
- 申込ログは共通スプレッドシート（`LOG_SPREADSHEET_ID`）に統一
- JSONP による CORS 回避、スクリプトタグ重複防止、入力バリデーション、エラーハンドリング

## 注意事項
- すべての対象枠について `SEAT_SHEETS` のIDを設定してください
- `GAS_URL` とログ用の `LOG_SPREADSHEET_ID` を正しく設定してください
- 必要に応じてライセンスキーの設定を確認してください
