import {resolve} from 'path';
import fs from 'fs';
import * as TJS from 'typescript-json-schema';

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

const program = TJS.getProgramFromFiles([resolve('src', 'index9.ts')], compilerOptions);

// We can either get the schema for one file and one type...
const schema = TJS.generateSchema(program, 'Props', settings);

fs.writeFileSync('types.json', JSON.stringify(schema, null, 2));

console.log(schema);
