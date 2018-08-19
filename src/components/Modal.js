import React from 'react';
import { StyleSheet, View, Modal, Text, Button, Platform } from 'react-native';

class _Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }
  componentDidMount() {
    this.renderModal();
  }
  componentWillUnmount() {
    this.renderModal();
  }
  renderModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          transparent={false}
          animationType='slide'
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.renderModal(!this.state.modalVisible)
          }}>
          <View style={styles.modal}>
            <View style={styles.innerModal}>
              {this.props.children}
            </View>
          </View>
        </Modal>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  modal: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  innerModal: {
    justifyContent: 'center',
     alignItems: 'center',
     backgroundColor : "#00BCD4",
     height: 400 ,
     width: '90%',
     borderRadius:10,
     borderWidth: 1,
     borderColor: '#fff'
  }
})

export default _Modal;
