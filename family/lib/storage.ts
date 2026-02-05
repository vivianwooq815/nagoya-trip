
import { Category } from '../types';

const STORAGE_KEY = 'komorebi_travel_data';

export const NAGOYA_SCHEDULE = [
  { id: 'n_hsr', date: '2025-02-25', time: '10:36', title: '高鐵 (台中-桃園)', category: Category.TRANS, location: '台中高鐵站', note: '座位: 4車 15A, 15B, 15C' },
  { id: 'n_mrt', date: '2025-02-25', time: '11:25', title: '轉乘桃園機場捷運', category: Category.TRANS, location: '高鐵桃園站 (A18)', note: '往機場 T1 (約 20-25 分鐘)' },
  { id: 'n_t1', date: '2025-02-25', time: '11:50', title: '抵達桃園機場 T1', category: Category.SPOT, location: '第一航廈', note: '預計 12:00 辦理登機' },
  { id: 'n1', date: '2025-02-25', time: '14:55', title: '星宇航空 JX838 起飛', category: Category.TRANS, location: '桃園國際機場 T1', note: '預計 18:30 抵達名古屋' },
  { id: 'n2', date: '2025-02-25', time: '19:30', title: '辦理入境與領取行李', category: Category.TRANS, location: '中部國際機場 NGO', note: '搭乘名鐵前往市區' },
  { id: 'n3', date: '2025-02-25', time: '21:00', title: '飯店 Check-in', category: Category.STAY, location: '名古屋伏見站前海茵娜快捷飯店', note: '伏見站 10 號出口有電梯！' },
  
  // 2/26 KKday Day Tour 1
  { id: 'n4_1', date: '2025-02-26', time: '07:45', title: '從酒店出發', category: Category.TRANS, location: '伏見站', note: '搭乘東山線前往名古屋站' },
  { id: 'n4_2', date: '2025-02-26', time: '08:15', title: 'KKday 集合 (名古屋站)', category: Category.SPOT, location: 'JR名古屋站 太閤通口銀之鐘前', note: '準備開啟一日遊行程' },
  { id: 'n4_3', date: '2025-02-26', time: '11:00', title: '飛驒高山古街散策', category: Category.SPOT, location: '高山市', note: '漫步老街、品嚐飛驒牛' },
  { id: 'n4_4', date: '2025-02-26', time: '14:30', title: '白川鄉合掌村', category: Category.SPOT, location: '白川村', note: '世界文化遺產，絕美合掌造' },
  { id: 'n4_5', date: '2025-02-26', time: '18:30', title: '返回名古屋站', category: Category.TRANS, location: '名古屋站', note: '行程結束，市區晚餐' },
  
  // 2/27 Inuyama Castle & Shopping
  { id: 'n27_1', date: '2025-02-27', time: '09:00', title: '從酒店出發前往犬山', category: Category.TRANS, location: '伏見站 / 名古屋站', note: '搭乘名鐵犬山線「特急」約25-30分鐘' },
  { id: 'n27_2', date: '2025-02-27', time: '10:00', title: '犬山城下町散策', category: Category.SPOT, location: '犬山城下町', note: '特色美食串燒與老街氛圍' },
  { id: 'n27_3', date: '2025-02-27', time: '11:00', title: '國寶 犬山城', category: Category.SPOT, location: '犬山城', note: '日本五大國寶城，必上天守閣俯瞰木曾川' },
  { id: 'n27_4', date: '2025-02-27', time: '13:00', title: '犬山午餐後返回市區', category: Category.FOOD, location: '犬山車站', note: '準備前往名古屋站逛街' },
  { id: 'n27_5', date: '2025-02-27', time: '14:30', title: 'One Piece Mugiwara Store', category: Category.SPOT, location: 'Kintetsu Pass\'e 8F', note: '海賊王專賣店，草帽一夥集合！' },
  { id: 'n27_6', date: '2025-02-27', time: '16:00', title: '前往榮區購物', category: Category.TRANS, location: '名古屋站 -> 榮站', note: '搭乘東山線僅需 5 分鐘' },
  { id: 'n27_7', date: '2025-02-27', time: '16:30', title: 'Pokemon Center Nagoya', category: Category.SPOT, location: '松坂屋本館 5F', note: '名古屋限定金鯱皮卡丘必看' },
  { id: 'n27_8', date: '2025-02-27', time: '18:00', title: '榮商圈 / Oasis 21 逛街', category: Category.SPOT, location: '榮區', note: 'PARCO、Bic Camera 都在附近' },

  // 2/28 KKday Day Tour 2
  { id: 'n7_1', date: '2025-02-28', time: '08:00', title: '酒店上門接送', category: Category.TRANS, location: '酒店大門', note: 'KKday 專車接送方案' },
  { id: 'n7_2', date: '2025-02-28', time: '10:30', title: '郡上八幡古街', category: Category.SPOT, location: '郡上八幡', note: '著名的名水之城與古街' },
  { id: 'n7_3', date: '2025-02-28', time: '13:00', title: '牧歌之里冰雪樂園', category: Category.SPOT, location: '牧歌之里', note: '雪地玩耍、體驗冰雪樂趣' },
  { id: 'n7_4', date: '2025-02-28', time: '15:30', title: '溫泉體驗', category: Category.SPOT, location: '牧歌之里溫泉', note: '放鬆身心，洗去寒意' },
  { id: 'n7_5', date: '2025-02-28', time: '19:00', title: '返回名古屋酒店', category: Category.TRANS, location: '伏見', note: '專車送回酒店' },

  { id: 'n8', date: '2025-03-01', time: '13:00', title: '榮町百貨巡禮', category: Category.SPOT, location: 'Sakae', note: 'Oasis 21 拍照' },

  // 3/2 LEGOLAND Japan
  { id: 'n32_1', date: '2025-03-02', time: '09:00', title: '從酒店出發', category: Category.TRANS, location: '伏見站', note: '搭乘東山線至名古屋站' },
  { id: 'n32_2', date: '2025-03-02', time: '09:20', title: '轉乘青波線 (Aonami Line)', category: Category.TRANS, location: '名古屋站', note: '往「金城埠頭」方向' },
  { id: 'n32_3', date: '2025-03-02', time: '10:00', title: '名古屋樂高樂園', category: Category.SPOT, location: 'LEGOLAND Japan', note: '開園！展開冒險之旅' },
  { id: 'n32_4', date: '2025-03-02', time: '13:00', title: '樂園午餐', category: Category.FOOD, location: '樂園餐廳', note: '推薦樂高積木造型薯條' },
  { id: 'n32_5', date: '2025-03-02', time: '16:30', title: 'Maker\'s Pier 散策', category: Category.SPOT, location: '金城埠頭站旁', note: '樂園外的商圈，適合選購紀念品' },
  { id: 'n32_6', date: '2025-03-02', time: '18:00', title: '搭車返回名古屋市區', category: Category.TRANS, location: '金城埠頭站', note: '晚餐回市區享用' },

  { id: 'n10', date: '2025-03-03', time: '16:00', title: '抵達機場辦理登機', category: Category.TRANS, location: '中部國際機場 NGO', note: '星宇 JX839 (19:40 起飛)' },
  { id: 'n11', date: '2025-03-03', time: '19:40', title: '星宇航空 JX839 起飛', category: Category.TRANS, location: '中部國際機場 T1', note: '預計 22:15 抵達桃園' },
];

