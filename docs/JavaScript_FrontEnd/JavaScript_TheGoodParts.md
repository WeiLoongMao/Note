# JavaScript: The Good Parts

JavaScript优秀的想法包括函数、弱类型、动态对象、对象字面量表示法。

JavaScript的函数主要基于词法作用于（lexical scoping）的顶级对象。

JavaScript有一个无类型对象系统，对象直接从其他对象继承属性，这个就是原型继承的概念。



## 语法

### 空白

空白可能表现为被格式化的字符或注释形式。

空白通常没有意义，主要用空白分割字符序列，否则会被合并为一个符号。

注意注释导致语法错误：

```javascript
/*
 var rm_a = /a*/.match(s);
*/
```



### 标识符

标识符由一个字母开头，后面选择性加上一个或者多个字母、数字、下划线。

标识符被用于语句、变量、参数、属性名、运算符和标记。



### 数字

JavaScript只有一个数字类型，内部被表示为64位浮点数。

如果一个数字字面量有指数部分，name这个字面量的值等于e之前的数字与10的e之后数字的次方相乘。

NaN是一个数值，它表示一个不能产生正常的运算结果。

NaN不等于任何值，包括自身。

Infinity表示所有大于1.7976313486231570e+308的值。

Math对象，用于数字的方法。



### 字符串

由于JavaScript被创建的时候，Unicode是一个16位的字符集，所以JavaScript中的所有字符都是16位的。

JavaScript中没有字符类型，要表示一个字符，只需创建仅包含一个字符的字符串即可。

\u约定用来指数字字符编码，例如：'\u0041' ==='A'

字符串有一个length属性，表示长度。

字符串是不可变得，一旦创建就不能改变。

两个包含着完全相同的字符且字符顺序也相同的字符串被认为是相同字符串。



### 语句

一个编译单元包含一组可执行的语句。在Web浏览器中，每个\<script\>标签提供一个被编译且立即执行的编译单元。

当var语句被用在函数内部时，var定义的时函数的**私有变量**。(函数作用域)

switch、while、for 和 do语句允许一个可选标签label，配合break语句使用。

语句的执行顺序**从上到下**。

**代码块**是包在一对花括号中的一组语句。*JavaScript代码块不会创建新的作用域*，因此变量应该在函数头部，而不是代码块中。

除以下值外，都是真：

- false
- null
- undefined
- 空字符串
- 0
- NaN



switch语句、while语句、for语句、do语句

for in语句会枚举一个对象的所有属性名。

**try语句**执行一个代码块，并捕获giant代码块抛出的任何一次。

**catch从句**定义一个新的变量variable来接受抛出的异常对象。

throw语句抛出一个异常：

- 如果throw在try代码块内，则控制流会跳转到catch从句中。
- 如果throw语句在函数中，则该函数调用放弃，控制流跳转到调用该函数的try语句的catch从句中。

throw语句中的表达式通常是一个对象字面量，它包含一个name属性和一个message属性。

return语句，如果未指定返回值，则默认返回undefined。

**不允许在return/break关键字和表达式之间换行**



### 表达式

最简单的表达式是字面量值、变量、内置的值、以new开头的调用表达式、以delete开头的属性提取表达式、包括圆括号中的表达式、以一个前置运算符作为前导的表达式或表达式后跟：

- 一个中置运算符与另一个表达式
- 三元运算符
- 一个函数调用
- 一个属性提取表达式

运算符优先级：

| 符号                    | 定义               |
| ----------------------- | ------------------ |
| . []  ()                | 提取属性与调用函数 |
| delete new typeof + - ! | 一元运算符         |
| * /  %                  | 乘法、除法、求余   |
| + -                     | 加法/连接 、减法   |
| \>= \<= \> \<           | 不等式运算符       |
| ===  !==                | 等式运算符         |
| &&                      | 逻辑与             |
| \|\|                    | 逻辑或             |
| ？ ：                   | 三元运算符         |

> null 结果是object，这个是设计遗留问题
>
> \+ 运算符可以是加法或字符串连接，要用加法，必须确保两个数是数字
>
> / 即使两个都是整数，也有可能产生非整数结果
>
> && 结果是第二个表达式的结果
>
> || 优先取前一个表达式的值，如果非false,则取第二个表达式的值
>
> 函数调用引发函数执行



### 字面量

对象字面量是一种按指定规格创建新对象的表示法。

数组字面量是一种按指定规格创建新数组的表示法。

正则字面量



### 函数

