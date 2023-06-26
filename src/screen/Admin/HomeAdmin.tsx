/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useData} from '../../hook';
import BackGround from '../../components/BackGround';
import Logo from '../../components/Logo';
import {colors} from '../../common/common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
export default function HomeAdmin() {
  const {user} = useData();
  const navigation = useNavigation();
  return (
    <BackGround>
      <SafeAreaView style={styles.container}>
        <Logo />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}>
            <Entypo
              size={24}
              color={colors.black}
              name={'dots-three-horizontal'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ManagerSales' as never)}>
          <Text style={styles.txtButton}>Xem Quản Lý Bán Hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('InputSales' as never)}>
          <Text style={styles.txtButton}>Nhập Quản Lý Bán Hàng</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  txtButton: {
    color: colors.primaryColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
