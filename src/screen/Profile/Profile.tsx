/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, images} from '../../common/common';
import BackGround from '../../components/BackGround';
import Logo from '../../components/Logo';
import {useData} from '../../hook';
import {initialUser} from '../../hook/useData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const {user, handleUser} = useData();
  const navigation = useNavigation();
  const LogOut = async () => {
    await AsyncStorage.removeItem('userId');
    handleUser(initialUser);
  };

  return (
    <BackGround>
      <SafeAreaView style={styles.container}>
        <Logo />
        <View style={styles.header}>
          <View style={{flex: 1}} />
          <View style={{flex: 4}}>
            <Text
              style={[styles.txtColor, {fontSize: 20, textAlign: 'center'}]}>
              {user.role === 'Admin'
                ? 'Thông Tin Quản Trị Viên'
                : 'Thông Tin Nhân Viên'}
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
        <View style={{paddingHorizontal: 30}}>
          <Text style={styles.txtColor}>
            {(user.role = 'Admin' ? 'Tên Quản Trị Viên:' : 'Tên Nhân Viên:')}
            <Text style={styles.txtNomarl}> {user.name}</Text>
          </Text>
          <Text style={styles.txtColor}>
            Mã HRM:<Text style={styles.txtNomarl}> {user.mhrCode}</Text>
          </Text>
          <Text style={styles.txtColor}>
            Chức Danh:<Text style={styles.txtNomarl}> {user.position}</Text>
          </Text>
          <Text style={styles.txtColor}>
            Vị Trí:<Text style={styles.txtNomarl}> {user.positionWork}</Text>
          </Text>
          <Text style={styles.txtColor}>
            Số Điện Thoại:<Text style={styles.txtNomarl}> {user.phone}</Text>
          </Text>
          <TouchableOpacity style={styles.exit} onPress={() => LogOut()}>
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={images.exit}
            />
            <Text style={[styles.txtColor, {marginLeft: 8, fontWeight: '500'}]}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    marginVertical: 14,
  },
  txtNomarl: {
    color: colors.black,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
});
