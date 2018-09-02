import React from 'react';
import PropTypes from 'prop-types';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
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
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { Sentry, SentrySeverity } from 'react-native-sentry';
import styles from './Drawer.styles';

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

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class DrawerScreen extends React.Component {
    state = {
      issue: '',
      desc: '',
      invalidForm: false,
    }
    _sendBugReport() {
      const { user } = this.props.screenProps.user;
      const name = !user.displayName ? 'Anonymous' : user.displayName;
      if(this.state.issue === '' || this.state.desc === '') {
        this.setState({ invalidForm: true });
      } else {
        Sentry.setUserContext({
          email: user.email,
          userID: user.uid,
          username: name,
        });
        Sentry.setExtraContext({
          "issue": this.state.issue,
          "details": this.state.desc,
        });
        Sentry.captureMessage(new Error(`${name} submitted a bug!`), {
          level: SentrySeverity.Warning
        });
        this.popupDialog.dismiss(() => {
          this.setState({ issue: '', desc: '', invalidForm: false });
        });
      }
    }
    render() {
      const { screenProps } = this.props;
      return (
        <ScrollView>
          <View style={{ height: Dimensions.get('window').height }}>
            <Image
              style={styles.drawerImage}
              opacity={0.25}
              source={require('../../assets/img/drawer.jpeg')}
              resizeMode='cover'
            />
            <SafeAreaView
              style={{ flex: 1, backgroundColor: 'transparent' }}
              forceInset={{ top: 'always', horizontal: 'never' }}>
              <PopupDialog
                width={0.65}
                height={0.50}
                dialogStyle={{ elevation: 6 }}
                dialogTitle={<DialogTitle
                  title="Report a bug"
                  titleTextStyle={styles.text}
                  titleStyle={{ backgroundColor: '#1f222e' }}
                />}
                containerStyle={{ zIndex: 10, elevation: 10, width: '100%' }}
                ref={popupDialog => { this.popupDialog = popupDialog; }}
                dialogAnimation={slideAnimation}>
                <View>
                  <FormLabel>Issue</FormLabel>
                  <FormInput value={this.state.issue} onChangeText={issue => this.setState({ issue })} />
                  <FormValidationMessage>
                    {
                      this.state.invalidForm
                        ? 'This field is required'
                        : null
                    }
                  </FormValidationMessage>
                  <FormLabel>What happened?</FormLabel>
                  <FormInput
                    value={this.state.desc}
                    onChangeText={desc => this.setState({ desc })}
                    inputStyle={{ width: 'auto' }}
                    textBreakStrategy='balanced'
                    multiline={true}
                    numberOfLines={2} />
                  <FormValidationMessage>
                    {
                      this.state.invalidForm
                        ? 'This field is required'
                        : null
                    }
                  </FormValidationMessage>
                  <Button
                    onPress={() => this._sendBugReport()}
                    raised
                    backgroundColor='#1f222e'
                    textStyle={styles.text}
                    containerViewStyle={{ margin: 10 }}
                    title='SUBMIT'/>
                </View>
              </PopupDialog>
              <Image
                style={{ width: 275, height: 175, margin: 10 }}
                source={require('../../assets/img/Artboard.png')}
                resizeMode='contain'
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.closeDrawer()}
                style={styles.cancel}>
                <Icon
                  type="font-awesome"
                  name="times-circle"
                  color="#1f222e"
                  size={36}
                />
              </TouchableOpacity>
              <DrawerItems {...this.props} activeTintColor={this.props.activeTintColor}
                onItemPress={routeOptions => {
                  this.props.navigation.navigate(routeOptions.route.routes[routeOptions.route.index].routeName, {});
                }}/>
              <List containerStyle={styles.list}>
                {
                  list.map(item => (
                    <ListItem
                      containerStyle={styles.listitem}
                      key={item.title}
                      title={item.title}
                      onPress={item.icon === 'bug' ? () => this.popupDialog.show() : null}
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
                {screenProps.user.user.authenticated
                  ? <Button
                      onPress={() => screenProps.onfbLogout()}
                      loading={screenProps.user.fetching}
                      backgroundColor='#1f222e'
                      medium
                      raised
                      containerViewStyle={{ marginBottom: 15 }}
                      textStyle={styles.text}
                      icon={{ name: 'logout', type: 'simple-line-icon' }}
                      title='LOGOUT' />
                  : <Button
                      onPress={() => screenProps.onfbLogin()}
                      loading={screenProps.user.fetching}
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
    }
}

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
