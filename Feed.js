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

var Moment = require('moment');
var PushPayload = require('./PushPayload.js');

class Feed extends Component{
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true
    }
  }

  componentDidMount(){
    this.fetchFeed();
  }

  fetchFeed(){
    require('./AuthService').getAuthInfo((err, authInfo) => {
      if (err) {
          console.log("fetchFeed error");
      }
      var url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/received_events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response)=> response.json())
      .then((responseData)=> {
        var feedItems =
          responseData.filter((ev)=>
          ev.type == 'PushEvent');
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      })
      .catch((err)=>{
        console.log(err);
      })
    });
  }

  pressRow(data){
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: data
      }
    });
  }

  renderRow(rowData){
    return (
      <TouchableHighlight
        onPress={()=> this.pressRow(rowData)}
        underlayColor='#ddd'
        >
      <View style={styles.rowItem}>
        <Image
          style={styles.avatar}
          source={{uri: rowData.actor.avatar_url}}
           />
        <View style={styles.textArea}>
          <Text style={styles.rowText}>
            {Moment(rowData.created_at).fromNow()}
          </Text>
          <Text style={styles.bold}>
            {rowData.actor.login} pushed to
          </Text>
          <Text style={styles.rowText}>
            {rowData.payload.ref.replace('refs/heads/', '')}
          </Text>
          <Text style={styles.bold}>
            at {rowData.repo.name}
          </Text>
        </View>
      </View>
      </TouchableHighlight>
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
    paddingTop: 40,
    paddingLeft: 40,
    justifyContent: 'flex-start',
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

module.exports = Feed;
