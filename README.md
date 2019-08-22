> 学习创建脚手架用到的库

- 执行`yarn`或者`npm i`安装依赖
- 执行`npm link`将`daheng`命令关联到环境变量

```shell
daheng create ./<project-name> 测试
```

- 执行`npm unlink`将`daheng`命令从环境变量删除

---

> 脚手架配置

- 配置克隆的代码来自于哪个代码库，哪个分之

> 脚手架功能

- 是否使用的css预处理器 (不使用/less/sass/scss)(默认不使用)
- 是否使用路由 (默认使用)
- 是否使用history模式 (默认使用)

> 暂未支持的功能

- 单元测试
- e2e测试
