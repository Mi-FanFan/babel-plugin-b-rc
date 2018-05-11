'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var names = void 0,
      removes = void 0;
  // console.log(t)
  return {
    visitor: {
      Program: {
        enter: function enter() {
          names = [];
          removes = [];
        },
        exit: function exit() {
          removes.forEach(function (path) {
            return path.remove();
          });
        }
      },
      ImportDeclaration: function ImportDeclaration(path) {
        var node = path.node,
            value = node.source.value;

        if (value === 'b-rc' || value === 'b-rc-m') {

          node.specifiers.forEach(function (spec) {
            if (t.isImportSpecifier(spec)) {
              var name = spec.imported.name;
              names.push(name);

              path.insertBefore(t.importDeclaration([t.clone(spec)], t.stringLiteral(value + '/lib/' + name.toLowerCase())));
            }
          });

          removes.push(path);
          // console.log('names', names, removes)
        }
      }
    }
  };
};

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createImportSource(name, source) {
  var code = 'import ' + name + ' from "' + source + '/lib/' + name.toLowerCase() + '"';
  console.log(babylon.parse(code, { sourceType: 'module' }));
  return babylon.parse(code, { sourceType: 'module' }).loc;
  // console.log(babylon.parse(code, {sourceType: 'module'}))
}