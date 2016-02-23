'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} = React;

class SearchResults extends Component{
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchEvent
    }
  }

  componentDidMount(){
    this.doSearch();
  }

  doSearch(){
    var url = 'https://api.github.com/search/repositories?q=' +
      encodeURIComponent(this.state.searchQuery);
      fetch(url)
        .then((response)=> response.json())
        .then((responseData)=> {
          this.setState({
            repositories: responseData.repositories,
            dataSource: this.state.dataSource.cloneWithRows(responseData.items)
          });
        })
        .finally(()=> {
          this.setState({
            showProgress: false
          })
        });
  }

  renderRow(rowData){
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{rowData.full_name}</Text>
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', marginTop:20, marginBottom: 10}}>
          <View style={styles.repoCell}>
            <Image style={styles.repoCellIcon} source={require('image!star')}></Image>
            <Text style={styles.repoCellLabel}>
              {rowData.stargazers_count}
            </Text>
          </View>
          <View style={styles.repoCell}>
            <Image style={styles.repoCellIcon} source={require('image!fork')}></Image>
            <Text style={styles.repoCellLabel}>
              {rowData.forks}
            </Text>
          </View>
          <View style={styles.repoCell}>
            <Image style={styles.repoCellIcon} source={require('image!issues')}></Image>
            <Text style={styles.repoCellLabel}>
              {rowData.open_issues}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={this.state.showProgress}
            size="large"
            style={styles.loader} />
        </View>);
    } else {
    return (
      <View style={styles.container}>
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center'
  },
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  row: {
    padding: 10,
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  },
  textArea: {
    paddingLeft: 20
  },
  rowText: {
    fontSize: 20,
    fontWeight: '600',
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
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 20,
    width: 200
  }
});

module.exports = SearchResults;