含住字面量定义了函数值。它可以有一个可选的名字，用于递归调用自己。可以指定一个参数列表，这些参数就像变量一样，在调用时由传递的实际参数初始化。

函数的主体包括变量定义和语句。



## 对象

JavaScript简单数据包括数字、字符串、布尔值、null、undefined，其余都是值都是对象。

数组是对象，函数是对象，正则表达式是对象。

对象是属性的容器，每个属性都有名字和值。属性的名字可以是包括空字符串以内的任意字符串，属性值是可以除undefined值之外的任何值。

JavaScript里的对象是无类型的。它对新属性的名字和属性值没有限制。

对象适合用于汇集和管理数据。

JavaScript包含一种原型链的特性，允许对象继承另一个对象的属性。



### 检索

检索对象里面包含的值，可以采用[]后缀中括住一个字符串表达式的方式。

若字符串表达式是一个字符串字面量且是一个合法的标识符且不是保留字，也可以用**.**表示法。

检索一个并不存在的成员属性的值，将返回undefined。

|| 运算符可以用来填充默认值



### 更新

对象里的值可以通过赋值语句来更新。



### 引用

对象通过引用来传递，永远不会被复制。



### 原型

每个对象都连接到一个原型对象，并且它可以从中继承属性。

所有通过对象字面量创建的对象都连接到Object.prototype，是JavaScript中的标配对象。

**当创建一个新对象的时候，可以选择某个对象作为它的原型。**

```javascript
if(typeof Object.create !== 'function'){
  Object.create = function(o){
    var F = function(){};
    F.prototype = o;
    return new F();
  }
}
var newObj = Object.create(obj);
```



**原型连接在更新时是不起作用的，当对某个对象改变时，不会触及该对象的原型**

**原型连接只有在检索值的时候用到**，若尝试去访问某个对象的某个属性值，但是该对象没有此属性，则会尝试从他的原型对象中获取，如果没有，依次查找父级的原型中，至Object.prototype，如果没有，则返回undefined。这个过程称为**委托**。



原型关系是一种动态关系，当添加一个新的属性到原型中，该属性会立即对所有基于giant原型创建的对象可见。



### 反射

检查对象并确定对象有什么属性，typeof操作符可以确定属性的类型。

可以使用hasOwnProperty方法判断时都是对象独有的属性，这个方法不会检查原型链。



### 枚举

for in语句可以用来遍历一个对象中的所有属性。该枚举过程会列出所有的属性（包括函数和原型中的属性），常用hasOwnProperty和typeof过滤属性和函数。



### 删除

delete运算符可以用来删除对象的属性。如果包含该属性，则该属性被移除，不会触及原型链中的任何对象。

主要作用是：删除对象的属性可以让来自原型链中的属性暴露出来。



## 函数

函数包含一组语句，是JavaScript的基础模块单元，用于代码复用、信息隐藏和组合调用。

所谓编程，就是将一组需求分解成一组函数与数据结构的技能。



### 函数对象

JavaScript中的函数就是对象。对象是key/value的集合并有一个连接到原型丢下的隐藏连接。

对象字面量产生的对象连接到Object.prototype，函数对象连接到Funtion.prototype(改对象本身连接到Object.prototype)。

**每个函数在创建时会附加两个隐藏属性：函数上下文和实现函数行为的代码。**

每个函数对象在创建的时候都有个prototype属性，它的值为拥有constructor属性且值为该函数本身的对象。

```javascript
function Person(name, age){
  this.name = name;
  this.age = age;
}
Person.prototype = { constructor: Person };
Person.prototype.constructor === Person; //true
```



由于函数是对象，可以像其他值一样使用。函数可以保存变量、对象和数组中。

**函数的与众不同是可以被调用。**



### 函数字面量

函数字面量可以出现在任何允许表达式出现的地方。函数也可以被定义在其他函数中。

一个内部函数能访问把它嵌套在其中的父函数的参数与变量。通过字面量创建的函数对象包含一个连接到外部上下文的连接，被称为**闭包（closure）**.



### 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。

除了定义的形参，每个函数还会接受两个附加参数： **this和arugments**

this决定调用模式：

- 方法调用
- 函数调用
- 构造器调用
- apply调用

实际参数arguments的个数与形式参数的个数不匹配的，不会导致错误，实际参数过多会被忽略，过少，则缺省值被替换为undefined，对参数值不会进行类型检查，任何类型值都可以被传递给任何参数。



### 方法调用模式

