#!/usr/bin/env node
import { Command } from 'commander';
import { getDiff } from '../index.js';
import parseFile from '../src/parsers.js';
import formatDiffEntries from '../src/stylish.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .action((firstFilePath, secondFilePath) => {
    const firstObject = parseFile(firstFilePath);
    const secondObject = parseFile(secondFilePath);
    const diffData = getDiff(firstObject, secondObject);
    console.log(`{\n${formatDiffEntries(diffData)}\n}`);
  });

program.parse();
