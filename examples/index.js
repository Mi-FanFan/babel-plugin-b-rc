require('babel-register') 

const code = ` 
import {Refresh, DatePicker} from 'b-rc-m'
var a = 1; var b = 2
`;


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