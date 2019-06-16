import AsyncStorage from '@react-native-community/async-storage';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native'
export const storeData = async (data = []) => {
    try {
        await AsyncStorage.setItem('@storage_Key', JSON.stringify(data))
    } catch (e) {
      // saving error
      console.log('Saving error', e)
    }
  }

 export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
        return JSON.parse(value)
      }
      return []
    } catch(e) {
      // error reading value
      console.log('Reading Error', e)
      return []
    }
  }