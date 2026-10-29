import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider'
import { OFFER_ZONE_HREF, useRajyotsava } from '../../config/rajyotsava'
import { rajyotsavaLine } from './rajyotsavaWords'

/**
 * Kannada Rajyotsava's banner at the top of Home (reused from the new site's OfferBanner slide).
 * Black and gold with the Karnataka colours (a flag ribbon down the left, a soft yellow and red
 * glow), "Happy Kannada Rajyotsava", a big "Rajyotsava Special", one line and "Go to Offer Zone".
 * Short, so "Order now" stays on a phone's first screen.
 */
export default function RajyotsavaBanner() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const raj = useRajyotsava()
  if (!raj) return null
  const kn = lang === 'kn'
  const [what, when, order] = rajyotsavaLine(t)
  return (
    <section aria-label={t('banner.rajHello')} className="on-dark bg-ink" data-dk-raj-banner>
      <div className="dk-container pt-2 pb-2.5 md:pt-3 md:pb-4">
        <div className="dk-rise relative cursor-pointer overflow-hidden rounded-card border border-gold/50 bg-[#1b1612] shadow-[0_10px_30px_-18px_rgb(201_162_39/0.6)]" onClick={() => navigate(OFFER_ZONE_HREF)}>
          <div aria-hidden="true" className="absolute inset-y-0 left-0 flex w-2 flex-col md:w-2.5">
            <span className="h-1/2 bg-[#f6c512]" />
            <span className="h-1/2 bg-[#d62828]" />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 bg-[radial-gradient(70%_120%_at_0%_0%,rgb(246_197_18/0.2),transparent_65%),radial-gradient(70%_120%_at_100%_100%,rgb(214_40_40/0.28),transparent_65%)] py-2.5 pr-3 pl-5 md:flex-nowrap md:gap-x-6 md:py-4 md:pr-6 md:pl-8">
            <p className={`dk-raj-off shrink-0 font-bold ${kn ? 'font-kannada-serif text-[1.625rem] leading-[1.22] md:text-[2.125rem]' : 'font-heading text-[2.25rem] leading-none md:text-[3rem]'}`}>
              {t('banner.rajSpecial')}
            </p>
            <div className="min-w-0 flex-1 basis-40">
              <p className={`leading-snug font-bold text-gold-light ${kn ? 'font-kannada-serif text-[1.0625rem] md:text-xl' : 'text-[1.1875rem] md:text-2xl md:leading-tight'}`}>{t('banner.rajHello')}</p>
              <p className="t-small leading-snug text-cream md:text-body">
                <span className="hidden md:inline">{what} · </span>
                <span className="whitespace-nowrap">{when}</span> · <strong className="whitespace-nowrap text-gold-light">{order}</strong>
              </p>
            </div>
            <div className="flex w-full items-center md:w-auto">
              <Link to={OFFER_ZONE_HREF} className="btn btn-primary min-h-12 px-5 py-2" data-dk-offer-link onClick={(e) => e.stopPropagation()}>
                <span aria-hidden="true">🎁</span>
                <span>{t('banner.rajGo')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
