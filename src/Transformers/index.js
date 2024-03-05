const traverse = require("@babel/traverse").default;
const importsTransformer = require("./ImportsTransformer");
const functionTransformer = require("./FunctionTransformer");
const jsxElementTransformers = require("./JSXElementsTransformer");

function transform(ast) {
  traverse(ast, {
    JSXElement(path) {
      const componentName = path.node.openingElement.name.name;
      const transform = jsxElementTransformers[componentName];
      if (transform) {
        transform(path);
      }
    },
    FunctionDeclaration(path) {
      functionTransformer.transformFunctionDeclaration(path);
    },
    ImportDeclaration(path) {
      importsTransformer.transformImportDeclaration(path);
    },
    // ... 添加其他节点类型的转换规则
  });

  // 在 AST 遍历完成之后添加统一的 Taro 导入声明
  importsTransformer.addTaroImportDeclaration(ast);
}

module.exports = {
  transform,
};
