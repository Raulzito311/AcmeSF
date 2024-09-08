import { defineConfig } from 'vite'

export default defineConfig({
    resolve: { alias: { '@': '/src' } },
    server: {
        host: true
    }
})