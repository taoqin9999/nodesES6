/* let基本用法
用法类似于var,但是所生命的变量，只在let所在的代码块内有效
*/ 

{
	let a = 10;
	var b = 1;
	console.log(a); // 10
}
// console.log("a:" + a); // a is not defined
console.log("b:" + b);

/*************************************/ 

for(let i = 0; i < 10; i++){}
// console.log(i); // i is not defined

for(var j = 0; j < 10; j++){}
console.log(j); // 10

/*************************************/ 

var c = [];
for(var k = 0; k < 10; k++){
	c[k] = function(){
		console.log(k);
	};
}
c[6](); // 10

var d = [];
for(let l = 0; l < 10; l++){
	d[l] = function(){
		console.log(l);
	};
}
d[6](); // 6

/*****************************************/ 

/*不存在变量提升
var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined
let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错
*/ 

console.log(foo); //undefined
var foo = 2; 

// console.log(bar); //bar is not defined
let bar = 2;

/*****************************************/ 

/* 暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
*/

var tmp = 123;
if(true) {
	tmp = "abc";
	//let tmp; //tmp is not defined
}

if(true){
	// TDZ开始
	//tmp = "abc"; // ReferenceError

	let tmp; // underfined
	console.log(tmp); //underfined

	tmp = 456;
	console.log(tmp); //456
}
console.log(tmp);//abc

/*上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。*/ 

typeof x;
//let x; //x is not defined
console.log(typeof x); //underfined

/***************************************************/ 

// function bar0(x = y, y = 2){ // 死区，报错，提前声明
// 	return [x,y];
// }
// bar0();

function bar1(x = 2, y = x){
	return [x,y];
}
console.log(bar1()); //[2, 2]

var x = x;
// let x0 = x0; //x0 is not defined

/******************************************************/ 

/*不允许重复声明
let不允许在相同作用域内，重复声明同一个变量
*/ 

// function fn0(){
// 	let a = 10;
// 	var a = 1;
// }
// fn0();//报错

// function fn1(){
// 	let a = 10;
// 	let a = 1;
// }
// fn1(); // 报错


// 不能在函数内部重新声明参数
func(1);
function func(arg){
	// let arg; //报错
	{
		let arg;
	}
}

/******************************************************/ 

/*块级作用域
let实际上为 JavaScript 新增了块级作用域
*/ 

var tmp = new Date();
function f(){
	console.log(tmp);
	if(false){
		var tmp = 'hello world';
	}
}
f(); //underfined 变量提升，导致内层的tmp变量覆盖了外层的tmp变量

function f1(){
	let n = 5;
	if(true){
		let n = 10;
	}
	console.log(n); //5
}
f1();

// 下面代码使用了一个五层的块级作用域。外层作用域无法读取内层作用域的变量。
{{{{
	{let insane = 'Hello World'}
	// console.log(insane);//insane is not defined
}}}};

// 内层作用域可以定义外层作用域的同名变量。
{{{{
	let insane = "Hello World";
	{let insane = "Hello World"}
}}}};

// 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
// IIFE写法
(function(){
	var tmp = 0;
}());
// 块级作用域写法
{
	let tmp = 0;
}

/***********************************************************/ 

/* 块级作用域与函数声明
ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错
本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值
现在有一个提案，使得块级作用域可以变为表达式,在块级作用域之前加上do，使它变为do表达式
*/

// let z = do{
	// let t = f();
	// t * t + 1;
// };

/**************************************************************/ 

/* const命令 基本用法
const声明一个只读的常亮。一旦声明，常亮的值就不能更改
只声明不赋值，就会报错
const的作用域与let命令相同：只在声明所在的块级作用域内有效
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用
const声明的常量，也与let一样不可重复声明。
*/

const PI = 3.1415;
console.log(PI);
// PI = 3;//Assignment to constant variable.

// const fooo;// Missing initializer in const declaration 

// 将对象彻底冻结的函数
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach( (key, i) => {
        if ( typeof obj[key] === 'object' ) {
        	constantize( obj[key] );
    	}
  	});
};
