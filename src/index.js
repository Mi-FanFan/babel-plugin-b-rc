export default function({type: t}) {
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
        if (node.source.value === 'b-rc' || node.source.value === 'b-rc-m') {
          node.specifiers.forEach(spec => {
            if (t.isImportSpecifier(spec)) {
              specified[spec.local.name] = spec.imported.name;
            } else {
              ramdas[spec.local.name] = true;
            }
          });
          removablePaths.push(path);
        }
      },
    }
  };
}