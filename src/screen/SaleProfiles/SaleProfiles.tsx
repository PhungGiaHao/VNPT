/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MonthPicker from 'react-native-month-year-picker';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation, useRoute} from '@react-navigation/native';
import {
  images,
  colors,
  IUSER,
  ISALES,
  IUSERCURRENTSALE,
} from '../../common/common';
import BackGround from '../../components/BackGround';
import Logo from '../../components/Logo';
import {useData} from '../../hook';
import moment from 'moment';
import {getSalesByUserId} from '../../db/salesServices';
const getStatus = (ratio: number) => {
  if (ratio < 0.7) {
    return {
      status: 'Báo Động',
      color: colors.red,
    };
  } else if (ratio < 0.9) {
    return {
      status: 'Quan Tâm',
      color: colors.warning,
    };
  } else if (ratio < 1) {
    return {
      status: 'Chấp Nhận',
      color: colors.greenAppcept,
    };
  } else {
    return {
      status: 'Đạt',
      color: colors.greenother,
    };
  }
};
export default function SaleProfiles() {
  function formatNumberWithDots(number: number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.');
  }
  const {category} = useData();
  const navigation = useNavigation();
  const [dateNow, setDateNow] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const route = useRoute();
  const {userInfo} = route.params as {userInfo: IUSER};
  const [userSale, setUserSale] = useState<ISALES | null>();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = useCallback(() => setDatePickerVisibility(false), []);

  const handleConfirm = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || dateNow;

      hideDatePicker();
      setDateNow(selectedDate);
    },
    [dateNow, hideDatePicker],
  );
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);
  const fetchData = async () => {
    const dataSearch: IUSERCURRENTSALE = {
      userId: userInfo.id,
      createdAt: moment(dateNow).format('MM/YYYY'),
      categoryId: category.id || null,
    };
    const result = await getSalesByUserId(dataSearch);
    setUserSale(result);
  };
  const {status, color} = getStatus(
    (userSale?.realQuantity ?? 0) / (userSale?.deliveryQuantity ?? 0),
  );

  return (
    <BackGround>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Logo />
          <View style={styles.header}>
            <View style={{flex: 1}} />
            <View style={{flex: 4}}>
              <Text
                style={[
                  styles.txtColor,
                  {fontSize: 20, marginTop: 0, textAlign: 'center'},
                ]}>
                Quản Lý Bán Hàng
              </Text>
            </View>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'flex-end'}}
              onPress={() => navigation.goBack()}>
              <Image
                source={images.back}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.time}>
            <View
              style={{
                backgroundColor: colors.sencondaryColorBlur,
                padding: 8,
                flexDirection: 'row',
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <Text style={[styles.txtColor, {fontSize: 14, marginTop: 0}]}>
                Thời gian:{' '}
              </Text>
              <View
                style={{
                  backgroundColor: colors.white,
                  marginLeft: 4,
                  paddingRight: 10,
                  flexDirection: 'row',
                  borderRadius: 8,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.black,
                    marginLeft: 8,
                  }}>
                  {userSale?.createdAt || moment(dateNow).format('MM/YYYY')}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => showDatePicker()}
                style={{marginLeft: 12, alignItems: 'center'}}>
                <Feather name={'calendar'} size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          {userSale ? (
            <>
              <View style={{paddingHorizontal: 30}}>
                <Text style={styles.txtColor}>
                  Tên Nhân Viên:
                  <Text style={styles.txtNomarl}> {userInfo.name}</Text>
                </Text>
                <Text
                  style={
                    (styles.txtColor,
                    {
                      fontWeight: 'bold',
                      marginTop: 12,
                      color: colors.primaryColor,
                    })
                  }>
                  Sim Di Động
                </Text>
              </View>
              <View style={styles.txtRow}>
                <View style={{flex: 1}}>
                  <Text style={styles.txtColor}>
                    Kế Hoạch Giao:
                    <Text style={styles.txtNomarl}>
                      {' '}
                      {userSale?.deliveryQuantity}
                    </Text>
                  </Text>

                  <Text style={styles.txtColor}>
                    Doanh Thu:
                    <Text style={styles.txtNomarl}>
                      {' '}
                      {formatNumberWithDots(userSale?.revenue ?? 0)}đ
                    </Text>
                  </Text>
                  <Text style={styles.txtColor}>
                    Nhận xét{' '}
                    <Text style={[styles.txtColor, {color}]}>{status}</Text>
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  <Text style={styles.txtColor}>
                    Sl Thực Hiện:
                    <Text style={styles.txtNomarl}>
                      {' '}
                      {userSale?.realQuantity}
                    </Text>
                  </Text>
                  <Text style={styles.txtColor}>
                    Còn Lại:
                    <Text style={styles.txtNomarl}>
                      {' '}
                      {(userSale?.deliveryQuantity ?? 0) -
                        (userSale?.realQuantity ?? 0)}
                    </Text>
                  </Text>
                  <Text style={styles.txtColor}>
                    Tỷ lệ:{' '}
                    <Text style={styles.txtNomarl}>
                      {(
                        ((userSale?.realQuantity ?? 0) /
                          (userSale?.deliveryQuantity ?? 0)) *
                        100
                      ).toFixed() !== 'NaN'
                        ? (
                            ((userSale?.realQuantity ?? 0) /
                              (userSale?.deliveryQuantity ?? 0)) *
                            100
                          ).toFixed()
                        : 0}
                      %
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={{paddingHorizontal: 30}}>
                <Text style={[styles.txtColor, {marginTop: 14}]}>
                  Chú Thích:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: colors.black,
                    marginVertical: 8,
                  }}>
                  {userSale?.note || 'Không có chú thích'}
                </Text>
              </View>
              <View style={{paddingHorizontal: 30}}>
                <Text style={styles.txtColor}>
                  Ngày Cập Nhật:
                  <Text style={styles.txtNomarl}>
                    {' '}
                    {userSale?.updatedAt || ' '}
                  </Text>
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.noValue}>
              <Text style={styles.txtButton}>Không có dữ liệu</Text>
            </View>
          )}
        </SafeAreaView>
        {isDatePickerVisible && (
          <MonthPicker
            locale="vi"
            cancelButton="Hủy"
            okButton="Xác nhận"
            onChange={handleConfirm}
            value={dateNow}
            minimumDate={new Date()}
            maximumDate={new Date(2025, 5)}
          />
        )}
      </ScrollView>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.sencondaryColorBlur,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exit: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  txtColor: {
    fontWeight: 'bold',
    color: colors.primaryColor,
    marginTop: 14,
    fontSize: 14,
  },
  txtNomarl: {
    color: colors.black,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  txtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 14,
  },
  time: {
    marginTop: 20,
    alignItems: 'baseline',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  noValue: {
    paddingVertical: 30,
    marginTop: 20,
    backgroundColor: colors.sencondaryColorBlur,
    marginHorizontal: 30,
    alignItems: 'center',
    borderRadius: 10,
  },
  txtButton: {
    color: colors.primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
