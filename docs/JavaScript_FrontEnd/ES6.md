# ES6标准入门（第三版）

## ES6 环境配置

ES6、7、8、9的代码需要转为ES5，才能在老版本的浏览器上执行。Babel是一个广泛使用的转码器。

### 配置环境

需要在项目目录中，安装Babel

```shell
npm install @babel/core --save-dev
```



配置.babelrc文件，存放在项目的根目录下

```json
{
  "presets": [
    "@babel/env",
    "@bebel/preset-react"
  ], //presets字段设定转码规则，官方提供规则集，根据需要安装
  "plugins":[]
}
```



```shell
#安装官方规则集
#最新转码规则
npm install --save-dev @babel/preset-env
#react转码规则
npm installl --save-dev @babel/preset-react
#typescript
npm install --save-dev @babel/preset-typescript
```

@babel/node支持babel-node命令，提供一个支持ES6的REPL环境。

@babel/register模块改写了require命令，为它加上一个钩子，当加载.js/.jsx/.es./es6都会先用Babel进行转码。



**polyfill**

Babel默认只转换新的句法（Syntax），不会转换新的API，所以需要为当前环境提供一个垫片。

新的API有Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象。

```shell
npm install --save @babel/polyfill
```

[Babel官方文档](https://www.babeljs.cn/docs/)



## let 和 const

### let

let命令用来声明变量，所声明的变量只在let命令所在的代码块内有效。允许你声明一个作用域被限制在 [`块`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/statements/block)级中的变量、语句或者表达式

```javascript
{
  let a = 1;
  var b = 2;
}
//代码块外不能访问let声明的变量，但是var声明的变量可以被访问
```



> let是否存在变量提升？
>
> 个人认为存在变量提升，但是由于暂时性死区，所以let之前使用变量都属于'死区'，本质就是进入当前作用域，使用的变量已经存在，但是不可获取，只有等到声明变量那一行代码出现，才可以获取和使用变量。
>
> ```javascript
> if(true){
>   temp = 'abc'; //ReferenceError
>   let temp;
> }
> ```



ES6的块级作用域中，明确了块级作用域中可以声明函数。

函数的声明类似于let，对作用域之外的没有影响。（对旧代码印象很大，由于改变了块级作用域内声明函数的处理规则，所以在浏览器环境中，块级作用域内声明函数类似于var）

> 在浏览器中有自己的行为方式：
>
> - 允许在块级作用域内声明函数
> - 函数声明类似于var，即会提升到全局作用域或函数作用域头部
> - 函数声明提升到到所在块级作用域的头部

```javascript
(function(){
    if(false){
        function fn(){console.log(1)}
    }
    fn();
})()
//ES6环境实际执行：
(function(){
  var fn = undefined;
  if(false){
		fn = function(){console.log(1)}
  }
  fn();//Type Error,fn is not function
})()
```

所以，避免在块作用域内声明函数，如果确实需要，可以使用函数表达式。

ES6的块作用域允许声明函数的规则只在使用大括号的情况下成立，没有大括号就不成立。





### const

const声明一个只读的常量，一旦声明，必须立即初始化，常量的值不可改变。

const也存在暂时性死区，只能在声明之后使用。

const本质是变量指向的那个内存地址不得改变。

所以，如果想冻结对象，可以勇士Object.freeze()

```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key,i)=>{
    if(typeof obj[key] === 'object'){
      constantize(obj[key]);
    }
  })
}
```



var、function声明的全局变量依旧是顶层对象的属性

let、const、class、import声明的全局变量不在是顶层对象的属性。



ES6变量声明的6中方法：

- var
- function
- let
- const
- import
- class



### 顶层对象

在浏览器中，顶层对象是指window对象，Node指gobal对象。

ES6中，var和function声明的全局变量依旧属于顶层对象属性，let、const、class声明的全局变量不属于顶层对象的属性。

全局变量逐步与顶层对象的属性脱钩。



同一段代码在不同环境转给你，都能取到顶层对象，但是有局限性。

全局环境中，this会返回顶层对象，但是在Node模块和ES6模块中，this返回的时当前模块。

函数中的this，若不作为对象的方法允许，则指向顶层对象，严格模式先为undefined。

若浏览器使用了内容安全策略，eval、new Function这些方法都可能无法使用。



```javascript
//勉强取顶层对象
var getGlobal = function(){
    if(typeof self !== 'undefined'){ return self;}
    if(typeof window !== 'undefined'){ return window;}
    if(typeof global !== 'undefined'){ return global;}
    throw new Error('unable to locate global object');
}
```



ES2020语言标准层面，引入globalThis作为顶层对象。即在任何环境，都存在globalThis





## 变量结构赋值

### 数组的解构赋值

按照一定的模式从数组或对象中提取值，然后对变量进行赋值，称为解构赋值。

```javascript
let [a,b,c] = [1,2,3];
```

本质上，这种写法是【模式匹配】，只要等号两边的模式相同，左边变量就会被赋对应的值。

如果解构不成功，则变量的值为undefined。

只要某种数据结构具有 **Iterator**接口，都可以采用**数组形式**的解构赋值。

对于Set结构，也可以使用数组的结构赋值

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
x //'a'
```



```javascript
let [foo] = 1;
let [foo] = {};
//上述语句会报错，由于等号右边的值或转为对象以后都不具备Iterator接口。
```



解构赋值允许取默认值：只有严格等于undefined的时候，才会取默认值

```javascript
let [foo  = true] = [];//foo = true;
let [x = 1] = [null];//x = null;//由于null不严格等于undefined。
```



如果默认求值是一个表达式，那这个表达式是惰性求值，即只有在用到的时候才会求值。

```javascript
function fn(){
  console.log(1);
}

let [x = fn()] = [1];//此处函数fn不会执行。
```



### 对象的解构赋值

数组的元素按次序排列，变量的取值由位置决定；

对象的属性没有次序，变量必须与属性同名才能取值。

```javascript
let { baz } = { foo:'a', bar:'b'};
//baz = undefined
```



对象的解构赋值的内部机制：先找到同名属性，再将值赋给对应的变量，真正被赋值的是后者。

```javascript
let { foo: baz } = { foo: 'a', bar:'b'};
//baz = a;
//foo undefined;
//模式匹配是foo,真正的变量是baz
```



对象解构也可以指定默认值，生效条件是对象的属性值严格等于undefined。

对象结构失败，则等于undefined。

对象解构可以嵌套，但是结构模式嵌套的是对象，而子对象所在的父属性不存在，则报错。

```javascript
let { foo: { bar }} = { baz: 'a'};//报错
//由于foo为undefined，再取undefined的子属性就会报错。
```



对象结构赋值可以去到继承的属性。

```javascript
const obj1 = {};
const obj2 = {foo: 'bar'};
Object.setPrototypeOf(obj1, obj2);
const { foo } = obj1;
foo // 'bar'
```



若将一个已经声明的变量用于结构，引擎会认为{ x }是一个代码块，导致错误。

将大括号放在行首，解释权认为其实代码块，所以需要添加括号。

```javascript
let x;
{x} = {x: 1};//syntax error
```

解构赋值允许等号左边的模式中不放任何变量名，但是没有任何意义。

由于数组本质上是特殊的对象，所以可以对数组进行对象属性的解构

```javascript
let arr = [1,2,3];
let { 0: first, [arr.length -1]: last} = arr;
//first = 1;
//last = 3;
```



### 字符串的解构赋值

字符串也可以解构赋值，此时字符串被转换为一个类似数组的对象。

```javascript
const [a,b,c] = 'hello';//a = h; b = e; c = l;

//类数组对象都有一个length属性，所有可以对这个属性进行解构；
let [length:len] = 'hello';
//len = 5;
```



### 数值和布尔值的解构赋值

如果右边是数值或者布尔值，则会先转为对象。但是undefined和null不能转对象，所以会报错。

```javascript
let { toString: s} = 123;
//s === Number.property.toString
```

**解构赋值规则：只要等号右边的值不是对象或数组，就先转为对象，undefined和null无法转为对象，所以会报错**



### 函数参数的解构赋值

```javascript
function move({x = 0, y = 0}){
  return [x,y];
}

function move({x,y} = {x:0,y:0}){ //此处指定的参数的默认值，不是x,y的
  return [x,y];
}
```



**解构赋值的圆括号使用原则：赋值语句的非模式部分可以使用圆括号。**



解构赋值用途：

- 交换变量
- 函数返回多个值
- 函数参数的定义
- 提取JSON数据
- 函数参数的默认值
- 变量Map解构
- 输入模块的指定方法

任何部署了Iterator接口的对象都可以使用for...of循环遍历。

Map结构原生支持Iterator接口，所以可以配合变量解构赋值获取键名和键值。

```javascript
var map = new Map();
map.set("first", "hello");
map.set("second", "world");

for(let [key,value] of map){
  console.log(key, value)
}

```



## 字符串扩展

### 字符的Unicode 表示法

ES6加强了Unicode支持，只需将码点放在大括号中就能正确解读该字符

```javascript
'\u{20BB7}'
'\u{41}\u{42}\u{43}' //abc
```

大括号表示法与四字节的UTF-16编码是等价的。

> ES5不足：允许是用\\uxxxx表示一个字符，这种表示法只限于码点\\u0000~\uFFFF之间的字符，超出这个范围需要用两个双字节的形式表示。



### 字符串的遍历接口

ES6为字符串添加了遍历器接口，使得字符串能够使用**for ...  of循环遍历**

遍历器最大的优点是可以识别大于0xFFFF的码点。

```javascript
let text = String.fromCodePoint(0x20BB7);
for (let i of text){
    console.log(i);
}
```



### 直接输入U+20208、U+2029

JavaScript规定5个字符串不能在字符串里面直接使用：

- U+005C
- U+000D
- U+2028
- U+2029
- U+000A

字符串里面不能直接包含反斜杠，一定要转义写成\\\或\\u005c。

但是对于JSON格式允许字符串直接使用行分隔符U+2028和段分隔符U+2029，JSON.parse解析的时候会报错。

ES2019允许直接输入U+2028和U+2029



### JSON.stringify()的改造

根据标准，JSON数据必须是UTF-8，但是JSON.stringify()方法有可能返回不符合标准的字符串。即0xD800到0xDFFF之间的码点不能单独使用，必须配对使用。

ES2019改变了这个行为，如果遇到单个码点或不存咋的配对形式，会返回转义字符串，可以做进一步处理。



### 模板字符串

增强 的字符串，用反引号标识，可以当普通字符串使用，也可以用来定义多行字符串或在字符串中嵌入变量。

嵌入变量需要将变量名写在${}之中。

大括号内部可以放任意JavaScript表达式，可以进行运算及引用对象属性

模板字符串之中还能调用函数

若大括号中的值不是字符串，则按照一般规则转为字符串



模板编译：可以通过一个模板字符串，生成正式的模板的实例。

标签模板（函数调用的一种特殊形式）：模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。

```javascript
alert`hello`
//等同于
alert(['hello'])
```

**如果模板字符串里面有变量，会将模板字符串先处理成多个参数，再调用函数**

```javascript
let a = 5;
let b = 10;
tag`Hello ${a+b} world ${a*b}`;
//等同于
tag(['Hello','world',''], 15, 50);
```

