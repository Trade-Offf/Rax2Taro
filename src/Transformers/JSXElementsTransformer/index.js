// src/Transformers/JSXElementsTransformer/index.js
const viewTransformer = require("./View");
const textTransformer = require("./Text");

module.exports = {
  View: viewTransformer.transformViewElement,
  Text: textTransformer.transformTextElement,
  // ... 导出其他组件的转换器
};
