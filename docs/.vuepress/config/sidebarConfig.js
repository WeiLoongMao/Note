/**
 * 多个侧边栏
 */
const sidebar = require('../../../utils/getSidebar');
module.exports = sidebar;

/** 
module.exports = {
  '/JavaScript/':[
    '',
    'JavaScript',
    'YDNKJS',
    '你不知道的JS'
  ],
  '/Vue/':[
    '',
    'Vue',
    'Vuex'
  ],
  '/React/':[
    '',
    'React',
    'Redux'
  ],
  '/Koa/':[
    '',
    "Koa"
  ],
  '/NodeJS/':[
    '',
    "NodeJS"
  ],
  '/Nginx/':[
    '',
    "Nginx"
  ],
  '/Git/':[
    '',
    "Git"
  ],
  '/Webpack/':[
    '',
    "Webpack"
  ],
  '/Jenkins/':[
    '',
    "Jenkins"
  ],
  '/Linux/':[
    '',
    "Linux"
  ]
}
*/


/** 
module.exports = [
  {
    title: "目录",
    collapsable: false,
  },
  {
    title: "JS基础",
    path: "/javascript",
    collapsable: true,
    children: [
      {
        title: "JavaScript高级程序设计",
        path: "/javascript/JavaScrip高程",
      },
      { 
      	title: "你不知道的JS",
      	path: "/javascript/你不知道的JS" 
      },
    ],
  },
  {
    title: "前端框架",
    collapsable: true,
    sidebarDepth: 0,
    children: [
      { title: "Vue", path: "/frontFrame/Vue" },
      { title: "React", path: "/frontFrame/React" },
    ],
  },
  {
    title: "前端工程化",
    collapsable: true,
    sidebarDepth: 0,
    children: [
      { title: "Webpack", path: "/frontEngineering/Webpack" },
      { title: "Jenkins", path: "/frontEngineering/Jenkins" },
    ],
  },
  {
    title: "系统",
    collapsable: true,
    sidebarDepth: 0,
    children: [
      { title: "Linux", path: "/Server/Linux" },
      { title: "Nginx", path: "/Server/Nginx" },
    ],
  },
  {
    title: "开发工具",
    collapsable: true,
    sidebarDepth: 0,
    children: [{ title: "Git常识", path: "/tools/Git" }],
  },
]
*/