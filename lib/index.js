'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  var removes = void 0;

  return {
    visitor: {
      Program: {
        enter: function enter() {
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
              var name = spec.imported.name,
                  first = name[0].toLowerCase(),
                  subPath = [first];

              name.split('').forEach(function (letter, index) {
                if (index > 0) {
                  if (letter <= 'Z' && letter >= 'A') {
                    subPath.push('-');
                    subPath.push(letter.toLowerCase());
                  } else {
                    subPath.push(letter.toLowerCase());
                  }
                }
              });

              path.insertBefore(t.importDeclaration([t.clone(spec)], t.stringLiteral(value + '/lib/' + subPath.join(''))));
            }
          });

          removes.push(path);
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