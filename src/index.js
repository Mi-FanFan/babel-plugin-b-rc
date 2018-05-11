import generate from 'babel-generator'
import * as babylon from 'babylon'

function createImportSource(name, source) {
  const code = `import ${name} from "${source}/lib/${name.toLowerCase()}"`
  console.log(babylon.parse(code, {sourceType: 'module'}))
  return babylon.parse(code, {sourceType: 'module'}).loc
  // console.log(babylon.parse(code, {sourceType: 'module'}))
}

export default function({types: t}) {
  let removes

  return {
    visitor: {
      Program: {
        enter() {
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
              const name = spec.imported.name,
                    first = name[0].toLowerCase(),
                    subPath = [first]

              name.split('').forEach((letter, index) => {
                if(index > 0) {
                  if(letter <= 'Z' && letter >= 'A') {
                    subPath.push('-')
                    subPath.push(letter.toLowerCase())
                  }else {
                    subPath.push(letter.toLowerCase())
                  }
                }
              })

              path.insertBefore( t.importDeclaration([t.clone(spec)], t.stringLiteral(`${value}/lib/${subPath.join('')}`)))
            }
          });

          removes.push(path)
        }
      },
    }
  };
}