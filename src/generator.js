const generator = require("@babel/generator").default;
// 此文件用于将修改后的 AST 转换回源代码。
function generate(ast) {
  return generator(ast, {
    /* 生成选项 */
  });
}

module.exports = {
  generate,
};
