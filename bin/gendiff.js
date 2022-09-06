#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .action((firstFilePath, secondFilePath, options) => {
    console.log(genDiff(firstFilePath, secondFilePath, options));
  });

program.parse();
