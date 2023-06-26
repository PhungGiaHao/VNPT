/* eslint-disable react-native/no-inline-styles */
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Logo from '../components/Logo';
import {colors} from '../common/common';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useForm, Controller} from 'react-hook-form';
import {LoginValidation} from '../vadilate/LoginValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {checkLogin} from '../db/LoginService';
import ModalCustom from '../Modal/ModalCustom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useData} from '../hook';
import BackGround from '../components/BackGround';

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginValidation),
  });
  const [showModal, setShowModal] = React.useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const {handleUser} = useData();
  const handleLogin = async (data: any) => {
    try {
      const user = await checkLogin(data.username as never);
      if (user) {
        if (user.password === data.password) {
          await AsyncStorage.setItem('userId', user.id.toString());
          handleUser(user);
        }
      } else {
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [showPassword, setShowPassword] = React.useState(true);
  return (
    <BackGround>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.title}>Đăng nhập</Text>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.input}>
            <FontAwesome
              name="user"
              size={24}
              style={{marginLeft: 14}}
              color={colors.black}
            />
            <Controller
              control={control}
              name="username"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    flex: 1,
                  }}
                  placeholder=" Tài Khoản"
                  placeholderTextColor={colors.black}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors?.username && (
            <Text style={{color: 'red', margin: 4}}>
              {errors.username.message}
            </Text>
          )}
          <View style={[styles.input]}>
            <FontAwesome
              name="user"
              size={24}
              style={{marginLeft: 14}}
              color={colors.black}
            />
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    flex: 1,
                  }}
                  placeholder=" Mật Khẩu"
                  placeholderTextColor={colors.black}
                  secureTextEntry={showPassword}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />

            <Entypo
              name={showPassword ? 'eye-with-line' : 'eye'}
              size={20}
              style={{marginRight: 20}}
              color={colors.black}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
          {errors?.password && (
            <Text style={{color: 'red', margin: 4}}>
              {errors.password.message}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleLogin)}>
            <Text style={styles.TxtBtn}>Xác Nhận</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {showModal && (
          <ModalCustom
            setShowModal={() => handleModal()}
            message={'Sai tên tài khoản hoặc mật khẩu'}
            type={'error'}
          />
        )}
      </View>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  TxtBtn: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: colors.black,
  },
  input: {
    flexDirection: 'row',
    marginTop: 30,
    borderRadius: 20,
    alignItems: 'center',
    height: 40,
    width: '80%',
    backgroundColor: colors.gray,
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
});
