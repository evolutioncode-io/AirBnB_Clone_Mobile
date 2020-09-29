
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import { navigate } from '../../actions/nav';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white'
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
  }
});

const items = [
  {
    id: 1,
    title: 'New York',
    homeType: 'House',
    image: {uri: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/120445102/original/582239b31d9888936cad4611b98dd470dd50d2e3/build-you-a-nice-house-in-blocksburg.jpeg'},
    bedRoom: 2,
    price: 150,
    instant: true
  },
  {
    id: 2,
    title: 'Coatza',
    homeType: 'House',
    image: {uri: 'https://i.pinimg.com/originals/77/c4/d5/77c4d536db08d773f1aaa3d634425a14.jpg'},
    bedRoom: 2,
    price: 150,
    instant: false
  },
  {
    id: 3,
    title: 'Minatitlan',
    homeType: 'House',
    image: {uri: 'https://odis.homeaway.com/odis/listing/68c67a92-f398-4463-ba1a-5d82fd541193.c10.jpg'},
    bedRoom: 2,
    price: 150,
    instant: true
  },
];

class ExploreTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: items
    };
  }

  onPress(item) {
    this.props.navigate({ routeName: "Detail", params: { item: item } });
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.items}
        renderItem={({item}) => 
          <TouchableOpacity onPress={() => this.onPress(item)} style={styles.item}>
            <Image style = {styles.image} source = {item.image} />
            <Text style = {styles.title}>{`$${item.price} ${item.instant ? '😜 ' : ''}${item.title}`}</Text>
            <Text>{`${item.homeType} - ${item.bedRoom} bedroom(s)`}</Text>
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => item.id}
      />
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTab);
