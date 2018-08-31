import React from 'react';
import PropTypes from 'prop-types';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
  SocialIcon,
  Icon,
  Button,
  List,
  ListItem,
} from 'react-native-elements';

const list = [
  {
    title: 'Found a bug? Report it.',
    icon: 'bug',
    onPress: 'pressed bug',
  },
  {
    title: 'Buy me a coffee.',
    icon: 'coffee',
    onPress: 'pressed buy coffee',
  },
];

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin',
    fontSize: 36,
    fontWeight: '200',
    textAlign: 'center',
    color: '#1f222e',
    margin: 5,
    padding: 5,
    height: 100,
  },
  drawerImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#1f222e',
  },
  social: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancel: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    margin: 12,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  copyright: {
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'HelveticaNeue',
    alignSelf: 'flex-end',
    margin: 10,
  },
  list: {
    backgroundColor: 'transparent',
  },
  listitem: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

const DrawerScreen = props => (
   <ScrollView>
     <View style={{ height: Dimensions.get('window').height }}>
       <Image
         style={styles.drawerImage}
         opacity={0.25}
         source={require('../../assets/img/drawer.jpeg')}
         resizeMode='cover'
       />
       <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} forceInset={{ top: 'always', horizontal: 'never' }}>
         <Text style={styles.header}>darknet.fm</Text>
         <TouchableOpacity
           onPress={() => props.navigation.closeDrawer()}
           style={styles.cancel}>
           <Icon
             type="font-awesome"
             name="times-circle"
             color="#1f222e"
             size={36}
           />
         </TouchableOpacity>
         <Divider style={styles.divider} />
         <DrawerItems {...props} activeTintColor={props.activeTintColor}
           onItemPress={routeOptions => {
             props.navigation.navigate(routeOptions.route.routes[routeOptions.route.index].routeName, {});
           }}/>
         <List containerStyle={styles.list}>
           {
             list.map(item => (
               <ListItem
                 containerStyle={styles.listitem}
                 key={item.title}
                 title={item.title}
                 onPress={() => alert(item.onPress)}
                 hideChevron
                 titleStyle={[styles.text, { color: '#1f222e' }]}
                 leftIcon={{ name: item.icon, type: 'font-awesome', color: '#1f222e' }}
               />
             ))
           }
         </List>
         <Divider style={styles.divider} />
          <View style={styles.social}>
            <SocialIcon type='github-alt'/>
            <Icon
              type='material-community'
              name='web'
              reverse
              raised />
            <Text style={styles.copyright}>©2018 darknet.fm</Text>
          </View>
           {props.screenProps.user.user.authenticated
             ? <Button
                 onPress={() => props.screenProps.onfbLogout()}
                 loading={props.screenProps.user.fetching}
                 backgroundColor='#1f222e'
                 medium
                 raised
                 containerViewStyle={{ marginBottom: 15 }}
                 textStyle={styles.text}
                 icon={{ name: 'logout', type: 'simple-line-icon' }}
                 title='LOGOUT' />
             : <Button
                 onPress={() => props.screenProps.onfbLogin()}
                 loading={props.screenProps.user.fetching}
                 backgroundColor='#3b5998'
                 raised
                 medium
                 containerViewStyle={{ marginBottom: 15 }}
                 textStyle={styles.text}
                 icon={{ name: 'social-facebook', type: 'simple-line-icon' }}
                 title="LOGIN WITH FACEBOOK" />}
       </SafeAreaView>
     </View>
   </ScrollView>
);

DrawerScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    closeDrawer: PropTypes.func,
  }),
  screenProps: PropTypes.object,
  onfbLogout: PropTypes.func,
  onfbLogin: PropTypes.func,
};

export default DrawerScreen;
