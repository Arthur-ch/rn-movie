import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Animated
} from 'react-native';
import styles from './style';
export default class Index extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }
  // static navigationOptions = {
  //   title: 'Movies Recommand',
  // }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        // useNativeDriver: true
      }
    ).start();
  }
  render() {
    const { navigate } = this.props.navigation;
    const { fadeAnim } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [150, 0],
                perspective: 1000
              }),
            }],
          }}>
          <Text style={{ fontSize: 20 }}>
            Welcom To Movies Recommand
          </Text>
        </Animated.View>
        <Button
          title="View List"
          onPress={() =>
            navigate('list')
          }
        />
        <Button
          title="View Weather"
          onPress={() =>
            navigate('weather')
          }
        />
      </View>
    );
  }
}