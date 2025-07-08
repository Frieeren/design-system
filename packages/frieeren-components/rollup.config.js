import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import svgr from "@svgr/rollup";

/**
 * @type {import('rollup').PluginImpl}
 */
function preserveUseClient() {
  return {
    name: "preserve-use-client",
    generateBundle(options, bundle) {
      Object.keys(bundle).forEach(fileName => {
        const chunk = bundle[fileName];

        if (chunk.type === "chunk" && chunk.isEntry) {
          if (!chunk.code.startsWith('"use client"')) {
            chunk.code = '"use client";\n' + chunk.code;
          }
        }
      });
    }
  };
}

const commonPlugins = [
  svgr({ icon: true }),
  typescript({
    tsconfig: "./tsconfig.json",
    declarationDir: "./dist"
  }),
  babel({
    babelHelpers: "bundled",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
  }),
  typescriptPaths()
];

export default [
  {
    input: "src/index.ts",
    external: ["@radix-ui/react-popover"],
    output: [
      {
        file: "dist/index.js",
        format: "es"
      }
    ],
    plugins: [
      ...commonPlugins,
      postcss({
        inject: false,
        extract: "index.css",
        minimize: true
      })
    ]
  },
  {
    input: "src/client.ts",
    external: ["@radix-ui/react-popover"],
    output: [
      {
        file: "dist/client.js",
        format: "es"
      }
    ],
    plugins: [
      ...commonPlugins,
      preserveUseClient(),
      postcss({
        inject: false,
        extract: "index.css",
        minimize: true
      })
    ]
  }
];
