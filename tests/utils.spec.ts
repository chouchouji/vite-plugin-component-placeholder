import { describe, expect, test } from 'vitest'
import { getComponentPlaceholderConfig } from '../src/utils.js'

describe('getComponentPlaceholderConfig - Vue组件测试', () => {
  // Vue 3 Composition API
  test('应该从 Vue 3 Composition API 代码中提取配置', () => {
    const vueCode = `
      <template>
        <view class="container">
          <button>点击</button>
          <image src="logo.png" />
        </view>
      </template>

      <script setup>
      import { ref } from 'vue'

      const count = ref(0)

      defineOptions({
        componentPlaceholder: { button: 'view', image: 'div' }
      })
      </script>
    `
    
    const result = getComponentPlaceholderConfig(vueCode)
    expect(result).toEqual({ button: 'view', image: 'div' })
  })

  // Vue 3 Options API
  test('应该从 Vue 3 Options API 代码中提取配置', () => {
    const vueCode = `
      <template>
        <div>
          <rich-text :content="htmlContent" />
          <video :src="videoUrl" />
        </div>
      </template>

      <script>
      export default {
        name: 'MyComponent',
        componentPlaceholder: {
          'rich-text': 'div',
          'video': 'view'
        },
        data() {
          return {
            htmlContent: '<p>Hello</p>',
            videoUrl: 'video.mp4'
          }
        },
        methods: {
          handleClick() {
            console.log('clicked')
          }
        }
      }
      </script>

      <style scoped>
      .container { padding: 20px; }
      </style>
    `
    
    const result = getComponentPlaceholderConfig(vueCode)
    expect(result).toEqual({ 'rich-text': 'div', video: 'view' })
  })

  // 单文件组件中的各种格式
  test('应该处理 componentPlaceholder 的不同书写格式', () => {
    const testCases = [
      {
        code: `
          <script>
          export default {
            componentPlaceholder:{button:'view',image:'div'}
          }
          </script>
        `,
        expected: { button: 'view', image: 'div' }
      },
      {
        code: `
          <script>
          export default {
            componentPlaceholder : { button : 'view' , image : 'div' }
          }
          </script>
        `,
        expected: { button: 'view', image: 'div' }
      },
      {
        code: `
          <script>
          export default {
            componentPlaceholder: {"button": "view", "image": "div"}
          }
          </script>
        `,
        expected: { button: 'view', image: 'div' }
      }
    ]

    testCases.forEach(({ code, expected }) => {
      const result = getComponentPlaceholderConfig(code)
      expect(result).toEqual(expected)
    })
  })

  // Uni-app 特定场景
  test('应该处理 Uni-app 特有的组件映射', () => {
    const uniappCode = `
      <template>
        <view>
          <swiper indicator-dots autoplay>
            <swiper-item v-for="item in list" :key="item.id">
              <image :src="item.url" />
            </swiper-item>
          </swiper>
          <scroll-view scroll-y>
            <text>内容区域</text>
          </scroll-view>
        </view>
      </template>

      <script>
      export default {
        componentPlaceholder: {
          'swiper': 'div',
          'swiper-item': 'div',
          'scroll-view': 'div',
          'text': 'span'
        },
        data() {
          return {
            list: [{ id: 1, url: '1.jpg' }]
          }
        }
      }
      </script>
    `
    
    const result = getComponentPlaceholderConfig(uniappCode)
    expect(result).toEqual({
      'swiper': 'div',
      'swiper-item': 'div',
      'scroll-view': 'div',
      'text': 'span'
    })
  })

  // 边界情况 - 没有 componentPlaceholder
  test('应该返回 undefined 当 Vue 组件中没有配置时', () => {
    const vueCode = `
      <template>
        <div>Hello World</div>
      </template>

      <script>
      export default {
        name: 'HelloWorld',
        data() {
          return { message: 'hello' }
        }
      }
      </script>
    `
    
    const result = getComponentPlaceholderConfig(vueCode)
    expect(result).toBeUndefined()
  })

  // 多脚本块的情况
  test('应该处理多个 script 块的情况', () => {
    const vueCode = `
      <script>
      // 第一个脚本块
      export default {
        componentPlaceholder: { button: 'view' }
      }
      </script>

      <script setup>
      // 第二个脚本块 - 这个应该被忽略
      const anotherConfig = { image: 'div' }
      </script>
    `
    
    const result = getComponentPlaceholderConfig(vueCode)
    expect(result).toEqual({ button: 'view' })
  })

  // TypeScript Vue 组件
  test('应该处理 TypeScript Vue 组件', () => {
    const vueCode = `
      <template>
        <div>{{ message }}</div>
      </template>

      <script lang="ts">
      import { defineComponent } from 'vue'

      export default defineComponent({
        name: 'TsComponent',
        componentPlaceholder: { button: 'view', input: 'div' },
        data() {
          return {
            message: 'Hello TypeScript'
          }
        }
      })
      </script>
    `
    
    const result = getComponentPlaceholderConfig(vueCode)
    expect(result).toEqual({ button: 'view', input: 'div' })
  })

  // 复杂的选择器名称
  test('应该处理包含特殊字符的组件名', () => {
    const vueCode = `
      <script>
      export default {
        componentPlaceholder: {
          'v-button': 'button',
          'custom-element': 'div',
          'Component': 'span',
        }
      }
      </script>
    `
    
    const result = getComponentPlaceholderConfig(vueCode)
    expect(result).toEqual({
      'v-button': 'button',
      'custom-element': 'div',
      'Component': 'span'
    })
  })
})