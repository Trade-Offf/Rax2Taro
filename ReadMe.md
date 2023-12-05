# Rax to Taro Compiler

This project is a compiler that converts Rax code into Taro code.

## 项目结构

```
/Rax2Taro
|-- /node_modules                 # 项目依赖库安装文件夹
|-- /src
|   |-- index.js                  # 主入口文件，协调整个转换过程
|   |-- parser.js                 # 用于解析源代码生成 AST
|   |-- generator.js              # 用于从修改后的 AST 生成新的源代码
|-- /Transformers                 # 存放转换逻辑的模块文件夹
|   |-- index.js                  # 整合各种转换规则的主要转换器
|   |-- FunctionTransformer.js    # 函数转换逻辑
|   |-- /JSXElementsTransformer   # 存放 JSX 元素的特定转换器
|       |-- index.js              # 整合 JSX 元素转换规则
|       |-- ...                   # 其他 JSX 元素转换模块
|   |-- ...                       # 其他转换逻辑模块
|-- /Input                        # 存放待转化的 Rax.js 的文件夹
|-- /Output                       # 存放转化后的 Taro.js 的文件夹
|-- package.json                  # 定义项目依赖和脚本
|-- .babelrc                      # Babel 配置文件（如果需要自定义 Babel 配置）
|-- README.md                     # 项目说明文档
|-- LICENSE                       # 项目许可证文件（如果有的话）
```

## Usage

// TODO: Add usage instructions

## Contributing

// TODO: Add contributing guidelines
