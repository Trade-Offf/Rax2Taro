// src/Transformers/JSXElementsTransformer/index.js
const viewTransformer = require("./View");
const textTransformer = require("./Text");
const iconTransformer = require("./Icon");

module.exports = {
  View: viewTransformer.transformViewElement,
  Text: textTransformer.transformTextElement,
  Icon: iconTransformer.transformIconElement,
  // ... 导出其他组件的转换器
};
