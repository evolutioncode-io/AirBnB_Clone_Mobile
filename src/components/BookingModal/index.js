
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet,
  View,
  ScrollView,
  Text,
  
} from 'react-native';
import Dates from 'react-native-dates';
import moment from 'moment';

import GodzillaButton from '../shared/GodzillaButton';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007b7F',
  },
  calendar: {
    marginBottom: 30,
  },
});

class BookingModal extends Component {

    constructor(props){
        super(props);
        this.state = {
          focus: 'startDate',
          startDate: null,
          endDate: null
        }
    }

    onBooking(){
      
    }

  render() {
    
    const isDateBlocked = (date) =>
      date.isBefore(moment(), 'day') || this.props.room.unavailableDates.indexOf(date.format('YYYY-MM-DD')) !== -1; // dont show unavailable dates

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );
     
    return (
      <ScrollView style={styles.container} contentContainerStyle = {{ padding: 20 }}>
        <View style = {styles.calendar}>
          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            focusedMonth={ moment('05/09/2030','DD/MM/YYYY')}
            range
          />
        </View>
        <GodzillaButton 
            onPress = { () => this.onSearch()}
            backgroundColor = {!this.state.startDate ? 'rgba(47, 134, 142, 0.2)' : '#2F868E' } 
            textColor = {!this.state.startDate ? 'rgba(226, 226, 226, 0.2)' : '#E2E2E2' }
            label = 'Book'
            disabled = {!this.state.startDate}
        ></GodzillaButton>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  room: state.room.room,
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
