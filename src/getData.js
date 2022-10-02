import { readFileSync } from 'node:fs';
import getPath from './getPath.js';

const getData = (file) => readFileSync(getPath(file), 'utf-8');

export default getData;
