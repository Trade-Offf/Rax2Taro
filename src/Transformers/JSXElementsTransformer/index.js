// src/Transformers/JSXElementsTransformer/index.js
const viewTransformer = require("./View");
const textTransformer = require("./Text");
const iconTransformer = require("./Icon");
const imageTransformer = require("./Image");

module.exports = {
  View: viewTransformer.transformViewElement,
  Text: textTransformer.transformTextElement,
  Icon: iconTransformer.transformIconElement,
  Image: imageTransformer.transformImageElement,
  // ... 导出其他组件的转换器
};
