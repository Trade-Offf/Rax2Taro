// src/Transformers/index.js
const jsxElementTransformers = require("./JSXElementsTransformer");
const functionTransformer = require("./FunctionTransformer");
const importsTransformer = require("./ImportsTransformer");
const { traverse } = require("../../utils");

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
}

module.exports = {
  transform,
};
