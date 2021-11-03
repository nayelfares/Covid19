import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput} from 'react-native';
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
        keyExtractor={(item: any) => item.ID}
        numColumns={1}
        renderItem={({item}) => <Text>{item.Country}</Text>}
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
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
  },
});

export default CountriesListScreen;
