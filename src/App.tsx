import { useState, useEffect, useCallback, useRef } from 'react'

interface Slide {
  src: string
  label: string
  alt: string
}

const SLIDES: Slide[] = [
  { src: '/screenshots/landing-map.png',    label: 'Mapa · Paradas cercanas',   alt: 'Mapa con paradas cercanas' },
  { src: '/screenshots/landing-line.png',   label: 'Línea · Recorrido completo', alt: 'Detalle de la línea 2' },
  { src: '/screenshots/landing-search.png', label: 'Buscar · Líneas y paradas',  alt: 'Resultados de búsqueda' },
]

function BrandIcon() {
  return (
    <div className="brand-icon">
      <svg viewBox="0 0 120 120" width="38" height="38" aria-hidden="true">
        <rect width="120" height="120" rx="27" fill="#007B31" />
        <rect x="18" y="30" width="84" height="60" rx="8" fill="#faf6ec" />
        <line x1="18" y1="60" x2="102" y2="60" stroke="#007B31" strokeWidth="0.8" strokeDasharray="2 3" />
        <text x="60" y="56" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#007B31">R1</text>
        <text x="60" y="82" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="700" fill="#007B31" letterSpacing="2">· SFO ·</text>
      </svg>
    </div>
  )
}

function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // One-time effect: read stored / system preference and sync state with DOM
  useEffect(() => {
    const stored = localStorage.getItem('ruta1-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored ?? (prefersDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', initial)
    setIsDark(initial === 'dark')
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev
      const theme = next ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('ruta1-theme', theme)
      return next
    })
  }, [])

  const go = useCallback((index: number) => {
    setActiveIndex(((index % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }, [])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % SLIDES.length)
    }, 4000)
  }, [])

  const restartTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
    }
    startTimer()
  }, [startTimer])

  // Auto-advance carousel
  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
      }
    }
  }, [startTimer])

  const handlePrev = useCallback(() => {
    go(activeIndex - 1)
    restartTimer()
  }, [activeIndex, go, restartTimer])

  const handleNext = useCallback(() => {
    go(activeIndex + 1)
    restartTimer()
  }, [activeIndex, go, restartTimer])

  const handleDot = useCallback((index: number) => {
    go(index)
    restartTimer()
  }, [go, restartTimer])

  const slideNum = String(activeIndex + 1).padStart(2, '0')
  const slideTotal = String(SLIDES.length).padStart(2, '0')

  return (
    <div className="page">
      <nav className="top">
        <div className="brand">
          <BrandIcon />
          <div className="brand-name"><em>Ruta</em> 1</div>
        </div>
        <div className="nav-right">
          <div className="nav-meta">San Fernando · Cádiz</div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {isDark
              ? <i className="mdi mdi-weather-sunny" aria-hidden="true" />
              : <i className="mdi mdi-weather-night" aria-hidden="true" />
            }
          </button>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">La app de los autobuses de La Isla</div>
          <h1>Tu próximo bus, <em>en la palma de la mano.</em></h1>
          <p className="sub">
            Mira qué autobuses pasan cerca, cuándo llegan y por dónde van — toda la red municipal en un mapa
            cálido y legible. Sin cuentas, sin anuncios, sin complicaciones.
          </p>
          <div className="stores">
            <span className="store store--disabled" aria-label="App Store — próximamente">
              <i className="mdi mdi-apple" aria-hidden="true" />
              <span className="lines">
                <span className="small">Próximamente</span>
                <span className="big">App Store</span>
              </span>
            </span>
            <span className="store store--disabled" aria-label="Google Play — próximamente">
              <i className="mdi mdi-google-play" aria-hidden="true" />
              <span className="lines">
                <span className="small">Próximamente</span>
                <span className="big">Google Play</span>
              </span>
            </span>
          </div>
          <div className="ticket-note">
            <span>Gratis</span>
            <span className="sep" aria-hidden="true" />
            <span>Sin anuncios</span>
            <span className="sep" aria-hidden="true" />
            <span>iOS · Android</span>
          </div>
        </div>

        <div className="phone-wrap">
          <div className="backdrop-ticket" aria-hidden="true" />
          <div className="stamp" aria-hidden="true">
            <div>
              <div className="small">Hecho en</div>
              <div className="big">La Isla</div>
              <div className="small">— 2026 —</div>
            </div>
          </div>
          <div className="carousel">
            <div className="phone">
              <div className="slides">
                {SLIDES.map((slide, idx) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className={idx === activeIndex ? 'active' : ''}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            </div>
            <div className="carousel-nav">
              <button
                className="carousel-btn"
                onClick={handlePrev}
                aria-label="Anterior"
              >
                <i className="mdi mdi-chevron-left" aria-hidden="true" />
              </button>
              <div className="dots">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.src}
                    className={idx === activeIndex ? 'dot active' : 'dot'}
                    onClick={() => handleDot(idx)}
                    aria-label={`Ver captura ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                className="carousel-btn"
                onClick={handleNext}
                aria-label="Siguiente"
              >
                <i className="mdi mdi-chevron-right" aria-hidden="true" />
              </button>
            </div>
            <div className="slide-label">
              <span className="num">{slideNum} / {slideTotal}</span>
              {' · '}{SLIDES[activeIndex].label}
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://ko-fi.com/miguelrincon"
        target="_blank"
        rel="noopener noreferrer"
        className="kofi-fab"
        aria-label="Invítame a un café en Ko-fi"
      >
        <i className="mdi mdi-coffee" aria-hidden="true" />
        <span>Invítame a un café</span>
      </a>

      <footer className="bottom">
        <span>© 2026 Ruta 1 · Hecho en La Isla con cariño.</span>
        <div className="links">
          <a href="#">Privacidad</a>
          <a href="mailto:hola@example.test">Contacto</a>
        </div>
      </footer>
    </div>
  )
}

export default App
