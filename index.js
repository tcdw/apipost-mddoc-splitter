#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs-extra');

if (argv.h || argv.help || argv._[0] === 'help') {
    process.stderr.write('Usage\n');
    process.exit(1);
}

const input = path.resolve(process.cwd(), argv.i || argv.input)
const output = path.resolve(process.cwd(), argv.o || argv.output)

const data = fs.readFileSync(input, { encoding: 'utf8' }).split('\n')

let subName = ''

data.forEach((e) => {
    if (e.startsWith('## ')) {
        subName = output + e.slice(3) + '.md';
        console.log(subName);
        fs.mkdirpSync(path.parse(subName).dir);
    }
    fs.appendFileSync(subName, e + '\n', { encoding: 'utf8' });
});
