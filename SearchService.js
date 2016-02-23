var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth';
const userKey = 'user';

class SearchService {

  search(query, cb){
    var b = new buffer.Buffer(creds.username + ':' + creds.password);
    var encodedAuth = b.toString('base64');
    fetch("https://api.github.com/user", {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
    .then((response)=> {
      if(response.status >= 200 && response.status <300){
        return response;
      }
      if(response.status==401){
        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      }
    })
    .then((response)=> {
      return response.json();
    })
    .then((results)=> {
      AsyncStorage.multiSet([
        [authKey, encodedAuth],
        [userKey, JSON.stringify(results)]
      ], (err)=> {
        if(err){
          console.log('setting auth - err');
          throw err;
        }
        console.log('setting auth - success');
        return cb({success: true, showProgress: false});
      })
    })
    .catch((err)=>{
      return cb(err);
    })
  }
}

module.exports = new SearchService();
