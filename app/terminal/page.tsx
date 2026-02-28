'use client'

import { useEffect, useState, useRef } from 'react'
import { terminalThemes, resumeData } from '@/lib/data'
import { processCommand, getWelcomeMessage } from '@/lib/terminal-commands'
import './terminal.css'

interface TerminalState {
  id: string
  input: string
  output: string[]
  history: string[]
  historyIndex: number
  theme: string
}

export default function TerminalPage() {
  const [mounted, setMounted] = useState(false)
  const [terminals, setTerminals] = useState<TerminalState[]>([
    {
      id: 'main',
      input: '',
      output: [getWelcomeMessage()],
      history: [],
      historyIndex: -1,
      theme: 'default',
    },
  ])
  const [activeTerminalId, setActiveTerminalId] = useState('main')
  const [currentTheme, setCurrentTheme] = useState(terminalThemes[0])
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [contextTarget, setContextTarget] = useState<string | null>(null)
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map())

  useEffect(() => {
    setMounted(true)
    applyTheme(terminalThemes[0])
  }, [])

  const applyTheme = (theme: typeof terminalThemes[0]) => {
    setCurrentTheme(theme)
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string)
    })
  }

  const getActiveTerminal = () => terminals.find(t => t.id === activeTerminalId)

  const updateTerminal = (id: string, updates: Partial<TerminalState>) => {
    setTerminals(terminals.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const addOutput = (id: string, text: string) => {
    const terminal = terminals.find(t => t.id === id)
    if (terminal) {
      updateTerminal(id, {
        output: [...terminal.output, text],
      })
    }
  }

  const scrollToBottom = (id: string) => {
    setTimeout(() => {
      const element = contentRefs.current.get(id)
      if (element) {
        element.scrollTop = element.scrollHeight
      }
    }, 0)
  }

  const handleCommand = (id: string) => {
    const terminal = getActiveTerminal()
    if (!terminal || terminal.id !== id) return

    const input = terminal.input.trim()
    if (!input) return

    const { output: result, type } = processCommand(input)

    // Add command to output
    addOutput(id, `➜ ${input}`)

    if (input.toLowerCase() === 'clear') {
      updateTerminal(id, { output: [], input: '', history: [...terminal.history, input], historyIndex: -1 })
    } else if (result) {
      addOutput(id, result)
      updateTerminal(id, { input: '', history: [...terminal.history, input], historyIndex: -1 })
    } else {
      updateTerminal(id, { input: '', history: [...terminal.history, input], historyIndex: -1 })
    }

    scrollToBottom(id)
  }

  const handleKeyDown = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    const terminal = getActiveTerminal()
    if (!terminal || terminal.id !== id) return

    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(id)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(terminal.historyIndex + 1, terminal.history.length - 1)
      if (newIndex >= 0) {
        updateTerminal(id, {
          input: terminal.history[terminal.history.length - 1 - newIndex],
          historyIndex: newIndex,
        })
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = terminal.historyIndex - 1
      if (newIndex >= 0) {
        updateTerminal(id, {
          input: terminal.history[terminal.history.length - 1 - newIndex],
          historyIndex: newIndex,
        })
      } else if (newIndex < 0) {
        updateTerminal(id, { input: '', historyIndex: -1 })
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      updateTerminal(id, { output: [], input: '', history: terminal.history, historyIndex: -1 })
    } else if (e.key === 'Tab') {
      e.preventDefault()
      handleTabCompletion(id)
    }
  }

  const handleTabCompletion = (id: string) => {
    const terminal = getActiveTerminal()
    if (!terminal) return

    const commands = ['help', 'about', 'skills', 'experience', 'education', 'contact', 'clear', 'projects', 'weather', 'calc', 'pdf']
    const matches = commands.filter(cmd => cmd.startsWith(terminal.input.toLowerCase()))

    if (matches.length === 1) {
      updateTerminal(id, { input: matches[0] })
    } else if (matches.length > 1) {
      addOutput(id, `\nPossible commands:\n${matches.join('  ')}\n`)
      scrollToBottom(id)
    }
  }

  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setContextTarget(id)
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleContextAction = (action: string) => {
    if (!contextTarget) return

    switch (action) {
      case 'split-h':
        // TODO: Implement horizontal split
        break
      case 'split-v':
        // TODO: Implement vertical split
        break
      case 'close':
        if (terminals.length > 1) {
          setTerminals(terminals.filter(t => t.id !== contextTarget))
          if (activeTerminalId === contextTarget) {
            setActiveTerminalId(terminals[0].id)
          }
        }
        break
    }
    setContextMenu(null)
  }

  if (!mounted) return null

  const activeTerminal = getActiveTerminal()

  return (
    <body className="terminal-page" style={{ margin: 0, padding: 0, background: '#000' }}>
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="close"></span>
            <span className="minimize"></span>
            <span className="maximize"></span>
          </div>
          <div className="terminal-title">Marjo Ballabani - Interactive Terminal</div>
          <div className="terminal-controls">
            <span className="theme-selector" onClick={() => setShowThemeModal(!showThemeModal)}>
              🎨 Theme
            </span>
          </div>
        </div>

        <div className="terminal-container">
          <div
            className="terminal-content"
            ref={el => {
              if (el && activeTerminal) {
                contentRefs.current.set(activeTerminal.id, el)
              }
            }}
            onContextMenu={e => handleContextMenu(e, activeTerminal?.id || 'main')}
            onClick={() => {
              if (activeTerminal?.id) {
                inputRefs.current.get(activeTerminal.id)?.focus()
              }
            }}
          >
            {activeTerminal?.output.map((line, idx) => (
              <div key={idx} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {line}
              </div>
            ))}

            <div className="input-line" style={{ marginTop: '10px' }}>
              <span className="prompt">➜</span>
              <input
                ref={el => {
                  if (el && activeTerminal) {
                    inputRefs.current.set(activeTerminal.id, el)
                  }
                }}
                type="text"
                className="command-input"
                value={activeTerminal?.input || ''}
                onChange={e => {
                  if (activeTerminal) {
                    updateTerminal(activeTerminal.id, { input: e.target.value })
                  }
                }}
                onKeyDown={e => handleKeyDown(activeTerminal?.id || 'main', e)}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="modal active">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowThemeModal(false)}>×</button>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Select Theme</h2>
            {terminalThemes.map(theme => (
              <div
                key={theme.name}
                className="theme-option"
                onClick={() => {
                  applyTheme(theme)
                  setShowThemeModal(false)
                }}
              >
                {theme.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu active"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
        >
          <div className="menu-item" onClick={() => handleContextAction('split-h')}>
            Split Horizontally
          </div>
          <div className="menu-item" onClick={() => handleContextAction('split-v')}>
            Split Vertically
          </div>
          {terminals.length > 1 && (
            <div className="menu-item" data-action="close-split" onClick={() => handleContextAction('close')}>
              Close Split
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          background: #000;
        }
      `}</style>
    </body>
  )
}
