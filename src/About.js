import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native'

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height;

// https://reactnavigation.org/docs/en/header-buttons.html
class ItemList extends Component {

    static navigationOptions = ({ navigation}) => {
      return {
        headerTitle: 'Giới Thiệu',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', flex: 1 },
        headerLeft: (
          <Button
            // onPress={() => alert('This is a button!')}
            onPress={() => navigation.openDrawer()}
            title="Danh sách"
            color="#ff0000"
          />
        )
      }
  }
  
  
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Ứng dụng quản lý thông tin QC 24h</Text>
      </View>
      )
  }
}

export default ItemList

const styles = StyleSheet.create({
  currentContainer : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems :'center',
    display : 'flex',
    width: width,
    backgroundColor : 'red'
  },

  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: '#2980b9',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 20,
    width:110,
    textAlign : 'center'
  }
})
