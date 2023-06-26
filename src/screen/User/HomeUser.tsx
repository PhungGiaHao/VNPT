/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {IUSERCURRENTSALE, colors} from '../../common/common';
import BackGround from '../../components/BackGround';
import Logo from '../../components/Logo';
import {useData} from '../../hook';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Feather from 'react-native-vector-icons/Feather';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/TypesNavigation';
export default function HomeUser() {
  const {user, userSale, getUserSale, category} = useData();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  useEffect(() => {
    fectchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const fectchData = async () => {
    const data: IUSERCURRENTSALE = {
      categoryId: category?.id || null,
      userId: user?.id,
      createdAt: moment(dateNow).format('MM/YYYY'),
    };
    getUserSale(data);
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

  return (
    <BackGround>
      <SafeAreaView style={styles.container}>
        <Logo />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          }}>
          <View>
            <Text style={styles.txtColor}>
              Tên Nhân Viên:
              <Text style={styles.txtNomarl}> {user.name}</Text>
            </Text>

            <Text style={styles.txtColor}>
              Mã HRM:<Text style={styles.txtNomarl}> {user.mhrCode}</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}>
            <Entypo
              size={24}
              color={colors.black}
              name={'dots-three-horizontal'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={[styles.txtColor, {fontSize: 20, textAlign: 'center'}]}>
            Xem Quản Lý Bán Hàng
          </Text>
        </View>
        <View style={styles.time}>
          <View
            style={{
              backgroundColor: colors.sencondaryColorBlur,
              padding: 8,
              flexDirection: 'row',
              borderRadius: 8,
            }}>
            <Text style={styles.txtColor}>Thời gian: </Text>
            <View
              style={{
                backgroundColor: colors.white,
                marginLeft: 4,
                paddingRight: 10,
                flexDirection: 'row',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.black,
                  marginLeft: 8,
                }}>
                {moment(dateNow).format('MM/YYYY')}
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate('UserSaleProfile', {
                  userInfo: user,
                })
              }>
              <View>
                <Text style={[styles.txtColor, {margin: 8, fontSize: 16}]}>
                  Sim di động
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3 - 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                  }}>
                  <Text
                    style={[
                      styles.txtColor,
                      {
                        fontSize: 14,
                        textAlign: 'center',
                        marginBottom: 8,
                      },
                    ]}>
                    KH Giao
                  </Text>
                  <View />
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      backgroundColor: colors.circleBackground,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={[styles.txtColor, {fontSize: 24}]}>
                      {userSale?.deliveryQuantity}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3 - 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                  }}>
                  <Text
                    style={[
                      styles.txtColor,
                      {
                        fontSize: 14,
                        textAlign: 'center',
                        marginBottom: 8,
                      },
                    ]}>
                    SL Thực Hiện
                  </Text>
                  <View />
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      backgroundColor: colors.circleBackground,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={[styles.txtColor, {fontSize: 24}]}>
                      {userSale?.realQuantity}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3 - 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                  }}>
                  <Text
                    style={[
                      styles.txtColor,
                      {
                        fontSize: 14,
                        textAlign: 'center',
                        marginBottom: 8,
                      },
                    ]}>
                    Tỷ lệ
                  </Text>
                  <View />
                  <AnimatedCircularProgress
                    size={68}
                    width={8}
                    fill={
                      (userSale?.realQuantity / userSale?.deliveryQuantity) *
                      100
                    }
                    style={{transform: [{rotate: '10deg'}]}}
                    tintColor="#44E170"
                    backgroundColor="transparent">
                    {() => (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: '#005AAB70',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 20,
                          transform: [{rotate: '-10deg'}],
                        }}>
                        <Text
                          style={[
                            styles.txtColor,

                            {
                              fontSize: 15,
                              textAlign: 'center',
                            },
                          ]}>
                          {(userSale?.realQuantity /
                            userSale?.deliveryQuantity) *
                            100}
                          %
                        </Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </TouchableOpacity>
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
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  time: {
    marginTop: 20,
    alignItems: 'baseline',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  txtColor: {
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  txtNomarl: {
    color: colors.black,
    fontWeight: 'normal',
  },
  btn: {
    backgroundColor: colors.sencondaryColorBlur,
    marginTop: 8,

    borderRadius: 10,
    marginHorizontal: 30,
  },
  txtButton: {
    color: colors.primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: colors.sencondaryColorBlur,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
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
});
