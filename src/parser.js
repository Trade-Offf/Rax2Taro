const parser = require("@babel/parser");

// 此文件负责解析 SourceCode 生成 AST
function parse(sourceCode) {
  return parser.parse(sourceCode, {
    sourceType: "module",
    plugins: ["jsx"],
  });
}

module.exports = {
  parse,
};