当一个函数被保存为对象的输一个属性时，就称为一个方法。当这个方法被调用的时候，this就被绑定到该对象。若调用表达式包含一个提取属性（.或[]），那么就被当做方法来调用。

通过this可以获取他们所属对象的上下文的方法称为公共方法。



### 函数调用模式

当一个函数并非一个对象的属性时，那么被当做一个函数来调用。

```javascript
var sum = add(3, 4);
```

以此模式调用时，this被绑定到全局对象。

可以通过内部函数访问父级函数中的定义that，绑定this上下文。

```javascript
myObject.double = function(){
  var that = this;
  var helper = function(){
    that.value = add(that.value, that.value);
  }
  helper();
}
```



### 构造器模式

JavaScript是基于**原型继承**的语音，意味着对象可以直接从其他对象继承属性。

如果在一个函数前面带上 **new**来调用，则会创建一个连接到该函数的prototype成员的对象，同时 this 也会被绑定到新对象上。

```javascript
function Person(name, age){
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function(){
  return this.name;
}

var p1 = new Person('larry', 18);
p1.__proto__ = Person.prototype;  //创建一个连接到该函数prototype的新对象p1
```

用new前缀来调用，被称为构造器函数。



### Apply调用模式

JavaScript是函数式的面向对象语言，所以函数可以有方法。

apply方法可以构建一个参数数组传递给调用函数，允许选择this的值。第一个参数是this，第二个数参数数组。



### 参数

当函数被调用的时候，会有一个隐藏的参数数组 arguments，函数可以通过此参数访问所有他被调用时传递给它的参数列表，包括没有被分配给函数声明时顶一个的形式参数的多余参数。

```javascript
function sum(){
  var i = 0, sum = 0;
  for(let i = 0; i < arguments.length; i++){
    sum += arugments[i];
  }
  return sum;
}
```



### 返回

当一个函数被调用的识货，从第一个语句开始执行，遇到大括号结束。然后把控制权还给调用该函数的程序。

reutrn语句是用来提前返回，不执行余下语句。

一个函数总会返回一个值，如果没有返回值，则返回undefined。

**当调用时前面加new，且返回值并不是一个对象，则返回this（该新对象）**



### 异常

**throw**语句中断函数的执行，应该抛出一个exception对象，该对象包含一个用来识别异常类型的name属性和一个描述性的message属性。也可以添加其他属性。

**exception对象将被送到一个try语句的catch从句。**

在try内抛出一个异常，控制权就跳转到catch语句。

一个try语句只会有一个捕获异常的catch代码块。



### 扩充类型的功能

可以给基本类型扩充功能，例如可以给Object.prototype添加方法，则对所有对象都可用。

```javascript
//增加method方法后，可以省去prtotype
Function.prototype.method = function(name, func){
  if(!this.prototype[name]){
    this.prototype[name] = func;
  	return this;
  }
}
Number.method('integer', function(){
  return Math[this < 0 ? 'ceil': 'floor'](this);
})
```



### 递归

递归函数就是会直接或间接调用自身的一种函数。

汉诺塔，现有三根柱子和一套直径各不相同的圆盘。目标是通过每次移动一个圆盘到另一根柱子上，最终把一堆圆盘移动到目标柱子上，过程中不可以把大圆盘放在小圆盘之上。

```javascript
function hanoi(disc, src, aux, dst){
    if(disc > 0){
        hanoi(disc -1, src, dst, aux);
        console.log("move disc" + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc-1, aux, src, dst);
    }
}
```



### 作用域

作用域控制着变量与参数的可见性及生命周期。

JavaScript有函数作用域，即定义在函数中的参数和变量在函数外部是不可见的，在函数内部任何位置定义的变量，在该函数内部任意位置都课件。

JavaScript并不支持块级作用域。

在函数体的顶部声明函数中可能用到的所有变量，是一种比较好的做法。



### 闭包

作用域的好处是内部函数可以访问定义他们外部函数的参数和变量。

内部函数拥有比外部函数更长的生命周期。

函数可以访问它被创建时所处的上下文环境，这称为闭包。

> 避免在循环中创建函数，可能带来无谓的计算。可以现在循环之外创建一个辅助函数，通过这个辅助函数再返回一个绑定了当前i值得函数。



### 回调

异步请求，提供一个当服务器的响应到达时随即触发的回调函数，异步函数立即返回，这样不会被阻塞。



### 模块

使用函数和闭包来构造模块。

模块是一个提供接口却隐藏状态与实现的函数或对象，通过使用函数产生模块，可以摒弃全局变量的使用。

