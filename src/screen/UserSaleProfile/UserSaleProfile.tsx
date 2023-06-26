/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import Feather from 'react-native-vector-icons/Feather';
import {ISALES, IUSERCURRENTSALE, colors, images} from '../../common/common';
import BackGround from '../../components/BackGround';
import Logo from '../../components/Logo';
import {useData} from '../../hook';
import {RootStackParamList} from '../../navigation/TypesNavigation';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
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
export default function UserSaleProfile() {
  const {user, category} = useData();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());
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
  function formatNumberWithDots(number: number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join('.');
  }
  const {status, color} = getStatus(
    (userSale?.realQuantity ?? 0) / (userSale?.deliveryQuantity ?? 0),
  );
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const fetchData = async () => {
    const dataSearch: IUSERCURRENTSALE = {
      userId: user.id,
      createdAt: moment(dateNow).format('MM/YYYY'),
      categoryId: category.id || null,
    };
    const result = await getSalesByUserId(dataSearch);
    setUserSale(result);
  };

  return (
    <BackGround>
      <ScrollView>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={images.back}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text
              style={[styles.txtColor, {fontSize: 20, textAlign: 'center'}]}>
              Quản Lý Bán Hàng Sim Di Động
            </Text>
          </View>
          {}
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
              <View style={[styles.time, {marginTop: 10, marginBottom: 4}]}>
                <View
                  style={{
                    backgroundColor: colors.sencondaryColorBlur,
                    padding: 8,
                    flexDirection: 'row',
                    borderRadius: 8,
                  }}>
                  <Text style={[styles.txtColor]}>Ngày cập nhật:</Text>
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
                      {userSale.updatedAt}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.btn}>
                {/* first row */}
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: Dimensions.get('window').width / 3 - 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 8,
                      borderRadius: 8,
                      elevation: 1,
                      backgroundColor: '#05DBF230',
                      padding: 10,
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
                        backgroundColor: colors.circleBackgroundBlur,
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
                      width: Dimensions.get('window').width / 3 - 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 8,
                      borderRadius: 8,
                      elevation: 1,
                      backgroundColor: '#05DBF230',
                      padding: 10,
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
                      SL Giao
                    </Text>
                    <View />
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: colors.circleBackgroundBlur,
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
                      width: Dimensions.get('window').width / 3 - 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 8,
                      borderRadius: 8,
                      elevation: 1,
                      backgroundColor: '#05DBF230',
                      padding: 10,
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
                      Doanh Thu
                    </Text>
                    <View />
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: colors.circleBackgroundBlur,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          position: 'absolute',

                          width: Dimensions.get('window').width / 3 - 35,
                          alignItems: 'center',
                        }}>
                        <Text style={[styles.txtColor, {fontSize: 15}]}>
                          {formatNumberWithDots(userSale?.revenue)}đ
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* second row */}
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: Dimensions.get('window').width / 3 - 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 8,
                      borderRadius: 8,
                      elevation: 1,
                      backgroundColor: '#05DBF230',
                      padding: 10,
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
                      Còn Lại
                    </Text>
                    <View />
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: colors.circleBackgroundBlur,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={[styles.txtColor, {fontSize: 24}]}>
                        {userSale?.deliveryQuantity - userSale?.realQuantity}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get('window').width / 3 - 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 8,
                      borderRadius: 8,
                      elevation: 1,
                      backgroundColor: '#05DBF230',
                      padding: 10,
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
                      Nhận xét
                    </Text>
                    <View />
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,

                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          width: Dimensions.get('window').width / 3 - 35,
                        }}>
                        <Text style={[styles.txtColor, {fontSize: 16, color}]}>
                          {status}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get('window').width / 3 - 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 8,
                      borderRadius: 8,
                      elevation: 1,
                      backgroundColor: '#05DBF230',
                      padding: 10,
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
                      fill={Number(
                        (
                          (userSale?.realQuantity /
                            userSale?.deliveryQuantity) *
                          100
                        ).toFixed(),
                      )}
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
                            {(
                              (userSale?.realQuantity /
                                userSale?.deliveryQuantity) *
                              100
                            ).toFixed()}
                            %
                          </Text>
                        </View>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                </View>
              </View>
              {/* end row 2 */}
              <View style={styles.contentNote}>
                <Text
                  style={[styles.txtColor, {margin: 4, marginHorizontal: 8}]}>
                  Chú thích:
                </Text>
                <Text
                  style={[
                    styles.txtNomarl,
                    {margin: 4, marginHorizontal: 8, color: colors.black},
                  ]}>
                  {userSale.note ? userSale.note : 'Không có ghi chú'}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.noValue}>
              <Text style={styles.txtButton}>Không có dữ liệu</Text>
            </View>
          )}

          <View style={{height: 30}} />
        </SafeAreaView>
      </ScrollView>
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
  contentNote: {
    backgroundColor: colors.sencondaryColorBlur,
    marginHorizontal: 30,
    minHeight: 120,
    borderRadius: 10,
    elevation: 2,
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
