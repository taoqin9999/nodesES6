原文链接：http://es6.ruanyifeng.com/

# Babel配置

## 配置文件 `.babelrc`

- 使用Bable的第一步，在项目根目录下新建并配置文件 `.babelrc`  
- window 环境下，命名 `.babelrc.` 生成配置文件
- 该文件来设置转码规则和插件，基本格式如下
  
```babelrc
{
	"preset":[],
	"plugins":[]
}
```

- `preset` 字段设定转码规则，可以根据需要安装  

```git
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

- 将这些规则加入 `.babelrc`  

```babelrc
{
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
}
```

- 以下所有Babel工具和模块的使用，都必须先写好 `.babelrc`

## 全局安装 `babel-cli`

```git
$ npm install --global babel-cli
```

基本用法如下

```git
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

## 项目安装 `babel-cli`

```git
$ npm install --save-dev babel-cli
```

配置 `package.json` ，将 `src文件夹` 编译到 `js` 文件夹

```json
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.24.0"
  },
  "scripts": {
    "build": "babel src -d js"
  },
}
```

转码执行命令

```git
$ npm run build
```

## babel-bode 

改写 `package.json`

```json
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```

上面代码中，使用 `babel-node` 替代 `node` ，这样 `script.js` 本身就不用做任何转码处理。


----------

## 快速安装

全局安装 `babel-cli`

```git
$ npm install --global babel-cli
```
复制文件夹中 `package.json` 与 `.bablelrc` 至项目目录，运行命令

```git
npm install
```

编译

```git
npm run build
```