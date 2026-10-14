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
    name: 'Manoj Karthick',
    tamil: 'மனோஜ் கார்த்திக்' // VERIFY — transliteration, confirm from PDF
  },
  bride: {
    name: 'Ramyabharathi',
    tamil: 'ரம்யபாரதி' // VERIFY — transliteration, confirm from PDF
  },

  // Client update: the wedding date is 16 November 2026.
  // VERIFY — muhurtham TIME below is carried over from prior data and is
  // NOT verified. Confirm the exact muhurtham time from the client PDF.
  weddingDateISO: '2026-11-16T09:30:00+05:30', // VERIFY time — date per client
  weddingDateDisplay: 'Monday, 16th November 2026',
  weddingDateTamil: 'திங்கட்கிழமை, 16 நவம்பர் 2026', // VERIFY
  muhurtham: 'Muhurtham 9:30 AM – 11:00 AM', // VERIFY — time not confirmed

  events: [
    {
      id: 'reception',
      icon: 'lamp',
      name: 'Reception',
      tamilName: 'வரவேற்பு', // VERIFY wording
      date: 'Sunday, 15th November 2026', // VERIFY — assumed eve-of-wedding, confirm from PDF
      time: '6:30 PM onwards', // VERIFY
      venue: 'Sri Lakshmi Kalyana Mandapam', // VERIFY — venue name
      address:
        'No. 12, GST Road, Tambaram, Chennai – 600 045, Tamil Nadu', // VERIFY — full address
      mapsQuery: 'Sri Lakshmi Kalyana Mandapam Tambaram Chennai', // VERIFY — drives the Maps link
      note: 'Dinner to follow'
    },
    {
      id: 'wedding',
      icon: 'knot',
      name: 'Wedding Ceremony',
      tamilName: 'திருக்கல்யாணம்', // VERIFY wording
      date: 'Monday, 16th November 2026', // VERIFY — date per client, confirm from PDF
      time: 'Muhurtham 9:30 AM – 11:00 AM', // VERIFY
      venue: 'Sri Lakshmi Kalyana Mandapam', // VERIFY — venue name
      address:
        'No. 12, GST Road, Tambaram, Chennai – 600 045, Tamil Nadu', // VERIFY — full address
      mapsQuery: 'Sri Lakshmi Kalyana Mandapam Tambaram Chennai', // VERIFY
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
      time: 'Mon 16th Nov · 9:30 AM',
      title: 'Muhurtham — Thali Tying',
      detail: 'The sacred knot is tied amidst chanting and blessings.'
    }
  ],

  // VERIFY — replace with the PDF's exact invitation wording & family names
  invitation: {
    greeting: 'With the Divine Blessings of Our Elders',
    tamilGreeting: 'பெரியோர்களின் நல்லாசியுடன்', // VERIFY
    body: [
      'With the blessings of our beloved elders and families, we warmly invite you to join us in celebrating the wedding of Manoj Karthick and Ramyabharathi.'
    ],
    families: [
      { label: 'Groom’s Family', names: 'Family of Mr. Manoj Karthick' }, // VERIFY — parents' names from PDF
      { label: 'Bride’s Family', names: 'Family of Ms. Ramyabharathi' } // VERIFY — parents' names from PDF
    ]
  },

  blessings: {
    heading: 'Blessings & Gratitude',
    tamilHeading: 'ஆசிகள்', // VERIFY
    text: 'Your presence and blessings will make our celebration even more special.'
  },

  footerLine: 'With Love, Manoj Karthick & Ramyabharathi',

  // Client-provided exact mahal location (Nov 2026 update).
  // Every "View Location" button on the site must open this exact link —
  // do NOT replace it with a search URL or a guessed address.
  venueMapsLink: 'https://share.google/gyKpzRQk91yKZ1fo2'
};
