import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', { debug: true }]],
            },
        }),
        ViteImageOptimizer({
            webp: { quality: 80 },
            avif: { quality: 70 },
        }),
        tailwindcss(),
        visualizer({ open: true }),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 1024,
            deleteOriginFile: false,
        }),
    ],
    base: process.env.VITE_BASE_PATH,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
