require('babel-register') 

const code = ` 
import {Refresh} from 'b-rc-m'
var a = 1; var b = 2
`;

console.log('code' ,code)

const babel = require('babel-core');
const ast = babel.transform(code, {
    plugins: [
        [
	        require('../src/index.js').default, 
	        {
	            debug: true,
	        },
        ],
    ],
});

console.log(ast.code);