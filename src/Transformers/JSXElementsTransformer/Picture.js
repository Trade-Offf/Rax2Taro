// Transformers/JSXElementsTransformer/Picture.js
const t = require("@babel/types");

function transformPictureElement(path) {
  // 确保我们只处理具有 name 属性的 JSXOpeningElement
  if (path.node.openingElement && path.node.openingElement.name) {
    const openingElementName = path.node.openingElement.name;
    if (
      t.isJSXIdentifier(openingElementName) &&
      openingElementName.name === "Picture"
    ) {
      // 更改 Picture 元素类型为 Image
      path.node.openingElement.name.name = "Image";
      if (path.node.closingElement) {
        path.node.closingElement.name.name = "Image";
      }
      // 创建一个新数组，用于存放转换后的属性
      const newAttributes = [];
      path.node.openingElement.attributes.forEach((attribute) => {
        if (t.isJSXAttribute(attribute) && attribute.name) {
          const attributeName = attribute.name.name;
          switch (attributeName) {
            // 删除无映射属性
            case "quality":
            case "autoPixelRatio":
            case "autoRemoveScheme":
            case "autoReplaceDomain":
            case "autoScaling":
            case "scalingSizes":
            case "autoWebp":
            case "autoCompress":
            case "compressSuffix":
            case "highQuality":
            case "ignoreGif":
            case "forceWebp":
            case "preload":
              break; // 不添加到新属性列表，从而实现删除属性
            case "onClick":
              attribute.name.name = "onTap";
              break;
            case "lazyload":
              attribute.name.name = "lazyLoad";
              break;
            case "fallbackSource":
              attribute.name.name = "defaultSource";
              break;
            case "resizeMode":
              attribute.name.name = "mode";
              break;
            case "placeholder":
              // 将 Picture 组件的 placeholder 属性重命名为 defaultSource
              attribute.name.name = "defaultSource";
              break;
            case "source":
              // 从 source 对象属性中提取 uri 值，并创建一个新的 src 属性
              if (t.isJSXExpressionContainer(attribute.value)) {
                const expression = attribute.value.expression;
                // 确保 attribute.value 是一个对象形式
                if (t.isObjectExpression(expression)) {
                  // 查找对象中的 uri 属性
                  const uriProperty = expression.properties.find(
                    (prop) =>
                      t.isObjectProperty(prop) &&
                      t.isIdentifier(prop.key) &&
                      prop.key.name === "uri"
                  );
                  if (uriProperty && t.isObjectProperty(uriProperty)) {
                    // 创建新的 src 属性
                    const srcAttribute = t.jSXAttribute(
                      t.jSXIdentifier("src"),
                      t.jSXExpressionContainer(uriProperty.value)
                    );
                    newAttributes.push(srcAttribute);
                  }
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
  transformPictureElement,
};
