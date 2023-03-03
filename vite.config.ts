import path from 'path';
import { defineConfig } from 'vite';

import legacy from '@rollup/plugin-legacy';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [
    // legacy({
    //   './src/vendor/rangy-core.js': 'rangy',
    // }),
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  optimizeDeps: {
    entries: 'rangy*.js',
  },
});
