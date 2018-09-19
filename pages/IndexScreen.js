import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Animated
} from 'react-native';

class IndexScreen extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }
  static navigationOptions = {
    title: 'Movies Recommand',
  }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }
  render() {
    const { navigate } = this.props.navigation;
    const { fadeAnim } = this.state;
    const that = this;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          <Text>
            Welcom To Movies Recommand
          </Text>
        </Animated.View>
        <Button
          title="Get Started"
          onPress={() =>
            navigate('Home')
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
export default IndexScreen