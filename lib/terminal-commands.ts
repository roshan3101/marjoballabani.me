import { resumeData } from './data'

export interface TerminalOutput {
  type: 'command' | 'output' | 'error' | 'success' | 'info'
  text: string
}

export const getWelcomeMessage = (): string => {
  return `
╔════════════════════════════════════════════════════════════╗
║                  MARJO BALLABANI'S TERMINAL                ║
║              Senior Software Engineer | Munich, DE          ║
╚════════════════════════════════════════════════════════════╝

Type "help" to see available commands.
Type "exit-game" to quit any game or interactive session.
Use Ctrl+Shift+H for horizontal split, Ctrl+Shift+V for vertical split.

`
}

export const getHelpMessage = (): string => {
  return `
Available Commands:
  help              - Show this help message
  about             - Learn more about me
  experience        - View my work experience
  skills            - See my technical skills
  skills-visual     - Visual skills representation
  projects          - View my projects
  education         - Education information
  contact           - Get contact information
  clear             - Clear the terminal screen
  weather           - Weather forecast (demo)
  calc              - Simple calculator
  game              - Play a number guessing game
  matrix            - The Matrix effect
  pdf               - Download resume PDF
  exit-game         - Exit from game or interactive mode
  
Split Terminal Commands:
  split-h or Ctrl+Shift+H - Split terminal horizontally
  split-v or Ctrl+Shift+V - Split terminal vertically
  Right-click menu - Additional terminal options

Theme Commands:
  Click the theme selector (top-right) to change terminal theme.
  Available themes: Default, Dracula, Solarized, Nord
`
}

export const getAboutMessage = (): string => {
  return `
👨‍💻 About Marjo Ballabani

I'm a Senior Software Engineer with 11+ years of experience building scalable,
distributed systems and cloud-native applications. My expertise spans full-stack
development, microservices architecture, and DevOps.

Location: Munich, Germany
Current Role: Senior Software Engineer at Unicepta

Core Competencies:
  • Distributed Systems & Microservices Architecture
  • Full-Stack Development (Node.js, React, Python)
  • Cloud Technologies (Google Cloud, AWS)
  • Data Pipelines & Real-time Processing
  • DevOps & Infrastructure (Docker, Kubernetes)
  • System Design & Performance Optimization

I'm passionate about building solutions that scale, writing clean code, and
mentoring other developers. Always learning, always growing.
`
}

export const getExperienceMessage = (): string => {
  return `
📝 Work Experience

${resumeData.experience.map(job => `
🔹 ${job.title} @ ${job.company}
   ${job.period}
   
   ${job.description}
   
   Skills: ${job.skills.join(', ')}
`).join('\n')}
`
}

export const getSkillsMessage = (): string => {
  let output = '💻 Technical Skills\n\n'
  for (const [category, skills] of Object.entries(resumeData.skills)) {
    output += `${category}:\n  ${skills.join(' • ')}\n\n`
  }
  return output
}

export const getProjectsMessage = (): string => {
  return `
🚀 Projects

${resumeData.projects.map(project => `
📌 ${project.name}
   ${project.description}
   Link: ${project.url}
   Tags: ${project.tags.join(', ')}
`).join('\n')}

View my full portfolio: https://github.com/marjoballabani
`
}

export const getEducationMessage = (): string => {
  return `
🎓 Education

${resumeData.education.map(edu => `
🔹 ${edu.school}
   Degree: ${edu.degree} in ${edu.field}
   Year: ${edu.year}
`).join('\n')}
`
}

export const getContactMessage = (): string => {
  return `
📬 Contact Information

Email:   ${resumeData.contact.email}
LinkedIn: ${resumeData.contact.linkedin}
GitHub:   ${resumeData.contact.github}
Phone:   ${resumeData.contact.phone}

Feel free to reach out! I'm always interested in discussing
new projects, collaborations, or opportunities.
`
}

export const getWeatherMessage = (): string => {
  return `
🌤️  Weather Forecast

Munich, Germany - ${new Date().toLocaleDateString()}

Temperature: 12°C
Condition: Partly Cloudy
Humidity: 65%
Wind Speed: 8 km/h

Forecast:
  Tomorrow: Mostly Sunny, High 15°C
  Day After: Scattered Showers, High 10°C

(Note: This is a demo. For real weather data, visit weather.com)
`
}

export const getCalculatorMessage = (): string => {
  return `
🧮 Simple Calculator

Usage: calc <expression>
Example: calc 10 + 5 * 2

Supported operations:
  + Addition
  - Subtraction
  * Multiplication
  / Division
  % Modulo

Just type "calc" followed by your expression.
Try: calc 100 / 4
`
}

export const processCommand = (input: string): { output: string, type: 'success' | 'error' | 'info' } => {
  const command = input.toLowerCase().trim()
  const [cmd, ...args] = command.split(' ')

  switch (cmd) {
    case 'help':
      return { output: getHelpMessage(), type: 'info' }
    case 'about':
      return { output: getAboutMessage(), type: 'info' }
    case 'experience':
      return { output: getExperienceMessage(), type: 'info' }
    case 'skills':
      return { output: getSkillsMessage(), type: 'info' }
    case 'projects':
      return { output: getProjectsMessage(), type: 'info' }
    case 'education':
      return { output: getEducationMessage(), type: 'info' }
    case 'contact':
      return { output: getContactMessage(), type: 'info' }
    case 'weather':
      return { output: getWeatherMessage(), type: 'success' }
    case 'calc':
    case 'calculate':
      return { output: getCalculatorMessage(), type: 'info' }
    case 'pdf':
      return { output: '📄 Resume PDF is being downloaded...', type: 'success' }
    case 'clear':
      return { output: '', type: 'success' }
    case 'exit-game':
      return { output: 'Exited game mode. Back to terminal.\n', type: 'info' }
    default:
      return { output: `Command not found: ${cmd}\nType "help" for available commands.`, type: 'error' }
  }
}
