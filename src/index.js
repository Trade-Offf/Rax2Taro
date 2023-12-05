const fs = require("fs");
const parser = require("./parser");
const transformer = require("./transformer");
const generator = require("./generator");

const sourceCode = fs.readFileSync("examples/RaxInput.js", "utf-8");
const ast = parser.parse(sourceCode);
transformer.transform(ast);
const output = generator.generate(ast);

fs.writeFileSync("outPut/taroOut.js", output.code, "utf-8");
