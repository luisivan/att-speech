/*
* Copyright (c) 2012 Michael Owens. Licensed via The MIT License.
* Copyright (c) 2014 Luis Iván Cuende.
*
* Browser library for the AT&T Speech API
*/
'use strict';

/*jshint maxparams:false */
function post(url, headers, body, callback) {
  var xhr = new XMLHttpRequest({mozSystem: true});
  xhr.onload = function() {
    callback((!xhr.response.Recognition) ? 'Server error' : null,
              xhr.response);
  };
  xhr.onerror = callback.bind(undefined, new Error('Browser error'));
  xhr.open('POST', url, true);
  xhr.responseType = 'json';
  xhr.setRequestHeader('Accept', 'application/json');
  for (var header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }
  xhr.send(body);
}

var Watson = function(options, callback) {
  this.context = options.context || 'Generic';

  var params = {
    'client_id': options.clientId,
    'client_secret': options.clientSecret,
    'grant_type': 'client_credentials',
    scope: options.scope || 'SPEECH'
  };
  
  var paramlist = [];
  for (var pk in params) {
    paramlist.push(pk + '=' + params[pk]);
  }
  
  post('https://api.att.com/oauth/token',
      {'Content-Type' : 'application/x-www-form-urlencoded'},
      paramlist.join('&'),
      function(err, json) {
        /* jshint camelcase:false */
        this.accessToken = json.access_token;
        callback(err);
      }.bind(this));
};

Watson.prototype.speechToText = function(blob, callback) {
  var headers = {
    'Authorization': 'Bearer ' + this.accessToken,
    'Content-Type': 'audio/x-speex',
    'X-SpeechContext': this.context
  };

  post('https://api.att.com/speech/v3/speechToText',
      headers, blob, callback);
};