模块模式利用了函数作用域和闭包来创建被绑定对象与私有成员的关联。

模块模式的一般形式：

1. 一个定义了私有变量和函数的函数
2. 利用闭包创建可以访问私有变量和函数的特权函数
3. 返回特权函数或保存到一个可以访问的地方

```javascript
var serial_maker = function(){
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function(p){
            prefix = String(p);
        },
        set_seq: function(s){
            seq = s;
        },
        gensym: function(){
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    }
}

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
```



### 级联

可以使方法返回this而不是undefined，可以启用级联。

在一个几连中，可以在单独一条语句中依次调用同一个对象的很多方法。

可以给那些构造"全能"接口降降温，一个接口没必要一次做太多的事情。



### 柯里化

函数也是值。**柯里化允许把函数与传递给它的参数相结合，产生一个新的函数。**

```javascript
var add1 = add.curry(1);

Function.method('curry', function(){
    var args = Array.prototype.slice.apply(arguments);
    var that = this;
    return function(){
        return that.apply(null, args.concat([].slice.apply(arguments)));
    }
});
```

curry方法通过创建一个保存着原始函数和要被套用的参数的闭包来工作，返回另一个函数，该函数被调用时，会返回调用原始函数的把结果，并传递调用curry时参数加上当前调用的参数。



### 记忆

函数可以将先前操作的记过记录在某个对象里，从而避免重复运算，这种优化被称为记忆。

通过记忆功能，可以显著减少运算量。

在memo的数组里保存储结果，存储结果可以隐藏在笔包装，当函数被调用时，先检查结果是否存在，如果存在，就立即返回这个结果。

```javascript
var fibonacci = function(){
    var memo = [0,1];
    var fib = function(n){
        var result = memo[n];
        if(typeof result !== 'number'){
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    }
    return fib;
}();
fib(10);//主动调用11次，自己掉自己18次
```

构造带记忆功能的函数memoizer，返回一个管理memo存储和在需要时调用formula函数的recur函数。

```javascript
var memoizer = function(memo, formular){
    var recur = function(n){
        var result = memo[n];
        if(typeof result !== 'number'){
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
}
var fibonacci = memoizer([0,1], function(recur, n){
    return recur(n-1) + recur(n-2);
})

var factorial = memoizer([1,1], function(recur, n){
    return n * recur(n-1);
})
```



## 继承

JavaScript是弱类型语音，从不需要类型转换，对象的继承关系不是非常重要，对于一个对象来说，重要的时它能做什么，而不是它从哪里来。

对于基于类的语音，对象是类的实例，且类可以从另一个类继承。

JavaScript是基于**原型**的语言，意味着对象直接从其他对象继承。



### 伪类

JavaScript原型存在诸多矛盾，某些语法看起来像基于类的语言，这掩盖了它的原型机制。不直接让对象从其他对象继承，通过一个间接层：**通过构造器函数产生对象。**

当一个函数对象被创建时，Function构造器产生的函数对象会执行类似代码：

```javascript
this.prototype = { constructor: this };
```

新函数对象被赋予一个prototype属性，值是一个包含constructor属性且属性值为该新函数的对象。

prototype对象是存放继承特征的地方。

每个函数都会得到一个prototype对象。

当采用构造器调用模式，即用new前缀去调用一个函数时，函数执行的方式会被修改。

```javascript
//new 原理
Function.method('new', function(){
    //创建新对象，继承自构造器函数的原型对象
    var that = Object.create(this.prototype);
    //调用构造器函数，绑定tihs到新对象；
    var other = this.apply(that, Array.prototype.slice.apply(arguments));
    //如果返回不是一个对象，就返回该新对象
    return (typeof other === 'object' && other) || that;
});
```





### 原型

基于原型的继承比基于类的继承在概念上更为简单：**一个新对象可以继承一个旧对象的属性。**

如果有了一个想要对象，可以通过Object.create方法构造更多的实例来。



### 函数化

私有变量和私有函数需要通过模块模式。

> 1. 创建一个新对象
> 2. 有选择的定义私有实例变量和方法
> 3. 给这个新对象扩充方法
> 4. 返回那个新对象

函数化模式还可以提供一个处理父类的方法的方法：

```javascript
Object.method('superior', function(name){
    var that = this;
    vat method = that[name];
    return function(){
        return method.apply(that, arguments);
    }
})
```

