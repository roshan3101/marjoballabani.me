# Marjo Ballabani - Portfolio Website

A stunning neo-brutalist portfolio website for a Senior Software Engineer, built with **Next.js 16**, featuring both a traditional resume page and an interactive terminal interface. This is a complete Next.js replication of the original HTML/CSS/JS site, maintaining all the original styling, colors, fonts, and functionality while leveraging modern React and Next.js best practices.

**[Live Site](https://marjoballabani.me)**

## Features

### 🎨 Neo-Brutalist Design
- Bold, geometric layouts with strong typography
- Distinctive color palette: Cyan (#66d9ef), Yellow (#ffd93d), Pink (#ff6b9d), Mint Green (#a8e6cf)
- Custom fonts: Space Grotesk (headings), Space Mono (monospace), Caveat (accents)
- Light and dark theme support with smooth transitions
- Progress bar with scroll checkpoints
- Neo-brutalist scrollbars and UI elements with thick borders and offset shadows
- Responsive design that works on all devices

### 📄 Main Resume Page (`/`)
- Hero section with professional introduction
- About section with background information
- Experience/Journey timeline with detailed job descriptions
- Skills grid organized by category
- Contact information with social links
- Smooth scroll animations and transitions
- Tech badges showcase
- Social media integration

### 💻 Interactive Terminal Page (`/terminal`)
- Full-featured terminal emulator with realistic styling
- Multiple themes: Default (orange), Dracula, Solarized, Nord
- Interactive commands for accessing resume information
- Command history with arrow key navigation
- Tab completion for commands
- Clear screen support (Ctrl+L)
- Right-click context menu for terminal operations
- Seamless theme switching

### 🎮 Terminal Commands
- `help` - View all available commands
- `about` - Learn more about the engineer
- `experience` - View work experience
- `skills` - Technical skills list
- `projects` - Featured projects
- `education` - Educational background
- `contact` - Contact information
- `weather` - Demo weather feature
- `calc` - Calculator
- `pdf` - Download resume
- `clear` - Clear terminal screen
- `exit-game` - Exit interactive mode

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + Global CSS (no Tailwind - pure CSS for authenticity)
- **Fonts**: Google Fonts (Space Grotesk, Space Mono, Caveat, Fira Code)
- **Icons**: Font Awesome 6.4.0
- **Maps**: Leaflet (for future location features)
- **React**: 19.0.0

## What is Neo-Brutalism?

Neo-brutalism (also called neo-brutalist web design) is a UI style inspired by brutalist architecture - raw, bold, and unapologetically loud. It rejects the polished, rounded, drop-shadowed sameness of modern web design and replaces it with:

- **Thick black borders** - every element has a hard, visible edge
- **Flat, offset box shadows** - no soft gradients or blurs, just solid color blocks shifted by a few pixels (`box-shadow: 8px 8px 0 #000`)
- **High-contrast color palettes** - bright yellows, pinks, cyans, and greens on white/dark backgrounds
- **Visible structure** - the "bones" of the layout are intentionally exposed, not hidden behind smooth transitions
- **Playful imperfection** - tape stickers, hand-drawn vibes mixed with geometric precision

This site maintains the **hand-crafted, scrapbook-like** aesthetic of the original: bold typography, thick borders, offset shadows, and a distinctive color palette.

## Project Structure

```
├── app/
│   ├── layout.tsx                 # Root layout with fonts and metadata
│   ├── globals.css                # Global styles, animations, color vars
│   ├── page.tsx                   # Main resume page component
│   ├── page.module.css            # Resume page styles
│   └── terminal/
│       ├── page.tsx               # Terminal page component
│       └── terminal.css           # Terminal-specific styles
├── lib/
│   ├── data.ts                    # Resume data and theme configurations
│   └── terminal-commands.ts       # Terminal command handlers
├── public/
│   ├── favicon.svg
│   └── image/
│       └── avatar-gpt.png         # Profile image
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── next.config.mjs                # Next.js configuration
└── README.md                      # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/roshan3101/marjoballabani.me.git
cd marjoballabani.me
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

Visit [http://localhost:3000/terminal](http://localhost:3000/terminal) to see the interactive terminal interface.

## Customization

### Updating Resume Data
Edit `lib/data.ts` to update:
- Personal information and introduction
- Work experience and job details
- Skills organized by category
- Projects and portfolio items
- Education background
- Contact details and social links
- Terminal theme colors and configurations

### Changing Colors
Modify CSS variables in `app/globals.css`:
```css
:root {
  --bg: #ffffff;
  --text: #000000;
  --cyan: #66d9ef;
  --yellow: #ffd93d;
  --pink: #ff6b9d;
  --accent: #a8e6cf;
}
```

### Adding Terminal Commands
Edit `lib/terminal-commands.ts`:
1. Add a new handler function (e.g., `getMyCommandMessage()`)
2. Add a case in the `processCommand()` switch statement
3. Return the output and message type

### Updating Avatar
Replace the image at `public/image/avatar-gpt.png` with your own profile image (recommended: 400x400px).

### Modifying Theme
Edit `app/page.module.css` to customize:
- Section styling and spacing
- Timeline appearance
- Button styles and hover effects
- Responsive breakpoints

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

### Deploy to Vercel (Recommended)
1. Push your changes to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click Deploy - Vercel will auto-detect Next.js and configure everything

### Deploy to Other Platforms
The project uses standard Next.js, so it can be deployed to:
- Netlify
- AWS Amplify
- AWS EC2 with Node.js
- Self-hosted servers with Node.js
- Docker containers

## Features Implemented

### Resume Page
- ✅ Loading screen with animated progress bar
- ✅ Sticky navigation bar with theme toggle
- ✅ Progress bar with scroll checkpoints
- ✅ Hero section with social links
- ✅ About section
- ✅ Experience timeline with job details
- ✅ Skills grid organized by category
- ✅ Contact section with links
- ✅ Light/Dark theme toggle with localStorage persistence
- ✅ Responsive design for mobile/tablet/desktop
- ✅ Smooth scroll animations
- ✅ Tech badges showcase

### Terminal Page
- ✅ Terminal emulator UI with macOS-style header
- ✅ Multiple themes (Default, Dracula, Solarized, Nord)
- ✅ Command processing and execution
- ✅ Output formatting with color support
- ✅ Command history navigation (arrow keys)
- ✅ Tab completion for commands
- ✅ Right-click context menu
- ✅ Modal dialogs for theme selection
- ✅ Smooth animations and transitions
- ✅ Monospace font rendering
- ✅ Terminal scanlines effect

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Server-side rendering with Next.js
- Static site generation where applicable
- Image optimization
- Font preloading and subset optimization
- CSS modules for scoped styling
- Lazy loading of non-critical resources
- Smooth scroll behavior

## Environment Variables

No environment variables are required for basic functionality. All data is stored in `lib/data.ts`.

## License

This project is based on the original neo-brutalist portfolio but adapted for Next.js. See the [LICENSE](LICENSE) file for details.

## Author

**Marjo Ballabani** - Senior Software Engineer
- GitHub: [@marjoballabani](https://github.com/marjoballabani)
- LinkedIn: [marjo-ballabani](https://www.linkedin.com/in/marjo-ballabani/)
- Email: hello@marjoballabani.me
- Location: Munich, Germany

## Acknowledgments

- Design inspiration: Neo-brutalism design movement
- Original design: Marjo Ballabani
- Icons: Font Awesome
- Fonts: Google Fonts (Space Grotesk, Space Mono, Caveat, Fira Code)
- Framework: Next.js 16 and React 19

## Support

If you have questions or encounter issues:
1. Check existing GitHub issues
2. Create a new GitHub issue with a detailed description
3. Contact via email or LinkedIn

---

**Note**: This is a faithful Next.js recreation of the original HTML/CSS/JS portfolio, maintaining all visual elements while leveraging modern React and Next.js best practices for maintainability and performance.
