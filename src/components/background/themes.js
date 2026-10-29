/*
  The festival background (reused from the new site's src/components/background/themes.js, the
  Karnataka flag only), drawn on one <canvas>. Loaded only while Kannada Rajyotsava is on (a
  separate file), so everyday visitors download none of it.

  Light on phones: at most 30 frames a second, at most 1.5 device pixels per CSS pixel. The drawing
  stops while the tab is hidden, and with "reduce motion" one still frame is drawn and nothing moves.
  How faint it is comes from the canvas's CSS opacity, so the shapes here use their full colours.

  startTheme(canvas, { id, animate, dark }) -> stop()
*/

const FPS = 30

/* ---------- Kannada Rajyotsava: the Karnataka flag (yellow over red), softly waving ---------- */
function flag(g, w, h, t) {
  const fw = Math.min(w * 0.86, 1100)
  const fh = Math.min(fw * 0.6, h * 0.62)
  const x0 = (w - fw) / 2
  const y0 = h * 0.46 - fh / 2
  const strip = Math.max(3, Math.round(fw / 160))
  for (let x = 0; x < fw; x += strip) {
    const k = x / fw
    // the wave grows from the pole side (left) to the free end
    const wave = Math.sin(k * 7 - t * 1.6) * fh * 0.06 * k + Math.sin(k * 3.1 - t * 0.9) * fh * 0.025
    const shade = 0.82 + 0.18 * Math.cos(k * 7 - t * 1.6)
    g.fillStyle = `rgb(${Math.round(250 * shade)},${Math.round(204 * shade)},${Math.round(22 * shade)})`
    g.fillRect(x0 + x, y0 + wave, strip + 0.6, fh / 2 + 0.6)
    g.fillStyle = `rgb(${Math.round(214 * shade)},${Math.round(40 * shade)},${Math.round(40 * shade)})`
    g.fillRect(x0 + x, y0 + wave + fh / 2, strip + 0.6, fh / 2)
  }
  // Soft edges all round, so it reads as a light wash of colour rather than a box
  g.globalCompositeOperation = 'destination-in'
  for (const [ax, ay, bx, by] of [
    [x0, 0, x0 + fw, 0],
    [0, y0 - fh * 0.08, 0, y0 + fh * 1.08],
  ]) {
    const fade = g.createLinearGradient(ax, ay, bx, by)
    fade.addColorStop(0, 'rgba(0,0,0,0)')
    fade.addColorStop(0.16, 'rgba(0,0,0,1)')
    fade.addColorStop(0.84, 'rgba(0,0,0,1)')
    fade.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = fade
    g.fillRect(0, 0, w, h)
  }
  g.globalCompositeOperation = 'source-over'
}


const SCENES = {
  rajyotsava: () => flag,
}

/** Draws a theme on the canvas, moving if allowed. -> stop() */
export function startTheme(canvas, { id, animate = true, dark = false }) {
  const make = SCENES[id]
  const g = canvas.getContext('2d')
  if (!make || !g) return () => {}
  const draw = make()
  const still = !animate || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  let w = 0
  let h = 0
  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    w = canvas.clientWidth
    h = canvas.clientHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  const paint = (t) => {
    g.clearRect(0, 0, w, h)
    draw(g, w, h, t, dark)
  }
  size()
  let raf = 0
  let last = 0
  const start = performance.now()
  const frame = (now) => {
    raf = requestAnimationFrame(frame)
    if (now - last < 1000 / FPS) return
    last = now
    paint((now - start) / 1000)
  }
  const run = () => {
    cancelAnimationFrame(raf)
    if (!still && document.visibilityState === 'visible') raf = requestAnimationFrame(frame)
  }
  const onResize = () => {
    size()
    paint(still ? 4 : (performance.now() - start) / 1000)
  }
  paint(4)
  run()
  document.addEventListener('visibilitychange', run)
  window.addEventListener('resize', onResize)
  return () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', run)
    window.removeEventListener('resize', onResize)
  }
}
