// Transformers/index.js
const traverse = require("@babel/traverse").default;
const jsxElementTransformers = require("./JSXElementsTransformer");
const functionTransformer = require("./FunctionTransformer");

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
    // ... 添加其他节点类型的转换规则
  });
}

module.exports = {
  transform,
};
