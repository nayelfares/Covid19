import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import appApi from '../api/appApi';
import useApi from '../hooks/useApi';
import useStore from '../hooks/useStore';
import Screen from '../Screen';

const MainScreen = (): JSX.Element => {
  const countriesState = useStore(state => state.countries);
  const setCountriesState = useStore(state => state.setCountries);

  const getCountriesList: any = useApi(appApi.getAllCountries);
  const getList = async () => {
    await getCountriesList.request();
    console.log(getCountriesList?.data.Countries);

    setCountriesState(getCountriesList?.data.Countries);
  };
  useEffect(() => {
    getList();
  }, []);
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

export default MainScreen;