如果对象的所有状态都是私有的，那么该对象就是一个“防伪”对象。该对象的属性可以被替换或删除，但该对象的完整性不会受到损害。

如果用函数化的方式创建一个对象，并且该对象的所有方法不使用this或that,那么该对象是**持久性**

一个持久性对象就是一个简单功能函数的集合。



### *部件

可以从一套部件中把对象组装出来。

```javascript
var eventuality = function(that){
    var registry = {};
    that.fire = function(event){
        var array, func, handler, i, type = typeof event === 'string' ? event: event.type;
        //如果这个事件存在一组事件处理程序，那么遍历它们并顺序依次执行
        if(registry.hasOwnPrototype(type)){
            array = registry[type];
            for(i = 0; i < array.length; i+=1){
                handler = array[i];
                //每个处理程序包含一个方法和一组可选的参数
                //如果该方法是一个字符串形式的名字，那么寻找到该函数
                func = handler.method;
                if(typeof func === 'string'){
                    func = this[func];
                }
                //调用一个处理程序
                func.apply(this, handler.parameters || [event])
            }
        }
        return this;
    }
    that.on = function(type, method, parameters){
        var handler = {
            method: method,
            parameters: parameters
        }
        if(registry.hasOwnProperty(type)){
            registry[type].push(handler);
        }else{
            registry[type] = [handler];
        }
        return this;
    }
    return that;
}
```





## 数组

数组是一段线性分配的内存，通过整数计算便宜并访问其中的元素。

JavaScript没有数组一样的数据结构，作为代替，JavaScript提供了一种拥有一些类数组特性的对象。

将数组的下标转为字符串，用其作为属性。比真的数组慢，但使用起来方便，属性的检索和更新方式与对象一样，只不过过了一个用整数作为属性名的特性。



### 数组字面量

数组字面量提供了非常方便创建新数组的表示法。

数组字面量继承自Array.prototype

对象字面量继承自Object.prototype



### 长度

每个数组都有一个length属性。没有上界，不会发生数组越界错误。

length属性的值是这个数组的最大整数属性名加上1，它不一定等于数组里的属性的个数。

如果这个字符串是一个大于等于这个数组当前的length且小于4294967295的正整数，那么这个数组的length就会被重新设置为新的小白加1。

length设小将导致下标大于等于新length的属性被删除。



### 删除

由于JavaScript的数组就是对象，所以可以通过delete运算符来从数组中移除元素。

```javascript
delete numbers[2];//移除后值为undefined，留下一个空，但是length不变
```

可以通过splice方法，对数组做删除元素并将它替换为其他元素。

由于被删除属性后的每个属性都被移除并以新的键值插入，所以对大型数组来说效率不高。



### 枚举

JavaScript的数组就是对象，所以可以通过for in语句来遍历一个数组的所有属性。

但是for in 无法保证属性的顺序，常规的for语句可以避免这个问题。



### 易混淆的店 Confusion

规则：当属性名是小而连续的整数时，可使用数组，否则是用对象。

JavaScript本身对于数组和对象的区别是混乱的，typeof 对数组是object

现在用来区分是数组和对象可以通过：

- isArray
- Object.prototype.toString.apply(value) [object Array]



### 方法

数组可用的方法是被存储在Array.prototype中的函数。

```javascript
Array.method('reduce', function(f, value){
    var i;
    for(i = 0; i < this.length; i++){
        value = f(this[i],value);
    }
    return value;
})
```

给数组添加一个非正整数方法，数组的length不会改变。

```javascript
var data = [1,3];
data.total = function(){
    return this.reduce(add, 0);
}
data.length //2
```



### 指定初始值

JavaScript的数组通常不会预置值。字面量产生的新数组都是空的，若访问不存在的元素，得到的值是undefined.

JavaScript没有多为数组，但像大多数语音一样，支持元素为数组的数组。

```javascript
var matrix = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
]
```



## *正则表达式

JavaScript的许多特性借鉴自其它语音，语法借鉴Java，函数借鉴Scheme，原型继承借鉴Self，正则表达式借鉴Perl。

处理正则表达式的方法：

- regexp.exe
- regexp.test
- string.match
- string.replace
- string.search
- string.split



**^** 表示此字符串的开始，它是一个锚，指引exec不要条狗那些不想URL（non-URL-like）的前缀

```javascript
(?:([A-Za-z]+):)?
```

这个因子匹配一个协议名，但仅当它后面跟随一个：的时候才匹配。

？表示这个分组可选

\+ 表示这个字符类会被匹配一次或多次

