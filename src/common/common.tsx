export const colors = {
  primaryColor: '#005AAB',
  secondaryColor: '#73C6D9',
  circleBackground: '#05DBF2',
  black: '#000000',
  white: '#FFFFFF',
  green: '#44E170',
  greenother: '#04BF8A',
  greenAppcept: '#6EBF49',
  warning: '#FFEA00',
  yellow: '#f5e653',
  gray: '#D9D9D9',
  primaryColorBlur: '#005AAB80',
  sencondaryColorBlur: '#73C6D940',
  circleBackgroundBlur: '#05DBF230',
  red: '#ff0000',
};

export const images = {
  background: require('../assets/images/background.png'),
  logo: require('../assets/images/logo.png'),
  success: require('../assets/images/success.png'),
  warning: require('../assets/images/warning.png'),
  back: require('../assets/images/back.png'),
  exit: require('../assets/images/exit.png'),
};

export interface IUSER {
  id: number;
  userName: string;
  password: string;
  position: string;
  phone: string;
  name: string;
  positionWork: string;
  mhrCode: string;
  role: string;
}

export interface IUseData {
  user: IUSER;
  users: IUSER[];
  category: ICATEGORY;
  categorys: ICATEGORY[] | null;
  userSale: ISALES;
  handleUser: (payload: IUSER) => void;
  getAllCategory: () => void;
  getUserSale: (payload: IUSERCURRENTSALE) => void;
  checkLoginAuth: () => void;
}

export interface ISALES {
  id: number;
  userId: number;
  categoryId: number | null;
  categoryName: string;
  deliveryQuantity: number;
  realQuantity: number;
  revenue: number;
  note: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICATEGORY {
  id: number;
  name: string;
}

export interface IUSERCURRENTSALE {
  categoryId: number | null;
  userId: number;
  createdAt: string;
}
