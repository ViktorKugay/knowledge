import json2xls from 'json2xls';
import fs from 'fs';

export const toXlSX = ({path, file}) => {
  fs.writeFileSync(path, json2xls(file), 'binary');
};
