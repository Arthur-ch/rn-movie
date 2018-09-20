import React, { Component } from 'react';
import {
  Button
} from 'react-native';

export default class Profile extends Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go Back"
        onPress={() =>
          navigate('List')
        }
      />
    );
  }
}