i 标识标识匹配字母时忽略大小写

负号后面的？后缀标识这个负号是可选的



### 结构

有两种方法来创建一个RegExp对象，优先考虑的方法是使用正则表达式字面量。

RegExp能设置3个标识，分别用字母g、i、m表示。

| 标识 | 含义                       |
| ---- | -------------------------- |
| g    | 全局                       |
| i    | 大小写不敏感               |
| m    | 多行（^和$能匹配行结束符） |



RegExp对象属性：

| 属性       | 用法                                |
| ---------- | ----------------------------------- |
| global     | 存在标识g，则为true                 |
| ignoreCase | 存在标识i，则为true                 |
| lastIndex  | 下一次exec匹配开始的索引，初始值为0 |
| multiline  | 存在标识m，则为true                 |
| source     | 正则表达式源码文本                  |



### 正则表达式分支

一个正则表达式分支包含一个或多个正则表达式序列，这些序列被 | 字符分隔。

一个正则表达式序列包含一个或多个正则表达式因子，每个因子能选择是否跟随一个量词，这个量词决定这个因子被允许出现的次数，默认匹配一次。



### 正则表达式分组

分组有4种：

- 捕获型
- 非捕获型
- 向前正匹配
- 向前负匹配





## 方法

JavaScript包含一套小型可用在标准类型上的标准方法集。



### Array

**array.concat(item...)**

concat方法产生一个新数组，包含一份array的浅复制（shallow copy）并把一个或多个参数item附加在其后。

**array.join(separator)**

join方法把一个array构造成一个字符串。用separator连接，默认连接符号是逗号。

**array.pop(item...)**

pop方法移除array中的最后一个元素并返回该元素，如果该数组是empty，则返回undefined。

**array.push(item...)**

push方法把一个或多个参数item附加到一个数组的尾部，和concat不同的时，它会修改array。

**array.reverse()**

reverse方法反转array里面的元素顺序，并返回array本身。

**array.shift()**

shift方法移除数组array中的第一个元素并返回该元素。

**array.unshift(item...)**

用于把元素添加到数组中，查到开始部分，返回array的新length

**array.slice(start, end)**

slice方法对array中的一段做浅复制。

**array.sort(comparefn)**

sort方法对array中的内容进行排序，不能正确给一组数字排序。

>JavaScript的默认比较函数时要被排序的元素都视为字符串。所以需要使用自己的比较函数来替换默认的比较函数

**array.splice(start, deleteCount, item...)**

splice方法从array中移除一个或多个元素，并用新的item替换他们。

主要用处是从一个数组中删除元素，注意和slice（截取一段）区别。





### Function

**function.apply(thisArg,argArray)**

apply方法调用function，传递一个会被绑定到this上的对象和一个可选的数组作为参数。



### Number

**number.toExponential(fractionDigits)**

toExponential方法把这个number转为指数形式的字符串



**number.toFixed(fractionDigits)**

toFixed方法把number转为一个十进制形式的字符串

**number.toPrecision(precision)**

将number转换为一个十进制数形式的字符串

**number.toString(radix)**

将number转字符串，radix控制基数。



### Object

**object.hasOwnPropperty(name)**





### RegExp



### String







## 代码风格





## 优美的特性

1. 函数时顶级对象，函数时有词法作用于的闭包
2. 基于原型继承的动态对象，对象是无类别的。可以通过普通的赋值给任何对象增加一个新成员属性，一个对象可以从另一个对象继承成员属性。
3. 对象字面量和数组字面量



## 毒瘤

### 全局变量



### 作用域



### 自动插入分号

不合时宜的插入分号导致问题，例如return语句后自动插入分号导致返回undefined。

```javascript
return 
{
    status: true;
}
//自动插入分号导致返回undefined。
```



### parseInt

parseInt把字符串转为整数的函数，遇到非数字会停止解析。



### + 

\+运算符可以用于加法和字符串连接。

做+运算，需确保两个运算数都是整数。



### 浮点数

二进制的浮点数不能正确的处理十进制的小数。



### NaN

是一个特殊的数量值，它表示的*不是一个数字*，尽管typeof NaN 为number.



### 伪数组



### 对象

JavaScript的对象永远不会是真的空对象，它们可以从原型链中取得成员属性。





## 糟粕

### ==



### with语句

本意用来快捷访问对象属性



### eval

eval函数传递一个字符串给JavaScript编译器，并执行其结果。

eval使得代码难以阅读、性能下降、安全性降低。



### continue语句



### switch

