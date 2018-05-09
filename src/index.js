export default function({types: t}) {
  return {
    visitor: {
      Program: {
        enter() {
          console.log('enter')
        },
        exit() {
          console.log('exit')
        }
      },
      ImportDeclaration(path) {
        let { node } = path;
        console.log('node', node)
        console.log('t', t)
        if (node.source.value === 'b-rc' || node.source.value === 'b-rc-m') {
          node.specifiers.forEach(spec => {
            if (t.isImportSpecifier(spec)) {

            } else {

            }
          });

        }
      },
    }
  };
}