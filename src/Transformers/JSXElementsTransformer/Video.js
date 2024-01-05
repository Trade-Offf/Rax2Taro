// Transformers/JSXElementsTransformer/Video.js
const t = require("@babel/types");

function transformVideoElement(path) {
  // 确保我们只处理具有 name 属性的 JSXOpeningElement
  if (path.node.openingElement && path.node.openingElement.name) {
    const openingElementName = path.node.openingElement.name;
    if (
      t.isJSXIdentifier(openingElementName) &&
      openingElementName.name === "Video"
    ) {
      // 创建一个新数组，用于存放转换后的属性
      const newAttributes = [];
      path.node.openingElement.attributes.forEach((attribute) => {
        if (t.isJSXAttribute(attribute) && attribute.name) {
          const attributeName = attribute.name.name;
          switch (attributeName) {
            // 删除无映射属性，不添加到新属性列表，从而实现删除属性
            case "playControl":
              break;
            case "showThinProgressBar":
              // 转换 showThinProgressBar 从布尔值到字符串
              if (t.isJSXExpressionContainer(attribute.value)) {
                const expression = attribute.value.expression;
                if (t.isBooleanLiteral(expression)) {
                  // 创建新的 showThinProgressBar 属性
                  const showThinProgressBarAttribute = t.jSXAttribute(
                    t.jSXIdentifier("showThinProgressBar"),
                    t.stringLiteral(expression.value ? "true" : "false")
                  );
                  newAttributes.push(showThinProgressBarAttribute);
                }
              }
              break;
            default:
              // 保留其他属性不变
              newAttributes.push(attribute);
              break;
          }
        }
      });
      // 替换原有属性列表为新的属性列表
      path.node.openingElement.attributes = newAttributes;
    }
  }
}

module.exports = {
  transformVideoElement,
};
