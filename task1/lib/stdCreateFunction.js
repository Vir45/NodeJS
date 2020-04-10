const colors = require('colors');
const path = require('path');
const fs = require('fs');

const alphabet = require('./alphabet');
const decoded = require('./functionDecode');
const encoded = require('./functionEncoded');

const stdCreateFunction = (args) => {
	process.stdin.resume()
	process.stdin.setEncoding('utf8');

	let result;
	let outPutPath;

	if (typeof args.output != 'object') {
		outPutPath = path.resolve('./', args.output);
	}

	process.stdin.on('data', function (chunk) {
		if (args.action === 'encode') {
			if (chunk !== null) {
				result = encoded(chunk, args.shift, alphabet);

				if (fs.existsSync(outPutPath)) {

					fs.writeFile(outPutPath, result, error => {
						if (error) {
							console.log(error)
							process.exit(1)
						}
					})

				} else if (typeof args.output === 'object') {
					process.stdout.write(`${colors.blue('encoded data')}: ${result}\n`);
				} else {
					process.stderr.write(colors.red(args.output) + " no such file or you don't have permission to access the file\n", () => {
						process.exitCode = 9;
						process.on('exit', code => console.log(`Process exited with code: ${colors.red(code)}`));
					});
				}
			}
		} else if (args.action === 'decode') {
			if (chunk !== null) {
				result = decoded(chunk, args.shift, alphabet);

				if (fs.existsSync(outPutPath)) {

					fs.writeFile(outPutPath, result, error => {
						if (error) {
							console.log(error)
							process.exit(1)
						}
					})

				} else if (typeof args.output === 'object') {
					process.stdout.write(`${colors.blue('decoded data')}: ${result}\n`);
				} else {
					process.stderr.write(colors.red(args.output) + " no such file or you don't have permission to access the file\n", () => {
						process.exitCode = 9;
						process.on('exit', code => console.log(`Process exited with code: ${colors.red(code)}`));
					});
				}
			}
		}
	})

	process.stdin.on('end', function () {
		console.log('--- END ---')
	})
}

module.exports = stdCreateFunction;
