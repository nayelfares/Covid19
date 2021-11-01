import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import appApi from '../api/appApi';
import useApi from '../api/useApi';
import Screen from '../Screen';

const MainScreen = (): JSX.Element => {
  const [countries, setCountries] = useState([]);
  console.log('countries', countries.length);
  const getCountriesList: any = useApi(appApi.getAllCountries);
  const getList = async () => {
    await getCountriesList.request();
    setCountries(getCountriesList?.data.Countries);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <Screen style={styles.screen}>
      <Text> {countries.length}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MainScreen;
