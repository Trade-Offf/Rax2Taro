// src/index.js
const fs = require("fs");
const parser = require("./parser");
const transformer = require("./Transformers"); // 直接引入 Transform 文件夹的 index.js
const generator = require("./generator");

const sourceCode = fs.readFileSync("Input/RaxInput.js", "utf-8");
const ast = parser.parse(sourceCode);

transformer.transform(ast); // 使用 Transform 文件夹的 transform 函数

const output = generator.generate(ast);
fs.writeFileSync("Output/TaroOutput.js", output.code, "utf-8");
