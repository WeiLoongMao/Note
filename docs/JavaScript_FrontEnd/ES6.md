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



对象结构赋值可以取到继承的属性。

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



标签模板可以嵌入其他语言，但是模板字符串默认会将字符串转义，导致无法嵌入其他语言。

为了解决这个问题，ES2018放松了对标签模板里面的字符串转义的限制，若遇到不合法的字符串转义，就返回undefined，而不是报错，且从raw属性上可以得到原始字符串。





## 字符串新增方法

### String.fromCodePoint()

String.fromCharCode()用于从Unicode码点返回对应的字符，但是这个方法不能识别大于0xFFFF的字符。

String.fromCodePoint()可以识别大于0xFFFF的字符。



### String.raw()

ES6为原生的String对象提供了raw()方法，该方法返回一个斜杠都被转义的字符串，一般用于模板字符串的处理方法。

```javascript
String.raw`Hi\n${2+3}!` 
```

如果源字符串的斜杠已经转义，那么String.raw()会进行再次转义

String.raw本质上是一个正常的函数，只是用于模板字符串的标签函数。

String.raw()方法的第一个参数是一个对象，它的raw属性等同于原始的模板字符串解析后得到的数组。

```javascript
//`foo${1+2}bar`
//等同于
String.raw({raw: ['foo', 'bar']}, 1 + 2);//'foo3bar'
```

第一个参数是一个对象，它的raw属性等同于原始的模板字符串解析后得到的数组。

String.raw()的代码实现：

```javascript
String.raw = function(strings, ...values){
    let output = '';
    let index;
    for(index = 0; index < values.length; index++){
      output += strings.raw[index] + values[index];   
    }
    output += strings.raw[index];
    return output;
}
```



### codePointAt()

用于正确处理4个字节存储的字符，返回一个字符码点。

返回的时一个十进制的值，如果想要十六进制的值，可以使用toString()方法转换。

```javascript
let s = '𠮷a';
s.codePointAt(0).toString(16);

for(let ch of s){
    console.log(ch.codePointAt(0).toString(16));
}
```

codePointAt()方法是测试一个字符由两个字节还是四个字节组成的最简单的方法。

```javascript
function is32Bit(c){
    return c.codePointAt(0) > 0xFFFF;
}
```



### normalize()

用来将字符的不同表示方法统一为同样的形式。

normalize方法目前不能识别三个火三个以上字符的核查，这种情况，只能使用正则表达式，通过判断Unicode编号区间判断。



### includes(), startsWith(), endsWith()

- includes 返回布尔值，表示是否找到了参数字符串
- startsWith 返回布尔值，表示参数字符串是否在原字符串的头部
- endsWith 返回布尔值，表示参数字符串是否在原字符串的尾部



### repeat()

repeat方法返回一个新字符串，表示将源字符串重复n次。

参数会先取整运算，然后获取重复次数。



### padStart, padEnd()

字符串补全长度的功能，如果字符串不够指定长度，会在头部或尾部补全。

padStart()的常见用途是为数值补全指定位数。

另有一个用途是提示字符串格式。

```javascript
'12'.padStart(10, 'YYYY-MM-DD');// 'YYYY-MM-12'
```



### trimStart(), trimEnd()

消除字符串头部或尾部的空格，返回的都是新字符串，不会修改原始字符串。



### matchAll()

matchAll()方法返回一个正则表达式在当前字符串的所有匹配。



## *正则扩展





## 数值扩展

ES6 提供了二进制和八进制的新写法，前缀用0b或0B 和0o或0O表示。

ES5开始，在严格模式中，八进制不可以用前缀0表示，ES6明确了使用0o.



ES6在Number对象上，增加了新的方法：

- Number.isFinite()
- Number.isNaN()



ES6将全局方法移植到了Number对象上，行为完全保持不变

- Number.parseInt()
- Number.parseFloat()



Number.isInteger()来判断数值是否为一个整数。

JavaScript内部，整数和浮点数采用的是同样的存储方法，所以25和25.0被视为同一个值。

```javascript
Number.isInteger(25);// true
Number.isInteger(25.0);// true
```

由于采用IEEE 754标准，数值存储为64位双精度格式，如果超过了这个限度，地54位后面就会被丢弃，这种情况导致Number.isInteger可能误判。

对于数据精度要求较高，不建议用Number.isInteger判断是否为一个整数



ES6对象上，新增一个极小常量 Number.EPSILON。表示1与大于1的最小浮点数之间的差。

**Number.EPSILON实际上是JavaScript能够表示的最小精度**。误差小于这个值，就可以认为额没有意义了。

引入个值得目的在于浮点计算，设置一个误差范围。



安全整数Number.isSafeInteger(), JavaScript表示-2^53到2^53之间，超过这个范围，无法精确表示这个值。

Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER这两个常量用来表示这个范围的上下限。



### Math对象的扩展

Math.trunc()方法用于出去一个数的小数部分，返回整数部分。

Math.sign()方法用于判断一个数到底是正数、负数还是零，对于非数值，会先转换Wie数值。

Math.cbrt()方法用于计算一个数的立方根。

Math.clz32()方法用于将参数转32位无符号整数的形式。

Math.imul()方法返回两个数以32位带符号整数形式相乘的结果，返回也是一个带符号整数。

Math.fround()方法返回一个数的32位单精度浮点数形式。

Math.hypot()方法返回所有参数的平方和的平方根。



对数方法：

Math.expm1()返回e* -1，即Math.exp(x) -1

Math.log1p() 方法返回1+x的自然对数，即Math.log(1+x)，放x小于-1，返回NaN。

Math.log10()

Math.log2()



双曲函数方法：

- Math.sinh(x)
- Math.cosh(x)
- Math.tanh(x)
- Math.asinh(x)
- Math.acosh(x)
- Math.acosh(x)
- Math.atanh(x)



