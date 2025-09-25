import fs from 'fs'
import path from 'path'
import process from 'process'
import type { PluginOption } from 'vite'

function getOutputJsonPath(filePath: string) {
  const relativePath = path.relative(process.env.UNI_INPUT_DIR!, filePath)
  const { name, dir } = path.parse(relativePath)

  return path.join(process.env.UNI_OUTPUT_DIR!, dir, name + '.json')
}

function getComponentPlaceholderConfig(code: string) {
  const regex = /componentPlaceholder\s*:\s*({[^{}]*})/s
  const match = code.match(regex)

  if (!match) {
    return
  }

  const result = match[1].replace(/(\w+)\s*:/g, '"$1":').replace(/'([^']*)'/g, '"$1"')
  return new Function('return ' + result)()
}

function isAllowExtension(path: string) {
  return ['vue', 'nvue', 'uvue'].some((ext) => path.endsWith(ext))
}

export default function componentPlaceholderPlugin(): PluginOption {
  const map: Map<string, Record<string, string>> = new Map()

  return {
    name: 'vite-plugin-component-placeholder',
    enforce: 'post',
    transform(code, id) {
      const platform = process.env.UNI_PLATFORM
      if (!platform || platform.startsWith('mp-')) {
        return
      }
      if (!isAllowExtension(id)) {
        return
      }
      const config = getComponentPlaceholderConfig(code)
      if (config) {
        const outputPath = getOutputJsonPath(id)
        map.set(outputPath, config)
      }
    },
    closeBundle() {
      if (map.size === 0) {
        return
      }
      for (const [outputPath, config] of map) {
        const content = fs.readFileSync(outputPath, 'utf-8')
        const json = JSON.parse(content)
        json['componentPlaceholder'] = config
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2))
      }
    },
  }
}
