import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import moment from 'moment';

const CountryList = ({ navigation, route }) => {
  const [countryList, setCountryList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const getCountryList = async () => {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');
    let sortData = data?.sort((a, b) => {
      if (a?.name?.common < b?.name?.common) {
        return -1;
      }
      if (a?.name?.common > b?.name?.common) {
        return 1;
      }
      return 0;
    });
    setCountryList(sortData);
  };

  useEffect(() => {
    getCountryList();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.innerPadding}>
        <Text style={styles.selectCountryText}>Select Country</Text>
        <TextInput value={searchText} onChangeText={(text) => setSearchText(text)} style={styles.textInputContainer} placeholder='Search Country' placeholderTextColor={'black'} />
      </View>
      <View style={styles.horizontalBorder} />
      <View>
        <FlatList ListEmptyComponent={() => <Text style={{ fontSize: 22, marginTop: 50, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>No Record Found</Text>} contentContainerStyle={{ paddingTop: 20, paddingBottom: 100, paddingLeft: 16 }} data={countryList?.filter((item) => item?.name?.common?.toString().toLowerCase().includes(searchText?.toString().toLowerCase()))} renderItem={({ item }) => {
          return (
            <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }} onPress={() => navigation.navigate('Dashboard', { image: item?.flags?.png, timeZone: moment().utcOffset(item?.timezones[0]?.replace('UTC', '')).format(), countryName: item?.name?.common })} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Image style={styles.countryImage} source={{ uri: item?.flags?.png }} />
              <Text style={styles.countryName}>{item?.name?.common}</Text>
            </TouchableOpacity>
          );
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  innerPadding: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  selectCountryText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingLeft: 16,
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: 'black',
  },
  horizontalBorder: {
    height: 1,
    backgroundColor: 'black',
    paddingHorizontal: 0,
    marginTop: 10,
  },
  countryImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  countryName: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
    letterSpacing: 0.3,
    paddingLeft: 16,
  },
});

export default CountryList;
