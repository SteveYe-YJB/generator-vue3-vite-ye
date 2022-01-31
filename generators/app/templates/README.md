# 项目文档

## 1. vite 安装(npm init vite@latest)

## 2. 加入 git 仓库

## 3. Eslint 配置

### 3.1 项目中添加 eslint

1. 安装 ESlint(npm install eslint eslint-plugin-vue@latest --save--dev)
2. 初始化 ESlint 配置(npx eslint --init)
3. ESlint 配置文件(.eslintrc.js)中的 extends 属性中的 plugin 可以更改是否使用 vue3,具体可以配置的选项在 node_modules\eslint-plugin-vue\lib\configs 下选
4. 在项目的 package.json 文件中增加 ESlint 检查命令("lint": "eslint ./src/\*_/_.{js,jsx,vue,ts,tsx} --fix")
5. vue3 的项目需要在 .eslintrc.js 中添加 globals 节点， 避免 eslint 与 vue3 的语法冲突

   ```javascript
      globals: {
         defineProps: 'readonly',
         defineEmits: 'readonly',
         defineExpose: 'readonly',
         withDefaults: 'readonly'
      },
   ```

### 3.2 编辑器集成 ESlint

1. 卸载/禁用 vetur 插件(影响 vue3 语法)
2. 安装 ESlint 插件
   - 只要安装了这个插件,会自动查找 eslint 配置规范,并且给出验证提示
   - 格式化, 右键配置默认格式化工具
3. 安装 volar 插件 (vue3 语法的适配)

### 3.3 配置 commit 钩子执行 ESlint(git 提交时验证代码)

1. 安装(npx mrm@2 lint-staged)
   - 自动安装 husky 提供在 git 钩子脚本的工具
   - 自动安装 lint-staged, 获取缓存区的提交代码进行 eslint 验证
   - 自动添加 package.json 命令("prepare": "husky install"), 在初始化的时候把相应的钩子参数脚本挂载到本地
     - 当别人原本已有该项目,需手动执行该命令
     - 重新 clone 的新项目在 npm install 时有钩子自动触发 prepare 命令
   - 在目录中生成文件名为 6 的文件,删除即可
2. 在 package.json 中添加 lint-staged 节点配置钩子脚本

   ```json
       "lint-staged": {
           "*.{js,jsx,vue,ts,tsx}": [
               "npm run lint",
               "git add"
           ]
       }
   ```
3. 注意mac用户或者新拉取项目的用户需要给.husky文件夹赋予可执行权限 
   - chmod 777 .husky/commit-msg
   - chmod 777 .husky/pre-commit
   ```javascript 
      // 不然会报以下错误
      hint: The '.husky/commit-msg' hook was ignored because it's not set as executable.
      hint: You can disable this warning with `git config advice.ignoredHook false`.
   ```

### 3.4 在开发和构建配置 ESlint

1. 安装(npm install vite-plugin-eslint --save--dev)
2. 在 vite.config.ts 中配置插件

   - 引入 import eslintPlugin from 'vite-plugin-eslint'
   - 添加插件 在 plugins 数组中添加插件

   ```javascript
   eslintPlugin({
     // 配置选项
     cache: false // 禁用 eslint 缓存
   }),
   ```

3. npm run build 和 npm run dev 会自动运行 eslint

### 3.5 git commit 规范

1. 提交规则，如：feat: 添加了新功能
   - feat：新功能（feature）
   - fix：修补 bug
   - docs：文档（documentation）
   - style： 格式（不影响代码运行的变动）
   - refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
   - test：增加测试
   - chore：构建过程或辅助工具的变动
2. 安装模块使机械验证是否符合
   - 安装模块: npm install --save--dev @commitlint/config-conventional @commitlint/cli
   - 初始化配置: echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
   - 执行 npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
     - 在.husky\commit-msg 文件下写入 npx --no -- commitlint --edit "$1"

## 4. vite 环境配置

### 4.1 vite 配置 jsx/tsx

1. 安装模块 (npm i -D @vitejs/plugin-vue-jsx)
2. 在 vite.config.ts 中配置插件

   - 引入 import vueJsx from '@vitejs/plugin-vue-jsx'
   - 添加插件 在 plugins 数组中添加插件

   ```javascript
   vueJsx({
     // 配置项
   })
   ```

3. 详细用法可以查看`https://github.com/vuejs/jsx-next`

