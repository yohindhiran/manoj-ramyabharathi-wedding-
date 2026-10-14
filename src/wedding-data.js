/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING DATA — single source of truth
 *  Edit ONLY this file to update names, dates, venues & links.
 * ─────────────────────────────────────────────────────────────
 *  ⚠ SOURCE STATUS (Oct 2026):
 *  The reference PDF ("Manoj Karthick Ramyabharathi 2026.pdf") and
 *  reference image were NOT present in the workspace, so only the
 *  couple's names (from the PDF file name) and the year 2026 are
 *  source-derived. Every field marked "VERIFY" below is a tasteful
 *  placeholder that MUST be confirmed against the PDF before sharing
 *  the invitation with guests.
 */

export const wedding = {
  groom: {
    name: 'K.R. Manoj Kaarthick',
    tamil: 'மனோஜ் கார்த்திக்' // VERIFY — transliteration, confirm from PDF
  },
  bride: {
    name: 'S. Ramyabharathi',
    tamil: 'ரம்யபாரதி' // VERIFY — transliteration, confirm from PDF
  },

  // Client update: the wedding date is 16 November 2026.
  // Client update: wedding morning 6:00 AM – 7:30 AM (replaces the earlier
  // unverified muhurtham time). Countdown targets the 6:00 AM start.
  weddingDateISO: '2026-11-16T06:00:00+05:30', // client-provided date & time
  weddingDateDisplay: 'Monday, 16th November 2026',
  weddingDateTamil: 'திங்கட்கிழமை, 16 நவம்பர் 2026', // VERIFY
  muhurtham: 'Wedding Morning: 6:00 AM – 7:30 AM', // client-provided

  events: [
    {
      id: 'reception',
      icon: 'lamp',
      name: 'Reception',
      tamilName: 'வரவேற்பு', // VERIFY wording
      date: 'Sunday, 15th November 2026', // VERIFY — assumed eve-of-wedding, confirm from PDF
      time: '6:30 PM onwards', // VERIFY
      venue: 'Priya Mahal', // client-provided
      address:
        '542/2, Malliankaranai Rd, Tk Pattankulam, Uthiramerur, Malliankaranai, Tamil Nadu 603406', // client-provided
      mapsQuery: 'Priya Mahal Uthiramerur', // informational only — buttons use venueMapsLink
      note: 'Dinner to follow'
    },
    {
      id: 'wedding',
      icon: 'knot',
      name: 'Wedding Ceremony',
      tamilName: 'திருக்கல்யாணம்', // VERIFY wording
      date: 'Monday, 16th November 2026', // VERIFY — date per client, confirm from PDF
      time: 'Wedding Morning: 6:00 AM – 7:30 AM', // client-provided
      venue: 'Priya Mahal', // client-provided
      address:
        '542/2, Malliankaranai Rd, Tk Pattankulam, Uthiramerur, Malliankaranai, Tamil Nadu 603406', // client-provided
      mapsQuery: 'Priya Mahal Uthiramerur', // informational only — buttons use venueMapsLink
      note: 'Followed by festive lunch'
    }
  ],

  // VERIFY — derived chronological timeline; confirm each timing from PDF
  schedule: [
    {
      time: 'Sun 15th Nov · 6:30 PM',
      title: 'Reception & Dinner',
      detail: 'Evening reception with dinner for family and friends.'
    },
    {
      time: 'Mon 16th Nov · 6:00 AM',
      title: 'Muhurtham — Thali Tying',
      detail: 'The sacred knot is tied amidst chanting and blessings.'
    }
  ],

  // VERIFY — replace with the PDF's exact invitation wording & family names
  invitation: {
    greeting: 'With the Divine Blessings of Our Elders',
    tamilGreeting: 'பெரியோர்களின் நல்லாசியுடன்', // VERIFY
    body: [
      'With the blessings of our beloved elders and families, we warmly invite you to join us in celebrating the wedding of K.R. Manoj Kaarthick and S. Ramyabharathi.'
    ],
    families: [
      { label: 'Groom’s Family', names: 'Family of Mr. K.R. Manoj Kaarthick' }, // VERIFY — parents' names from PDF
      { label: 'Bride’s Family', names: 'Family of Ms. S. Ramyabharathi' } // VERIFY — parents' names from PDF
    ]
  },

  blessings: {
    heading: 'Blessings & Gratitude',
    tamilHeading: 'ஆசிகள்', // VERIFY
    text: 'Your presence and blessings will make our celebration even more special.'
  },

  footerLine: 'With Love, K.R. Manoj Kaarthick & S. Ramyabharathi',

  // Client-provided exact mahal location (Priya Mahal).
  // Every "View Location" button on the site must open this exact link —
  // do NOT replace it with a search URL or a guessed address.
  venueMapsLink: 'https://www.google.com/maps/place/Priya+Mahal/@12.9186431,78.9581877,8z/data=!4m10!1m2!2m1!1sPriya+Mahal!3m6!1s0x3a52e1bf6d989cf1:0x4fe39b0037d2d025!8m2!3d12.6155175!4d79.7934718!15sCgtQcml5YSBNYWhhbFoNIgtwcml5YSBtYWhhbJIBDGJhbnF1ZXRfaGFsbOABAA!16s%2Fg%2F11kr7cxk5m?entry=ttu&g_ep=EgoyMDI2MTAxMS4wIKXMDSoASAFQAw%3D%3D'
};