指数运算符 **，右结合，多个指数运算符连用时从右边开始计算。

```javascript
2**3**2 //相当于 2**(3**2); 512
```



### BigInt数据类型

只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

与Number类型区别，BigInt类型的数据必须加后缀n。

```javascript
const a = 2172141653n;
const b = 15346349209n;
a * b;
```

BigInt与普通数据类型是两种值，他们之间并不相等。



BigInt对象，可以用作构造函数生成的BigIngt类型数值，转换规则基本和Number一致

BigInt()构造函数必须有参数，而且参数必须可以正常转为数值。

BigInt对象继承了Object对象的两个实例方法：

- BigInt.prototype.toString()
- BigInt.prototype.valueOf()

还继承了Number的实例方法

- BigInt.prototype.toLocalString()

三个静态方法：

- BigInt.asUnitN(width, BigInt)
- BigInt.asIntN(width, BigInt)
- BigInt.parseInt(string[, radix])



可以将BigInt通过使用Boolean、Number、String这三个方法，转为布尔、数值和字符串类型。

BigInt类型可以+，-，*，**与Number行为一致。除法会舍去小数部分，返回一个整数。



BigInt不能使用：

- 不带符号的右移位运算符>>>
- 一元的求正运算符+



BigInt不能与普通数值进行混合运算。





## 函数的扩展

### 函数参数的默认值

ES6之前，不能直接为函数的参数指定默认值，通过变通的方法。

ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。

```javascript
function log(x, y = 'World'){
    console.log(x, y);
}
```

注意点：

- 参数变量是默认声明的，所以不能用let和const再次声明。

- 使用参数默认值时，函数不能有同名函数。
- 参数默认值不是传值，而是每次都重新计算默认值表达式的值，参数默认值是惰性求值的



参数默认值可以与解构赋值默认值结合使用

```javascript
//只有当foo的参数是一个对象时，变量x,y才会通过解构赋值生成。
function foo({x, y = 5}){
    console.log(x,y);
}

//提供函数参数的默认值，避免没有参数时报错。
function foo({x, y = 5} = {}){
    console.log(x, y);
}
```

通常情况下，定义默认值的参数应该是函数的尾参数，如果非尾部的参数设置默认值，实际上这个参数是不能省略的。



**函数的length**,指定默认值后，函数的length属性，将返回没有指定默认值的参数个数，即指定了默认值以后，length属性将失真。

```javascript
(funciton(a,b,c=5){}).length; //2

(function(...args){}).length; //0
```

length属性的含义是：**该函数预期传入的参数个数**。同样，rest参数也不会计算length属性。

如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。



**作用域**，一旦设置了参数默认值，函数进行声明初始化时，参数就会形成一个单独的作用域，等初始化结束后，这个作用域消失。这种行为，在不设置参数默认值时，不会出现。

```javascript
var x = 1;
function f(x, y = x){
    console.log(y);
}
f(2);// 2
//上述代码由于参数y的默认参数x,调用f时，参数形成一个单独作用域，这个作用域里面，默认值变量x指向第一个参数x,而不是全局变量。


let x = 1;
function f(y = x){
    let x = 2;
    console.log(y);
}
f();//1
//函数f调用时，参数y=x形成一个单独的作用域，这个作用域里面，变量x本身没有定义，所以指向外层的全局变量。内部变量x影响不到默认值变量x。
```



利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出错误。



### rest参数

ES6引入rest参数，用于获取函数的多余参数，这样就不需要使用arguments对象了。

rest参数搭配的变量是一个数组，改变了将多余的参数放入数组中。

```javascript
//可以传入任意数目的参数。
function add(...values){
    let sum = 0;
    for (var val of values){
        sum += val;
    }
    return sum;
}
```

rest参数之后不能有其他参数，否则会报错。

函数的length属性，不包括rest参数。



### 严格模式

从ES5开始，函数内部可以设置为严格模式。

ES6规定，只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部不能显示设定了为严格模式。

> 这是因为函数内部的严格模式同样适用于函数体和函数参数，但是函数执行的时候，先执行函数参数，然后执行函数体。只有从函数体之中，才能知道参数是否以严格模式执行，但是参数却先于函数体执行。

两种方法规避这种限制：

- 全局设定严格模式

- 把函数包在一个无参数立即执行的函数里面

  ```javascript
  const doSomthting = (function(){
      'use strict';
      return function(value = 22){
          return value;
      }
  }())
  ```



### name属性

函数name属性，返回该函数的函数名。

ES6对这个属性做了修改，如果一个匿名函数赋值给一个变量，ES5的name属性会返回空字符串

ES6的name属性会返回实际的函数名。

```javascript
var f = function(){};

//ES5 
f.name; //''

//ES6
f.name //'f'
```



Function构造函数返回函数的实例，name属性的值为 anonymous。

bind返回的函数，name属性值会叫上bound前缀

```javascript
function foo(){};
foo.bind({}).name; // 'bound foo'
```



### 箭头函数

ES6允许使用箭头定义函数

```javascript
var f = v => v;
//等同于
var f = function(v){
    return v;
}
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

由于大括号被解释为代码块，所以箭头函数返回一个对象，必须在这个对象外面叫上括号。

注意：

1. 函数体内的this对象，就是定义时所在的对象
2. 不可以当做构造函数
3. 不可以使用arguments对象，该对象在函数体内不存在，可以用rest代替
4. 不可以使用yield命令，即箭头函数不能作为Generator函数

箭头函数this指向的固定化是因为箭头函数没有自己的this，导致内部的this就是外层代码块的this.



### 尾调优化

尾调用是指某个函数的最后一步是调用另一个函数。

```javascript
function f(x){
    return g(x);
}
```

尾调用与其他调用不同，就是在于它的特殊的调用位置。

函数调用会在内存形成一个"调用记录"（调用帧），保存调用位置和内部变量等信息。

多个调用帧会形成一个调用栈。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用刀，直接用内层函数的调用帧取代外层函数的调用帧即可。

```javascript
function f(){
    let m = 1;
    let n = 2;
    return g(m+n);
}
f();
//等同于
function f(){
    return g(3);
}
f();
//等同于
g(3);
```

尾调用优化，即只保留内层函数的调用帧。如果所有函数都是尾调用，那么每次执行时，调用帧只有一项，这就节约了内存空间，这就是尾调用优化的意义。



函数尾调用自身，就称为尾递归。

递归非常耗费内存，这是因为保存很多调用帧，容易发生栈溢出。对于尾递归，只存在一个调用帧，不会发生栈溢出。

```javascript
function factorial(n){
    if(n === 1) { return 1;}
    return n * factorial(n - 1);
}
//改成尾递归
function factorial(n, total){
    if(n === 1) return total;
    return factorial(n - 1, n * total);
}
factorial(5, 1);//120

