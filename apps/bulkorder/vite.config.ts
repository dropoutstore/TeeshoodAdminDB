import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import basicSsl from '@vitejs/plugin-basic-ssl'
export default defineConfig({
  cacheDir: '../../node_modules/.vite/bulk-orders',

  server: {
    port: 4200, 
    host: '0.0.0.0',
    https:true,
    cors:true,
  },

  preview: {
    port: 4300,
    host: '0.0.0.0',
  },

  plugins: [react(), nxViteTsPaths(),basicSsl()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
