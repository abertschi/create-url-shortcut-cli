#!/usr/bin/env node

const meow = require('meow');
const createUrlShortcut = require('create-url-shortcut');
const fs = require('fs');

const cli = meow({
  description: 'Create an url shortcut file which can be opened in the browser',
  help: `

    Usage
      $ create-url-shortcut <url> <filename>
        - url: web address
        - filename: name of the shortcut file. A platform dependent extension will be added.

    Examples

      Mac OSX or Windows
      $ create-url-shortcut http://www.google.ch google
      > google.url created

      Linux
      $ create-url-shortcut http://www.google.ch google
      > google.desktop created

`
});

if (cli.input.length != 2) {
  console.log('Missing argument(s). See --help');
  process.exit(0);
}

let shortcut = createUrlShortcut(cli.input[0]);
let name = cli.input[1] + '.' + shortcut.ext;
fs.writeFileSync(name, shortcut.value);

console.log(`${name} created`);
process.exit(0);
