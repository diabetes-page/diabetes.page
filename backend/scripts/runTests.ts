import { exec } from 'child_process';

const domain = process.argv[2] ?? '**';
const route = process.argv[3] ?? '**';
const searchSpace = domain + '/routes/' + route + '/test';

const command = `cucumber-js src/domains/${searchSpace}/*.feature --require 'src/test/*.steps.ts' --require 'src/domains/${searchSpace}/*.steps.ts' --require 'src/domains/${searchSpace}/steps.ts' --require-module ts-node/register`;

console.log('> ' + command);
const results = exec(command);

results.stdout?.on('data', function (data) {
  process.stdout.write(data.toString());
});

results.stderr?.on('data', function (data) {
  process.stderr.write(data.toString());
});
