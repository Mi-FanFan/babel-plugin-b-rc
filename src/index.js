import generate from 'babel-generator'
import * as babylon from 'babylon'
import { addSideEffect } from "@babel/helper-module-imports";

export default function({types: t}) {
  let removes,
      specified

  return {
    visitor: {
      Program: {
        enter() {
          removes = []
          specified = {}
        },
        exit() {
          removes.forEach(path => path.remove())
        }
      },
      ImportDeclaration(path, state) {
        let { node, hub } = path,
            {type, specifiers, source} = node,
            {style} = state.opts,
            value = source.value
            
        if (value === 'b-rc' || value === 'b-rc-m') {

          specifiers.forEach(spec => {
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

              spec.type = 'ImportDefaultSpecifier'

              path.insertBefore( t.importDeclaration([t.clone(spec)], t.stringLiteral(`${value}/lib/${subPath.join('')}`)));

              style && addSideEffect(path, `${value}/lib/${subPath.join('')}/style`);
            }
          });

          removes.push(path)
        }
      },
    }
  };
}