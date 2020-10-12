
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { logout, addPayment } from '../../actions/user';
import { resetRoute } from '../../actions/nav';
import stripe from 'tipsi-stripe';

stripe.init({
  publishableKey: 'pk_test_51HTYAWBg8mCs9xMbq8aUaH7ejcNt1OIunRiGFoOBLWXFR1PhTLXiAmSw9kUfWu9SAmEx1z5wGN6XwNDZ49UAHMXC00ORVSBwBh',
});

const options = {
  smsAutofillDisabled: true,
  requiredBillingAddressFields: 'full',
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  menuButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 20,
  },
  menuButtonText: {
    fontSize: 20,
  },
});

class ProfileTab extends Component {

  addPayment = async() => {
    const token = await stripe.paymentRequestWithCardForm(options);
    //console.log(token);
    this.props.addPayment(token.tokenId);
  }

  switchType(){
    const { resetRoute, firstRouteName } = this.props;

    if (firstRouteName === 'Main') {
      resetRoute({ routeName: 'Host'});
    } else {
      resetRoute({ routeName: 'Main' });
    }
  }

  render() {
    const profile = this.props.profile || {}
    //const { payment, firstRouteName }  = this.props.payment;
    const firstRouteName = this.props.firstRouteName;
    const payment = this.props.payment;
    
    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.profile}>
          <Text style = {styles.name}>{profile.fullname}</Text>
          <Image style = {styles.avatar} source = {{ uri: profile.avatar }}></Image>
        </View>

        <TouchableOpacity 
         onPress = {() => this.addPayment().catch(e => console.log(e))}
         style = {styles.menuButton} >
          <Text>{`${payment ? 'Update' : 'Add'}`} Your Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.switchType()} style = {styles.menuButton}>
          <Text>Switch to {`${firstRouteName === 'Main' ? 'Host' : 'Guest'}`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.props.logout()} style = {styles.menuButton}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
         
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  payment: state.user.payment,
  firstRouteName: state.nav.routes[0].routeName,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  addPayment: (stripeToken) => dispatch(addPayment(stripeToken)),
  resetRoute: (route) => dispatch(resetRoute(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
