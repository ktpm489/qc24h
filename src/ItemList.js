import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native'


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
        title: 'Stack',
        headerRight: (
          <Button
            // onPress={() => alert('This is a button!')}
            onPress={() => navigation.openDrawer()}
            title="Info"
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
        <Text style={styles.text}>I'm a StackNavigator!</Text>
        {items.map(this.renderItem)}
      </View>
      )
  }
}

export default ItemList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
})
