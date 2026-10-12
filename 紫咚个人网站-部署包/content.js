/* Replace portrait with a real photo, minimum 1000 × 1200px. Use a local relative path.
   Résumé viewer: resume.html; original image: assets/resume-01.jpg.
   Optional public contact: set contactEmail only to the address you want visitors to see. */
window.PORTFOLIO = {
  portraitUrl: 'assets/portrait.png',
  resumeUrl: 'resume.html',
  contactEmail: '',
  projects: {
    learning: { url: 'ai-learning.html', title: 'AI 教学实训平台', category: 'AI PRODUCT / EDUCATION', description: '连接学习与实践的智能化教学体验。', role: 'UX 设计师', outcome: '上线数据表现良好' },
    assistant: { title: '智能问答', category: 'AI EXPERIENCE / CONVERSATION', description: '让人与智能之间的对话，自然发生。', role: 'UX 设计师', outcome: '上线数据表现良好' },
    hmi: { title: '车载 HMI', category: 'AUTOMOTIVE / HUMAN MACHINE INTERFACE', description: '在人、车与场景之间，构建清晰的交互秩序。', role: 'UX 设计师', outcome: '上线数据表现良好' }
  }
};
