/**
 * Single source of truth for every wedding detail shown on the site.
 * Edit values here — components never hard-code names, dates or links.
 */
import invitationReference from '../assets/images/invitation-reference.jpeg'

export const wedding = {
  bride: 'J. Aslin Jebi',
  groom: 'M. Bervin Adams',
  /** Used only for the monogram / wax seal */
  initials: { bride: 'A', groom: 'B' },

  dateLabel: 'Monday, 7th December 2026',
  timeLabel: '10:00 AM – 11:00 AM',
  venue: 'St. Peter & Paul Church, Saral',

  /** Ceremony start/end as absolute instants (India Standard Time, UTC+05:30). */
  startISO: '2026-12-07T10:00:00+05:30',
  endISO: '2026-12-07T11:00:00+05:30',

  invitationMessage:
    'With the blessings of God and our families, we cordially invite you to celebrate the wedding of J. Aslin Jebi and M. Bervin Adams.',
  welcomeMessage: 'We warmly welcome you and your family!',
  closingMessage: 'Your presence and blessings will make our special day more memorable.',
  heroSubtitle: 'Two hearts, one beautiful journey.',
}

/**
 * Google Maps link for "Get Directions".
 * This is the exact link encoded in the "Scan for location" QR code
 * printed on the invitation card. Replace it if the venue pin changes.
 */
export const mapsUrl = 'https://maps.app.goo.gl/M7VhWLB39Auq2QEs9'

/**
 * Background music (optional).
 * Place a licensed audio file in /public/audio/ (e.g. public/audio/wedding.mp3)
 * and set: musicSrc = '/audio/wedding.mp3'
 * (Or put it in src/assets/audio/, import it at the top of this file and
 *  assign the import: `import song from '../assets/audio/wedding.mp3'`.)
 * While this is an empty string the music button is hidden.
 */
export const musicSrc = ''

/* ------------------------------------------------------------------ */
/*  Artwork                                                            */
/* ------------------------------------------------------------------ */

/**
 * The printed invitation (1024 × 1536 px). Its illustration of the couple
 * is reused on the site by cropping regions of this one image.
 */
export const reference = {
  src: invitationReference,
  width: 1024,
  height: 1536,
  /** Crop rectangles in source pixels: { x, y, w, h } */
  crops: {
    couple: { x: 30, y: 128, w: 490, h: 700 },
    groom: { x: 128, y: 140, w: 210, h: 210 },
    bride: { x: 262, y: 232, w: 210, h: 210 },
  },
}

/**
 * Portrait photos for the Bride & Groom cards.
 * Leave as null to use the illustrated portraits from the invitation.
 * To use real photos, put them in /public/images/ and set e.g.
 *   bridePhoto: '/images/bride.jpg'
 */
export const portraits = {
  bridePhoto: null,
  groomPhoto: null,
}

/**
 * Gallery items.
 *  - { type: 'image', src, alt }          → a real photo (put files in /public/images/)
 *  - { type: 'crop', crop, alt }          → a region of the invitation artwork
 *  - { type: 'placeholder', caption }     → elegant "photo coming soon" card
 *
 * PLACEHOLDERS: replace each `placeholder` entry with
 *   { type: 'image', src: '/images/photo-1.jpg', alt: 'Describe the photo' }
 * once the couple's photographs are available.
 */
export const gallery = [
  { id: 'couple-illustration', type: 'crop', crop: 'couple', alt: 'Illustration of the bride and groom from the wedding invitation' },
  { id: 'invitation-card', type: 'image', src: invitationReference, alt: 'The printed wedding invitation card', fit: 'contain' },
  { id: 'placeholder-1', type: 'placeholder', caption: 'Photo coming soon', tone: 'navy' },
  { id: 'placeholder-2', type: 'placeholder', caption: 'Photo coming soon', tone: 'sky' },
  { id: 'placeholder-3', type: 'placeholder', caption: 'Photo coming soon', tone: 'ivory' },
  { id: 'placeholder-4', type: 'placeholder', caption: 'Photo coming soon', tone: 'navy' },
]

/** Clean URLs for each section (see src/utils/router.js). */
export const navLinks = [
  { href: '/couple', label: 'Couple' },
  { href: '/invitation', label: 'Invitation' },
  { href: '/countdown', label: 'Countdown' },
  { href: '/details', label: 'Details' },
  { href: '/gallery', label: 'Gallery' },
]
