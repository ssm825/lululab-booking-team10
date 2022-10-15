export interface TestType {
  id: number;
}

export interface DefaultType {
  id: number;
  user_name: string;
  user_phone: string;
  booking_date: string;
  booking_time: string;
  categories: string;
}

export interface SearchType {
  isResult: boolean;
  result?: {
    id: number;
    user_name: string;
    user_phone: string;
    booking_date: string;
    booking_time: string;
    categories: string;
  };
}
