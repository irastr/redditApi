/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
        .then(response => {
          if (response.status < 400) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(response => {
          response.json().then(error => {
            reject(error);
          });
        });
  });
};

class HomeScreen extends React.Component {
  constructor(props: Props) {
    super(props);
    this.counter = {};
    this.timers = {};
    this.state = {
      data: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, () => {
      fetchData('https://hacker-news.firebaseio.com/v0/topstories.json')
          .then(data => {
            this.setState({
              data,
              isLoading: false,
            });
          })
          .catch(error =>
              this.setState({
                isLoading: false,
                error
              }),
          );
    });
  }

  renderList = () => {
    return (
        <FlatList
            data={this.state.data}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={(item, index) => String(index)}
        />
    );
  };

  renderItem = (item, index) => {
    return (
        <TouchableOpacity
            style={styles.itemWrap}
            onPress={() => this.props.navigation.navigate('Details', {item})}>
            <Text style={styles.title}>
              {item}
            </Text>
        </TouchableOpacity>
    );
  };

  render() {
    return (
        this.state.isLoading ? <ActivityIndicator size="large" color='#ed8240' />: this.renderList()
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props: Props) {
    super(props);
    this.counter = {};
    this.timers = {};
    this.state = {
      story: {},
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, () => {
      fetchData(`https://hacker-news.firebaseio.com/v0/item/${this.props.navigation.getParam('item')}.json`)
          .then(story => {
            this.setState({
              story,
              isLoading: false,
            });
          })
          .catch(error =>
              this.setState({
                isLoading: false,
                error
              }),
          );
    });
  }

  renderBody = () => {
    const {story} = this.state;
    return (
        <>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.subtext}>{story.title}</Text>
          </View>
          <WebView source={{uri: story.url}}/>
        </>
    );
  };

  render() {
    return (
        this.state.isLoading ?
            <ActivityIndicator size="large" color='#ed8240'/> : this.renderBody()
    );
  }
}

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
    }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemWrap: {
    borderColor: 'transparent',
    borderWidth: 2,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  subtext: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    padding: 10
  }
});

export default createAppContainer(AppNavigator);
