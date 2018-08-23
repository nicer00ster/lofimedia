import React from 'react';
import { StyleSheet, Platform, StatusBar, ScrollView, Image, View, Text, Dimensions } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Divider, SocialIcon, Icon, Button } from 'react-native-elements';

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
         <Icon
           type="font-awesome"
           name="times-circle"
           color="#1f222e"
           containerStyle={styles.cancel}
           size={32}
           onPress={() => props.navigation.closeDrawer()}/>
         <Text style={styles.header}>Lofi Media</Text>
         <Divider style={styles.divider} />
         <DrawerItems {...props} onItemPress={routeOptions => {
                props.navigation.navigate(routeOptions.route.routes[routeOptions.route.index].routeName, {})
            }} />
         <Divider style={styles.divider} />
         <View style={styles.social}>
              <SocialIcon
                type='github'
              />
         </View>
         {props.screenProps.user.user.authenticated
           ? <Button
             onPress={() => props.screenProps.onfbLogout()}
             loading={props.screenProps.user.fetching}
             backgroundColor='#1f222e'
             medium
             raised
             textStyle={styles.text}
             icon={{ name: 'logout', type: 'simple-line-icon' }}
             title='LOGOUT' />
           : <Button
             onPress={() => props.screenProps.onfbLogin()}
             loading={props.screenProps.user.user.fetchingUserData}
             backgroundColor='#3b5998'
             raised
             medium
             textStyle={styles.text}
             icon={{ name: 'social-facebook', type: 'simple-line-icon' }}
             title="LOGIN WITH FACEBOOK"
           />}
       </SafeAreaView>
     </View>
   </ScrollView>
);

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    fontFamily: Platform.OS === "android" ? 'sans-serif-thin' : 'Courier New',
    fontSize: 36,
    fontWeight: '200',
    textAlign: 'center',
    color: "#1f222e",
    margin: 5,
    padding: 5,
    height: 100
  },
  drawerImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#1f222e'
  },
  social: {
    marginTop: 12,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cancel: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default DrawerScreen;