//柯里化
function tailFactorial(n){
    return factorial(n, 1);
}
taiFactorial(5);//120
```

> 目前只有Safari浏览器支持尾调用优化，Chrome和Firfox都不支持。



函数式编程柯里化，就是讲多个参数的函数转换成单个参数的形式。



ES6的尾调优化只在严格模式下开启，正常模式无效的。这是因为在正常模式下，函数内部的两个边路，可以跟踪函数的调用栈。

- func.arguments: 返回调用时函数的参数
- func.caller: 返回调用当前函数的那个函数



尾调优化只在严格模式下生效，在正常模式下，可以将循环换掉递归，以达到减少调用栈，这样就不会发生栈溢出



### Function.prototype.toString()

ES2019对函数实例的toString方法作出了修改，返回函数diam本身，以前会省略注释与空格。



### catch命令的参数省略

ES2019允许catch语句省略参数。

```javascript
try{
    
}catch{
    
}
```



## 数组的扩展

扩展运算符是三个点，好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

该运算符主要用于函数的调用，只有在函数调用时，扩展运算符才可以放在圆括号中。



由于扩展运算符可以展开数组，所以不需要apply方法，将数组转为函数的参数了。

扩展运算符的应用：

- 复制数组
- 合并数组
- 与解构赋值结合
- 字符串转化为真正的数组
- 实现Iterator接口的对象，任何定义了遍历器接口的对象，都可以用扩展运算符转为真正的数组
- Map和Set结构，Generator函数



### Array.from()

该方法用于将两类对象转为真正的数组：

- 类数组对象
- 可遍历对象（Set和Map）



Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

Array.from可以传入第三个参数，用来绑定this。



### Array.of()

该方法用于将一组值，转为数组。

该方法的主要目的是弥补数组构造函数Array()的不足，因为参数个数不同，会导致Array()的行为有差异。

> 只有当Array方法参数个数不少于2个时，Array()才会返回由参数组成的新数组。
>
> 参数只有一个时，实际上是指定数组的长度。

Array.of基本可以替代Array() 或new Array()。总是返回参数组成的数组，没有参数时，返回一个空数组。

```javascript
//模拟代码
function ArrayOf(){
    return [].slice.call(arguments);
}
```



### 数组实例的copyWithin()

在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。

这个方法会修改当前数组。

接受三个参数：

- target, 从该位置开始替换数据
- start，从该位置开始读取数据，默认为0，可选
- end，从该位置停止读取数据，默认等于数组的长度，可选



### 数组实例 find() 和 findIndex()

数组实例find方法用于找出第一个符合条件的数组成员，参数是一个回调函数。找到返回该成员，否则返回undefined。

find方法的**回调函数**可以接受三个参数：

- 当前值
- 当前位置
- 原数组

数组findIndex方法的用法类似，返回第一个负荷条件的数组成员的位置，没有符合，则返回-1.

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象

这两个方法都可以发现NaN，弥补数组的indexOf方法的不足。



### 数组实例fill()

该方法使用给定值，填充一个数组。

fill方法可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

注意：

如果填充的类型为对象，那么被赋值的时同一内存地址的对象，而不是深拷贝对象。



### 数组实例entries(),keys(),values()

ES6提供三个新的方法用于遍历数组，他们都返回一个遍历器对象，可以用for...of循环进行遍历。



### 数组实例inclides()

Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值。

> indexOf只找出参数值得第一个出现的位置，且内部使用严格相等进行判断，会导致对NaN误判。



### 数组实例flat()、flatMap()

数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组变成一维数组。该方法返回一个新数组，对原数据没有影响。

flat()默认是一层，可以设置参数，表示层数。

> Infinity可以作为参数，不管多少层都转成一维数组
>
> 如果原数组有空位，则会跳过空位



flatMap方法对原数组的每个成员执行一个函数，然后对返回值组成的数组执行flat()方法，该方法返回一个新数组，不会改变原数组。

flatMap方法可以有第二个参数，用来绑定遍历函数里面的this



### 数组空位

表示数组的某一个位置没有任何值。

空位不是undefined，一个位置的值等于undefined，依然是有值的。

空位是没有任何值， in运算符可以说明这一点：

```javascript
0 in [undefined, undefined, undefined];//true
0 in [,,,]//false
```



ES5对空位处理很不一致，多数情况下回跳过空位。

**ES6明确将空位转为undefined**



### Array.prototype.sort()的排序稳定性

排序稳定性指排序关键字相同的项目，排序前后的顺序不变。

常见的排序算法中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等都是不稳定的。

Array.prototype.sort的稳定性由浏览器自己决定。



## 对象的扩展

ES6对对象进行了重大升级

### 属性的简洁表示法

ES6允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。

除了属性简洁，方法也可以简写。

CommonJS模块输出一组变量，适合使用简洁的写法。

属性的赋值器和取值器，事实上也是采用这种写法。



### 属性名表达式

ES6允许字面量定义对象时， 用[]作为对象的属性名，即把表达式放在中括号内。

属性名表达式与简洁表示法不能同时使用，会报错。

属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串。

```javascript
const keyA = { a: 1}
const keyB = { b: 2}
const obj = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
}
obj;//[object Object]
```



### 方法name属性

函数name属性返回函数名，对象方法也是函数，因此也有name属性。

如果对象的方法使用了取值函数和存值函数，则name属性不是在该方法上面，而是在该方法的属性描述对象的get和set属性上面，返回值是方法名前加上get和set

```javascript
const obj = {
    get foo(){},
    set foo(x){}
}

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
descriptor.get.name //get.foo
descriptor.set.name //set.foo
```

有两种特殊情况：

- bind方法创造的函数，name属性返回bound加上原函数的名字；

- Function构造函数创造的函数，name属性会返回anonymous

如果对象方法是一个Symbol值，那么name属性返回的时这个Symbol值得描述

```javascript
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
    [key1](){},
    [key2](){}
}
obj[key1].name;//'[description]'
obj[key2].name;//''
```



### 属性的可枚举性和遍历

可枚举性：对象的每个属性都有一个描述对象，用来控制该属性的行为。

```javascript
//Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象
let obj = { foo: 123};
Object.getOwnPropertyDescriptor(obj, 'foo');
/*
{
	value: 123,
	writable: true,
	enumerable: true,
	configurable: true
}
*/
```

描述对象的enumerable属性，称为可枚举性，若为false，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略enumberable为false的属性：

- for ... in循环，只遍历对象自身和继承的可枚举的属性
- Object.keys()： 返回对象自身的所有可枚举的属性的键名
- JSON.stringify()：只串行化对象自身的可枚举属性
- Object.assign()：只拷贝对象自身的可枚举属性



ES6规定，所有Class的原型方法都是不可枚举的

```javascript
Object.getOwnPropertyDescriptor(class { foo(){}}.prototype, 'foo').enumerable
```

在操作中，引入继承属性会让问题复杂化，大多数时只关心对象本身的属性，尽量使用Object.key()代替for ... in。



**ES6一共有5中方法可以遍历对象的属性**

- for ... in
- Object.keys(obj) 返回一个数组，包含对象自身所有可枚举属性的键名，不含Symbol
- Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身属性的键名，不含Symbol属性，但包括不可枚举
- Object.getOwnProprttySymbols(obj) 返回一个包含对象自身Symbol属性的键名
- Reflect.ownKeys(obj) 返回一个数组，包含对象自身所有键名，不管是Symbol还是字符串，也不管是否可枚举

> Reflect.ownKeys 方法的属性顺序是：首先是数值型，其次是字符串属性，最后是Symbol属性



### super关键字

this关键字总是指向函数所在的当前对象，ES6有新增super关键字，指向当前对象的原型对象。

```javascript
const proto = {
    foo: 'hello'
}
const obj = {
    foo: 'world',
    find(){
        return super.foo;
    }
};
Object.setPrototypeOf(obj, proto);
obj.find();//'hello'
```

JavaScript引擎内部，super.foo等同于Object.getPrototypeOf(this).foo或Object.getPrototypeOf(this).foo.call(this)



### 对象的扩展运算符

ES2018将这个运算符引入了对象。

对象解构赋值用于从一个对象取值，相当于将目标对象自身的所有可比案例的，单尚未被读取的属性，分配到指定的对象上面，所有的键和他们的值都被拷贝到新对象上面。

> 对象解构赋值要求等号右边是一个对象，所以若等号右边是undefined或null,就会报错，因为无法转为对象
>
> 等号右边的不是对象，先自动转为对象
>
> 解构赋值是浅拷贝，如果一个键值是复合类型的值，只拷贝这个值得引用，不是这个值得副本
>
> 扩展运算符的解构赋值不能复制继承自原型对象的属性



```javascript
let aClone = { ...a};
//等同于
let aClone = Object.assign({}, a);
```





### 链判断运算符

ES2020引入了链判断运算符 ?.

```javascript
const firstName = message?.body?.user?.firstName || 'default';

