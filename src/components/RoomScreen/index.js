
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

import { getRoom } from '../../actions/room';
import room from '../../reducers/room';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
});

class RoomScreen extends Component {

  componentWillMount(){
    const selectedRoomId = this.props.navigation.state.params.item.id;
    this.props.getRoom(selectedRoomId);
  }

  render() {

    const room = this.props.room;

    if (!room) return null; // return null if the room doesn't exists

    const { image, host } = room;
    // image = room.image
    // host = room.host

    const item = this.props.navigation.state.params.item;
    return (
      <ScrollView style = {styles.container}>
        <Image source = {{uri: image}} style = {styles.image}></Image>
        <View style = {{padding: 30}}>
          <View style = {styles.row}>
            <Text style = {{flex: 1}}>{`Hosted by ${host.fullname}`}</Text>
            {/* Check this */}
            <Image source={{uri: host.avatar}} style = {styles.avatar}/> 
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room.room,
});

const mapDispatchToProps = dispatch => ({
  getRoom: (roomId) => dispatch(getRoom(roomId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);
