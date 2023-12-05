const parser = require("@babel/parser");
// 此文件包含解析源代码并生成 AST 的逻辑。

function parse(sourceCode) {
  return parser.parse(sourceCode, {
    sourceType: "module",
    plugins: ["jsx"],
  });
}

module.exports = {
  parse,
};
