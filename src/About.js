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

const items = [
  { name: 'one'},
  { name: 'two'},
  { name: 'three'},
  { name: 'four'},
]

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
  
  renderItem = (item, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.item}
        onPress={() => this.props.navigation.navigate('Item', { title: item.name })}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>)
  }

  render () {
    return (
      <View style={styles.container}>
      {/***
        <Text style={styles.text}>I'm a StackNavigator!</Text>
      **/}
        <View style={styles.currentContainer}>
        <TouchableOpacity style={{ backgroundColor : 'red', marginLeft : 0}} 
        onPress={() => this.props.navigation.openDrawer()}
        >
           <Text  style={[styles.itemText]}>Danh sách</Text>
          </TouchableOpacity>
          <Text  style={[styles.itemText, { marginLeft: 15 }]}>Giới thiệu</Text>
          <Text style={[styles.itemText, { opacity : 0}]}>Trở lại</Text>
        </View>
        {items.map(this.renderItem)}
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
