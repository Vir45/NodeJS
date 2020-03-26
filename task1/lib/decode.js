const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const colors = require('colors');

const alphabet = require('./alphabet');
const decoded = require('./functionDecode');
const encoded = require('./functionEncoded');

const read = filePath => {
	try {
		return fs.readFileSync(filePath, "utf8")
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

const write = (filePath, data) => {
	fs.writeFile(filePath, data, error => {
		if (error) {
			console.log(error)
			process.exit(1)
		}
	})
}

module.exports = function (args) {
	let result;
	let inPutPath;
	let outPutPath;
	
	if(args.input && typeof args.input != 'object') {
		inPutPath =  path.resolve('./', args.input);
	}

	if(args.output && typeof args.output != 'object') {
		outPutPath = path.resolve('./', args.output);
	}
	
	if (args.action === 'encode') {

		if (fs.existsSync(inPutPath)) {
			let data = read(inPutPath);
			result = encoded(data, args.shift, alphabet);
		} else if(inPutPath != undefined) {
			process.stderr.write(colors.red(args.input) + " no such file or you don't have permission to access the file\n", () => {
				process.exitCode = 9;
				process.on('exit', code => console.log(`Process exited with code: ${colors.red(code)}`));
			});
		} 
	}

	if (args.action === 'decode') {

		if (fs.existsSync(inPutPath)) {
			let data = read(inPutPath);
			result = decoded(data, args.shift, alphabet);
		} else if(inPutPath != undefined) {
			process.stderr.write(colors.red(args.input) + " no such file or you don't have permission to access the file\n", () => {
				process.exitCode = 9;
				process.on('exit', code => console.log(`Process exited with code: ${colors.red(code)}`));
			});
		}

	}

	if (fs.existsSync(outPutPath)) {
		write(outPutPath, result)
	} else if(typeof args.output === 'object') {
		process.stdout.write(`\n${colors.blue('decoded data')}: ${result}`);
	} else {
		process.stderr.write(colors.red(args.output) + " no such file or you don't have permission to access the file\n", () => {
			process.exitCode = 9;
			process.on('exit', code => console.log(`Process exited with code: ${colors.red(code)}`));
		});
	} 
}


// module.exports = function (args) {
// 	let result;
// 	const inPutPath = path.resolve('./', args.input);
// 	const outPutPath = path.resolve('./', args.output);

// 	if (args.action === 'encode') {
// 		if (fs.existsSync(inPutPath)) {
// 			let data = read(inPutPath);
// 			result = encoded(data, args.shift, alphabet);
// 		} else {

// 			inquirer
// 				.prompt({ type: 'input', name: 'encode', message: 'What yoy want encoded?' })
// 				.then((answers) => {
// 					let data = answers.encode;
// 					result = encoded(data, args.shift, alphabet);

// 					if (fs.existsSync(outPutPath)) {
// 						write(outPutPath, result)
// 					} else {
// 						console.log(colors.red('result: ') + result)
// 					}
// 					return
// 				})
// 			return
// 		}

// 	}

// 	if (args.action === 'decode') {
// 		if (fs.existsSync(inPutPath)) {
// 			let data = read(inPutPath);
// 			result = decoded(data, args.shift, alphabet);
// 		} else {
// 			inquirer
// 				.prompt({ type: 'input', name: 'encode', message: 'What yoy want encoded?' })
// 				.then((answers) => {
// 					let data = answers.encode;
// 					result = decoded(data, args.shift, alphabet);

// 					if (fs.existsSync(outPutPath)) {
// 						write(outPutPath, result)
// 					} else {
// 						console.log(colors.red('result: ') + result)
// 					}
// 					return
// 				})
// 			return
// 		}
// 	}

// 	if (fs.existsSync(outPutPath)) {
// 		write(outPutPath, result)
// 	} else {
// 		console.log(colors.red('result: ') + result)
// 	}

// }
