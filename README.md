# @binbinji/vite-plugin-component-placeholder

## 背景

微信小程序、支付宝小程序、抖音小程序等支持 [占位组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/placeholder.html)，但是 `uniapp` 只支持在 `pages.json` 下的页面中配置 `componentPlaceholder`， 并不支持在某个具体的组件中添加此配置，此插件旨在解决这个问题。

## 特性

- 配置简单，开箱即用
- 支持 vue、nvue、uvue 三种文件
- 支持 uni-app 和 uni-app-x 项目
- 支持 组合式 和 选项式 两种写法

## 安装

```shell
// npm
npm i @binbinji/vite-plugin-component-placeholder -D

// yarn
yarn add @binbinji/vite-plugin-component-placeholder -D

// pnpm
pnpm add @binbinji/vite-plugin-component-placeholder -D
```

## 使用

### 1. 引入 `@binbinji/vite-plugin-component-placeholder`

```javascript
// vite.config.*
import componentPlaceholderPlugin from '@binbinji/vite-plugin-component-placeholder'
import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), componentPlaceholderPlugin()],
})
```

### 2. 在 vue/nuve/uvue 文件中添加配置

在 `vue` 相关文件中添加 `componentPlaceholder` 配置

#### 组合式文件

```vue
<template>
  <view>test page</view>
  <test></test>
</template>

<script setup>
import test from './test.vue'

defineOptions({
  componentPlaceholder: {
    test: 'view',
  },
})
</script>
```

#### 选项式文件

```vue
<template>
  <view>test page</view>
  <test></test>
</template>

<script>
import test from './test.vue'

export default {
  components: {
    test,
  },
  componentPlaceholder: {
    test: 'view',
  },
}
</script>
```

## 配置项

插件支持以下配置选项：

| 参数      | 类型            | 默认值                     | 说明                   |
| --------- | --------------- | -------------------------- | ---------------------- |
| `include` | `FilterPattern` | `['**/*.{vue,nvue,uvue}']` | 指定需要处理的文件模式 |
| `exclude` | `FilterPattern` | `[]`                       | 指定需要排除的文件模式 |

## 许可证

[MIT](LICENSE)
