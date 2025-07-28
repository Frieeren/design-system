import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import svgr from "@svgr/rollup";
import PackageJSON from "./package.json" with { type: "json" };

/**
 * @type {import('rollup').PluginImpl}
 */
function preserveUseClient() {
  return {
    name: "preserve-use-client",
    renderChunk(code, chunk) {
      const hasUseClient = Object.keys(chunk.modules).some(module => {
        const moduleInfo = this.getModuleInfo(module);
        return moduleInfo?.code?.includes("use client");
      });
      if (hasUseClient) {
        return '"use client";\n\n' + code;
      }

      return null;
    }
  };
}

const commonPlugins = [
  typescript({
    tsconfig: "./tsconfig.json",
    declarationDir: "./dist"
  }),
  svgr({ icon: true }),
  babel({
    babelHelpers: "bundled",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
  }),
  typescriptPaths(),
  preserveUseClient()
];

const external = [
  ...Object.keys(PackageJSON.dependencies),
  ...Object.keys(PackageJSON.peerDependencies),
  "react/jsx-runtime"
];

const components = Object.keys(PackageJSON.exports)
  .filter(key => key !== "." && key !== "./styles.css")
  .map(key => {
    const componentName = key.replace("./", "");
    if (componentName.length === 0) {
      return null;
    }
    return `${componentName[0].toUpperCase()}${componentName.substring(1)}`;
  });

export default [
  {
    input: "src/index.ts",
    external,
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
  ...components.map(componentName => {
    return {
      input: `src/components/${componentName}/index.ts`,
      external,
      output: [
        {
          file: `dist/${componentName}.js`,
          format: "es"
        }
      ],
      plugins: [...commonPlugins]
    };
  })
];
