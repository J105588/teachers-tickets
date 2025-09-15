// Google Apps Script URL設定
const GAS_URL = 'https://script.google.com/macros/s/AKfycbz_rV6wD0uHuBYP7RTB9xWh-zUzWE2nkuGXvoKCd3BpKZgiwpMkKgCf3AlSlB58Xfx3UQ/exec';

// 時間帯設定
const TIMESLOT_CONFIG = {
  'day1_performance1': {
    id: 'day1_performance1',
    label: '1日目 第1公演',
    time: '9:35-10:35',
    day: 1,
    performance: 1
  },
  'day1_performance2': {
    id: 'day1_performance2',
    label: '1日目 第2公演',
    time: '11:35-12:35',
    day: 1,
    performance: 2
  },
  'day1_performance3': {
    id: 'day1_performance3',
    label: '1日目 第3公演',
    time: '14:45-15:45',
    day: 1,
    performance: 3
  },
  'day2_performance1': {
    id: 'day2_performance1',
    label: '2日目 第1公演',
    time: '9:35-10:35',
    day: 2,
    performance: 1
  },
  'day2_performance2': {
    id: 'day2_performance2',
    label: '2日目 第2公演',
    time: '11:35-12:35',
    day: 2,
    performance: 2
  },
  'day2_performance3': {
    id: 'day2_performance3',
    label: '2日目 第3公演',
    time: '13:35-14:35',
    day: 2,
    performance: 3
  }
};

