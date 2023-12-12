// src/Transformers/ImportsTransformer/index.js
const t = require("@babel/types");

// 定义一个映射表，用于存储组件名及其对应的新导入信息
const componentImportMap = {
  "rax-view": {
    source: "@tarojs/components",
    importName: "View",
  },
  "rax-text": {
    source: "@tarojs/components",
    importName: "Text",
  },
  // ... 添加更多组件及其转换规则
};

function transformImportDeclaration(path) {
  const importSource = path.node.source.value;

  // 特殊处理 "rax" 模块的 createElement 导入
  if (importSource === "rax") {
    path.node.specifiers = path.node.specifiers.filter(
      (specifier) =>
        !(
          t.isImportSpecifier(specifier) &&
          specifier.imported.name === "createElement"
        )
    );

    // 如果没有剩余的导入标识符，则删除整个导入声明
    if (path.node.specifiers.length === 0) {
      path.remove();
    }
  }

  // 通用组件映射转换
  const newImportInfo = componentImportMap[importSource];
  if (newImportInfo) {
    const newImportSpecifier = t.importSpecifier(
      t.identifier(newImportInfo.importName),
      t.identifier(newImportInfo.importName)
    );
    const newImportDeclaration = t.importDeclaration(
      [newImportSpecifier],
      t.stringLiteral(newImportInfo.source)
    );
    path.replaceWith(newImportDeclaration);
  }
}

module.exports = {
  transformImportDeclaration,
};
