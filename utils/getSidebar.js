const path = require('path');
const rootPath = path.dirname(__dirname);
const docs = rootPath + '/docs/';
const fileHelper = require(rootPath + '/utils/fileHelper.js');
let filePaths = fileHelper.getFilePaths(docs);

let sideBar = {};
for(let i = 0; i < filePaths.length; i++){
  let arr = filePaths[i].split('/');
  let fileKey = '/'+ arr[arr.length-1] + '/';
  let fileNames = fileHelper.getFileNames(filePaths[i]);
  sideBar[fileKey] = fileNames;
}
module.exports = sideBar;
// let fileNames = fileHelper.getFileNames('/Users/maoduojue/Documents/WorkProject/LearningNotes/docs/JavaScript')

