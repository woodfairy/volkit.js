var AES = require("crypto-js/aes");

const init = VOLCORE_BASE_URL => {

  console.log(`volkit.js - base URL ${VOLCORE_BASE_URL}`);
  const encrypt = (message, key) => {
    const encrypted = AES(message, key);
    console.log(encrypted);
    return encrypted;
  }

  const getRandomString = length => {
      const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@:;+-_ß';
      let arr = new Uint16Array(length);
      crypto.getRandomValues(arr);
      arr = arr.map(x => validChars.charCodeAt(x % validChars.length));
      return String.fromCharCode.apply(null, arr);
  }

  return {
    getRandomString: getRandomString,
    encrypt: encrypt,
    test: function() {
      console.log("test");
    },
    crypto: CryptoJS
  }
}

module.exports = init