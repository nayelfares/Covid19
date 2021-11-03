import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import appApi from '../api/appApi';
import useApi from '../hooks/useApi';
import useStore from '../hooks/useStore';
import Screen from '../Screen';
import {topCountries} from '../utils/utils';

const MainScreen = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [global, setGlobal] = useState({
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
  });

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
      setTop5(topCountries(data?.Countries, page));

      setGlobal(data.Global);
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
      <ScrollView>
        <View>
          <Text>Covid19 Global States Chart</Text>
          <LineChart
            data={{
              labels: [
                'NewConfirmed',
                'TotalConfirmed',
                'NewDeaths',
                'TotalDeaths',
                'NewRecovered',
                'TotalRecovered',
              ],
              datasets: [
                {
                  data: [
                    global.NewConfirmed,
                    global.TotalConfirmed,
                    global.NewDeaths,
                    global.TotalDeaths,
                    global.NewRecovered,
                    global.TotalRecovered,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={500}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            verticalLabelRotation={45}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                paddingStart: 33,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <FlatList
          data={top5}
          keyExtractor={(item: any) => item.ID}
          numColumns={1}
          renderItem={({item}) => <Text>{item.Country}</Text>}
        />
        <Button
          onPress={() => {
            setTop5(topCountries(data?.Countries, page + 1));
            setPage(page + 1);
          }}
          title="See more"
        />
        {error && <Text>{errorMessage}</Text>}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MainScreen;
