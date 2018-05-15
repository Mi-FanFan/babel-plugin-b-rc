require('babel-register') 

const code = ` 
import {Refresh, DatePicker} from 'b-rc-m'
var c = Refresh
`;


const babel = require('babel-core');
const ast = babel.transform(code, {
    plugins: [
        [
	        require('../src/index.js').default, 
	        {
	            style: true,
	        },
        ],
    ],
});

console.log(ast.code);