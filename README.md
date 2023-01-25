# satellite-lucide-icons

## Install

```bash
yarn add vue-feather-icons
```

## Usage

```js
// Only import what you need!
import { AirplayIcon, AtSignIcon, ... } from 'satellite-lucide-icons'
```

### Sizing

By default, icons will be sized based on the font size of the parent element.

You can set a custom size using the `size` attribute. 
For multiple based sizing, pass the desired multiple followed by an `x`.

### Icons List

For a full list of icons see (https://lucide.dev/)

```html
<activity-icon size="1.5x" class="custom-class"></activity-icon> 
```

You can also set a `px` size directly by just passing an integer

```html
<activity-icon size="25" class="custom-class"></activity-icon> 
```

## Tree shaking

By using ES imports like `import { AirplayIcon } from 'vue-feather-icons'` with [webpack + minifier](https://webpack.js.org/guides/tree-shaking/#minify-the-output) or Rollup, unused exports in this module will be automatically eliminated.

To make webpack tree shaking work without using any minifier, you can use the per-file icons from [`icons`](https://unpkg.com/vue-feather-icons/icons/) directory, e.g. `import AirplayIcon from 'vue-feather-icons/icons/AirplayIcon'`.

## Related

- [vue-bytesize-icons](https://github.com/egoist/vue-bytesize-icons)

## Original Author

**vue-feather-icons** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/vue-feather-icons/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
