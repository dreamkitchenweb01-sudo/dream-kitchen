import { flagBackground, useRajyotsava } from '../../config/rajyotsava'
import ThemeLayer from '../background/ThemeLayer'

/**
 * The faint, softly waving Karnataka flag behind the cream pages while Kannada Rajyotsava is on
 * (src/config/rajyotsava.js); afterwards nothing, by itself.
 * Fixed to the screen, behind all the content (Layout makes #dk-app its own layer for this).
 */
export default function SiteBackground() {
  const raj = useRajyotsava()
  if (!raj) return null
  return <ThemeLayer bg={flagBackground(raj)} className="fixed inset-0 -z-10 h-dvh w-full" />
}
