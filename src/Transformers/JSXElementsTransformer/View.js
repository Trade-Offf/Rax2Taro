const t = require("@babel/types");

function transformViewElement(path) {
  // 确保我们只处理具有 name 属性的 JSXOpeningElement
  if (path.node.openingElement && path.node.openingElement.name) {
    const openingElementName = path.node.openingElement.name;

    if (
      t.isJSXIdentifier(openingElementName) &&
      openingElementName.name === "View"
    ) {
      path.node.openingElement.attributes.forEach((attribute) => {
        if (t.isJSXAttribute(attribute) && attribute.name) {
          const attributeName = attribute.name.name;

          switch (attributeName) {
            case "onClick":
              attribute.name.name = "onTap";
              break;
            case "onLongpress":
              attribute.name.name = "onLongTap";
              break;
          }
        }
      });
    }
  }
}

module.exports = {
  transformViewElement,
};
