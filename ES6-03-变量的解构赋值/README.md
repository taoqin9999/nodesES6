原文链接：http://es6.ruanyifeng.com/#docs/destructuring

----------

# 变量的解构赋值

## 数组的解构赋值
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为**解构**（Destructuring）  

常规赋值

```javascript
let a = 1;
let b = 2;
let c = 3;
```

ES6 允许从数组中提取值，按照对应位置，对变量赋值

```javascript
let [d,e,f] = [1,2,3];

let [foo,[[bar],baz]] = [1,[[2],3]];
console.log(foo,bar,baz); //1 2 3

let [ , , third] = ["foo","bar","baz"];
console.log(third);

let [x,,y] = [1,2,3];
console.log(x,y); //1 3

let [head,...tail] = [1,2,3,4];
console.log(head,tail); // 1 [2,3,4]

let [x0,y0,...z0] = ['a'];
console.log(x0,y0,z0); //a undefined []

let[fo] = [];
console.log(fo); //undefined

let[ba0,fo0] = [1];
console.log(ba0,fo0); //1 undefined
```

如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

Set 结构也可以使用数组的解构赋值

```javascript
let[x1,y1,z1] = new Set(['a','b','c']);
console.log(x1); //a
```

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值

```javascript
function* fibs(){
	let a = 0;
	let b = 1;
	while(true){
		yield a;
		[a,b] = [b, a+b];
	}
}

let [first,second,third0,fourth,fifth,sixth] = fibs();
console.log(sixth); //5
```

默认值：解构赋值允许指定默认值

```javascript
let [foo1 = true] = [];
console.log(foo1); //true

let [x2,y2 = 'b'] = ['a']; 
console.log(x2,y2); //a,b

let [x3,y3 = 'd'] = ['c',undefined];
console.log(x3,y3); //c,d
```


ES6内部使用严格相等运算符（===）来判断一个位置是否有值  
如果一个数组成员不严格等于 undefined ,默认值是不会生效的

```javascript
let [x4 = 4] = [undefined];
console.log(x4); //4

let [x5 = 1] = [null];
console.log(x5); //null null不严格等于undefined
```

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```javascript
function ff(){
	console.log("aaa");
}

let [x6 = ff()] = [6];
console.log(x6); //6
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明

```javascript
let [x7 = 7,y7 = x7] = [];
console.log(x7,y7); //7 7

let [x8 = 8,y8 = x8] = [8];
console.log(x8,y8); //8 8

let [x9 = y9,y9 = 9] = []; //y9 is not defined
```

## 对象的解构赋值
对象的属性没有次序，必须与属性同名，才能取到正确的值。

```javascript
let { f2, b2 } = { f2:"aaa",b2:"bbb" };
console.log(f2,b2); // aaa bbb

let { b3 } = { f3:"f3", b33:"b33"};
console.log(b3); // undefined
```

如果变量名与属性名不一致，必须写成下面这样

```javascript
let obj = { ofirst:"hello", last:"world" };
let { ofirst: of, last: l } = obj;
console.log(of,l); // hello world
``` 

和数组一样，解构也可以用于嵌套解构的对象

```javascript
let obj2 = {
	p:[
	'hello',
	{ y10: 'world'}
	]
};

let { p:[x10, { y10 }] } = obj2;

console.log(x10,y10); //hello world
```

```javascript
let obj3 = {};
let arr = [];
({ foo2: obj3.prop, b4: arr[0] } = { foo2: 123, b4: true });

console.log(obj3,arr);//Object {prop: 123} [true]
```

对象的解构也可以指定默认值

```javascript
var { x11: y11 = 11 } = {};
console.log(y11); //11

var { x12: y12 = 1} = { x12: 12 };
console.log(y12); // 12
```

如果解构失败，变量的值等于 undefined

```javascript
let { foo3 } = { bar3: 'baz' };
console.log(foo3); //undefined
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将报错

