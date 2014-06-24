att-speech
==========

Browser library for the AT&amp;T Speech API

Inspired by https://github.com/mko/watson-js

```javascript

var opts = {clientId: 'blabla',
            clientSecret: 'blabla'};

var w = new Watson(opts, function(err) {
  w.speechToText(yourBlob, function(err, res) {
    console.log(res)
  });
});
```
