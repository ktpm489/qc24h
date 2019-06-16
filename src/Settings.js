import React, { Component } from 'react'
import demo from '../listen.json'
import Modal from 'react-native-modal';
import { withNavigationFocus } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Share,
  Platform
} from 'react-native'

import {
  storeData, getData
} from './utils/storage'

import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

// https://reactnavigation.org/docs/en/header-buttons.html
class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleModalId: null,
      arrLink: [],
      currentSelect : ''
    }
    this.menuRef = null;
    this.webview = null;
    this.textRef = React.createRef();
  }
  async componentDidMount() {
    this.props.navigation.setParams({ pressMenu : this.onPress });
    this._subscribe = this.props.navigation.addListener('didFocus', async () => {
       console.log('FOCUS HERE')
       await this.getData()
     });
       await this.getData()
    
  }

  async getData () {
    try {
      console.log('Call HERE')
      let currentData = await getData()
      console.log('CurrentData', currentData)
      this.setState({ arrLink: currentData })
    } catch (e) {
      console.log('Error', e)
    }
  }

  setMenuRef = ref => this.menuRef = ref;
  showMenu = () => this.menuRef.show( this.textRef.current, stickTo = Position.TOP_RIGHT);

   hideMenu = () => this.menuRef.hide();
 

  dataUpdate =  async ()  => {
    try {
      let currentData = await getData()
      return currentData
    } catch (e) {
      console.log(e.message);
      return []
    }
  }

  onPress = () => {
    this.showMenu();

  } 
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Thiết lập',
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center', flex: 1 },
      headerLeft: (
        <Button
          onPress={() => navigation.openDrawer()}
          title="Danh sách"
          color="#ff0000"
        />
      ),
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
  }

  componentWillUnmount() {
    this.setState({ visibleModal: null })
  }
  _keyExtractor = (item, index) => item;
  renderItem = ({ item, i }) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.item}
        onLongPress={() => this.setState({ visibleModal: 'slow' , currentSelect : item })}
        onPress={() => this.props.navigation.navigate('WebViewHistory', { title: 'Yêu thích', link: item })}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>)
  }

  renderModalContent = () => (
    <View style={styles.content}>
      <TouchableOpacity
        onPress={this.handleShare}
        style={{ marginBottom: 12 }}
      >
        <Text style={styles.contentTitle}>Chia sẻ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={this.handleDelete}
        style={{ marginBottom: 12 }}
      >
        <Text style={styles.contentTitle}>Xóa</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => this.setState({ visibleModal: null })}
      style={{ marginBottom: 12 }}
    >
      <Text style={styles.contentTitle}>Đóng</Text>
    </TouchableOpacity>

    </View>
  );

  handleShare = async () => {
    console.log(this.state.currentSelect)
    // this.setState({ visibleModal: null })
    try {
      const result = await Share.share({
        message:
          this.state.currentSelect,
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
      this.setState({ visibleModal: null })
    }
  }

  handleDelete = async () => {
    try {
        let { currentSelect, arrLink } = this.state
      if (currentSelect) {
       let index  =  arrLink.findIndex(item => item === currentSelect)
         arrLink.splice(index, 1);
         this.setState({ arrLink }) 
         await storeData(arrLink)
      }

    } catch(e) {
      console.log('Error when delete item', e)
    } finally {
      this.setState({ visibleModal: null })
    }
  }

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  render() {
    console.log('Call render History')
    return (
      <View style={styles.container}>
      <Menu
            ref={this.setMenuRef}
             >
            <MenuItem onPress={this.onPressSave}>Thêm</MenuItem>
            <MenuItem onPress={this.onPressShare}>Xóa</MenuItem>
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
        <FlatList
          style={styles.flastListStyle}
          data={this.state.arrLink}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
        />
        <Modal
          isVisible={this.state.visibleModal === 'slow'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    )
  }
}

export default withNavigationFocus(ItemList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    // padding: 20,
  },
   flastListStyle : {
    padding: 20,
    width: '100%'
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
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  }
})
