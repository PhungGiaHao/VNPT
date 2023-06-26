/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {colors, images} from '../common/common';

export default function ModalCustom({
  message,
  type,
  setShowModal,
}: {
  message: string;
  type: string;
  setShowModal: () => void;
}) {
  return (
    <Modal
      isVisible={true}
      onSwipeComplete={setShowModal}
      useNativeDriverForBackdrop
      swipeDirection={['down']}>
      <View style={styles.container}>
        <Image
          style={{
            height: 60,
            width: 60,
          }}
          resizeMode="contain"
          source={type === 'success' ? images.success : images.warning}
        />
        <Text style={{fontSize: 32, fontWeight: 'bold', color: colors.black}}>
          Thông báo
        </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.black}}>
          {message}
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
  },
});
