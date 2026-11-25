import { wedding } from '../config/wedding.js'

function toICSDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeICS(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/** Builds an .ics calendar file for the ceremony and triggers a download. */
export function downloadWeddingICS(locationUrl) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:wedding-${toICSDate(wedding.startISO)}@invitation`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(wedding.startISO)}`,
    `DTEND:${toICSDate(wedding.endISO)}`,
    `SUMMARY:${escapeICS(`Wedding of ${wedding.bride} & ${wedding.groom}`)}`,
    `LOCATION:${escapeICS(wedding.venue)}`,
    `DESCRIPTION:${escapeICS(`${wedding.invitationMessage}${locationUrl ? `\nDirections: ${locationUrl}` : ''}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'aslin-bervin-wedding.ics'
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
