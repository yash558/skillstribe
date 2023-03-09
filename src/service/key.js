const cryptoRandomString = require('crypto-random-string');

export function createKey(length, type) {
	return cryptoRandomString({length: length, type: type});
}