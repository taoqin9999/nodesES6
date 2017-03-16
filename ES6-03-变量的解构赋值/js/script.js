"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* 数组的解构赋值
ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）
*/

// 常规复制
var a = 1;
var b = 2;
var c = 3;

// ES6允许从数组中提取值，按照对应位置，对变量赋值
var d = 1,
    e = 2,
    f = 3;
var foo = 1,
    bar = 2,
    baz = 3;

console.log(foo, bar, baz); //1 2 3

var _ref = ["foo", "bar", "baz"],
    third = _ref[2];

console.log(third);

var _ref2 = [1, 2, 3],
    x = _ref2[0],
    y = _ref2[2];

console.log(x, y); //1 3

var head = 1,
    tail = [2, 3, 4];

console.log(head, tail); // 1 [2,3,4]

var _ref3 = ['a'],
    x0 = _ref3[0],
    y0 = _ref3[1],
    z0 = _ref3.slice(2);

console.log(x0, y0, z0); //a undefined []

var _ref4 = [],
    fo = _ref4[0];

console.log(fo); //undefined

var _ref5 = [1],
    ba0 = _ref5[0],
    fo0 = _ref5[1];

console.log(ba0, fo0); //1 undefined

// 如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

// 报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

// Set结构也可以使用数组的解构赋值

var _ref6 = new Set(['a', 'b', 'c']),
    _ref7 = _slicedToArray(_ref6, 3),
    x1 = _ref7[0],
    y1 = _ref7[1],
    z1 = _ref7[2];

console.log(x1); //a

// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
// function* fibs(){
// 	let a = 0;
// 	let b = 1;
// 	while(true){
// 		yield a;
// 		[a,b] = [b, a+b];
// 	}
// }

// let [first,second,third0,fourth,fifth,sixth] = fibs();
// console.log(sixth); //5

/*默认值
解构赋值允许指定默认值
*/
var _ref8 = [],
    _ref8$ = _ref8[0],
    foo1 = _ref8$ === undefined ? true : _ref8$;

console.log(foo1); //true

var _ref9 = ['a'],
    x2 = _ref9[0],
    _ref9$ = _ref9[1],
    y2 = _ref9$ === undefined ? 'b' : _ref9$;

console.log(x2, y2); //a,b
var x3 = 'c',
    _undefined = undefined,
    y3 = _undefined === undefined ? 'd' : _undefined;

console.log(x3, y3); //c,d

// ES6内部使用严格相等运算符（===）来判断一个位置是否有值
// 如果一个数组成员不严格等于 undefined ,默认值是不会生效的
var _undefined2 = undefined,
    x4 = _undefined2 === undefined ? 4 : _undefined2;

console.log(x4); //4

var _ref10 = null,
    x5 = _ref10 === undefined ? 1 : _ref10;

console.log(x5); //null null不严格等于undefined

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
function ff() {
	console.log("aaa");
}

var _ = 6,
    x6 = _ === undefined ? ff() : _;

console.log(x6); //6

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
var _ref11 = [],
    _ref11$ = _ref11[0],
    x7 = _ref11$ === undefined ? 7 : _ref11$,
    _ref11$2 = _ref11[1],
    y7 = _ref11$2 === undefined ? x7 : _ref11$2;

console.log(x7, y7); //7 7

var _ref12 = [8],
    _ref12$ = _ref12[0],
    x8 = _ref12$ === undefined ? 8 : _ref12$,
    _ref12$2 = _ref12[1],
    y8 = _ref12$2 === undefined ? x8 : _ref12$2;

console.log(x8, y8); //8 8

// let [x9 = y9,y9 = 9] = []; //y9 is not defined

/*********************************************************/

/*对象的解构赋值
对象的属性没有次序，必须与属性同名，才能取到正确的值。
*/
var _f2$b = { f2: "aaa", b2: "bbb" },
    f2 = _f2$b.f2,
    b2 = _f2$b.b2;

console.log(f2, b2); // aaa bbb

var _f3$b = { f3: "f3", b33: "b33" },
    b3 = _f3$b.b3;

console.log(b3); // undefined

// 如果变量名与属性名不一致，必须写成下面这样
var obj = { ofirst: "hello", last: "world" };
var of = obj.ofirst,
    l = obj.last;

console.log(of, l); // hello world

// 和数组一样，解构也可以用于嵌套解构的对象
var obj2 = {
	p: ['hello', { y10: 'world' }]
};

var _obj2$p = _slicedToArray(obj2.p, 2),
    x10 = _obj2$p[0],
    y10 = _obj2$p[1].y10;

console.log(x10, y10); //hello world


var obj3 = {};
var arr = [];
var _foo2$b = { foo2: 123, b4: true };
obj3.prop = _foo2$b.foo2;
arr[0] = _foo2$b.b4;

console.log(obj3, arr); //Object {prop: 123} [true]

// 对象的解构也可以指定默认值
var _ref13 = {},
    _ref13$x = _ref13.x11,
    y11 = _ref13$x === undefined ? 11 : _ref13$x;

console.log(y11); //11

var _x = { x12: 12 },
    _x$x = _x.x12,
    y12 = _x$x === undefined ? 1 : _x$x;

console.log(y12); // 12

// 如果解构失败，变量的值等于undefined
var _bar = { bar3: 'baz' },
    foo3 = _bar.foo3;

