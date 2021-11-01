import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Screen from '../Screen';

const CountriesListScreen = (): JSX.Element => {
  return (
    <Screen style={styles.screen}>
      <Text> Countries List</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default CountriesListScreen;
