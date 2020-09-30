
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';

import { login, logout } from '../../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007b7F',
  },
  address: {
      color: '#E2E2E2',
      fontSize: 16,
      fontWeight: 'bold',
  },
  addressInput: {
      color: '#E2E2E2',
  },
});

class FilterModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            address: '',
        }
    }

  render() {
    
    return (
      <ScrollView style={styles.container} contentContainerStyle = {{ padding: 20 }}>
        <Text style = {styles.address}>WHERE TO?</Text>
        <TextInput
            style = {styles.addressInput}
            underlineColorAndroid = '#E2E2E2'
            value = {this.state.address}
            onChangeText = {address => this.setState({address})}
        ></TextInput>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
