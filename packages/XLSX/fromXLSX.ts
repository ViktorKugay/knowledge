import path from 'path';
import xlsx from 'xlsx';
import fs from 'fs';

const outputFileName = 'some_name';
const filePath = path.resolve('some_xlsx_path.xlsx');
const workbook = xlsx.readFile(filePath, {type: 'binary', cellDates: true});
const sheet_name_list = workbook.SheetNames;
const json = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {dateNF: 'YYYY-MM-DD'});

fs.writeFileSync(outputFileName, JSON.stringify(json, null, 2));
