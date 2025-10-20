import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/WAapp/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  }
})

// Replace the mock generation with real API:
const generateLesson = async () => {
  setIsGenerating(true);
  
  // Replace this with actual API call:
  const response = await fetch('YOUR_LLM_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      level: formData.level,
      focus: formData.focus,
      duration: formData.duration
    })
  });
  
  const plan = await response.json();
  setLessonPlan(plan);
  setIsGenerating(false);
};
