const head = require('./config/headConfig');
const plugins = require('./config/pluginConfig');
const nav = require('./config/navConfig');
const sidebar = require('./config/sidebarConfig');
module.exports = {
  base: "/note/",
  // repo: "https://weiloongmao.github.io/Note/",
  title: "WeiLoong's Notes",
  description: "wei loong FULL STACK, Node, JavaScript",
  head: head,
  plugins: plugins,

  themeConfig: {
    logo: "/avatar.png",
    // lastUpdated: "更新时间",
    nextLinks: false,
    prevLinks: false,
    nav:nav,
    displayAllHeaders: true,
    activeHeaderLinks: true,
    sidebar: sidebar,
    sidebarDepth: 1
  },
};
