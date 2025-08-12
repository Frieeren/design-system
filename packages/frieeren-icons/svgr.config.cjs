module.exports = {
  typescript: true,
  ref: true,
  dimensions: false,
  svgProps: {
    width: '{size}',
    height: '{size}',
  },
  expandProps: 'end',
  outDir: './src/icons',
  replaceAttrValues: {
    '#191B1C': 'currentColor',
    '#A6ABAF': 'currentColor',
    '#EF4444': 'currentColor',
    '#50BF50': 'currentColor',
    '#FEF08A': 'currentColor',
    '#F87171': 'currentColor',
  },
  template: (variables, { tpl }) => {
    return tpl`
${variables.imports};

const ${variables.componentName} = (
  { size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number | string },
  ref: Ref<SVGSVGElement>
) => (
  ${variables.jsx}
);

${variables.exports}
`;
  },
};