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