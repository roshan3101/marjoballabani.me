'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { resumeData } from '@/lib/data'

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="loader-overlay">
      <div className="loader-shapes">
        <div className="loader-shape-svg loader-shape-1">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
            <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
            <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="loader-shape-svg loader-shape-2">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
            <rect x="3" y="3" width="88" height="88" rx="8" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
            <path d="M25 35 L40 50 L25 65" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="50" y1="65" x2="75" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="loader-shape-svg loader-shape-3">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
            <rect x="3" y="3" width="88" height="88" rx="8" fill="#a8e6cf" stroke="#000" strokeWidth="4"/>
            <rect x="20" y="20" width="60" height="60" rx="3" fill="#ffd93d" stroke="#000" strokeWidth="4"/>
            <rect x="30" y="20" width="40" height="20" fill="#66d9ef" stroke="#000" strokeWidth="3"/>
            <rect x="35" y="55" width="30" height="15" rx="2" fill="#000"/>
            <circle cx="50" cy="35" r="3" fill="#000"/>
          </svg>
        </div>
      </div>
      <div className="loader-wrapper">
        <div className="loader-letter">M</div>
        <div className="loader-letter">B</div>
      </div>
      <div className="loader-progress-bar">
        <div className="loader-progress-fill"></div>
      </div>
    </div>
  )
}

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.body.setAttribute('data-theme', savedTheme)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / totalHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (showLoader) {
    return <LoadingScreen onComplete={() => setShowLoader(false)} />
  }

  return (
    <>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${scrollProgress}%` }}></div>
        <div className="progress-checkpoints">
          <div className="checkpoint active" data-section="hero" onClick={() => handleNavClick('hero')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Home</span>
          </div>
          <div className="checkpoint" data-section="about" onClick={() => handleNavClick('about')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">About</span>
          </div>
          <div className="checkpoint" data-section="experience" onClick={() => handleNavClick('experience')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Journey</span>
          </div>
          <div className="checkpoint" data-section="skills" onClick={() => handleNavClick('skills')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Skills</span>
          </div>
          <div className="checkpoint" data-section="contact" onClick={() => handleNavClick('contact')}>
            <div className="checkpoint-dot"></div>
            <span className="checkpoint-label">Contact</span>
          </div>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="#" className={styles.navBrand}>MB</Link>
          <div className={styles.navRight}>
            <a href="#hero" className={styles.navLink}>Home</a>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#experience" className={styles.navLink}>Journey</a>
            <a href="#skills" className={styles.navLink}>Skills</a>
            <a href="https://marjoballabani.github.io/lazyfire/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
              LazyFire
            </a>
            <a href="#contact" className={styles.navCta}>Get in Touch!</a>
            <button onClick={toggleTheme} className={styles.themeToggleNav} aria-label="Toggle theme">
              <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
            </button>
          </div>
        </div>
      </nav>

      <div className={styles.pageWrapper}>
        {/* Hero Section */}
        <section className={styles.hero} id="hero">
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <p className={styles.heroGreeting}>Hi there! 👋</p>
              <h1 className={styles.heroName}>I'm Marjo Ballabani.</h1>
              <p className={styles.heroDescription}>{resumeData.intro}</p>
              
              <div className={styles.heroSocial}>
                {resumeData.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    title={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>

              <div className={styles.heroCTAContainer}>
                <a href="#contact" className={styles.btnCta}>Get in Touch!</a>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.heroImageWrapper}>
                <div className={styles.tapeSticker}></div>
                <img
                  src="/image/avatar-gpt.png"
                  alt="Marjo Ballabani"
                  className={styles.heroPhoto}
                  width={400}
                  height={400}
                />
                <div className={styles.decoCode}>
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                    <rect x="3" y="3" width="88" height="88" rx="8" fill="#66d9ef" stroke="#000" strokeWidth="4"/>
                    <path d="M35 40 L20 50 L35 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M65 40 L80 50 L65 60" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="55" y1="35" x2="45" y2="65" stroke="#000" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.decoLabel}>Full-Stack Ninja</div>
              </div>
            </div>
          </div>

          <div className={styles.techBadges}>
            {resumeData.techBadges.map((badge) => (
              <span key={badge.label} className={styles.techBadge}>
                <i className={badge.icon}></i> {badge.label}
              </span>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className={styles.section} id="about">
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.aboutContent}>
            <p>
              I'm a Senior Software Engineer based in Munich, Germany, with 11+ years of experience building scalable distributed systems and cloud-native applications. My passion lies in crafting elegant solutions to complex technical problems, particularly in microservices architecture, data pipelines, and DevOps.
            </p>
            <p style={{ marginTop: '1rem' }}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm a strong believer in continuous learning and pushing the boundaries of what's possible with modern technology stacks.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section className={styles.section} id="experience">
          <h2 className={styles.sectionTitle}>My Journey</h2>
          <div className={styles.timeline}>
            {resumeData.experience.map((job, idx) => (
              <div key={job.id} className={styles.timelineItem} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={styles.timelineHeader}>
                  <div className={styles.timelineMarker}></div>
                  <div style={{ flex: 1 }}>
                    <h3>{job.title}</h3>
                    <p className={styles.timelineCompany}>{job.company}</p>
                    <p className={styles.timelinePeriod}>{job.period}</p>
                  </div>
                </div>
                <p className={styles.jobDesc}>{job.description}</p>
                <div className={styles.skillTags}>
                  {job.skills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className={styles.section} id="skills">
          <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
          <div className={styles.skillsGrid}>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className={styles.skillBox}>
                <h3 className={styles.skillBoxTitle}>{category}</h3>
                <ul className={styles.skillBoxList}>
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.section} id="contact">
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <div className={styles.contactContent}>
            <div className={styles.contactItem}>
              <div className={styles.contactLabel}>Email</div>
              <a href={`mailto:${resumeData.contact.email}`} className={styles.contactValue}>
                {resumeData.contact.email}
              </a>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactLabel}>LinkedIn</div>
              <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                linkedin.com/in/marjo-ballabani
              </a>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactLabel}>GitHub</div>
              <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                github.com/marjoballabani
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
