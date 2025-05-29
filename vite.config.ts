import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    })
  ],
  resolve: {
    alias: [
      {
        find: /^@mui\/icons-material\/(.*)/,
        replacement: path.resolve(__dirname, 'node_modules/@mui/icons-material/esm/$1')
      },
      {
        find: /^@mui\/material\/(.*)/,
        replacement: path.resolve(__dirname, 'node_modules/@mui/material/esm/$1')
      }
    ]
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled'
    ],
    esbuildOptions: {
      plugins: [
        {
          name: 'fix-mui-icons',
          setup(build) {
            build.onResolve({ filter: /@mui\/icons-material/ }, args => {
              return {
                path: args.path.replace('@mui/icons-material', path.resolve(__dirname, 'node_modules/@mui/icons-material/esm'))
              };
            });
          }
        }
      ]
    }
  }
});