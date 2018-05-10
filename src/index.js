import generate from 'babel-generator'
import * as babylon from 'babylon'

function createImportSource(name, source) {
  const code = `import ${name} from "${source}/lib/${name.toLowerCase()}"`
  console.log(babylon.parse(code, {sourceType: 'module'}))
  return babylon.parse(code, {sourceType: 'module'}).loc
  // console.log(babylon.parse(code, {sourceType: 'module'}))
}

export default function({types: t}) {
  let names,
      removes
  // console.log(t)
  return {
    visitor: {
      Program: {
        enter() {
          names = []
          removes = []
        },
        exit() {
          removes.forEach(path => path.remove())
        }
      },
      ImportDeclaration(path) {
        let { node } = path,
            value = node.source.value
        if (value === 'b-rc' || value === 'b-rc-m') {

          node.specifiers.forEach(spec => {
            if (t.isImportSpecifier(spec)) {
              const name = spec.imported.name
              names.push(name)

              path.insertBefore( t.importDeclaration([t.clone(spec)], t.stringLiteral(`${value}/lib/${name.toLowerCase()}`)))
            }
          });

          removes.push(path)
          // console.log('names', names, removes)
        }
      },
    }
  };
}