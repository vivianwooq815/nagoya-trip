
import { Category } from './types';

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.SPOT]: 'bg-k-spot',
  [Category.FOOD]: 'bg-k-food',
  [Category.TRANS]: 'bg-k-trans',
  [Category.STAY]: 'bg-k-stay',
};

export const MOCK_MEMBERS = [
  { id: '1', name: '小王', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: '2', name: '大李', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: '3', name: '花花', avatar: 'https://picsum.photos/seed/user3/100/100' },
];

export const MOCK_SCHEDULE = [
  { id: '1', date: '2024-05-20', time: '10:00', title: '築地市場早餐', category: Category.FOOD, location: '東京都中央區築地', note: '一定要吃玉子燒！' },
  { id: '2', date: '2024-05-20', time: '13:30', title: '淺草雷門散策', category: Category.SPOT, location: '淺草寺', note: '大燈籠必拍' },
  { id: '3', date: '2024-05-21', time: '09:00', title: '前往河口湖', category: Category.TRANS, location: '新宿車站', note: '富士回遊號' },
  { id: '4', date: '2024-05-21', time: '15:00', title: '河口湖溫泉旅館', category: Category.STAY, location: '湖樂御岳', note: '一泊二食' },
];
