import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readdirSync } from 'fs'

// Creates aliases to avoid ../../../ imports. Can use like 'hooks/auth' for file in src/hooks/auth
const absolutePathAliases: { [key: string]: string } = {};
const srcPath = path.resolve('./src/');
// Grabs all ts/tsx files
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ''));

srcRootContent.forEach((directory) => {
	absolutePathAliases[directory] = path.join(srcPath, directory);
});


// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			...absolutePathAliases
		}
	},
	plugins: [react()]
})
