'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ListView,
  TouchableHighlight
} = React;

class Search extends Component{
  constructor(props){
    super(props);

    this.state = {

    }
  }

  onSearchPressed(){
    var SearchResults = require('./SearchResults.js');
    this.props.navigator.push({
      title: 'Search Results',
      component: SearchResults,
      passProps: {
        searchEvent: this.state.searchQuery
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(text)=> this.setState({searchQuery: text})}
          style={styles.input}
          placeholder='Enter search term'
        />
        <TouchableHighlight
          onPress={this.onSearchPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 10,
    alignItems: 'center'
  },
  textArea: {
    paddingLeft: 20
  },
  rowText: {
    backgroundColor: '#fff'
  },
  bold: {
    fontWeight: '600'
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  logo: {
    width: 66,
    height: 55,
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 30,
    width: 200,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
});

module.exports = Search;
