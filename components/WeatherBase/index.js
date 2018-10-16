import React, { Component } from 'react';
import styles from './style';

import {
  View,
  Text,
} from 'react-native';

class WeatherBase extends Component {
  render() {
    const data = this.props.data || {};
    return (
      <View style={styles.container}>
        <Text style={styles.cityName}>{data.city ? data.city.name : ''}</Text>
        <Text style={styles.temp}>{data.condition ? data.condition.Ftemp + '℃' : ''}</Text>
      </View>
    )
  }
}

export default WeatherBase;