
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
import Info from './Info'
import Settings from './Settings'

// export const Stack = createStackNavigator({
//   ItemList: { screen: ItemList },
//   Item: { screen: Item },
// }, {
//   initialRouteName: 'ItemList'
// })
export const Stack1 = createStackNavigator({
  Info: { screen: Info },
  WebViewListen: { screen: WebView,
    defaultNavigationOptions: {
      headerBackTitle: null,
    } },
}, {
  initialRouteName: 'Info',
  backTitle : null
}) 


export const Stack2 = createStackNavigator({
  Settings: { screen: Settings },
  WebViewHistory: { screen: WebView },
}, {
  initialRouteName: 'Settings'
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


// export const Tabs = createBottomTabNavigator({
//   TabA: { screen: TabA },
//   TabB: { screen: TabB },
//   TabC: { screen: Stack },
// })

export const Drawer = createDrawerNavigator({
  Thôngtin: { screen: Stack1 },
  // Truyện: { screen: Stack3 },
  ThiếtLập : {screen: Stack2},
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
});

export default createAppContainer(AppNavigator);