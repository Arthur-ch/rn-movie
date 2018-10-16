import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Animated
} from 'react-native';
import _ from 'lodash';
import styles from './style';
import url from '../../config/url';
const DETAILURL = `${url.DETAILURL}/v2/movie/subject`;
export default class Detail extends Component {
  state = {
    summary: '',
    item: {},
    fadeIn: new Animated.Value(0)
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.fetchDetail(params.id);
    this.mount = true;
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 1000,
        // useNativeDriver: true
      }
    ).start();
  }
  fetchDetail = (id) => {
    _.delay(() => {
      fetch(`${DETAILURL}/${id}`,)
        .then(res => res.json())
        .then(data => {
          const item = data;
          item.directors = item.directors.map(list => list.name).join(' / ');
          item.genres = item.genres.join(' / ');
          this.setState({ item });
          if (!this.mount) {
            return new Promise((_, reject) => { reject('component have unmounted!!!') });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }
  render() {
    const { navigation } = this.props;
    const { item, fadeIn } = this.state;
    return (
      <View style={styles.container}>
        {
          Object.keys(item).length > 0 ? (
            <View>
              <View style={styles.themeImage}>
                <Image
                  source={{
                    uri: item.images.large,
                    cache: "reload"
                  }}
                  style={styles.thumbnail}
                />
              </View>
              <ScrollView style={{paddingLeft: 10, paddingRight: 50}}>
                <View style={styles.detailItem}>
                  <View>
                    <Text style={styles.label}>标题:</Text>
                  </View>
                  <View>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.value}>
                      {item.title}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <View>
                    <Text style={styles.label}>导演:</Text>
                  </View>
                  <View>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.value}>
                      {item.directors}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <View>
                    <Text style={styles.label}>类型:</Text>
                  </View>
                  <View>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.value}>
                      {item.genres}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <View>
                    <Text style={styles.label}>简介:</Text>
                  </View>
                  <View>
                    <Text ellipsizeMode="tail" numberOfLines={5} style={styles.value}>
                      {item.summary}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <Animated.View
              style={{
                opacity: fadeIn,
                transform: [{
                  scale: fadeIn.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.5, 1],
                    perspective: 1000
                  })
                }]
              }}
            >
              <Text style={{ fontSize: 40 }}>loading...</Text>
            </Animated.View>
          )
        }
      </View>
    );
  }
}