//判断对象方法是否存在，存在立即执行
iterator.return?.()
```

链判断运算符三种方法：

- obj?.prop 对象属性
- obj?.[expr] 对象属性
- func?.(...args) 函数或对象方法调用



> 注意： 
>
> - 短路机制，?.相当于是一种短路机制，不满足条件，就不会执行了
>
> - delete运算符
>
>   ```javascript
>   delete a?.b
>   //等同于
>   a === null ? undefined : delete a.b
>   ```
>
> - 括号的影响，链判断对圆括号外部没有影响，一般来说，使用?.场合就不应该使用圆括号
>
> - 右侧不得为十进制数值 ， 会看成小数点





### Null判断运算符

ES2020引入一个新的Null判断运算符??。类似||，但是只有运算符左侧的职位null或undefined才会返回右侧的值。

可以配合?.使用，为null或undefined的值设置默认值

```javascript
const animationDuration = response.setting?.animationDuration ?? 300;
```

这个运算符合适判断函数参数是否赋值

与&&或||使用时，必须用括号表明优先级。



## 对象的新增方法

### Object.is()

ES5比较两个值是否相等，有相等运算符和严格相等运算符。前者会自动转换类型，后者NaN不能等于自身，以及+0等于-0。

ES6提出了同值相等算法，Object.is()，用来比较两个值是否严格相等。

与===不同之处：+0不等于-0，NaN等于自身

```javascript
+0 === -0;//true
NaN === NaN; //false

