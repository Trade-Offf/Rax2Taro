const traverse = require("@babel/traverse").default;
// 这个文件负责遍历 AST，并应用转换逻辑。
function transform(ast) {
  traverse(ast, {
    // 遍历和转换逻辑
  });
}

module.exports = {
  transform,
};
