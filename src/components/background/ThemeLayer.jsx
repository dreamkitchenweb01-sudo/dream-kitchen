import { useEffect, useRef } from 'react'

/**
 * The festival background (reused from the new site), faint, behind everything and never in the
 * way: aria-hidden, no pointer events. The drawing code (./themes.js) is fetched only while the
 * festival is on. Used site-wide on the cream pages (SiteBackground) and on the black home hero (dark).
 *   bg: src/config/rajyotsava.js flagBackground() -> { id, opacity, animate }
 */
export default function ThemeLayer({ bg, dark = false, className = '' }) {
  const canvas = useRef(null)
  useEffect(() => {
    if (!bg || !canvas.current) return undefined
    let stop = () => {}
    let cancelled = false
    import('./themes').then(({ startTheme }) => {
      if (!cancelled && canvas.current) stop = startTheme(canvas.current, { id: bg.id, animate: bg.animate, dark })
    })
    return () => {
      cancelled = true
      stop()
    }
  }, [bg?.id, bg?.animate, dark]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!bg) return null
  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none block ${className}`} style={{ opacity: bg.opacity }} data-dk-bg={bg.id} />
}
