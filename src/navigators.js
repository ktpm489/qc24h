
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// Navigators
import { createStackNavigator , createDrawerNavigator , createBottomTabNavigator ,createAppContainer  } from 'react-navigation'

// StackNavigator screens
import ItemList from './ItemList'
import Item from './Item'

// TabNavigator screens
import TabA from './TabA'
import TabB from './TabB'
import TabC from './TabC'

// Plain old component
import Plain from './Plain'

import About from './About'
import Manga from './Manga'
import WebView from './webViewComponent'
import Listen from './Listen'
import History from './History'

// export const Stack = createStackNavigator({
//   ItemList: { screen: ItemList },
//   Item: { screen: Item },
// }, {
//   initialRouteName: 'ItemList'
// })
export const Stack1 = createStackNavigator({
  Listen: { screen: Listen },
  WebViewListen: { screen: WebView,
    defaultNavigationOptions: {
      headerBackTitle: null,
    } },
}, {
  initialRouteName: 'Listen',
  backTitle : null
}) 


export const Stack2 = createStackNavigator({
  History: { screen: History },
  WebViewHistory: { screen: WebView },
}, {
  initialRouteName: 'History'
})

export const Stack3 = createStackNavigator({
  Manga: { screen: Manga },
  WebViewManga: { screen: WebView },
}, {
  initialRouteName: 'Manga'
})

export const Stack4 = createStackNavigator({
  Giớithiệu: { screen: About },
}, {
  initialRouteName: 'Giớithiệu'
})


export const Drawer = createDrawerNavigator({
  SáchNói: { screen: Stack1 },
  Truyện: { screen: Stack3 },
  YêuThích : {screen: Stack2},
  GiớiThiệu : {screen : Stack4 }
  // Tabs: { screen: Tabs },
  // Plain: { screen: Plain },

}, {
 
})

const AppNavigator = createStackNavigator({
  Drawer: {
    screen: Drawer
  }
}, {
  headerMode: 'none',
  header: null ,
  animationEnabled: true,
  // navigationOptions: ({navigation}) => ({
  //   headerStyle: {backgroundColor: 'green'},
  //   title: 'Logged In to your app!',
  //   headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  // })
});

export default createAppContainer(AppNavigator);