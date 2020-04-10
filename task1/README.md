# RS School NodeJS course

### Task https://github.com/rolling-scopes-school/nodejs-course-template/blob/master/TASKS.md#task-1-caesar-cipher-cli-tool

Caesar cipher CLI tool - CLI tool that will encode and decode a text by Caesar cipher.

## Installation:
#### Install packages

 ```bash
npm install
```
#### Options

```bash
$ task1 my_caesar_cli --help

Options:
  -a, --action <action>  sets the encoding / decoding order
  -s, --shift [value]    sets shift the encod / decod order (default: null)
  -i, --input [value]    initional text (default: {"isDefault":false})
  -o, --output [value]   decoding text (default: {"isDefault":false})
  -h, --help             display help for command

```

#### Usage
```bash
$ task1 my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"

$ task1 my_caesar_cli --action decode --shift 7
```

#### Examples

#### Action (encode/decode) and the shift are required
```bash
$ task1 my_caesar_cli -s 7 -i "./input.txt" -o "./output.txt"

Please, enter the desired type of action (encode / decode) and (or) action shift
Process exited with code: 9
```

#### If the input/output file is missed
```bash
$ task1 my_caesar_cli --action decode --shift 7

This is secret. Message about "_" symbol!
decoded data: Mabl bl lxvkxm. Fxlltzx tuhnm "_" lrfuhe!

klhjhjk
decoded data: deacacd
```
#### If the input and/or output file is given but doesn't exist or you can't read it
```bash
$ task1 my_caesar_cli -s 7 -i "./superINPUT.txt" -o "./output.txt"

./superINPUT.txt no such file or you don't have permission to access the file
Process exited with code: 9
```
