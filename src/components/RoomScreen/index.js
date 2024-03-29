// All this code is for when you clicked at one room 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GodzillaButton from '../shared/GodzillaButton';

import { getRoom } from '../../actions/room';
import { navigate } from '../../actions/nav';
import room from '../../reducers/room';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 40,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width*4/7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  about: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  aboutText: {
    fontWeight: 'bold',
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

class RoomScreen extends Component {

  componentWillMount(){
    const selectedRoomId = this.props.navigation.state.params.item.id;
    this.props.getRoom(selectedRoomId);
  }

  onCheckAvailability(){
    this.props.navigate({ routeName: 'Booking'});
  }

  render() {

    const room = this.props.room;

    if (!room) return null; // return null if the room doesn't exists

    const { image, host, bedRoom, bathRoom, accomodate, summary, price } = room;
    // image = room.image
    // host = room.host

    const item = this.props.navigation.state.params.item;
    return (

      <View style={{flex: 1}}>
        <ScrollView style = {styles.container}>
          <Image source = {{uri: 'https://1-aegir0-camdenliving-com45.s3.amazonaws.com/community/camden-crown-valley/headers/camden-crown-valley-apartments-mission-viejo-ca-kitchen-and-living-room.jpg'}} style = {styles.image}></Image>
          <View style = {{padding: 30}}>

            <View style = {styles.row}>
              <Text style = {{flex: 1}}>{`Hosted by ${host.fullname}`}</Text>
              {/* Check this */}
              <Image source={{uri: host.avatar || 'http://gravatar.com/avatar/leo@code4startup.com'}} style = {styles.avatar}/> 
            </View>

            <View style = {styles.row}>
              <View style = {styles.info}>
                <Icon name='ios-people-outline' size={40}/>
                <Text>{accomodate} guest(s)</Text>
              </View>
              <View style = {styles.info}>
                <Icon name='ios-alarm-outline' size={40}/>
                <Text>{bedRoom} bedroom(s)</Text>
              </View>         
              <View style = {styles.info}>
                <Icon name='ios-home-outline' size={40}/>
                <Text>{bathRoom} bathroom(s)</Text>
              </View>
            </View>

            <View style = {styles.about}>
              <Text style= {styles.aboutText}>About This Home</Text>
              <Text>{summary}</Text>
            </View>

          </View>
        </ScrollView>

        <View style={styles.bookingBar}>
          <Text style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{`${price}`}</Text> per night
          </Text>
          <GodzillaButton
            onPress = { () => { this.onCheckAvailability()} }
            backgroundColor = '#FF5A60'
            textColor = 'white'
            label = 'Check Availability'
          />
        </View>
      </View> 
    );
  }
}

const mapStateToProps = state => ({
  room: state.room.room,
});

const mapDispatchToProps = dispatch => ({
  getRoom: (roomId) => dispatch(getRoom(roomId)),
  navigate: (route) => dispatch(navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);
