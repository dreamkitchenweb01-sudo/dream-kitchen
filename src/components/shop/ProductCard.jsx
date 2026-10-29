import { useI18n } from '../../i18n/I18nProvider'
import { formatINR, fromPrice, hasPriceRange, isForSale } from '../../lib/pricing'
import { useRajyotsava } from '../../config/rajyotsava'
import { PlusIcon, TagIcon } from '../icons'
import ProductPhoto from './ProductPhoto'
import { useShopSheets } from './ShopSheets'
import 'virtual:dk-strings/menu'

/**
 * One product on the menu: photo, name, "from ₹X" and a small "+". The whole card is one button
 * that opens the product sheet (one big target; the "+" is its visual cue). 2 per row on phones.
 * While Kannada Rajyotsava is on: its "Rajyotsava Special" badge on the photo (display only).
 */
export default function ProductCard({ product, eager = false }) {
  const { t, pick } = useI18n()
  const { openProduct } = useShopSheets()
  const name = pick(product.name)
  const forSale = isForSale(product)
  const from = fromPrice(product)
  const festive = Boolean(useRajyotsava())
  const price = product.soldOut ? t('menu.soldOut') : from == null ? t('menu.priceSoon') : hasPriceRange(product) ? t('menu.from', { price: formatINR(from) }) : formatINR(from)

  return (
    <article data-dk-card className="h-full">
      <button
        type="button"
        data-dk-open
        onClick={() => openProduct(product)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-[#fffcf5] text-left transition-shadow hover:shadow-[0_6px_24px_-12px_rgb(42_29_22/0.35)]"
      >
        <span className="relative block">
          <ProductPhoto
            slug={product.slug}
            art={product.art}
            eager={eager}
            rounded="rounded-none"
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
            className={`aspect-square w-full ${forSale ? '' : 'grayscale-[60%]'}`}
          />
          {/* Kannada Rajyotsava's badge, Karnataka red so it stands out on every card */}
          {festive && (
            <span
              className="absolute top-2 left-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1 rounded-full border border-[#f6c512] bg-[#b3261e] px-2.5 py-0.5 text-[0.875rem] leading-snug font-bold text-cream shadow-[0_2px_8px_-2px_rgb(214_40_40/0.6)]"
              data-dk-offer-badge
            >
              <TagIcon className="h-3.5 w-3.5 shrink-0 text-[#f6c512]" />
              <span className="truncate">{t('banner.rajBadge')}</span>
            </span>
          )}
        </span>
        <span className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
          <span className="leading-snug font-bold [overflow-wrap:anywhere]">{name}</span>
          <span className="mt-auto flex items-end justify-between gap-2 pt-1">
            <span className={forSale ? 't-price text-[1.0625rem]' : 't-small font-bold text-brown-2'}>{price}</span>
            <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${forSale ? 'bg-ink text-gold-light' : 'border border-control-line text-brown-2'}`}>
              <PlusIcon className="h-5 w-5" />
            </span>
          </span>
        </span>
      </button>
    </article>
  )
}
