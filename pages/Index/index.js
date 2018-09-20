import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Animated
} from 'react-native';

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
          <Text>
            Welcom To Movies Recommand
          </Text>
        </Animated.View>
        <Button
          title="Get Started"
          onPress={() =>
            navigate('List')
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})