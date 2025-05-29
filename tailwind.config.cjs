module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'piggy-jump': 'piggy-jump 0.5s ease-in-out',
        'fade-in': 'fadeIn 1s ease-in-out'
      },
      keyframes: {
        'piggy-jump': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '25%': { transform: 'translateY(-10px) scale(1.05)' },
          '50%': { transform: 'translateY(0) scale(1.1)' },
          '75%': { transform: 'translateY(-5px) scale(1.05)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      backgroundImage: {
        'explorer-bg': "url('https://picsum.photos/id/1015/600/400')",
        'adventurer-bg': "url('https://picsum.photos/id/1025/600/400')",
        'hero-bg': "url('https://picsum.photos/id/1003/600/400')",
        'default-bg': "url('https://picsum.photos/id/1040/600/400')",
      }
    }
  },
  plugins: []
}
