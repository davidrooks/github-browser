'use strict';

var React = require('react-native');
var Feed = require('./Feed.js');
var Search = require('./Search.js');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  NavigatorIOS
} = React;

class AppContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'feed'
    }
  }

  render() {
    return(
      <TabBarIOS style={styles.container}>
      <TabBarIOS.Item
        title="Feed"
        selected={this.state.selectedTab == 'feed'}
        systemIcon='downloads'
        onPress={()=> this.setState({selectedTab: 'feed'})}
        >
          <NavigatorIOS
            style={styles.navigation}
            initialRoute={{
              component: Feed,
              title: 'Feed'
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          systemIcon='search'
          onPress={()=> this.setState({selectedTab: 'search'})}
          >
          <NavigatorIOS
            style={styles.navigation}
            initialRoute={{
              component: Search,
              title: 'Search'
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  navigation: {
    flex: 1
  }
});

module.exports = AppContainer;
