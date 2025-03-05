/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				kings: {
					green: {
						100: "#ced9d7",
						200: "#9db3af",
						300: "#6c8e86",
						400: "#3b685e",
						500: "#0a4236",
						600: "#08352b",
						700: "#062820",
						800: "#041a16",
						900: "#020d0b",
					},
					gold: {
						100: "#f9f1d6",
						200: "#f3e3ad",
						300: "#ecd684",
						400: "#e6c85b",
						500: "#e0ba32",
						600: "#b39528",
						700: "#86701e",
						800: "#5a4a14",
						900: "#2d250a",
					},
				},
			},
			screens: {
				"3xl": "1800px",
			},
			keyframes: {
				slideIn: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				},
			},
			animation: {
				slideIn: "slideIn 0.5s ease-out",
			},
		},
	},
	plugins: [],
};
