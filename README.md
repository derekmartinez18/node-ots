# node-ots
An API wrapper for One-Time Secret

# Installing

node ots is available on npm
```
npm install --save node-ots
```

# Usage
```
var ots = require('node-ots');
var OTS = new ots('yourname@email.com', 'ots-api-key');
```

# References
Read [One-Time Secret API](https://onetimesecret.com/docs/api/secrets) for response values.

The following methods are available:
## .status
_System Status_  
```
OTS.status(function(error, response) {
    console.log(response.status);
});
```
## .share
_Share a Secret_  
secret: The secret to be shared.  
passphrase: The passphrase to protect the secret.  
recipient: The email of the person to be sent the secret.  
```
OTS.share('I am in love with pie', 'TotallySecurePasswordWith$ymbols431', 'pieman@email.com', function(error, response) {
    console.log('Your secret key is: ' + response.secret_key);
});
```
## .generate
_Generate a Secret_  
passphrase: The passphrase to protect the generated code.  
recipient: The email of the person to be sent the generation.  
```
OTS.generate('AnotherTottally$ecur3P4$$word', 'pieman@email.com', function(error, response) {
    console.log('Your secret key is: ' + response.secret_key);
});
```

## .secret
_Retrieve a Secret_  
Secret: the key for the secret to be retrieved.
passphrase: the passphrase for the secret to be retrieved.
```
OTS.secret('pgcdv7org3vtdurif809sygnt0mstw6', 'TotallySecurePasswordWith$ymbols431', function(error, response) { 
    console.log('Your secret is: ' + response.value);
});
```

## .metadata 
_Retrieve Metadata_  
key: metadata key for the secret
```
OTS.metadata('qjpjroeit8wra0ojeyhcw5pjsgwtuq7', function(error, response) {
    console.log(response);
});
```

## .recent
_Retrieve Recent Metadata_  
```
OTS.recent(function(error, response) {
    console.log(response);
});
```

# TODO
- Allow ttl to be set globally and per request
