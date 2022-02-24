import fs from 'fs';

export const readJsonFileSync = (filepath, encoding) => {
  if (typeof encoding == 'undefined') {
    encoding = 'utf8';
  }
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
};

export const getJsonFromFile = (file) => {
  const filepath = __dirname + '/' + file;
  return readJsonFileSync(filepath);
};

export const saveJsonContent = (filename, jsonContent) => {
  const filepath = __dirname + '/' + filename;
  fs.writeFileSync(filepath, JSON.stringify(jsonContent, null, 4));
};