```javascript
let { foo4: { bar4 } } = { bar4: "bar4" };// Uncaught TypeError: Cannot match against 'undefined' or 'null'.
```

## 字符串的解构赋值 

```javascript
const [aa,bb,cc,dd,ee] = 'hello';
console.log(aa,bb,cc,dd,ee); //h e l l o
```

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值

```javascript
let { length: len } = 'hello';
console.log(len); //5
```

## 数值和布尔值的解构赋值
解构赋值是，如果等号右边是数值和布尔值，则会先转为对象  
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象  
由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错

```javascript
let { toString: s } = 123;
console.log(s,s === Number.prototype.toString);// true

let { toString: s0 } = true;
console.log(s0,s0 === Boolean.prototype.toString);// true

let { prop:x14 } = undefined; //TypeError
let { prop:x15 } = null; //TypeError
```

## 函数参数的解构赋值

```javascript 
function add([x,y]){
	return x + y;
}
console.log(add([1,2]));//3

function move({x = 0, y = 0} = {}){
	return [x,y];
}

console.log(move({x:3,y:8}));// [3,8]
console.log(move({x:3}));// [3,0]
console.log(move({}));// [0,0]
console.log(move());// [0,0]
```

## 不能使用圆括号的情况

变量声明语句中，不能带有圆括号
```javascript
//Unexpected token (
let [(a)] = [1]; 
let {x:(c)} = {};
let {{x:c}} = {};
let {(x:c)} = {};
let {(x):c} = {};

let { o: ({ p:p }) } = { o: { p:2 } };
```

函数参数中，模式不能带有圆括号  
函数参数也属于变量声明，因此不能带有圆括号

```javascript
//Unexpected token (
function f([(z)]) { return z; }
```

赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中

```javascript
({ p:a }) = { p:42 };
[({ p:a }),{ x:c }] = [{},{}];
[({ p:a }),{ x:c }] = [{},{}];
```

可以使用圆括号的情况：赋值语句的非模式部分，可以使用圆括号

```javascript
let b5;
[(b5)] = [5];
({ p: (d) } = {}) ;
[(parseInt.prop)] = [3];
```

## 变量解构赋值的用途 

交换变量的值

```javascript
let x20 = 12;
let y20 = 20;

[x20,y20] = [y20,x20];
console.log(x20,y20);// 20 12
```

从函数返回多个值  
  
返回一个数组

```javascript
function example(){
	return [1,2,3];
}

let [a21,b21,c21] = example();
console.log(a21,b21,c21); // 1 2 3
```

返回一个对象

```javascript
function example2(){
	return{
		foo4: 4,
		bar5: 5
	};
}

let {foo4,bar5} = example2();
console.log(foo4,bar5); // 4 5
```

函数参数的定义：结构函数可以方便的将一组参数与变量名对应起来  
  
参数是一组有次序的值

```javascript
function fff([x22,y22,z22]) {}
fff([1,2,3]);
```
 
参数是一组无次序的值

```javascript
function ffff({x23,y23,z23}){}
ffff({z23: 3,y23: 2,z23: 1});
```

提取JSON数据

```javascript
let jsonData = {
	id: 42,
	status: "OK",
	data: [867,5309]
};

let { id,status, data: number } = jsonData;
console.log(id,status,number); //42 "OK" [867, 5309]
```

函数参数的默认值  
  
指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句

```javascript
jQuery.ajax = function(url,{
	async = true,
  	beforeSend = function () {},
  	cache = true,
  	complete = function () {},
  	crossDomain = false,
  	global = true,
  	// ... more config
}){
	// ... do stuff
};
```

遍历Map结构  
  
任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

```javascript
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
```

如果只想获取键名，或者只想获取键值，可以写成下面这样  
  
获取键名

```javascript
for (let [key] of map) {
  // ...
}
```

获取键值

```javascript
for (let [,value] of map) {
  // ...
}
```

输入模块的指定方法  
加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```