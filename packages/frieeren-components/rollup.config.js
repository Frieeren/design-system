import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import svgr from "@svgr/rollup";

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
      postcss({ extract: true, minifycss: true }) // CSS는 index에서 한 번만 추출해서 사용
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
      postcss({ inject: false }) // CSS는 index에서 한 번만 추출해서 사용
    ]
  }
];
