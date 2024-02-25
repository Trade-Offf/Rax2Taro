const fs = require("fs");
const path = require("path");
const { transform } = require("../src/Transformers");
const parser = require("@babel/parser");
const generator = require("@babel/generator").default;

// 基于你 Rax 源文件和 Taro 输出的路径
const raxSourcePath = path.join(__dirname, "../../rax-test-demo/src/index.js");
const taroOutputPath = path.join(
  __dirname,
  "../../TaroTestDemo/src/pages/index/index.jsx"
);

describe("End-to-End Transformation", () => {
  it("从Rax组件中读取源码，转换为Taro组件", () => {
    const raxSourceCode = fs.readFileSync(raxSourcePath, "utf8");

    // 1.解析 Rax 源代码为 AST
    const raxAst = parser.parse(raxSourceCode, {
      sourceType: "module",
      plugins: ["jsx"],
    });
    // 2.转换 AST
    transform(raxAst);
    // 3.生成转换后的 Taro 源代码
    const taroOutput = generator(raxAst, {});

    fs.writeFileSync(taroOutputPath, taroOutput.code);
  });
});
