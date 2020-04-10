const decoded = (str, shift, alphabet) => {
	let encod = str.split(' ').map(elem => elem.split('').map(item => {
		let result = item;
		let upperCase = false;

		if (alphabet.includes(item.toLowerCase())) {
			let index = alphabet.indexOf(item.toLowerCase());
			let nextIndex = index - Number(shift);

			if (item.toUpperCase() === item) {
				upperCase = true;
			}

			if (nextIndex < 0) {
				nextIndex = alphabet.length + nextIndex;
			}

			result = alphabet[nextIndex];

			if (upperCase) {
				result = result.toUpperCase()
			}
		}

		return result;
	}).join('')).join(' ');

	return encod;
}

module.exports = decoded;
