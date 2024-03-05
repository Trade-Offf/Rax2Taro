const generator = require("@babel/generator").default;

// 此文件用于将转换后的 AST 生成 TargetCode
function generate(ast) {
  return generator(ast, {});
}

module.exports = {
  generate,
};
