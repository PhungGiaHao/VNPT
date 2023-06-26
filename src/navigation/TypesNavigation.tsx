import {IUSER} from '../common/common';

export type RootStackParamList = {
  HomeAdmin: undefined;
  HomeUser: undefined;
  ManagerSales: undefined;
  InputSales: undefined;
  Profile: undefined;
  SalesProfile: {userInfo: IUSER};
  UserSaleProfile: {userInfo: IUSER};
};
