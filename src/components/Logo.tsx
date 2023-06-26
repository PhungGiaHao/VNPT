import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {images} from '../common/common';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={images.logo} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
