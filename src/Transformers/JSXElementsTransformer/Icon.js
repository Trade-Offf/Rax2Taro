// Transformers/JSXElementsTransformer/Icon.js
const t = require("@babel/types");

function transformIconElement(path) {
  // 确保我们只处理具有 name 属性的 JSXOpeningElement
  if (
    path.node.openingElement &&
    path.node.openingElement.name &&
    t.isJSXIdentifier(path.node.openingElement.name) &&
    path.node.openingElement.name.name === "Icon"
  ) {
    // 更改元素类型为 Image
    path.node.openingElement.name.name = "Image";
    if (path.node.closingElement) {
      path.node.closingElement.name.name = "Image";
    }

    // 遍历属性，处理 source.uri 并删除 fontFamily 和 source.codePoint
    const newAttributes = [];
    let foundUnsupportedProps = false;
    let locationInfo = null;

    path.node.openingElement.attributes.forEach((attribute) => {
      if (t.isJSXAttribute(attribute) && attribute.name) {
        const attributeName = attribute.name.name;

        if (
          attributeName === "fontFamily" ||
          attributeName === "source.codePoint"
        ) {
          // 标记我们找到了不支持的属性
          foundUnsupportedProps = true;
          locationInfo = attribute.loc;
        } else if (attributeName === "source") {
          // 提取 source.uri 值
          const uriValue = extractUriValue(attribute.value);
          if (uriValue) {
            newAttributes.push(
              t.jsxAttribute(t.jsxIdentifier("src"), uriValue)
            );
          }
        } else {
          // 保留其他属性
          newAttributes.push(attribute);
        }
      }
    });

    // 如果发现不支持的属性，可以在这里执行其他逻辑，例如记录到日志文件或者中断转换等
    if (foundUnsupportedProps && locationInfo) {
      handleUnsupportedProps();
    }

    // 更新属性列表
    path.node.openingElement.attributes = newAttributes;
  }
}

// 提取 source 中的 uri 值
function extractUriValue(sourceValue) {
  if (
    t.isJSXExpressionContainer(sourceValue) &&
    t.isObjectExpression(sourceValue.expression)
  ) {
    const properties = sourceValue.expression.properties;
    const uriProperty = properties.find(
      (prop) =>
        t.isObjectProperty(prop) &&
        t.isIdentifier(prop.key) &&
        prop.key.name === "uri"
    );
    return uriProperty ? uriProperty.value : null;
  }
  return null;
}

// 在这里加入处理不支持属性的逻辑，例如记录到某个日志文件
function handleUnsupportedProps() {
  console.error(
    "Error: 编译器只支持图片型 Icon 转换，请删除fontFamily、source.codePoint属性"
  );
}

module.exports = {
  transformIconElement,
};
