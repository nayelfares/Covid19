import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, StyleSheet, Text} from 'react-native';
import appApi from '../api/appApi';
import useApi from '../hooks/useApi';
import useStore from '../hooks/useStore';
import Screen from '../Screen';
import {top5Countries} from '../utils/utils';

const MainScreen = (): JSX.Element => {
  const countriesState = useStore(state => state.countries);
  const setCountriesState = useStore(state => state.setCountries);
  const [top5, setTop5] = useState([]);
  const getCountriesList: any = useApi(appApi.getAllCountries);
  const getList = async () => {
    await getCountriesList.request();
    if (getCountriesList?.console.error) {
      Alert.alert(getCountriesList.errorMessage);
    } else {
      setTop5(top5Countries(getCountriesList?.data.Countries));
      console.log(top5);
    }

    setCountriesState(getCountriesList?.data.Countries);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={top5}
        keyExtractor={(item: any) => item.ID}
        numColumns={1}
        renderItem={({item}) => <Text>{item.Country}</Text>}
      />
      <Button
        onPress={() => {
          setTop5(countriesState);
        }}
        title="See more"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MainScreen;
