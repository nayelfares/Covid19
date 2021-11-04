import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import useStore from '../hooks/useStore';
import Screen from '../Screen';
import {filterList, sortByKey} from '../utils/utils';

const CountriesListScreen = (): JSX.Element => {
  const countriesState = useStore(state => state.countries);
  const [sortedList, setSortedList] = useState(countriesState);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortKey, setSortKey] = useState('TotalConfirmed');
  useEffect(() => {
    setSortedList(sortByKey(countriesState, sortKey));
    setSearchText('');
    setFilteredList(filterList(sortedList, ''));
  }, [sortKey]);
  useEffect(() => {
    setFilteredList(filterList(sortedList, searchText));
  }, [searchText]);
  return (
    <Screen style={styles.screen}>
      <Picker
        selectedValue={sortKey}
        onValueChange={(value, index) => setSortKey(value)}
        mode="dropdown"
        style={styles.picker}>
        <Picker.Item label="Total Confirmed" value="TotalConfirmed" />
        <Picker.Item label="Total Deaths" value="TotalDeaths" />
        <Picker.Item label="Total Recovered" value="TotalRecovered" />
        <Picker.Item label="New Confirmed" value="NewConfirmed" />
        <Picker.Item label="New Deaths" value="NewDeaths" />
        <Picker.Item label="New Recovered" value="NewRecovered" />
      </Picker>
      <TextInput
        style={styles.passwordStyle}
        placeholder={'search'}
        onChangeText={(text: string) => {
          setSearchText(text);
        }}
        value={searchText}
      />
      <FlatList
        data={filteredList}
        style={{marginTop: 16}}
        keyExtractor={(item: any) => item.ID}
        numColumns={1}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.Country}
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                Total Confirmed : {item.TotalConfirmed}
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                Total Deaths : {item.TotalDeaths}
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                Total Recovered : {item.TotalRecovered}
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                New Confirmed : {item.NewConfirmed}
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                New Deaths : {item.NewDeaths}
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                New Recovered : {item.NewRecovered}
              </Text>
            </View>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  passwordStyle: {
    width: '90%',
    height: 40,
    alignContent: 'flex-start',
    justifyContent: 'center',
    marginLeft: '5%',
    marginTop: '3%',
    marginRight: '5%',
    color: '#444444',
    borderRadius: 12,
    fontSize: 16,
    paddingLeft: 24,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  picker: {
    marginVertical: 30,
    dropDownMaxHeight: 30,
    margin: 0,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    marginBottom: 5,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 20,
  },
  subTitle: {
    color: '#4ecdc4',
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 7,
    fontWeight: 'bold',
  },
});

export default CountriesListScreen;
