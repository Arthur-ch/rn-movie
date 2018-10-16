import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Animated
} from 'react-native';
import { WeatherBase } from '../../components';
import url from '../../config/url';
import styles from './style';

const { WEATHERURL } = url; 
export default class Weather extends Component {
  state = {
    weatherData: {},
    fadeAnim: new Animated.Value(0),
  }
  componentDidMount() {
    this.loopGetWeather();
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  loopGetWeather() {
    this.fetchWeather();
    this.timer = setInterval(() => {
      console.log('1234')
      this.fetchWeather();
    }, 3000)
  }
  fetchWeather() {
    fetch(WEATHERURL)
      .then(res => res.json())
      .then(res => {
        if (res.code === 0) {
          this.setState({ weatherData: res.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { weatherData } = this.state;
    return (
      <View style={styles.container}>
        <WeatherBase data={weatherData} />
        <Button
          title="Go Back"
          onPress={() =>
            navigate('index')
          }
        />
      </View>
    );
  }
}