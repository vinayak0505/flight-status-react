/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {}
	},
	plugins: [],
	// needed to add this to load all type of lineclamp so that we can use it dynamically
	safelist: [
		{
			pattern: /^line-clamp-(\d+)$/
		},
		{
			pattern: /^max-w-(\d+)$/
		}
	]
};
