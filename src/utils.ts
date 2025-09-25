export function getComponentPlaceholderConfig(code: string) {
  const regex = /componentPlaceholder\s*:\s*({[^{}]*})/s
  const match = code.match(regex)

  if (!match) {
    return
  }

  const result = match[1].replace(/(\w+)\s*:/g, '"$1":').replace(/'([^']*)'/g, '"$1"')
  return new Function('return ' + result)()
}
