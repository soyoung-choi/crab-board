module.exports = {
	devServer: {
		overlay: false,
		proxy: {
			'/api': {
				target: process.env.VUE_APP_API_URL,
				changeOrigin: true,
			},
		},
	},
	outputDir: '../backend/public',
}
