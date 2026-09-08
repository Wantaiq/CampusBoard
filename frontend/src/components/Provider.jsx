import {
  ChakraProvider,
  createSystem,
  defineConfig,
  defaultConfig,
  defineSlotRecipe,
} from '@chakra-ui/react';
const config = defineConfig({
  theme: {
    recipes: { button: { base: { colorPalette: 'teal' } } },
    slotRecipes: {
      card: defineSlotRecipe({
        defaultVariants: { variant: 'elevated', size: 'lg' },
      }),
    },
  },
});

const system = createSystem(defaultConfig, config);

export function Provider({ children }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
