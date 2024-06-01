// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(__dirname, 'src/frontend/.env'), debug: true, override: true})

const nuxtConfig = defineNuxtConfig({
    rootDir: path.resolve(__dirname),
    buildDir: path.resolve(__dirname, 'src/frontend/dist'),
    srcDir: path.resolve(__dirname, 'src/frontend'),
    modulesDir: [path.resolve(__dirname, 'node_modules')],
    devServer: {port: 8080},
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    server: {
        port: 8080,
    },
    alias: {
        '~store': path.resolve(__dirname, 'src/frontend/store'),
        '~types': path.resolve(__dirname, 'src/types'),
    },
    typescript: {
        tsConfig: path.resolve(__dirname, 'tsconfig.json'),
    },
    modules: ['nuxt-primevue', '@pinia/nuxt', 'nuxt-plotly'],
    vite: {
        optimizeDeps: {
            include: ['plotly.js-dist-min'],
        },
    },
    css: ['primevue/resources/themes/aura-dark-noir/theme.css'],
    components: true,
    imports: {
        autoImport: true,
    },
    buildModules: ['nuxt-storm', {alias: true}],
})

export default nuxtConfig