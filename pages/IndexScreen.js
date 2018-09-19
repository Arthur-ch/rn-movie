import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

class IndexScreen extends Component {
  static navigationOptions = {
    title: 'Movies Recommand',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>
          Welcom To Movies Recommand
        </Text>
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