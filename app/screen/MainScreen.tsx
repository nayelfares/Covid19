import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Screen from '../Screen';

const MainScreen = (): JSX.Element => {
  return (
    <Screen style={styles.screen}>
      <Text> Main Screen</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MainScreen;
