// src/Transformers/JSXElementsTransformer/index.js
const viewTransformer = require("./View");
const textTransformer = require("./Text");
const iconTransformer = require("./Icon");
const imageTransformer = require("./Image");
const pictureTransformer = require("./Picture");
const videoTransformer = require("./Video");
const textInputTransformer = require("./TextInput");

module.exports = {
  View: viewTransformer.transformViewElement,
  Text: textTransformer.transformTextElement,
  Icon: iconTransformer.transformIconElement,
  Image: imageTransformer.transformImageElement,
  Picture: pictureTransformer.transformPictureElement,
  Video: videoTransformer.transformVideoElement,
  TextInput: textInputTransformer.transformTextInputElement,
  // ... 导出其他组件的转换器
};
