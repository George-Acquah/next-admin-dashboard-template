declare module "tailwindcss/lib/util/flattenColorPalette" {
  interface Color {
    [key: string]: string | Color; // Support nested colors
  }

  const flattenColorPalette: (colors: Color) => Record<string, string>;

  export default flattenColorPalette;
}
