import React, { Component } from 'react';
import { View ,Text  ,Button, Share , TouchableOpacity ,Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

import {
  storeData, getData
} from '../src/utils/storage'
// https://reactnavigation.org/docs/en/header-buttons.html

export default class WebViewComponent extends Component {

  constructor(props) {
    super(props)
    this.menuRef = null;
    this.webview = null;
    this.textRef = React.createRef();
    this.state = {
      url : ''
    }
  }

 
   setMenuRef = ref => this.menuRef = ref;
   showMenu = () => this.menuRef.show( this.textRef.current, stickTo = Position.TOP_RIGHT);

    hideMenu = () => this.menuRef.hide();
    onPress = () => {
      this.showMenu();

    } 

    onPressShare = async () => {
     
      console.log(this.state.url)
      try {
        const result = await Share.share({
          message:
            this.state.url,
        });
  
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.log('Error', error)
      } finally {
        this.hideMenu()
      }
    }

    onPressSave =  async () => {
        try {
            let currentData =  await getData();
            console.log('CurrentData', currentData)
            currentData.push(this.state.url)
            await storeData(currentData)
            this.setState({ reload : true})
        }catch (e) {
          console.log('Error', e)
        } finally {
          this.hideMenu()
        }
    }

  static navigationOptions = ({navigation}) => {
    return {
      headerBackTitle: null,
      headerTitle: `${navigation.state.params.title}`,
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center', flex: 1 },
      headerRight: (
        Platform.OS === 'ios'
         ? <Button
         onPress={navigation.getParam('pressMenu')}
         title="..."
         color="#ff0000"
       /> :
        <TouchableOpacity
          onPress={navigation.getParam('pressMenu')}
          style={{ padding :20}}
        >
         <Text style={{
         color : "#ff0000" , fontSize :20 }}>...</Text>
        </TouchableOpacity>
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ pressMenu : this.onPress });
  }

  handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState;
    console.log('New URL Change', url)
    this.setState({ url})
  }
    render() { 
        return(
            <View style={{ flex: 1 }}>
            <Menu
            ref={this.setMenuRef}
             >
            <MenuItem onPress={this.onPressSave}>Lưu Link</MenuItem>
            <MenuItem onPress={this.onPressShare}>Chia sẻ</MenuItem>
          {/****
             <MenuItem onPress={this.hideMenu}>Item 3</MenuItem>
             <MenuItem onPress={this.hideMenu}>Item 4</MenuItem>
          */} 
          </Menu>
          <Text
        ref={this.textRef}
        style={{ fontSize: 20, textAlign: "center" , width : '100%' , height : 0 }}
       >
        Text component
       </Text>
            <WebView
            ref={ref => (this.webview = ref)}
              source={{
                uri:
                  this.props.navigation.state.params.link
              }}
              onNavigationStateChange={this.handleWebViewNavigationStateChange}
            />
          </View>

        )

    }


}