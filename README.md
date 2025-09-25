# @binbinji/vite-plugin-component-placeholder

### 背景

微信小程序支持 [跨分包自定义组件引用](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html)，但是 `uniapp` 只支持在 `pages.json` 下的页面中配置 `componentPlaceholder`， 并不支持在某个具体的组件中添加此配置，此插件旨在解决这个问题。

### 📦 安装

```shell
// npm
npm i @binbinji/vite-plugin-component-placeholder -D

// yarn
yarn add @binbinji/vite-plugin-component-placeholder -D

// pnpm
pnpm add @binbinji/vite-plugin-component-placeholder -D
```

### 使用

#### 1. 引入 `@binbinji/vite-plugin-component-placeholder`

```javascript
// vite.config.*
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import componentPlaceholderPlugin from "@binbinji/vite-plugin-component-placeholder";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), componentPlaceholderPlugin()],
});
```

#### 2. 在 vue/nuve/uvue 文件中添加配置

##### 组合式文件

在 `vue` 相关文件中添加 `componentPlaceholder` 配置

```vue
<template>
   // xxxx
</template>

<script setup>
import test from "./test.vue";

defineOptions({
  componentPlaceholder: {
    test: "view"
  },
});
</script>
```

##### 选项式文件

```vue
<template>
   // xxxx
</template>

<script>
    import test from "./test.vue"
    export default {
        componentPlaceholder: {
            test: "view"
        }
    }
</script>
```

### 许可证

[MIT](LICENSE)