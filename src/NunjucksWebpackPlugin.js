const path = require("path")
const nunjucks = require("nunjucks")

const pluginName = "NunjucksWebpackPlugin"

class NunjucksWebpackPlugin {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        configure: {
          options: {},
          path: "",
        },
        templates: [],
      },
      options || {},
    )

    if (!Array.isArray(this.options.templates) || this.options.templates.length === 0) {
      throw new Error("Options `templates` must be an empty array")
    }
  }

  apply(compiler) {
    const {options, webpack, hooks} = compiler
    const {Compilation, sources} = webpack
    const {RawSource} = sources

    let output = options.output.path

    if (output === "/" && options.devServer && options.devServer.outputPath) {
      output = options.devServer.outputPath
    }

    hooks.thisCompilation.tap(pluginName, (compilation) => {
      const configure =
        this.options.configure instanceof nunjucks.Environment
          ? this.options.configure
          : nunjucks.configure(this.options.configure.path, this.options.configure.options)

      const baseContext = {
        __webpack__: {
          hash: compilation.hash,
        },
      }

      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        () => {
          this.options.templates.forEach((template) => {
            if (!template.from) {
              throw new Error("Each template should have `from` option")
            }

            if (!template.to) {
              throw new Error("Each template should have `to` option")
            }

            const content = configure.render(
              template.from,
              Object.assign(baseContext, template.context),
              template.callback ? template.callback : null,
            )

            let webpackTo = template.to

            if (path.isAbsolute(webpackTo)) {
              webpackTo = path.relative(output, webpackTo)
            }

            compilation.emitAsset(webpackTo, new RawSource(content))
          })
        },
      )
    })
  }
}

module.exports = NunjucksWebpackPlugin
