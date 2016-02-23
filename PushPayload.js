'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} = React;

var Moment = require('moment');

class PushPayload extends Component{
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
      pushEvent: props.pushEvent
    }
  }

  renderRow(rowData){
    return(
      <View style={styles.rowItem}>
        <Text><Text style={styles.bold}>{rowData.sha.substring(0,6)}</Text> - {rowData.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{uri: this.state.pushEvent.actor.avatar_url}}
           />

        <Text style={styles.textArea}>
          {Moment(this.state.pushEvent.created_at).fromNow()}
        </Text>

        <Text style={styles.bold}>
          {this.state.pushEvent.actor.login}
        </Text>

        <Text style={styles.bold}>
          {this.state.pushEvent.payload.ref.replace('refs/heads/', '')}
        </Text>

        <Text style={styles.bold}>
          {this.state.pushEvent.repo.name}
        </Text>

        <Text><Text style={styles.bold}>
          {this.state.pushEvent.payload.commits.length}</Text> commits
        </Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textArea: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  rowText: {
    backgroundColor: '#fff'
  },
  bold: {
    fontWeight: '600'
  },
  rowItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    alignItems: 'center',
    borderColor: '#D7D7D7',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});

module.exports = PushPayload;