// クラスごとの公演情報（時間・演目など）
// キー: CLASS_EVENT_INFO[classNo][timeslotId]
const CLASS_EVENT_INFO = {
  '1': {
    day1_performance1: { time: '9:15', title: '第一公演', play_title: '話が違う！', cast: '井上希美,荻野裕惟,金原幸四朗,中西仁菜子,下田りさ,白岩晟,鈩すみれ,寺川翔太', staff: '音響: 槇祐人,照明: 三好悠生' },
    day1_performance2: { time: '11:15', title: '第二公演', play_title: '話が違う！', cast: '中谷誠大,藤咲美月,堀舘蒼生,俣野武之助,寺田陽南,井上希美,袁 辰 宁,清水奏大', staff: '音響: 三橋和輝,照明: 矢野充希' },
    day1_performance3: { time: '13:15', title: '第三公演', play_title: '話が違う！', cast: '吉井友理,荻野裕惟,金原幸四朗,中西仁菜子,下田りさ,白岩晟,鈩すみれ,寺川翔太', staff: '音響: 槇祐人,照明: 三好悠生' },
    day2_performance1: { time: '9:35', title: '第一公演', play_title: '話が違う！', cast: '中谷誠大,藤咲美月,堀舘蒼生,俣野武之助,寺田陽南,吉井友理,袁 辰 宁,清水奏大', staff: '音響: 三橋和輝,照明: 矢野充希' },
    day2_performance2: { time: '11:35', title: '第二公演', play_title: '話が違う！', cast: '吉井友理,荻野裕惟,金原幸四朗,中西仁菜子,下田りさ,白岩晟,鈩すみれ,寺川翔太', staff: '音響: 槇祐人,照明: 三好悠生' },
    day2_performance3: { time: '13:35', title: '第三公演', play_title: '話が違う！', cast: '中谷誠大,藤咲美月,堀舘蒼生,俣野武之助,寺田陽南,井上希美,袁 辰 宁,清水奏大', staff: '音響: 三橋和輝,照明: 矢野充希' }
  },
  '2': {
    day1_performance1: { time: '10:25', title: '第一公演', play_title: 'ある脱出ゲーム', cast: '佐藤那由多, 鍛治本優太, 稲毛華凛, 後藤美尋, 高村直樹', staff: '音響: 日髙良康, 照明: 岩瀬央資' },
    day1_performance2: { time: '12:25', title: '第二公演', play_title: 'ある脱出ゲーム', cast: '高橋直也, 有田悠晴, 藤間貴紀, 稲毛華凛, 下田紗也', staff: '音響: 剣持晴吾, 照明: 小林優介' },
    day1_performance3: { time: '14:25', title: '第三公演', play_title: 'ある脱出ゲーム', cast: '佐藤那由多, 鍛治本優太, 池田優織, 後藤美尋, 高村直樹', staff: '音響: 日髙良康, 照明: 岩瀬央資' },
    day2_performance1: { time: '9:15', title: '第一公演', play_title: 'ある脱出ゲーム', cast: '高橋直也, 有田悠晴, 藤間貴紀, 池田優織, 下田紗也', staff: '音響: 剣持晴吾, 照明: 小林優介' },
    day2_performance2: { time: '11:15', title: '第二公演', play_title: 'ある脱出ゲーム', cast: '佐藤那由多, 鍛治本優太, 稲毛華凛, 後藤美尋, 高村直樹', staff: '音響: 日髙良康, 照明: 岩瀬央資' },
    day2_performance3: { time: '13:15', title: '第三公演', play_title: 'ある脱出ゲーム', cast: '高橋直也, 有田悠晴, 藤間貴紀, 池田優織, 下田紗也', staff: '音響: 剣持晴吾, 照明: 小林優介' }
  },
  '3': {
    day1_performance1: { time: '9:25', title: '第一公演', play_title: 'ポプコーンの降る街', cast: '金沢彩佳,坂田実優,二木聡ー,千葉弘樹,前多凛人', staff: '音響: 松本恵佳,照明: 関優真' },
    day1_performance2: { time: '11:35', title: '第二公演', play_title: 'ポプコーンの降る街', cast: '安藤駿,髙橋陽仁,地神翔平,尾䑓恒一,福島大斗', staff: '音響: 曽根花奏,照明: 百瀬伊織' },
    day1_performance3: { time: '14:55', title: '第三公演', play_title: 'ポプコーンの降る街', cast: '金沢彩佳,坂田実優,二木聡ー,千葉弘樹,前多凛人', staff: '音響: 松本恵佳,照明: 関優真' },
    day2_performance1: { time: '9:25', title: '第一公演', play_title: 'ポプコーンの降る街', cast: '安藤駿,髙橋陽仁,地神翔平,尾䑓恒一,福島大斗', staff: '音響: 曽根花奏,照明: 百瀬伊織' },
    day2_performance2: { time: '11:25', title: '第二公演', play_title: 'ポプコーンの降る街', cast: '金沢彩佳,坂田実優,二木聡ー,千葉弘樹,前多凛人', staff: '音響: 松本恵佳,照明: 関優真' },
    day2_performance3: { time: '13:25', title: '第三公演', play_title: 'ポプコーンの降る街', cast: '安藤駿,髙橋陽仁,地神翔平,尾䑓恒一,福島大斗', staff: '音響: 曽根花奏,照明: 百瀬伊織' }
  },
  '4': {
    day1_performance1: { time: '9:15', title: '第一公演', play_title: '庭園の何処かに潜伏していると仮定される盗賊の行方に関する一考察 ～羽柴邸に於ける旧ロマノフ家のダイヤ盗難事件を基に～', cast: '高山弘雅,中尾眞子,松川奈々,孟慶恩慧,吉田孝太郎', staff: '音響: 髙橋元気,照明: 金城嘉康' },
    day1_performance2: { time: '11:15', title: '第二公演', play_title: '庭園の何処かに潜伏していると仮定される盗賊の行方に関する一考察 ～羽柴邸に於ける旧ロマノフ家のダイヤ盗難事件を基に～', cast: '石下龍,堤武惟,三國諒晟,水田好美,峯岸優衣', staff: '音響: 越智圭介,照明: 五野上瑠李' },
    day1_performance3: { time: '13:35', title: '第三公演', play_title: '庭園の何処かに潜伏していると仮定される盗賊の行方に関する一考察 ～羽柴邸に於ける旧ロマノフ家のダイヤ盗難事件を基に～', cast: '高山弘雅,中尾眞子,松川奈々,孟慶恩慧,吉田孝太郎', staff: '音響: 髙橋元気,照明: 金城嘉康' },
    day2_performance1: { time: '9:15', title: '第一公演', play_title: '庭園の何処かに潜伏していると仮定される盗賊の行方に関する一考察 ～羽柴邸に於ける旧ロマノフ家のダイヤ盗難事件を基に～', cast: '石下龍,堤武惟,三國諒晟,水田好美,峯岸優衣', staff: '音響: 越智圭介,照明: 五野上瑠李' },
    day2_performance2: { time: '11:15', title: '第二公演', play_title: '庭園の何処かに潜伏していると仮定される盗賊の行方に関する一考察 ～羽柴邸に於ける旧ロマノフ家のダイヤ盗難事件を基に～', cast: '高山弘雅,中尾眞子,松川奈々,孟慶恩慧,吉田孝太郎', staff: '音響: 髙橋元気,照明: 金城嘉康' },
    day2_performance3: { time: '13:15', title: '第三公演', play_title: '庭園の何処かに潜伏していると仮定される盗賊の行方に関する一考察 ～羽柴邸に於ける旧ロマノフ家のダイヤ盗難事件を基に～', cast: '石下龍,堤武惟,三國諒晟,水田好美,峯岸優衣', staff: '音響: 越智圭介,照明: 五野上瑠李' }
  },
  '5': {
    day1_performance1: { time: '9:35', title: '第一公演', play_title: 'チェンジ・ザ・ワールド', cast: '井上陽翔,興野晴,鈴木康太,于抒冉,行田優海,南絵理香,吉澤礼,呉楚瀛', staff: '音響: 北湯口怜奈,照明: 髙田晴' },
    day1_performance2: { time: '11:35', title: '第二公演', play_title: 'チェンジ・ザ・ワールド', cast: '浦沢大河,金子航大,木上隆輝,于抒冉,飯島大地,青木心美,行田優海,柳田紗良', staff: '音響: 林ひなた,照明: 武藤咲希' },
    day1_performance3: { time: '14:45', title: '第三公演', play_title: 'チェンジ・ザ・ワールド', cast: '井上陽翔,興野晴,鈴木康太,神林美希,鄧家怡,南絵理香,吉澤礼,呉楚瀛', staff: '音響: 北湯口怜奈,照明: 髙田晴' },
    day2_performance1: { time: '9:35', title: '第一公演', play_title: 'チェンジ・ザ・ワールド', cast: '浦沢大河,金子航大,木上隆輝,神林美希,飯島大地,青木心美,鄧家怡,柳田紗良', staff: '音響: 林ひなた,照明: 武藤咲希' },
    day2_performance2: { time: '11:35', title: '第二公演', play_title: 'チェンジ・ザ・ワールド', cast: '井上陽翔,興野晴,鈴木康太,神林美希,鄧家怡,南絵理香,吉澤礼,呉楚瀛', staff: '音響: 北湯口怜奈,照明: 髙田晴' },
    day2_performance3: { time: '13:35', title: '第三公演', play_title: 'チェンジ・ザ・ワールド', cast: '浦沢大河,金子航大,木上隆輝,于抒冉,飯島大地,青木心美,行田優海,柳田紗良', staff: '音響: 林ひなた,照明: 武藤咲希' }
  },
  '6': {
    day1_performance1: { time: '9:25', title: '第一公演', play_title: '七人の部長', cast: '大坂美緒,輕森奏介,木南颯一郎,木村太郎,佐藤幸太,高木悠羽,辻村麻央', staff: '音響: 河津航,照明: 川島伊織' },
    day1_performance2: { time: '11:25', title: '第二公演', play_title: '七人の部長', cast: '飯塚眞一,池田悠乃,大津輝祥,小笠原悠晴,紙谷遼,木田瑛斗,浜崎美瑚', staff: '音響: 池田実央,照明: 齊藤愛子' },
    day1_performance3: { time: '13:45', title: '第三公演', play_title: '七人の部長', cast: '大坂美緒,輕森奏介,木南颯一郎,木村太郎,佐藤幸太,高木悠羽,辻村麻央', staff: '音響: 河津航,照明: 川島伊織' },
    day2_performance1: { time: '9:25', title: '第一公演', play_title: '七人の部長', cast: '飯塚眞一,池田悠乃,大津輝祥,小笠原悠晴,紙谷遼,木田瑛斗,浜崎美瑚', staff: '音響: 河津航,照明: 齊藤愛子' },
    day2_performance2: { time: '11:25', title: '第二公演', play_title: '七人の部長', cast: '大坂美緒,輕森奏介,木南颯一郎,木村太郎,佐藤幸太,高木悠羽,辻村麻央', staff: '音響: 池田実央,照明: 川島伊織' },
    day2_performance3: { time: '13:55', title: '第三公演', play_title: '七人の部長', cast: '飯塚眞一,池田悠乃,大津輝祥,小笠原悠晴,紙谷遼,木田瑛斗,浜崎美瑚', staff: '音響: 池田実央,照明: 齊藤愛子' }
  },
  '7': {
    day1_performance1: { time: '10:25', title: '第一公演', play_title: 'サマータイムマシンブルース', cast: '今井美緒,岩井悠真,廣谷真優,作川優斗,椎根大地,竹田純,藤目雄斗,舟本亘佑,水嶋大輔,山本美佳', staff: '音響: 曽根彰人,照明: 清水柚月' },
    day1_performance2: { time: '12:25', title: '第二公演', play_title: 'サマータイムマシンブルース', cast: '石堂怜,加藤祐貴,金城嘉康,坂本祥太郎,杉本茉優,佃優輝,中川西翔馬,岩立百香,村上莉奈,金宇宙', staff: '音響: 杉本健,照明: 千葉康聖' },
    day1_performance3: { time: '14:25', title: '第三公演', play_title: 'サマータイムマシンブルース', cast: '今井美緒,岩井悠真,岩立百香,作川優斗,椎根大地,竹田純,藤目雄斗,舟本亘佑,水嶋大輔,山本美佳', staff: '音響: 曽根彰人,照明: 清水柚月' },
    day2_performance1: { time: '9:15', title: '第一公演', play_title: 'サマータイムマシンブルース', cast: '石堂怜,加藤祐貴,金城嘉康,坂本祥太郎,杉本茉優,佃優輝,中川西翔馬,深澤由衣,村上莉奈,金宇宙', staff: '音響: 杉本健,照明: 千葉康聖' },
    day2_performance2: { time: '11:15', title: '第二公演', play_title: 'サマータイムマシンブルース', cast: '今井美緒,岩井悠真,岩立百香,作川優斗,椎根大地,竹田純,藤目雄斗,舟本亘佑,水嶋大輔,山本美佳', staff: '音響: 曽根彰人,照明: 清水柚月' },
    day2_performance3: { time: '13:25', title: '第三公演', play_title: 'サマータイムマシンブルース', cast: '石堂怜,加藤祐貴,金城嘉康,坂本祥太郎,杉本茉優,佃優輝,中川西翔馬,廣谷真優,村上莉奈,金宇宙', staff: '音響: 杉本健,照明: 千葉康聖' }
  },
  '8': {
    day1_performance1: { time: '9:15', title: '第一公演', play_title: 'Memento ～忘却の夏', cast: '天満かえ,成瀬結菜,斉藤璃利愛,武藤璃乃,市原寿莉,長塚慎之介,横山一輝,恩田和尚', staff: '音響: 松本奏,照明: 竹内柊太' },
    day1_performance2: { time: '11:25', title: '第二公演', play_title: 'Memento ～忘却の夏', cast: '赤堀圭,奥谷晃大,萩尾聡太郎,千原裕子,鎌田実怜,増田羽那,清水悠以,松本怜奏', staff: '音響: 劉子安,照明: 陸嘉浩' },
    day1_performance3: { time: '13:35', title: '第三公演', play_title: 'Memento ～忘却の夏', cast: '天満かえ,成瀬結菜,斉藤璃利愛,武藤璃乃,市原寿莉,長塚慎之介,横山一輝,恩田和尚', staff: '音響: 松本奏,照明: 竹内柊太' },
    day2_performance1: { time: '9:35', title: '第一公演', play_title: 'Memento ～忘却の夏', cast: '赤堀圭,奥谷晃大,萩尾聡太郎,千原裕子,鎌田実怜,増田羽那,清水悠以,松本怜奏', staff: '音響: 劉子安,照明: 陸嘉浩' },
    day2_performance2: { time: '11:35', title: '第二公演', play_title: 'Memento ～忘却の夏', cast: '天満かえ,成瀬結菜,斉藤璃利愛,武藤璃乃,市原寿莉,長塚慎之介,横山一輝,恩田和尚', staff: '音響: 松本奏,照明: 竹内柊太' },
    day2_performance3: { time: '13:35', title: '第三公演', play_title: 'Memento ～忘却の夏', cast: '赤堀圭,奥谷晃大,萩尾聡太郎,千原裕子,鎌田実怜,増田羽那,清水悠以,松本怜奏', staff: '音響: 劉子安,照明: 陸嘉浩' }
  }
};
