# nunjucks-webpack-plugin

A webpack plugin for nunjucks.

## Install

```shell
npm install --save-dev nunjucks-webpack-plugin
```

## Usage

```js
import NunjucksWebpackPlugin from "nunjucks-webpack-plugin"

export default {
  plugins: [
    new NunjucksWebpackPlugin({
      templates: [
        {
          from: "/path/to/template.njk",
          to: "template.html",
        },
      ],
    }),
  ],
}
```

It is possible to use multiple templates:

```js
import NunjucksWebpackPlugin from "nunjucks-webpack-plugin"

export default {
  plugins: [
    new NunjucksWebpackPlugin({
      templates: [
        {
          from: "/path/to/template.njk",
          to: "template.html",
        },
        {
          from: "/path/to/next-template.njk",
          to: "next-template.html",
        },
      ],
    }),
  ],
}
```

## Options

- `templates` - (require) `array` list of templates.

  - `from` - (require) `string` path to template.

  - `to` - (require) `string` destination path include filename and extension
    (relative `output` webpack option).

  - `context` - (optional) instead global `context` (see above), see
    [render](https://mozilla.github.io/nunjucks/api.html#render) second
    argument. The following webpack compilation variables are also sent
    through to the template under the `__webpack__` object:

    - hash

  - `callback` - (optional) instead global `callback` (see above), see
    [render](https://mozilla.github.io/nunjucks/api.html#render) third argument.

- `configure` - (optional) `object` or `nunjucks.Environment` see
  [configure](https://mozilla.github.io/nunjucks/api.html#configure) options.

## Credits

Based heavily on [https://github.com/itgalaxy/nunjucks-webpack-plugin](https://github.com/itgalaxy/nunjucks-webpack-plugin) but simplified and made to work with webpack v5
