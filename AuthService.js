var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');
var encoding = require('NativeModules').Encoding;

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(cb){
    AsyncStorage.multiGet([authKey, userKey], (err, val)=>{
      if(err){
        return cb(err);
      }

      if(!val) {
        return cb();
      }

      var zipped = _.fromPairs(val);
      if (!zipped[authKey]){
        return cb();
      }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + zipped[authKey]
        },
        user:  JSON.parse(zipped[userKey])
      }

      return cb(null, authInfo);
    });
  }

  login(creds, cb){
    var authStr = creds.username + ':' + creds.password;
    encoding.base64Encode(authStr, (encodedAuth)=>{
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
    });
  }
}

module.exports = new AuthService();
