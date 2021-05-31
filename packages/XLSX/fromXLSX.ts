import path from 'path';
import xlsx from 'xlsx';
import fs from 'fs';

const outputFileName = 'some_name';
const filePath = path.resolve('some_xlsx_path.xlsx');
const workbook = xlsx.readFile(filePath, {type: 'binary', cellDates: true});
const json = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
  dateNF: 'YYYY-MM-DD',
});

fs.writeFileSync(outputFileName, JSON.stringify(json, null, 2));
