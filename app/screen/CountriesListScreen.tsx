import React from 'react';
import {StyleSheet, Text} from 'react-native';
import useStore from '../hooks/useStore';
import Screen from '../Screen';

const CountriesListScreen = (): JSX.Element => {
  const countriesState = useStore(state => state.countries);
  return (
    <Screen style={styles.screen}>
      <Text> {countriesState.length}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default CountriesListScreen;