Object.is(+0, -0);// false
Object.is(NaN, NaN); //true
```

ES5实现Object.is()

```javascript
Object.defineProperty(Object, 'is', {
    value: function(x, y){
        if(x === y){
            //针对+0不等于-0处理
            return x!==0 || 1/x === 1/y;
        }
        针对NaN处理
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
})
```



### Object.assign()

Object.assign()方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。

第一个参数是目标对象，后面的参数都是源对象，后面的属性会覆盖前面的属性。

如果不是参数，会先转为对象，对于首参null和undefined无法转对象的，直接报错，对于非首参且无法转对象的则直接跳过。

```javascript
Object.assign(obj, undefined) === obj;//true
```

对于数值、字符串、布尔值不在首参，也不会报错。除了字符串会以数组的形式，拷贝入目标对象，其他值都不会产生效果。

**Object.assign只能拷贝源对象的自身属性，不能拷贝继承属性，也不能拷贝不可枚举属性**

属性名为Symbol值得属性，也会被Object.assign拷贝。

注意：

- Object.assign是浅拷贝，即源对象某个属性的值是对象，则只拷贝这个对象的引用

- 同名属性的替换，一旦遇到同名属性，处理方法是替换，而不是添加

- 可以用来处理数组，将数组视为对象

  ```javascript
  Object.assign([1,2,3],[4,5]);//[4,5,3]
  ```

- 取值函数的处理，Object.assign只能进行值赋值，如果要复制的值是一个取值函数，那么将1求值后再复制。

常见用法：

1. 为对象添加属性

2. 为对象添加方法

3. 克隆对象

   > 只能克隆原始对象自身的值，不能克隆继承的值，可以用下面代码实现克隆继承：
   >
   > ```javascript
   > function clone(origin){
   >     let originProto = Object.getPrototypeOf(origin);
   >     return Object.assign(Object.create(originPorot), origin);
   > }
   > ```

4. 合并多个对象

   ```javascript
   const merge = (...sources) => Object.assign({}, ...source);
   ```

5. 为属性指定默认值



### Object.getOwnPropertyDescriptors()

ES5中Object.getOwnPropertyDescriptor返回某个对象属性的描述对象。

ES2017引入Object.getOwnPropertyDescriptors返回指定对象所有自身属性（非继承）的描述对象。

```javascript
function getOwnPropertyDescriptors(obj){
    const result = {};
    for(let key of Reflect.ownKeys(obj)){ //返回一个对象的所有键名
        result[key] = Object.getOwnPropertyDescriptor(obj, key);
    }
    return result;
}
```

该方法引入的目的，主要解决Object.assign无法正确拷贝get和set属性的问题：

```javascript
const source = {
    set foo(value){
        console.log(value);
    }
}

const target = {};
Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target, 'foo');
```



另一个用处是配合Object.create方法，将对象属性克隆岛一个新对象，属于浅拷贝。

```javascript
const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```



Object.getOwnPropertyDescriptors方法可以实现一个对象继承另一个对象。

```javascript
//以前写法
const obj = Object.assign(
  	Object.create(prot),
    {
        foo: 123
    }
)
//现在写法
const obj = Object.create(prot, Object.getOwnPropertyDescriptors({foo:123}));
```



实现混入模式Mixin

```javascript
let mix = (object) => ({
    with: (...mixins) => mixins.reduce(
    	(c, mixin) => Object.create(
        	c, Object.getOwnPropertyDescriptors(mixin)
        ), object)
});

let a = { a: 'a'}
let b = { b: 'b'}
let c = { c: 'c'}
let d = mix(c).with(a,b);
```





### \_\_proto\_\_属性，Object.setPrototypeOf(),Object.getPrototypeOf()

JavaScript语言的对象继承是通过原型链实现的

ES6提供了原型对象的操作方法

\_\_proto\_\_是一个内部属性，该属性的值就是对象的原型，一般情况下使用Object.setPrototypeOf、Object.getPrototypeOf()、Object.create()代替。



Object.setPrototypeOf方法的作用与\_\_protot\_\_相同，用来设置一个对象的原型对象，返回参数对象本身。

这个方法是ES6正式推荐设置原型的方法。

```javascript
Object.setPrototypeOf(object, prototype);
const o = Object.setPrototypeOf({}, null);
```



Object.getPrototypeOf()用于读取一个对象的原型对象。

```javascript
Object.getPtototypeOf(obj);
//如果参数不是对象，则自动转为对象
//如果参数为undefined或null，则报错
```



### Object.keys(), Object.values(), Object.entries()

Object.keys方法返回一个数组，成员是参数对象自身的所有可比案例属性的键名

Object.values和Object.entries作为一个对象的补充手段，供for ...of循环使用。

Object.values返回一个数组，成员是参数对象自身所有可遍历（enurmerable）属性的键值

```javascript
const obj = Object.create({}, { p: {value:42}})
```

Object.create方法的第二个参数添加的对象属性，如果不显示声明，默认是不可遍历的（enurmerable:fa;se）

object.values会过滤属性名为Symbol值得属性



Object.entries()返回一个数组，成员是参数对象自身的所有可遍历属性的键值对数组。

如果原对象的属性名是一个Symbol值，该属性会被忽略。

Object.entries的基本用途是遍历对象属性。

Object.entries的另一个用处是将对象转为真正的Map解构：

```javascript
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
```



**Object.fromEntries()**是方法Object.entries()的逆操作，用于将一个键值对数组转为对象。

```javascript
const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
])
Object.fromEntries(entries);//{foo: 'bar', baz: 42}

