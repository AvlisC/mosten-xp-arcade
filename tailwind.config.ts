
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				pixel: ['"Press Start 2P"', 'cursive'],
				retro: ['"VT323"', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Main theme colors
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Badge colors
				badge: {
					bronze: '#CD7F32',
					silver: '#C0C0C0',
					gold: '#FFD700',
					platinum: '#E5E4E2',
					diamond: '#B9F2FF',
				},
				// Game specific colors
				game: {
					purple: '#6E59A5',
					darkPurple: '#1A1F2C',
					lightPurple: '#9b87f5',
					green: '#58C16F',
					red: '#FF6B6B',
					yellow: '#FFD166',
					blue: '#118AB2',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pixel-fade-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'50%': { opacity: '0.5', transform: 'scale(0.975)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'pixel-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'pixel-pulse': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(0.98)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pixel-fade-in': 'pixel-fade-in 0.3s ease-in-out',
				'pixel-bounce': 'pixel-bounce 2s ease-in-out infinite',
				'pixel-pulse': 'pixel-pulse 1.5s ease-in-out infinite'
			},
			backgroundImage: {
				'pixel-pattern': "url('/pixel-pattern.png')",
				'grid-pattern': "repeating-linear-gradient(#000 0 1px, transparent 1px 8px), repeating-linear-gradient(90deg, #000 0 1px, transparent 1px 8px)"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
