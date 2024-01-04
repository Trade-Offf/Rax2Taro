// src/Transformers/ImportsTransformer/index.js
const t = require("@babel/types");

// 定义基础组件映射表，用于存储组件名及其对应的新导入信息
const componentImportMap = {
  "rax-view": {
    source: "@tarojs/components",
    importName: "View",
  },
  "rax-text": {
    source: "@tarojs/components",
    importName: "Text",
  },
  "rax-icon": {
    source: "@tarojs/components",
    importName: "Image",
  },
  "rax-image": {
    source: "@tarojs/components",
    importName: "Image",
  },
  "@ali/rax-picture": {
    source: "@tarojs/components",
    importName: "Image",
  },
  // ... 添加更多组件及其转换规则
};

const taroComponentsToImport = new Set();

function transformImportDeclaration(path) {
  const importSource = path.node.source.value;

  // 删除 "rax" 模块的 createElement
  if (importSource === "rax") {
    path.node.specifiers = path.node.specifiers.filter(
      (specifier) =>
        !(
          t.isImportSpecifier(specifier) &&
          specifier.imported.name === "createElement"
        )
    );
    if (path.node.specifiers.length === 0) {
      path.remove();
    }
  }

  // 基础组件映射转换
  const newImportInfo = componentImportMap[importSource];
  if (newImportInfo) {
    taroComponentsToImport.add(newImportInfo.importName);
    path.remove(); // 移除原有的导入声明
  }
}

function addTaroImportDeclaration(ast) {
  if (taroComponentsToImport.size > 0) {
    const importSpecifiers = Array.from(taroComponentsToImport).map(
      (importName) =>
        t.importSpecifier(t.identifier(importName), t.identifier(importName))
    );

    const taroImportDeclaration = t.importDeclaration(
      importSpecifiers,
      t.stringLiteral("@tarojs/components")
    );

    // 在 AST 的开头添加 Taro 的统一导入声明
    ast.program.body.unshift(taroImportDeclaration);
  }
}

module.exports = {
  transformImportDeclaration,
  addTaroImportDeclaration,
};
