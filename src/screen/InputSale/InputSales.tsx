/* eslint-disable react-native/no-inline-styles */
import {
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
import {IUSERCURRENTSALE, colors, images} from '../../common/common';
import BackGround from '../../components/BackGround';
import Logo from '../../components/Logo';
import {useData} from '../../hook';
import Feather from 'react-native-vector-icons/Feather';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-gesture-handler';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputSaleValidation} from '../../vadilate/InputSaleValidation';
import ModalCustom from '../../Modal/ModalCustom';
import {getSalesByUserId, insertOrUpdateByUserId} from '../../db/salesServices';
export interface IInputSales {
  categoryId: number;
  createdAt: string;
  deliveryQuantity: number;
  note: string;
  realQuantity: number;
  revenue: number;
  selectedEmployeeId: string;
  updatedAt: string;
  userId: number;
}

export default function InputSales() {
  const {user, users, category} = useData();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateNow, setDateNow] = useState(new Date());
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [valueDefault, setValueDefault] = useState({
    deliveryQuantity: 0,
    realQuantity: 0,
    revenue: 0,
    note: '',
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(InputSaleValidation),
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hanlerPickUserId = async (userIdSelected: number) => {
    setUserId(userIdSelected);
  };

  const hideDatePicker = useCallback(() => setDatePickerVisibility(false), []);

  const handlerChangeForm = (field: any, text: any) => {
    let updatedText = text;
    if (field.name === 'deliveryQuantity' || field.name === 'realQuantity') {
      field.onChange(+text);
    } else if (field.name === 'revenue') {
      const format: string = text.replace(/[.,]/g, '');
      const formated = new Intl.NumberFormat('vi-VN').format(+format);
      updatedText = formated;
      console.log(updatedText);
      field.onChange(updatedText);
    } else {
      field.onChange(text);
    }
    setValueDefault({
      ...valueDefault,
      [field.name]: updatedText,
    });
  };

  const handleConfirmInput = async (data: any) => {
    const dataInput: IInputSales = {
      ...data,
      createdAt: moment(dateNow).format('MM/YYYY'),
      updatedAt: moment(dateNow).format('DD/MM/YYYY'),
      categoryId: category?.id,
      userId: data.selectedEmployeeId,
    };
    const result = await insertOrUpdateByUserId(dataInput);
    if (result) {
      setShowModalSuccess(true);
    } else {
      setShowModalError(true);
    }
  };

  const handleConfirm = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || dateNow;

      hideDatePicker();
      setDateNow(selectedDate);
    },
    [dateNow, hideDatePicker],
  );

  const handleModalSuccess = () => {
    setShowModalSuccess(!showModalSuccess);
  };

  const handlerModalError = () => {
    setShowModalError(!showModalError);
  };
  const fectchData = async () => {
    const data: IUSERCURRENTSALE = {
      categoryId: category?.id || null,
      userId: userId,
      createdAt: moment(dateNow).format('MM/YYYY'),
    };
    const result = await getSalesByUserId(data);
    setValue('deliveryQuantity', result?.deliveryQuantity || 0);
    setValue('realQuantity', result?.realQuantity || 0);
    setValue('revenue', result?.revenue || 0);
    setValue('note', result?.note || '');

    setValueDefault({
      ...valueDefault,
      deliveryQuantity: result?.deliveryQuantity || 0,
      realQuantity: result?.realQuantity || 0,
      revenue: result?.revenue || 0,
      note: result?.note || '',
    });
  };

  useEffect(() => {
    if (userId !== 0) {
      fectchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow, userId]);

  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          {showModalSuccess && (
            <ModalCustom
              setShowModal={() => handleModalSuccess()}
              message={'Nhập thành công'}
              type={'success'}
            />
          )}
          {showModalError && (
            <ModalCustom
              setShowModal={() => handlerModalError()}
              message={'Nhập dữ liệu thất bại'}
              type={'error'}
            />
          )}
          <Logo />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}>
            <View>
              <Text style={styles.txtColor}>
                Tên Quản Trị Viên:
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
              Nhập Quản Lý Bán Hàng
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
          <View style={{paddingHorizontal: 30}}>
            <Text
              style={[
                styles.txtColor,
                {fontSize: 20, marginTop: 20, fontWeight: 'bold'},
              ]}>
              Tên Nhân Viên
            </Text>
          </View>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: colors.primaryColor},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.txtColor}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={users}
                search
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={
                  !isFocus ? 'Chọn Tên Nhân Viên' : 'Chọn Tên Nhân Viên'
                }
                searchPlaceholder="Tìm Kiếm..."
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  field.onChange(item.id.toString());
                  hanlerPickUserId(+item.id);
                  setIsFocus(false);
                }}
              />
            )}
            name="selectedEmployeeId"
          />
          {errors?.selectedEmployeeId && (
            <Text style={{color: 'red', marginLeft: 30}}>
              {errors.selectedEmployeeId.message}
            </Text>
          )}
          <View style={styles.formInput}>
            <Text style={[styles.txtColor, {margin: 5}]}>Sim Di Động</Text>
            <View style={styles.inputRow}>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <View style={styles.inputRow}>
                    <Text style={styles.txtColor}>Số Lượng Giao:</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="_ _ _"
                      onChangeText={text => handlerChangeForm(field, text)}
                      value={valueDefault?.deliveryQuantity?.toString() || ''}
                    />
                  </View>
                )}
                name="deliveryQuantity"
              />
            </View>
            {errors?.deliveryQuantity && (
              <Text style={{color: 'red', margin: 4, marginLeft: 8}}>
                {errors.deliveryQuantity.message}
              </Text>
            )}
            <View style={styles.inputRow}>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <View style={styles.inputRow}>
                    <Text style={styles.txtColor}>Số Lượng Thực Hiện:</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="_ _ _"
                      onChangeText={text => handlerChangeForm(field, text)}
                      value={valueDefault?.realQuantity.toString()}
                    />
                  </View>
                )}
                name="realQuantity"
              />
            </View>
            {errors?.realQuantity && (
              <Text style={{color: 'red', margin: 4, marginLeft: 8}}>
                {errors.realQuantity.message}
              </Text>
            )}
            <View style={styles.inputRow}>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <View style={styles.inputRow}>
                    <Text style={styles.txtColor}>Doanh Thu:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="_ _ _"
                      keyboardType="number-pad"
                      onChangeText={text => handlerChangeForm(field, text)}
                      value={valueDefault?.revenue.toLocaleString('vi-VN')}
                    />
                  </View>
                )}
                name="revenue"
                defaultValue={0}
              />
            </View>
            {errors?.revenue && (
              <Text style={{color: 'red', margin: 4, marginLeft: 8}}>
                {errors.revenue.message}
              </Text>
            )}
            <View style={styles.inputRow}>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <View style={styles.inputRow}>
                    <Text style={styles.txtColor}>Chú Thích:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="_ _ _"
                      onChangeText={text => field.onChange(text)}
                      value={field.value}
                    />
                  </View>
                )}
                name="note"
                defaultValue=""
              />
            </View>
          </View>
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleConfirmInput)}>
            <Text style={{color: colors.white, fontSize: 20}}>Xác Nhận</Text>
          </TouchableOpacity>
          <View style={{height: 40}} />
        </SafeAreaView>
      </ScrollView>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtButton: {
    color: colors.primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    height: 50,
    marginHorizontal: 30,
    borderRadius: 30,
  },
  formInput: {
    backgroundColor: colors.sencondaryColorBlur,
    marginTop: 8,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 4,
  },
  input: {
    padding: 8,
  },
  header: {
    backgroundColor: colors.sencondaryColorBlur,

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
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
    marginTop: 30,
    paddingVertical: 25,
    alignItems: 'center',
    borderRadius: 10,
  },
  time: {
    marginTop: 20,
    alignItems: 'baseline',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  dropdown: {
    height: 33,

    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '70%',
    marginLeft: 30,
    marginTop: 10,
    backgroundColor: colors.sencondaryColorBlur,
    borderColor: colors.primaryColor,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.primaryColor,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
