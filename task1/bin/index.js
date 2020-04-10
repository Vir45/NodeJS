#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');

const decode = require('../lib/decode');
const stdCreateFunction = require('../lib/stdCreateFunction');


program
	.command('my_caesar_cli')
	.option('-a, --action <action>', 'sets the encoding / decoding order')
	.option('-s, --shift [value]', 'sets shift the encod / decod order', NaN)
	.option('-i, --input [value]', 'initional text', { isDefault: false })
	.option('-o, --output [value]', 'decoding text', { isDefault: false })
	.action(function (args) {

		if (typeof args.input === 'object') {
			stdCreateFunction(args)
			return
		}

		if ((args.action !== 'encode' && args.action !== 'decode') || isNaN(Number(args.shift))) {
			process.stderr.write("Please, enter the desired type of action " + colors.red("(encode / decode)") + " and (or) " + colors.red("action shift") + "\n", () => {
				process.exitCode = 9;
				process.on('exit', code => console.log(`Process exited with code: ${colors.red(code)}`));
			});
			return;
		}

		decode(args);

	});

program.parse(process.argv);


