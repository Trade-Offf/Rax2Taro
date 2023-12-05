# Rax to Taro Compiler

This project is a compiler that converts Rax code into Taro code.

## 项目结构

```
/Rax2Taro
|-- /node_modules
|-- /src
|   |-- index.js            # 主入口文件，协调整个转换过程
|   |-- parser.js           # 用于解析源代码生成 AST
|   |-- transformer.js      # 用于遍历 AST 并应用转换逻辑
|   |-- generator.js        # 用于从修改后的 AST 生成新的源代码
|-- package.json            # 定义项目依赖和脚本
|-- .babelrc                # Babel 配置文件（如果需要自定义 Babel 配置）
|-- /InPut                  # 存放待转化的Rax.js的文件夹
|-- /OutPut                 # 存放转化后的Taro.js的文件夹
|-- README.md               # 项目说明文档
```

## Usage

// TODO: Add usage instructions

## Contributing

// TODO: Add contributing guidelines
