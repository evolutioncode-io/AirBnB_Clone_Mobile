
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { getRoom } from '../../actions/room';
import room from '../../reducers/room';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
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

    const item = this.props.navigation.state.params.item;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{room.host.fullname}</Text>
      </View>
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
