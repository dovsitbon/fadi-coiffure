/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b', coal: '#121214', graphite: '#1b1c1f', steel: '#2a2b30',
        bone: '#f4f1ea', ash: '#a3a19b', amber: { DEFAULT: '#ffb020', deep: '#e08a00', soft: '#ffd27a' }
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      }
    }
  }
};
