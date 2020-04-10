const encoded = (str, shift, alphabet) => {
	let encod = str.split(' ').map(elem => elem.split('').map(item => {
		let result = item;
    let upperCase = false;

		if (alphabet.includes(item.toLowerCase())) {
			let index = alphabet.indexOf(item.toLowerCase());
			let nextIndex = index + Number(shift);

      if(item.toUpperCase() === item) {
        upperCase = true;
      }

			if (nextIndex > (alphabet.length - 1)) {
				nextIndex = nextIndex - alphabet.length;
			}
      
			result = alphabet[nextIndex];

      if(upperCase) {
        result = result.toUpperCase()
			}
			
		}

		return result;
	}).join('')).join(' ');

	return encod;
}

module.exports = encoded;
