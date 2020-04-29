const path = require("path");
const rootPath = path.dirname(__dirname);
const docs = rootPath + "/docs/";
const fileHelper = require(rootPath + "/utils/fileHelper.js");
let filePaths = fileHelper.getFilePaths(docs);

let nav = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "FrontEnd",
    items: [],
  },
  {
    text: 'BackEnd',
    items:[]
  },
  {
    text: 'System',
    items:[]
  },
  {
    text: 'DevTools',
    items:[]
  }
];

let category = [];

for (let i = 0; i < filePaths.length; i++) {
  let arr = filePaths[i].split("/");
  // let fileKey = '/'+ arr[arr.length-1] + '/';
  let fileName = arr[arr.length - 1];
  // let fileNames = fileHelper.getFileNames(filePaths[i]);
  let temp = fileName.split("_");
  let obj = {
    name: temp[0],
    link: fileName,
    belong: temp[1],
  };
  category.push(obj);
}

for (let i = 0; i < category.length; i++) {
  if (category[i].belong) {
    nav = nav.map((item, index) => {
      if (item.text == category[i].belong) {
        let link = "/" + category[i].link + "/";
        let obj = {
          text: category[i].name,
          link,
        };
        item.items.push(obj);
        return item;
      } else {
        return item;
      }
    });
  }
}
module.exports = nav;
