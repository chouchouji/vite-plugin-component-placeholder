import { describe, expect, test } from 'vitest'
import { getComponentPlaceholderConfig } from '../src/utils'

describe('getComponentPlaceholderConfig - Vue Component Tests', () => {
  // Vue 3 Composition API
  test('should extract config from Vue 3 Composition API code', () => {
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
  test('should extract config from Vue 3 Options API code', () => {
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

  // Various formats in single file components
  test('should handle different componentPlaceholder formats', () => {
    const testCases = [
      {
        code: `
          <script>
          export default {
            componentPlaceholder:{button:'view',image:'div'}
          }
          </script>
        `,
        expected: { button: 'view', image: 'div' },
      },
      {
        code: `
          <script>
          export default {
            componentPlaceholder : { button : 'view' , image : 'div' }
          }
          </script>
        `,
        expected: { button: 'view', image: 'div' },
      },
      {
        code: `
          <script>
          export default {
            componentPlaceholder: {"button": "view", "image": "div"}
          }
          </script>
        `,
        expected: { button: 'view', image: 'div' },
      },
    ]

    testCases.forEach(({ code, expected }) => {
      const result = getComponentPlaceholderConfig(code)
      expect(result).toEqual(expected)
    })
  })

  // Uni-app specific scenarios
  test('should handle Uni-app specific component mappings', () => {
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
      swiper: 'div',
      'swiper-item': 'div',
      'scroll-view': 'div',
      text: 'span',
    })
  })

  // Edge case - no componentPlaceholder
  test('should return undefined when Vue component has no config', () => {
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

  // Multiple script blocks
  test('should handle multiple script blocks', () => {
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

  // TypeScript Vue components
  test('should handle TypeScript Vue components', () => {
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

  // Complex selector names
  test('should handle component names with special characters', () => {
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
      Component: 'span',
    })
  })
})
