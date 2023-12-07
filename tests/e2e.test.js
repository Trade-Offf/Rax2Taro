// e2e.test.js
const fs = require("fs");
const path = require("path");
const { transform } = require("../src/Transformers");
const parser = require("@babel/parser");
const generator = require("@babel/generator").default;

// 基于你 Rax 源文件和 Taro 输出的路径
const raxSourcePath = path.join(__dirname, "../../rax-test-demo/src/index.js");
const taroOutputPath = path.join(__dirname, "../../TaroTestDemo/src/app.js");

describe("End-to-End Transformation", () => {
  it("should transform Rax component and output it to Taro project", () => {
    // 读取 Rax 源文件
    const raxSourceCode = fs.readFileSync(raxSourcePath, "utf8");

    // 解析 Rax 源代码为 AST
    const raxAst = parser.parse(raxSourceCode, {
      sourceType: "module",
      plugins: ["jsx"],
    });

    // 转换 AST
    transform(raxAst);

    // 生成转换后的 Taro 源代码
    const taroOutput = generator(raxAst, {});

    // 将转换后的代码写入 Taro 应用
    fs.writeFileSync(taroOutputPath, taroOutput.code);
  });
});