export const getInitialData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed.bookings?.dayTours)) {
         return getDefaultNagoyaData();
      }
      return parsed;
    } catch (e) {
      console.error("Failed to parse saved data", e);
    }
  }
  return getDefaultNagoyaData();
};

const getDefaultNagoyaData = () => ({
  title: '名古屋Travel',
  dateRange: '2/25-3/3',
  schedule: NAGOYA_SCHEDULE,
  members: [
    { id: '1', name: '我', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { id: '2', name: '夥伴', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha' }
  ],
  expenses: [],
  todos: [
    { id: 't1', text: '換日幣', completed: false },
    { id: 't2', text: '保旅遊平安險', completed: false },
    { id: 't3', text: '下載名古屋地鐵圖', completed: true }
  ],
  bookings: {
    hsr: {
      trainNo: '814',
      route: '台中 → 桃園',
      ref: '03208915',
      getTicketCode: '0599',
      time: '10:36 - 11:18',
      tickets: '成人2張, 孩童1張',
      seats: '4車 15A, 15B, 15C',
      price: '1220'
    },
    dayTours: [
      {
        id: 'dt1',
        title: '飛驒高山 & 白川鄉一日遊',
        provider: 'KKday',
        url: 'https://www.kkday.com/zh-tw/product/135964-unesco-world-heritage-hida-takayama-shirakawa-township-gassho-village-day-tour-from-nagoya',
        meetingPoint: 'JR名古屋站 太閤通口銀之鐘前',
        meetingTime: '08:15',
        date: '02/26'
      },
      {
        id: 'dt2',
        title: '郡上八幡・牧歌之里・溫泉一日遊',
        provider: 'KKday',
        url: 'https://www.kkday.com/zh-tw/product/530506',
        orderNo: '26KK209090504',
        meetingPoint: '酒店大門 (上門接送方案)',
        meetingTime: '約 08:00 (依確認信為準)',
        date: '02/28'
      }
    ],
    flights: [
      { id: 'f1', airline: '星宇航空 STARLUX', flightNo: 'JX838', from: 'TPE', to: 'NGO', depTime: '14:55', arrTime: '18:30', terminal: 'T1', date: '2/25' },
      { id: 'f2', airline: '星宇航空 STARLUX', flightNo: 'JX839', from: 'NGO', to: 'TPE', depTime: '19:40', arrTime: '22:15', terminal: 'T1', date: '3/3' }
    ],
    stay: {
      name: '名古屋伏見站前海茵娜快捷飯店',
      address: '1 Chome-10-10 Nishiki, Naka Ward, Nagoya, Aichi 460-0003日本',
      phone: '+81 50-5369-8300',
      ref: '3125-5240-7731',
      cardLastFour: '2535',
      transport: '東山線伏見站10號出口（有電梯）上來約50公尺',
      facilities: ['洗烘衣機 (3台)', '飲水機', '製冰機', '微波爐'],
      tips: ['備品在櫃檯自取', '每房附一個枕頭，不夠可至 2 樓櫃檯索取']
    }
  }
});

export const saveToLocal = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const exportDataAsText = (data: any) => {
  return JSON.stringify(data, null, 2);
};

export const importDataFromText = (text: string) => {
  try {
    const data = JSON.parse(text);
    if (data.schedule && data.todos) {
      localStorage.setItem(STORAGE_KEY, text);
      return true;
    }
  } catch (e) {
    alert("文字格式不正確，請檢查 JSON 內容！");
  }
  return false;
};
