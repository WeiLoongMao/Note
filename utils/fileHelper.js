/**
 * 获取目下所有文件的名字和相对路径
 */

const fs = require("fs");
var excludes = [".DS_Store", ".vuepress"];

var fileHelper = {
  getFilePaths: function(directory) {
    let filePaths = [];
    fs.readdirSync(directory).forEach((file, index) => {
      if (excludes.indexOf(file) < 0) {
        let fullPath = directory + file;
        var fileInfo = fs.statSync(fullPath);
        if (fileInfo.isDirectory()) {
          filePaths.push(fullPath);
        }
      }
    });
    return filePaths;
  },

  getFileNames: function(filePaths) {
    let fileNames = [''];
    fs.readdirSync(filePaths).forEach((file) => {
      let fullPath = filePaths +'/'+ file;
      let fileInfo = fs.statSync(fullPath);
      if (fileInfo.isFile()) {
        if(file.toLowerCase() === 'readme.md'){
          // file = '';
        }else{
          file = file.replace('.md','');
          fileNames.push(file);
        }
      }
    });
    return fileNames;
  },
};

module.exports = fileHelper;
