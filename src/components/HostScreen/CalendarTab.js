
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigate } from '../../actions/nav';
import { getRooms } from '../../actions/room';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    padding: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').width * 4/7,
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
});

class CalendarTab extends Component {

  componentWillMount() {
    this.props.getRooms();
  }

  onPress(item) {
    this.props.navigate({ routeName: "Room", params: { item: item } });
  }

  render() {
    const { rooms } = this.props;
    return (

      <View style = { styles.container }>
        <Text style = {styles.heading}>Your Listings</Text>
        <FlatList
          style={styles.list}
          data = { rooms }
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => this.onPress(item)} style={styles.item}>
              {/* Check This  */}
              <Image style = {styles.image} source = {{uri: item.image}} />
              <Text style = {styles.title}>{`$${item.price} ${item.instant ? '😜 ' : ''}${item.title}`}</Text>
              <Text>{`${item.homeType} - ${item.bedRoom} bedroom(s)`}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => item.id}
        />
      </View>

     
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.room.rooms,
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  getRooms: () => dispatch(getRooms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTab);
