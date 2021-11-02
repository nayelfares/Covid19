import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import appApi from '../api/appApi';
import useApi from '../hooks/useApi';
import useStore from '../hooks/useStore';
import Screen from '../Screen';
import {top5Countries} from '../utils/utils';

const MainScreen = (): JSX.Element => {
  const countriesState = useStore(state => state.countries);

  const setCountriesState = useStore(state => state.setCountries);

  const [top5, setTop5] = useState([]);

  const {data, error, errorMessage, request, loading}: any = useApi(
    appApi.getAllCountries,
  );

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    setCountriesState(data?.Countries);
    if (data !== undefined && data?.Countries.length !== 0) {
      setTop5(top5Countries(data?.Countries));
    }
  }, [data]);

  return loading ? (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
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
      {error && <Text>{errorMessage}</Text>}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MainScreen;
