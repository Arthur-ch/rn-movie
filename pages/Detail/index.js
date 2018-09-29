import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import styles from './style';
export default class Detail extends Component {
  state = {
    id: '',
    item: {}
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ id: params.id });
  }
  render() {
    const { navigation } = this.props;
    const { id } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>
          Detail:
          id {id}
        </Text>
        <Button
          title="Go Back"
          onPress={() =>
            navigation.goBack()
          }
        />
      </View>
    );
  }
}