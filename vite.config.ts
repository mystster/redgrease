import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Banner from 'vite-plugin-banner'

export default defineConfig({
  plugins: [
    vue(),
    Banner(`// ==UserScript==
// @name myst
// @namespace myst.redgrease
// @match https://*
// @grant none
// ==/UserScript==
// */
`)
	],
	server: {
		watch: {
			usePolling: true,
			interval: 1000,
			binaryInterval: 2000
		}
	},
	build: {
		target: "esnext",
		assetsInlineLimit: 100000000,
		chunkSizeWarningLimit: 100000000,
		cssCodeSplit: false,
		brotliSize: false,
		rollupOptions: {
			inlineDynamicImports: true,
			output: {
				manualChunks: () => "everything.js",
				assetFileNames: `assets/[name].[ext]`,
				chunkFileNames: `assets/[name].js`,
				entryFileNames: `assets/[name].js`
			},
		},
	},
})
