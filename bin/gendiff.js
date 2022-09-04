#!/usr/bin/env node
import { Command } from 'commander';
import { getDiff } from '../index.js';
import parseFile from '../src/parsers.js';
import plainFormatter from '../src/plain.js';
import formatDiffEntries from '../src/stylish.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .action((firstFilePath, secondFilePath, options) => {
    const firstObject = parseFile(firstFilePath);
    const secondObject = parseFile(secondFilePath);
    const diffData = getDiff(firstObject, secondObject);
    if (options.format === 'plain') {
      console.log(plainFormatter(diffData));
    } else if (options.format === 'json') {
      console.log(JSON.stringify(diffData, null, 2));
    } else {
      console.log(formatDiffEntries(diffData));
    }
  });

program.parse();
