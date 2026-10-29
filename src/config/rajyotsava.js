/*
  Kannada Rajyotsava, DISPLAY ONLY (29 Oct 2026). The one place that decides it.

  Reused from the new site (src/components/festival/, OfferBanner, themes.js), with this file in
  place of its database offer. Prices, cart and checkout are untouched: nothing is taken off, and
  nothing on the page claims a discount. Between these dates (Indian time, both days included)
  the website only SHOWS the festival:
    - a "Rajyotsava Special" badge on every product card and product sheet,
    - the Rajyotsava banner on Home and the Offer Zone button in the header (it opens the menu),
    - the greeting popup once per visit (src/components/festival/),
    - the faint, softly waving Karnataka flag behind the page (still with "reduce motion").
  Before and after these dates, or with enabled: false, none of it shows.
*/
export const rajyotsava = {
  enabled: true,
  startsOn: '2026-10-29',
  endsOn: '2026-11-30',
  // How strong the flag behind the page is, in percent (6 to 8 keeps every text easy to read)
  flagOpacity: 7,
}

// Where the Offer Zone button, the banner and the popup go: the menu
export const OFFER_ZONE_HREF = '/menu'

/** Today's date in India, "2026-11-01" */
export const istToday = (now = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now)

/** The festival while it is on today (Indian date), else null */
export function rajyotsavaLive(today = istToday(), r = rajyotsava) {
  return r.enabled && today >= r.startsOn && today <= r.endsOn ? r : null
}

/** The flag behind the page while the festival is on: { id, opacity, animate } */
export const flagBackground = (raj) => ({ id: 'rajyotsava', opacity: raj.flagOpacity / 100, animate: true })

/** React components use this: the festival while it is on, else null */
export const useRajyotsava = () => rajyotsavaLive()
