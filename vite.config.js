// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ command }) => {
  const isProduction = command === 'build';

  // Define environment variable based on the environment
  const apiUrl = isProduction
    ? 'https://server.fabriziomarras.com'
    : 'http://localhost:3333';

  return defineConfig({
    plugins: [
      react(),
    ],
    define: {
      'process.env': {
        VITE_REACT_APP_API_ENDPOINT: JSON.stringify(apiUrl),
      },
    },
  });
};
