import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {images} from '../common/common';

export default function BackGround({children}: {children: React.ReactNode}) {
  return (
    <ImageBackground source={images.background} style={styles.container}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
