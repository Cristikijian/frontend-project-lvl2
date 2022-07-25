#!/usr/bin/env node
import { Command } from 'commander';
import { getDiff, getFilesContent } from '../index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .action((filePath1, filePath2) => {
    const filesContent = getFilesContent(filePath1, filePath2);
    console.log(getDiff(filesContent[0], filesContent[1]));
  });

program.parse();
