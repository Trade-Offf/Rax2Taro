// Transformers/JSXElementsTransformer/TextInput.js
const t = require("@babel/types");

function transformTextInputElement(path) {
  if (path.node.openingElement && path.node.openingElement.name) {
    const openingElementName = path.node.openingElement.name;
    if (
      t.isJSXIdentifier(openingElementName) &&
      openingElementName.name === "TextInput"
    ) {
      let isMultiline = false;
      // 检查是否为多行文本输入，单行转成 Input，多行转成 Textarea
      path.node.openingElement.attributes.forEach((attribute) => {
        if (t.isJSXAttribute(attribute) && attribute.name) {
          const attributeName = attribute.name.name;
          if (attributeName === "multiline") {
            isMultiline = true;
          } else {
            isMultiline = false;
          }
        }
      });
      if (isMultiline) {
        // 将 TextInput 转换为 Taro 的 Textarea 组件
        openingElementName.name = "Textarea";
        // 传递原始属性进行转换
        path.node.openingElement.attributes = applyTextareaTransformations(
          path.node.openingElement.attributes
        );
      } else {
        // 将 TextInput 转换为 Taro 的 Input 组件
        openingElementName.name = "Input";
        // 传递原始属性进行转换
        path.node.openingElement.attributes = applyInputTransformations(
          path.node.openingElement.attributes
        );
      }
      // 如果存在闭合标签，则也需要修改闭合标签名称
      if (
        path.node.closingElement &&
        t.isJSXIdentifier(path.node.closingElement.name)
      ) {
        path.node.closingElement.name.name = openingElementName.name;
      }
    }
  }
}
// 用于应用 Input 特定转换的函数
function applyInputTransformations(attributes) {
  // 遍历所有属性，转换特定的属性
  const transformedAttributes = attributes.reduce((accumulator, attr) => {
    const attributeName = attr.name.name;
    switch (attributeName) {
      case "autoComplete":
      case "secureTextEntry":
      case "defaultValue":
      case "fixed":
      case "showCount":
      case "onChangeText":
        // 删除上述 case 属性，所以这里不执行任何操作
        break;
      case "accessibilityLabel":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("ariaLabel"), attr.value)
        ); // 创建一个名为 'ariaLabel' 的新 JSX 属性节点，其值与 attr.value 相同
        break;
      case "autofocus":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("autoFocus"), attr.value)
        );
        break;
      case "editable":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("disabled"), attr.value)
        );
        break;
      case "keyboardType":
        accumulator.push(t.jsxAttribute(t.jsxIdentifier("type"), attr.value));
        break;

      case "placeholderColor":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("placeholderTextColor"), attr.value)
        );
        break;
      case "onChange":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("onInput"), attr.value)
        );
        break;
      default:
        // 对于不需要转换的属性，保持不变
        accumulator.push(attr);
        break;
    }
    return accumulator;
  }, []);

  // 返回转换后的属性数组
  return transformedAttributes;
}

// 用于应用 Textarea 特定转换的函数
function applyTextareaTransformations(attributes) {
  const transformedAttributes = attributes.reduce((accumulator, attr) => {
    const attributeName = attr.name.name;
    switch (attributeName) {
      case "multiline":
      case "autoComplete":
      case "onAppear":
      case "keyboardType":
      case "maxNumberOfLines":
      case "numberOfLines":
      case "password":
      case "secureTextEntry":
      case "defaultValue":
      case "enableNative":
      case "randomNumber":
      case "onChangeText":
        // 删除上述 case 属性，所以这里不执行任何操作
        break;
      case "accessibilityLabel":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("ariaLabel"), attr.value)
        ); // 创建一个名为 'ariaLabel' 的新 JSX 属性节点，其值与 attr.value 相同
        break;
      case "autofocus":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("autoFocus"), attr.value)
        );
        break;
      case "editable":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("disabled"), attr.value)
        );
        break;
      case "maxLength":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("maxlength"), attr.value)
        );
        break;
      case "placeholderColor":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("placeholderStyle"), attr.value)
        );
        break;
      case "onChange":
        accumulator.push(
          t.jsxAttribute(t.jsxIdentifier("onInput"), attr.value)
        );
        break;
      default:
        // 对于不需要转换的属性，保持不变
        accumulator.push(attr);
        break;
    }
    return accumulator;
  }, []);

  // 返回转换后的属性数组
  return transformedAttributes;
}
module.exports = {
  transformTextInputElement,
};
