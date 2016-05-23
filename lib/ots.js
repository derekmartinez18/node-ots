/**
  * One-Time Secret API Version 1 by Derek Martinez.
  * https://onetimesecret.com/
  * TODO: global, request specific ttl
  * TODO: wee error handling
  */
'use strict';

var request = require('request');

function OneTimeSecretAPI(email, key) {
	this.email = email;
	this.key = key;
	this._baseUrl = 'https://onetimesecret.com/api/v1';
}

OneTimeSecretAPI.prototype.status = function(callback) {
	var opts = this._createRequest('/status');
	request.get(opts, function(error, response, body) {
		if (error) {
			return callback(error, null);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode, null);
		}
		return callback(null, JSON.parse(body));
	})
};

OneTimeSecretAPI.prototype.share = function(secret, passphrase, recipient, callback) {
	var opts = this._createRequest('/share', {
		secret: secret, 
		passphrase: passphrase,
		recipient: recipient
	});
	request.post(opts, function(error, response, body) {
		if (error) {
			return callback(error, null);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode, null);
		}
		return callback(null, JSON.parse(body));
	});
};

OneTimeSecretAPI.prototype.generate = function(passphrase, recipient, callback) {
	var opts = this._createRequest('/generate', {
		passphrase: passphrase,
		recipient: recipient
	});
	request.post(opts, function(error, response, body) {
		if (error) {
			return callback(error, null);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode, null);
		}
		return callback(null, JSON.parse(body));
	});
};

OneTimeSecretAPI.prototype.secret = function(secret, passphrase, callback) {
	var opts = this._createRequest('/secret/' + secret, {
		passphrase: passphrase
	});
	request.post(opts, function(error, response, body) {
		if (error) {
			return callback(error, null);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode, null);
		}
		return callback(null, JSON.parse(body));
	});
};

OneTimeSecretAPI.prototype.metadata = function(key, callback) {
	var opts = this._createRequest('/private/' + key);
	request.post(opts, function(error, response, body) {
		if (error) {
			return callback(error, null);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode, null);
		}
		return callback(null, JSON.parse(body));
	});
};

OneTimeSecretAPI.prototype.recent = function(callback) {
	var opts = this._createRequest('/private/recent');
	request.post(opts, function(error, response, body) {
		if (error) {
			return callback(error, null);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode, null);
		}
		return callback(null, JSON.parse(body));
	});
};

// Internal Helper
OneTimeSecretAPI.prototype._createRequest = function(path, postData) {
	return {
		url: this._baseUrl + path,
		headers: {
			'Authorization': 'Basic ' + new Buffer(this.email + ':' + this.key).toString('base64'),
			'Content-Type': 'text/html; charset=utf-8',
		},
		form: postData
	};
};

module.exports = OneTimeSecretAPI;