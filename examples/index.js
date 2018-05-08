const code = ` var a = 1; var b = 2' `;
const babel = require('babel-core');
const ast = babel.transform(code, {
    plugins: [
        [
	        require('./babel-custom-code-filter'), 
	        {
	            debug: true,
	        },
        ],
    ],
});

console.log(ast.code);