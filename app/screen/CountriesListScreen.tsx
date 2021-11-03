import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput} from 'react-native';
import useStore from '../hooks/useStore';
import Screen from '../Screen';
import {filterList} from '../utils/utils';

const CountriesListScreen = (): JSX.Element => {
  const countriesState = useStore(state => state.countries);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFilteredList(filterList(countriesState, searchText));
  }, [searchText]);
  return (
    <Screen style={styles.screen}>
      <TextInput
        style={styles.passwordStyle}
        placeholder={'search'}
        onChangeText={(text: string) => {
          setSearchText(text);
        }}
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
});

export default CountriesListScreen;
