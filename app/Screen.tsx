import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

function Screen({children, style}: any) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
