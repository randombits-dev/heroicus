import {defineConfig} from '@wagmi/cli';
import {hardhat} from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'generated.ts',
  contracts: [],
  plugins: [
    hardhat({
      commands: {
        clean: 'pnpm run clean',
        build: 'pnpm run compile',
        rebuild: 'pnpm run compile',
      },
      project: '../',
    }),
  ],
});
