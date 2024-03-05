const fs = require("fs");
const parser = require("./parser");
const transformer = require("./Transformers");
const generator = require("./generator");

// 主入口文件，负责串起整个流程

const sourceCode = fs.readFileSync("Input/RaxInput.js", "utf-8");

const ast = parser.parse(sourceCode);
transformer.transform(ast);
const output = generator.generate(ast);

fs.writeFileSync("Output/TaroOutput.js", output.code, "utf-8");
