const path = require('path')
const lucide = require('lucide')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const pascalCase = require('pascal-case')
const fs = require('fs-extra')

const Document = (new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)).window.document


const createElement = (tag, attrs, children = []) => {
  const element = Document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.keys(attrs).forEach(name => {
    element.setAttribute(name, attrs[name]);
  });
  if (children.length) {
    children = children.forEach(child => {
      const childElement = createElement(...child);

      element.appendChild(childElement);
    });
  }
  return element;
};

const componentTemplate = (name, svg) => `
export default {
  name: '${name}',

  props: {
    size: {
      type: String,
      default: '24',
      validator: (s) => (!isNaN(s) || s.length >= 2 && !isNaN(s.slice(0, s.length -1)) && s.slice(-1) === 'x' )
    }
  },

  functional: true,

  render(h, ctx) {
    const size = ctx.props.size.slice(-1) === 'x'
      ? ctx.props.size.slice(0, ctx.props.size.length -1) + 'em'
      : parseInt(ctx.props.size) + 'px';

    const attrs = ctx.data.attrs || {}
    attrs.width = attrs.width || size
    attrs.height = attrs.height || size
    ctx.data.attrs = attrs

    return ${svg.replace(/<svg([^>]+)>/, '<svg$1 {...ctx.data}>')}
  }
}
`.trim()

const handleComponentName = name => name.replace(/\-(\d+)/, '$1')

const icons = Object.keys(lucide.icons).map(name => ({
  name,
  pascalCasedComponentName: pascalCase(`${handleComponentName(name)}-icon`)
}))

const custom_icons = [
  'Satellite',
  'HeadphonesOff'
]

Promise.all(custom_icons.map(val => {
  return fs.readFile(`custom_icons/${val}.svg`, 'utf8', async function(err, data) {
      if (err) throw err
      const component = componentTemplate(pascalCase(`${handleComponentName(val)}-icon`), data)
      const filepath = `./src/components/${pascalCase(`${handleComponentName(val)}-icon`)}.js`
      await fs.ensureDir(path.dirname(filepath))
    return await fs.writeFile(filepath, component, 'utf8')
  })
})).then(() =>
  Promise.all(icons.map(async icon => {
    const playground = Document.createElement('div')
    const elm = createElement(...lucide[icon.name])
    playground.appendChild(elm)
    const component = componentTemplate(icon.pascalCasedComponentName, playground.innerHTML)
    const filepath = `./src/components/${icon.pascalCasedComponentName}.js`
    await fs.ensureDir(path.dirname(filepath))
    return await fs.writeFile(filepath, component, 'utf8')
  })).then(() => {
    custom_icons.map(val => {
      icons.push({
        name: val,
        pascalCasedComponentName: pascalCase(`${handleComponentName(val)}-icon`),
      })
    })
    const main = icons
      .map(icon => `export { default as ${icon.pascalCasedComponentName} } from '../icons/${icon.pascalCasedComponentName}'`)
      .join('\n\n')
    return fs.outputFile('./src/index.js', main, 'utf8')
  })
)
