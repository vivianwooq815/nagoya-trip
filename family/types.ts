
export enum Category {
  SPOT = '景點',
  FOOD = '美食',
  TRANS = '交通',
  STAY = '住宿',
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: Category;
  location: string;
  note: string;
  date: string;
}

export interface Expense {
  id: string;
  amount: number;
  currency: string;
  category: string;
  payerId: string;
  splitWithIds: string[];
  description: string;
  date: string;
}

export interface Booking {
  id: string;
  type: 'flight' | 'stay' | 'car' | 'ticket';
  title: string;
  details: any;
  isLocked: boolean;
}

export interface JournalPost {
  id: string;
  authorId: string;
  images: string[];
  content: string;
  date: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  assigneeId?: string;
}