console.log(foo3); //undefined

// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将报错
// let { foo4: { bar4 } } = { bar4: "bar4" };// Uncaught TypeError: Cannot match against 'undefined' or 'null'.

/*字符串的解构赋值*/

var _hello = 'hello',
    _hello2 = _slicedToArray(_hello, 5),
    aa = _hello2[0],
    bb = _hello2[1],
    cc = _hello2[2],
    dd = _hello2[3],
    ee = _hello2[4];

console.log(aa, bb, cc, dd, ee); //h e l l o

// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值

var _hello3 = 'hello',
    len = _hello3.length;

console.log(len); //5

/*数值和布尔值的解构赋值
解构赋值是，如果等号右边是数值和布尔值，则会先转为对象
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
*/

var _2 = 123,
    s = _2.toString;

console.log(s, s === Number.prototype.toString); // true

var _true = true,
    s0 = _true.toString;

console.log(s0, s0 === Boolean.prototype.toString); // true

// let { prop:x14 } = undefined; //TypeError
// let { prop:x15 } = null; //TypeError

/*函数参数的解构赋值*/
function add(_ref14) {
	var _ref15 = _slicedToArray(_ref14, 2),
	    x = _ref15[0],
	    y = _ref15[1];

	return x + y;
}
console.log(add([1, 2])); //3

function move() {
	var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref16$x = _ref16.x,
	    x = _ref16$x === undefined ? 0 : _ref16$x,
	    _ref16$y = _ref16.y,
	    y = _ref16$y === undefined ? 0 : _ref16$y;

	return [x, y];
}

console.log(move({ x: 3, y: 8 })); // [3,8]
console.log(move({ x: 3 })); // [3,0]
console.log(move({})); // [0,0]
console.log(move()); // [0,0]

/*不能使用圆括号的情况*/

// 变量声明语句中，不能带有圆括号
//Unexpected token (
// let [(a)] = [1]; 
// let {x:(c)} = {};
// let {{x:c}} = {};
// let {(x:c)} = {};
// let {(x):c} = {};

// let { o: ({ p:p }) } = { o: { p:2 } };

// 函数参数中，模式不能带有圆括号
// 函数参数也属于变量声明，因此不能带有圆括号
//Unexpected token (
// function f([(z)]) { return z; }

// 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中

// ({ p:a }) = { p:42 };
// [({ p:a }),{ x:c }] = [{},{}];
// [({ p:a }),{ x:c }] = [{},{}];

// 可以使用圆括号的情况：赋值语句的非模式部分，可以使用圆括号

var b5 = void 0;
b5 = 5;
var _ref17 = {};
d = _ref17.p;


/*变量解构赋值的用途*/

// 交换变量的值
var _ref18 = [3];
parseInt.prop = _ref18[0];
var x20 = 12;
var y20 = 20;

var _ref19 = [y20, x20];
x20 = _ref19[0];
y20 = _ref19[1];

console.log(x20, y20); // 20 12

// 从函数返回多个值

// 返回一个数组
function example() {
	return [1, 2, 3];
}

var _example = example(),
    _example2 = _slicedToArray(_example, 3),
    a21 = _example2[0],
    b21 = _example2[1],
    c21 = _example2[2];

console.log(a21, b21, c21); // 1 2 3

// 返回一个对象
function example2() {
	return {
		foo4: 4,
		bar5: 5
	};
}

var _example3 = example2(),
    foo4 = _example3.foo4,
    bar5 = _example3.bar5;

console.log(foo4, bar5); // 4 5

// 函数参数的定义：结构函数可以方便的将一组参数与变量名对应起来

// 参数是一组有次序的值
function fff(_ref20) {
	var _ref21 = _slicedToArray(_ref20, 3),
	    x22 = _ref21[0],
	    y22 = _ref21[1],
	    z22 = _ref21[2];
}
fff([1, 2, 3]);

// 参数是一组无次序的值
function ffff(_ref22) {
	var x23 = _ref22.x23,
	    y23 = _ref22.y23,
	    z23 = _ref22.z23;
}
ffff(_defineProperty({ z23: 3, y23: 2 }, "z23", 1));

// 提取JSON数据
var jsonData = {
	id: 42,
	status: "OK",
	data: [867, 5309]
};

var id = jsonData.id,
    status = jsonData.status,
    number = jsonData.data;

console.log(id, status, number); //42 "OK" [867, 5309]

// 函数参数的默认值
// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
// jQuery.ajax = function(url,{
// 	async = true,
//   	beforeSend = function () {},
//   	cache = true,
//   	complete = function () {},
//   	crossDomain = false,
//   	global = true,
//   	// ... more config
// }){
// 	// ... do stuff
// };


// 遍历Map结构
// 任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。
// var map = new Map();
// map.set('first', 'hello');
// map.set('second', 'world');

// for (let [key, value] of map) {
//   console.log(key + " is " + value);
// }

// 如果只想获取键名，或者只想获取键值，可以写成下面这样。
// 获取键名
// for (let [key] of map) {
//   // ...
// }

// // 获取键值
// for (let [,value] of map) {
//   // ...
// }

// 输入模块的指定方法
// 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
// const { SourceMapConsumer, SourceNode } = require("source-map");