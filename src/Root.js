import React from 'react';
import { connect } from 'react-redux';

import { fetchMusic, fetchDaily, onfbLogin, onfbLogout, updateUserInfo } from './actions';
import { fetchUser } from './components/auth/index';
import Router from './components/router/Router';

class Root extends React.Component {
 componentDidMount() {
    fetchUser(this.props.updateUserInfo);
    this.props.fetchMusic();
    this.props.fetchDaily();
  };

  render() {
    return (
        <Router {...this.props} screenProps={this.props} />
    );
  }
}

const mapStateToProps = ({ tracks, daily, user }) => ({
  tracks: tracks,
  user: user,
  daily: daily.daily.dailyMessage,
});

const mapDispatchToProps = { fetchMusic, fetchDaily, onfbLogin, onfbLogout, updateUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(Root);
