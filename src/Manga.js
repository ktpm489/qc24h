import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList
} from 'react-native'
import demo from '../readmanga.json'



// https://reactnavigation.org/docs/en/header-buttons.html
class ItemList extends Component {

    static navigationOptions = ({ navigation}) => {
      return {
        headerTitle: 'Đọc truyện',
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

  _keyExtractor = (item, index) => item.name;
  renderItem = ({item, i}) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.item}
        onPress={() => this.props.navigation.navigate('WebViewManga', { link: item.link , title : item.name })}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>)
  }

  render () {
    return (
      <View style={styles.container}>
      <FlatList
      style={{ width: '100%' }}
      data={demo}
      keyExtractor={this._keyExtractor}
      renderItem={this.renderItem}
    />
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
