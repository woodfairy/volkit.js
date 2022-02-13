const volkit = VOLCORE_BASE_URL => {
  const getRandomString = length => {
      const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@:;+-_ß';
      let arr = new Uint16Array(length);
      crypto.getRandomValues(arr);
      arr = arr.map(x => validChars.charCodeAt(x % validChars.length));
      return String.fromCharCode.apply(null, arr);
  }

  // Return what others can use
  return {
    getRandomString: getRandomString
  }
}

exports.init = volkit