const map = new Map().set('foo', true).set('bar',flase);
Object.fromEntries(map);
```



配合**URLSearchParams**对象，将查询字符串转为对象

Object.fromEntries(new URLSearchParams('foo=bar&baz=que'))



## Symbol

ES6引入了一种新的原始数据类型Symbol，表示独一无二的值，是第七种数据类型。

> - undefined
> - null
> - boolean
> - string
> - number
> - object
> - symbol



Symbol的值通过Symbol函数生成，即对象的属性名现在可以有两种类型：

- 字符串类型
- Symbol类型

```javascript
let s = Symbol();
typeof s;//symbol
```

注意：Symbol函数前不能使用new命令，这是因为生成Symbol是一个原始类型的值，不是对象，即Symbol值不是对象，所以不能添加属性。

Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了控制台显示，转字符串时区分。

如果Symbol参数是一个对象，就会调用该对象的toString方法，转为字符串，然后再生成Symbol值。

Symbol函数的参数只是表示对当前Symbol值的描述，相同参数的Symbol函数的返回值是不相等的。

```javascript
let s1 = Symbol();
let s2 = Symbol();
s1 === s2;//false
```

Symbol值不能与其他类型的值进行运算，但是可以显示转为字符串，布尔值。（不能转为数值）



### Symbol.prototype.description

创建Symbol的时候，可以添加一个描述。

ES2019提供了一个实例属性的description，直接返回Symbol的描述

```javascript
const sym = Symbol('foo');
sym.description //'foo'
```



### 作为属性名的Symbol

由于每个Symbol值都是不相等的，就能保证不会出现同名属性，这对于一个对象由多个模块构成，防止某一个键被覆盖。

Symbol值作为对象属性名时，不能用电运算符。

Symbol类型可以用于定义一组常量，保证这组常量的值都是不相等的。

常量使用Symbol值最大的好处，就是任何其他值都不会有相同的值了。



### 消除魔术字符串

魔术字符串是指在代码中多次出现，与代码形成强耦合的某个具体字符串或数值。



### 属性的遍历

Symbol作为属性名，遍历对象的时候，该属性不会出现在for...in,for...of循环中，也不会被Object.keys，Object.getOwnPropertyNames()，JSON.stringify()返回。

通过Object.getOwnPropertySymbols方法可以获取指定对象的所有Symbol属性名。

Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和Symbol键名。

可以利用Symbol值作为键名不会被常规方法遍历的特性，为对象定义些非私有的，但只用于内部的方法。



### Symbol.for()，Symbol.keyFor()

使用同一个Symbol值，Symbol.for()方法可以做到。

接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，返回这个Symbol的值，否则新建一个以该字符串为名称的Symbol值，并注册到全局。

```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2;//true
```



### 模块的Singleton模式

Singleton模式指调用一个类，任何时候返回的都是同一个实例。

对于Node来说，模块文件可以看出一个类。

```javascript
//mod.js
const FOO_KEY = Symbol('foo');
function A(){
	this.foo = 'hello';
}
if(!global[FOO_KEY]){
    global[FOO_KEY] = new A();
}