### 4.2 vite 配置 VueRouter

1. 安装(npm i vue-router@4)

### 4.3 vite 配置 VueX

1. 安装(npm i vuex@next --save)

2. vuex 对 TS 的支持暂时还不太友好,只有对 state 还行

### 4.4 vite 配置 ts 检测 node 模块

1. 安装（npm i -D @types/node）即可

### 4.5 vite 配置模块路径别名

1. vite.config.ts 中添加 resolve 节点

   ```javascript
      resolve: {
         alias: {
            '@': path.join(__dirname, 'src')
         }
      }
   ```

2. 若需要 ts 检测到路径,需要在 tsconfig.json 中添加 path 节点

   ```json
      "compilerOptions": {
         "paths": {
            "@/*": ["./src/*"]
         }
   ```

### 4.6 vite 配置全局 scss 样式变量

1. 在 vite.config.ts 文件中添加 css 节点

```javascript
css: {
  preprocessorOptions: {
    // 给scss添加全局变量
    scss: {
      additionalData: '@import "@/styles/variables.scss";' // 全局变量的路径
    }
  }
}
```

### 4.7 vite 配置环境变量

1. 测试环境, 在项目根目录添加文件.env.development 文件
2. 开发环境, 在项目根目录添加文件.env.production 文件
3. `变量以 VITE_开头,如 VITE_API_BASEURL=http://101.35.42.92`
4. 给 import.meta 添加环境变量类型在 src 目录下新增文件 env.d.ts

   ```javascript
   // eslint-disable-next-line no-unused-vars
   interface ImportMetaEnv {
     VITE_API_BASEURL: string;
     // 更多环境变量...
   }
   ```

5. 使用方法: import.meta.env.VITE_API_BASEURL

### 4.8 vite 配置 proxy 代理

```javascript
server: {
   proxy: {
      // 字符串简写写法
      // /foo/123 => http://localhost:4567/foo/123
      // '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/admin': {
      // /admin/login => https://shop.fed.lagou.com/api/admin/login
      target: 'https://shop.fed.lagou.com/api', // 代理的目标地址
      // 兼容基于名字的虚拟主机
      // 不同的origin指向不同的端口
         // a.com localhost:xxx
         // b.com localhost:xxx
      // HTTP 请求头部的 origin 字段
      // 我们在开发模式：默认的 origin 是真实的 origin：localhost:3000
      // changeOrigin: true，代理服务会把 origin 修改为目标地址 http://jsonplaceholder.typicode.com
      changeOrigin: true

      // 路径重写
      // http://jsonplaceholder.typicode.com/api/xxx
      //    /api/xxx => http://jsonplaceholder.typicode.com/api/xxx
      // http://jsonplaceholder.typicode.com/xxx
      //    /api/xxx => http://jsonplaceholder.typicode.com/api/xxx
      // rewrite: (path) => path.replace(/^\/api/, '')
      }
   }
}
```

## 5. 请求配置

### 5.1 请求数据配置类型检测

1. 关闭 eslint 对接口文件的驼峰命名法规范,因为类型对接口返回的字段不完全是驼峰命名法，在.eslintrc.js 文件中添加 overrides 节点

   ```javascript
   overrides: [
     {
       // 关闭api文件夹下驼峰法的检验
       files: ['src/api/**/*.ts'],
       rules: {
         camelcase: 'off',
       },
     },
   ]
   ```

2. 二次封装的 axios 方法,导出一个方法接受传入的类型,return 数据转换成传入的类型

   ```javascript
      export default <T = any>(config: AxiosRequestConfig) => {
         return request(config).then(res => {
            return res.data.data as T
         })
      }
   ```

3. 使用的二次封装的 axios 的时候传入类型

   ```javascript
   export const getLoginInfo = () => {
     return (
       request <
       ILoginInfo >
       {
         method: 'GET',
         url: '/login/info',
       }
     )
   }
   ```

4. 页面中需要把请求返回的数据赋值需要给响应式数据赋予类型

   ```javascript
   import { getLoginInfo } from '@/api/common'
   import type { ILoginInfo } from '@/api/types/common'
   // 需要设置对应的类型才能赋值
   const list = ref < ILoginInfo['slide'] > []
   onMounted(() => {
     getLoginInfo().then(res => {
       list.value = res.slide
     })
   })
   ```
