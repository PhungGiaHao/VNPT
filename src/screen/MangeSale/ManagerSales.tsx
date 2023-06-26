/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {IUSER, colors, images} from '../../common/common';
import BackGround from '../../components/BackGround';
import Logo from '../../components/Logo';
import {useData} from '../../hook';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/TypesNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

export default function ManagerSales() {
  const {user, users} = useData();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const renderItem = ({item}: {item: IUSER}) => {
    return (
      <TouchableOpacity
        style={styles.itemListPeople}
        onPress={() =>
          navigation.navigate('SalesProfile', {
            userInfo: item,
          })
        }>
        <Text style={[styles.txtColor, {marginLeft: 14, fontSize: 20}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
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
          <Text style={[styles.txtColor, {fontSize: 20, textAlign: 'center'}]}>
            Xem Quản Lý Bán Hàng
          </Text>
        </View>
        <FlatList
          data={users}
          keyExtractor={item => `${item.id}-user`}
          renderItem={({item}) => renderItem({item})}
          contentContainerStyle={{
            backgroundColor: 'transparent',
            paddingBottom: 40,
          }}
        />
      </SafeAreaView>
    </BackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtColor: {
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  header: {
    backgroundColor: colors.sencondaryColorBlur,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
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
  itemListPeople: {
    backgroundColor: colors.circleBackgroundBlur,
    paddingVertical: 10,
    marginHorizontal: 30,
    marginTop: 30,
    borderRadius: 10,
    elevation: 2,
  },
});