module.export = global[FOO_KEY];
```



### 内置Symbol值

- Symbol.hasInstance 指向一个内部方法，当其他对象使用instanceof运算符是，判断是否为该对象实例的时，会调用这个方法。

- 对象的Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象用于Array.prototype.concat时，是否可以展开。

- 对象的Symbol.species属性指向一个构造函数，创建衍生对象时，会使用该对象。

- 对象的Symbol.match属性指向一个函数，当执行str.match(obj)时，如果该属性存在，会调用它，返回该方法的返回值。

- 对象Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。

- 对象Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，返回该方法的返回值

- 对象Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，返回该方法的返回值。

- 对象Symbol.iterator属性，指向该对象的默认遍历器方法。对象进行for...of循环是，会调用Symbol.iterator方法，返回该对象的默认遍历器。

- 对象Symbol.toPrimitive属性，指向一个方法，该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

  > Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前的运算模式：
  >
  > - Number：该场合需要转为数值
  > - String：转为字符串
  > - Default：转成数值也可以转为字符串

- 对象Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，返回值出现在toString方法返回的字符串中，表示对象类型。这个属性用来定制[object Object]或[object Array]中object后面的那个字符串。

- 对象Symbol.unscopables属性，指向一个对象，该对象指定使用with关键字时，那些属性被with环境排除。

  ```javascript
  Array.prototype[Symbol.unscopables];
  ```



## Set和Map数据结构

### Set

ES6提供了新的数据结构Set，类似于数组，但是成员的值都是唯一的。

Set本身是一个构造函数，用来生成Set数据结构。

Set函数可以接受一个数组或具有iterable接口的其他数据结构作为参数，用来初始化。

向Set加入值的识货，不会发生类型转换，5和'5'是两个不同的值。

在Set内部，NaN是相等的，两个对象总是不相等的。



**Set实例的属性和方法**

- Set.prototype.constructor: 构造函数，默认就是Set函数
- Set.prototype.size 返回Set实例成员的总数。
- Set.prototype.add(value) 添加某个值，返回Set结构本身
- Set.prototype.delete(value) 删除某个值，返回一个布尔值，表示是否删除成功
- Set.prototype.has(value) 返回一个布尔值，表示该值是否为Set的成员
- Set.prototype.clear() 清除所有成员，没有返回值



**遍历操作**

Set结构的实例有四个遍历方法，可用于遍历成员：

- Set.prototype.keys 
- Set.prototype.values
- Set.prototype.entries
- Set.prototype.forEach

Set遍历的顺序就是插入的顺序

扩展运算符内部使用for...of循环，所有也可以用于Set结构，所以使用Set容易实现并集、交集、差集。

遍历过程中，同步改变原来的Set结构：

1. 利用原Set结构映射出一个新的结构，然后赋值给原来的Set

2. 利用Array.from方法

   ```javascript
   let set = new Set([1,2,3]);
   set = new Set([...set].map(val => val*2));
   
   set = new Set(Array.from(set, val =>val * 2))
   ```



### WeakSet

与Set结构类似，区别：

- WeakSet成员只能是对象，不能是其他类型

- WeakSet中的对象都是弱引用，即垃圾回收机制会自动回收该对象所用的内存，不考虑该对象还存在WeakSet中

  > 垃圾回收机制以来引用计数，如果引用次数不为0，就不会释放这块内存。
  >
  > WeakSet里面的引用，都不计入垃圾回收机制

ES6规定WeakSet不可遍历。

WeakSet结构方法：

- WeakSet.prototype.add(value)
- WeakSet.prototype.delete(value)
- WeakSet.prototype.has(value)



### Map

JavaScript的对象Object，本质上是键值对的集合，但是传统上只能用字符串当做键，所以有很大限制。

ES6提供了Map数据结构，类似对象，也是键值对的集合。

如果需要使用键值对的数据结构，Map比Object更合适。

任何具有Iterator接口且每个成员都是一个双元素的数组的数据结构，够可以当做Map构造函数的参数，Set和Map都可以用来生成新的Map。

Map的键实际上是和内存地址绑定的，只要内存地址不一样，就视为两个键。

若Map的键是一个简单类型的值，则只要两个值严格相等，Map视为一个键，例如：0和-0就是一个键，NaN视为一个键



**实例的属性和方法**

- size 返回Map结构的成员总数
- Map.prototype.set(key, value)
- Map.prototype.get(key)
- Map.prototype.has(key)
- Map.prototype.delete(key)
- Map.prototype.clear()



**遍历方法**

- Map.prototype.keys()
- Map.prototype.values()
- Map.prototype.entries()
- Map.prototype.forEach()

Map的遍历顺序就是插入顺序

Map结构转数组结构，比较快速的方法是扩展运算符

结合数组map方法，filter方法，可以实现Map的遍历和过滤

与其他数据结构相互转换：

- Map转数组
- 数组转Map
- Map转对象
- 对象转Map 
- Map转JSON
- JSON转Map



### WeakMap

结构与Map类似，用于生产键值对的集合。

与Map区别：

- WeakMap值接受对象作为键名（null除外），不能结构其他类型的值作为键名
- WeakMap的键名所指向的对象，不计入垃圾回收机制

WeakMap设计的目的在于，若想在某个对象上面存放一些数据，但会形成对这个对象的引用，一旦不需要，则必须手动删除这个引用，否则垃圾回收机制不会释放内存。

即往对象上添加数据，有不干扰垃圾回收机制，就是用WeakMap。

典型应用：在网页DOM元素上添加数据，当DOM元素被清除是，对应的WeakMap记录也自动被移除。

```javascript
const wm = new WeakMap();
const element = document.getElementById('example');
wm.set(element, 'some information');
wm.get(element);
```



WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。



## Proxy

Proxy用于修改某些操作的默认行为，等同于在语言层面作出修改，属于一种"**元编程**"，即对编程语言进行编程。

Proxy在目标对象之前有一层拦截，外界对该对象的访问，都必须通过这层拦截，所以可以对外界的访问进行**过滤和改写**。

```javascript
var obj = new Proxy({}, {
    get: function(target, propKey, receiver){
        consonle.log(`getting ${propKey}`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function(target, propKey,value, receiver){
        constole.log(`setting ${propKey}`);
        return Relect.set(target, propKey, value, receiver)
    }
});

//重新定义了属性的读写行为。
```



ES6原生提供了Proxy构造函数，用来生成Proxy实例。

```javascript
var proxy = new Proxy(target, handler);
//target参数表示要拦截的目标对象
//handler参数是一个对象，用来定义拦截行为
```

注意：

- 要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象。
- 如果没有handler设置拦截，则直接通向原对象

```javascript
var proxy = new Proxy({}, {
    get: function(target, propKey){
        return 22;
    }
})
proxy.time//22
proxy.name//22  对proxy实例操作
```



**技巧**：将Proxy对象，设置到object.proxy属性，从而可以在object对象上调用。

```javascript
var object = { proxy: new Proxy(target, handler)};
```

Proxy实例也可以作为其他对象的原型对象。

```javascript
var proxy = new Proxy({},{
    get: function(target, propKey){
        return 33;
    }
})
let obj = Object.create(proxy);
obj.time //33
//proxy对象是obj对象的原型，obj对象本身没有time属性，根据原型链，会在proxy对象上读取该属性，导致被拦截。
```



**Proxy支持的拦截操作：**

- get(target, propKey, receiver) 拦截读取对象
- set(target, propKey, value, receiver) 拦截对象属性的设置
- has(target, propKey) 拦截prop in proxy操作，返回布尔值
- deleteProperty(target, propKey) 拦截 delete proxy[propKey]操作，返回布尔值
- ownKeys(target) 拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for ... in 循环，返回一个数组。返回目标对象所有自身的属性的属性名。Object.keys()返回结果仅包括目标对象自身可遍历的属性
- getOwnPropertyDescriptor(target, propKey)拦截Object.getOwnPropertyDescriptor(proxy,propKey)，返回属性的描述对象
- defineProperty(target, propKey, propDesc) 拦截Object.defineProperty(proxy,propKey,propDesc)、Object.defineProperties(proxy,propDescs) 返回一个布尔值。
- preventExtensions(target) 拦截Object.preventExtensions(proxy)，返回一个布尔值
- getPrototypeOf(target) 拦截Object.getPrototypeOf(proxy)，返回一个对象
- isExtensible(target) 拦截Object.isExtensible(proxy)，返回一个布尔值
- setPrototypeOd(target,  proto) 拦截Object.setPtototypeOf(proxy,proto)，返回一个布尔值
- apply(target, object, args) 拦截Proxy实例走位函数调用的操作 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
- construct(target, args) 拦截Proxy实例作为构造函数调用的操作，new proxy(...args)



### Proxy实例方法

get方法用于拦截某个属性的读取操作，接受三个参数：目标对象，属性名和proxy实例本身（操作行为所针对的对象，可选）

```javascript
var person = {
    name: 'larry'
};
var proxy = new Proxy(person, {
    get: function(target, propKey, receiver){
        if(propKey in target){
            return target[propKey];
        }else{
            throw new ReferenceError(`Prop name ${propKey} does not exist.`);
        }
    }
})
```



```javascript
//读取数组的负数索引
function createArray(...elements){
    let handler = {
        get(target, propKey, receiver){
            let index = Number(propKey);
            if(index < 0){
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    };
    
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}

let arr = createArray('a','b', 'c');
arr[-2];//b
```



```javascript
//利用Proxy,将读取属性的操作，转变为执行某个函数，实现链式操作
var pipe = function(value){
    var funStack = [];
    var oproxy = new Proxy({}, {
        get(pipeObject, fnName){
            if(fnName === 'get'){
                return funcStack.reduce(function(val, fn){
                    return fn(val);
                }, value);
            }
            funcStack.push(window[fnName]);
            return oproxy;
        }
    });
    return oproxy;
}

var double = n =>n*2;
var pow = n =>n *n;
var reverseInt = n =>n.toString().split("").reverse().join("")|0;
pipe(3).double.pow.reverseInt.get;
```



如果一个属性不可配置且不可写，则Proxy不能修该属性，否则通过Proxy对象访问该属性会报错。



set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象，属性名，属性值，Proxy本身（可选）

```javascript
let validator = {
    set(obj, prop, value){
        if(prop === 'age'){
            if(Number.isInteger(value)){
                throw new TypeError('The age is not an integer.');
            }
            if(value > 200){
                throw new RangeError('the age is invalid.')
            }
        }
        obj[prop] = value;
    }
}

let person = new Proxy({}, validator);
person.age = 100;
person.age = 'aa';
person.age = 300;
```



在对象上设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用，这时结合get和set方法，可以做到防止这些内部属性被外部读写。

注意：如果目标对象自身的某个属性，不可写且不可配置，则set方法将不起作用。

严格模式下，set代理如果没有返回true，就会报错。



**apply()**方法拦截函数的调用，call和apply操作。

Reflect.apply()通过制定的参数列表发起对目标函数的调用，有三个参数：目标函数，函数调用时绑定的this对象，实参列表（类数组对象）

apply可以接受三个参数：目标对象，目标对象的上下文（this）,目标对象的参数数组。

```javascript
var handler = {
    apply(target, ctx, args){
        return Reflect.apply(...arguments);
    }
}
```

```javascript
var target = function(){ return 'I am the target'; };
var handler = {
    apply: function(){
        return 'I am the proxy';
    }
};
var p = new Proxy(target, handler);
p();
//变量p是Proxy的实例，当它作为函数调用的时候，就会被apply拦截，返回一个字符串。
```



```javascript
var twice = {
    apply(target, ctx, args){
        return Reflect.apply(...arguments)*2;
    }
}
function sum(left, right){
    return left+right;
}
var proxy = new Proxy(sum, twice);
proxy(1,2);//6
proxy.call(null, 5, 6);
proxy.apply(null, [2,8]);
//每当执行proxy函数，就会被apply方法拦截
```



**has()**方法用来拦截**HasProperty**操作，即判断对象是否具有某个属性时，这个方法会生效。

has方法可以接受两个参数，分别是目标对象，需查询的属性名。

如果原对象不可配置或禁止扩展，这时has拦截会报错。

has方法拦截对for...in 循环不生效。

```javascript
var handler = {
    has(target, key){
        if(key[0] === '_'){
            return false;
        }
        return key in target;
    }
};
```



**construct()**方法用于拦截new命令

接受三个参数：

- target 目标对象
- args 构造函数的参数对象
- newTarget 创造实例对象时，new命令作用的构造函数

```javascript
let handler = {
    construct: function(target, args){
        console.log('called:' + args.join(','));
        return { value: args[0] *10};
    }
}
var p = new Proxy(function(){}, handler);
(new p(1)).value;
```

construct方法必须返回一个对象，否则会报错。





**deleteProperty()**方法用于拦截delete操作，如果这个方法抛出错误或返回false，当前属性就无法被delete删除。

注意：目标对象自身的不可配置的属性，不能被删除，否则报错。

```javascript
var handler = {
    deleteProxy(target, key){
        invariant(key, 'delete');
        delete target[key];
        return true;
    }
}
function invariant(key, action){
    if(key[0] === '_'){
        throw new Error('invalid attempt to ${action} private "${key}" property.')
    }
}
var target = { _prop:'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop;
```



**defineProperty()**方法拦截 Object.defineProperty()操作。

```javascript
var handler = {
    defineProperty(target, key, descriptor){
        return false;
    }
}
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar';//不会生效
```



**getOwnPropertyDescriptor()**方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或undefined。



**getPrototypeOf()**方法主要用来拦截获取对象原型，拦截以下操作：

- Object.prototype.\_\_proto\_\_
- Object.prototype.isPrototypeOf()
- Object.getPrototypeOf()
- Reflect.getPrototypeOf()
- instanceof



**ownKeys()**方法用来拦截对象自身属性的读取操作：

- Object.getOwnPropertyNames()
- Object.getOwnPropetySymbols()
- Object.keys()
- for ... in循环





### Proxy.revocable()

该方法返回一个可以取消Proxy的实例

```javascript
let target = {};
let handler = {};
let { proxy, revoke } = Proxy.revocable(target, handler);
proxy.foo = 123;
proxy.foo//123
revoke();
proxy.foo//TypeError: Revoked
```



### this问题

在Proxy代理的情况下，目标对象内部的this关键字会指向Proxy代理。

```javascript
const target = {
    m: function(){
        console.log(this === proxy);
    }
}
const handler = {}
const proxy = new Proxy(target, handler);
target.m();//false
proxy.m();//true
```



### Web服务客户端

Proxy对象可以拦截目标对象的任意属性，可以写Web服务客户端

```javascript
const service = createWebService('http://baidu.com');
service.employees().then(json => {
    const employees = JSON.parse(json);
})
//Proxy可以拦截这个对象的任意属性
function createWebService(baseUrl){
    return new Proxy({}, {
        get(target, propKey, receiver){
            return ()=> httpGet(baseUrl + '/' + propKey);
        }
    })
}
```

Proxy也可以实现数据库的ORM层