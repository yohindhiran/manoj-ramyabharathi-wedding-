// Lightweight project check: required sections, data fields, overflow guards.
import { readFileSync, existsSync } from 'node:fs';

const fail = (m) => { console.error('✗ ' + m); process.exitCode = 1; };
const ok = (m) => console.log('✓ ' + m);

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('src/style.css', 'utf8');
const data = readFileSync('src/wedding-data.js', 'utf8');
const main = readFileSync('src/main.js', 'utf8');

for (const id of ['home', 'invitation', 'wedding', 'schedule', 'blessings', 'venue']) {
  html.includes(`id="${id}"`)
    ? ok(`section #${id} present`) : fail(`section #${id} missing`);
}
// RSVP must be fully removed — no section, form, or nav references.
for (const s of ['id="rsvp"', 'rsvpForm', 'navToggle', 'nav-toggle', 'Répondez', 'Will You']) {
  (html.includes(s) || main.includes(s) || css.includes(s))
    ? fail(`RSVP/menu remnant still present: ${s}`) : ok(`remnant absent: ${s}`);
}
for (const f of ['groom', 'bride', 'weddingDateISO', 'events', 'schedule', 'venueMapsLink']) {
  data.includes(f) ? ok(`data field "${f}" present`) : fail(`data field "${f}" missing`);
}
// Only the two requested celebration entries may remain.
for (const extra of ['Kasi Yatra', 'Oonjal']) {
  data.includes(extra) ? fail(`extra schedule entry still present: ${extra}`) : ok(`schedule trimmed: no ${extra}`);
}
(data.includes('Reception & Dinner') && data.includes('Muhurtham — Thali Tying'))
  ? ok('two required celebration events present') : fail('required celebration events missing');
// Countdown must read from data with Asia/Kolkata handling — never hardcoded.
(main.includes('wedding.weddingDateISO') && main.includes('Asia/Kolkata') && main.includes('setInterval'))
  ? ok('live countdown wired to wedding data + Asia/Kolkata')
  : fail('countdown not properly wired');
// Countdown target must be 16 November 2026; graceful end-states, never negative.
(data.includes("weddingDateISO: '2026-11-16") && data.includes('Monday, 16th November 2026'))
  ? ok('countdown target is 16 November 2026') : fail('countdown target is not 16 November 2026');
(main.includes('Today Is Our Wedding Day!') && main.includes('Our Beautiful Journey Begins'))
  ? ok('wedding-day / passed messages present') : fail('wedding-day messages missing');
(main.includes("setBoxes('0', '00', '00', '00')"))
  ? ok('countdown clamps to zero (no negatives)') : fail('countdown zero-clamp missing');
// Green-and-gold theme: palette present, no burgundy / red remnants in sources.
(css.includes('--forest-900') && css.includes('#c9a24b') && css.includes('btn-gold'))
  ? ok('dark-green + gold theme applied') : fail('green-and-gold theme missing');
{
  const sources = html + css + data + main + readFileSync('public/assets/emblem.svg', 'utf8');
  const stale = ['burgundy', 'maroon', 'wine-', 'rosegold', 'rose-gold', '#4A0710', '#350409',
    '#650D1B', '#B78A72', '#F8F0E5', '#E8D6BD', '#D9B9B0', '#96644E',
    'btn-champagne', 'eyebrow wine', 'eyebrow rose', 'February 2026', '8th February',
    'gyKpzRQk91yKZ1fo2', 'Lakshmi', 'Tambaram', '9:30 AM', 'Muhurtham 9:30'];
  const found = stale.filter((s) => sources.toLowerCase().includes(s.toLowerCase()));
  found.length ? fail(`stale theme/date remnants: ${found.join(', ')}`) : ok('no burgundy / red / old-date remnants');
// Corrected details must be present everywhere they appear.
{
  const names = (sources.match(/K\.R\. Manoj Kaarthick/g) || []).length;
  const bride = (sources.match(/S\. Ramyabharathi/g) || []).length;
  const morning = (sources.match(/Wedding Morning: 6:00 AM – 7:30 AM/g) || []).length;
  const mahal = (sources.match(/Priya Mahal/g) || []).length;
  names >= 6 ? ok(`groom name with initials present (${names} refs)`) : fail(`groom name refs: ${names}`);
  bride >= 6 ? ok(`bride name with initial present (${bride} refs)`) : fail(`bride name refs: ${bride}`);
  morning >= 3 ? ok(`wedding morning timing present (${morning} refs)`) : fail(`wedding morning refs: ${morning}`);
  mahal >= 4 ? ok(`Priya Mahal venue present (${mahal} refs)`) : fail(`Priya Mahal refs: ${mahal}`);
}
}
// Hero + footer name blocks: standalone centered ampersands, no shared name elements.
(html.includes('bless-names') && html.includes('bless-amp') && !html.includes('bless-sign'))
  ? ok('blessings signature uses stacked blocks (no inline ampersand)') : fail('blessings signature incorrect');
(html.includes('couple-tamil') && html.includes('amp-own-line'))
  ? ok('hero shows Tamil names with standalone ampersand') : fail('hero name block incorrect');
(html.includes('footer-amp') && !html.includes('data-field="groomTamil"') && !html.includes('data-field="brideTamil"'))
  ? ok('footer uses stacked English names with no Tamil slots') : fail('footer name block incorrect');
(css.includes('.couple-name') && css.includes('white-space: nowrap'))
  ? ok('name lines protected from wrapping') : fail('name nowrap guards missing');
// Single venue card with one location button opening the exact client-provided link.
((main.includes('venue-grid') || html.includes('venueGrid')) && main.includes('wedding.venueMapsLink'))
  ? ok('single common venue card with one location button') : fail('venue card incorrect');
(data.includes('maps/place/Priya+Mahal/') && data.includes('0x3a52e1bf6d989cf1'))
  ? ok('exact client mahal link stored in wedding data') : fail('client mahal link missing from data');
// Every location button must use the exact link — no query-built or guessed Maps URLs.
{
  const built = (main.match(/mapsUrl\(/g) || []).length;
  const exact = (main.match(/wedding\.venueMapsLink/g) || []).length;
  const tabs = (main.match(/target="_blank" rel="noopener noreferrer"/g) || []).length;
  built === 0 ? ok('no query-built Maps URLs remain') : fail(`${built} query-built Maps URL(s) remain`);
  // 2 source refs: event-card template (renders twice — reception + wedding) + venue card = 3 buttons.
  exact === 2 ? ok(`all location buttons use the exact link (${exact} template refs → 3 buttons)`) : fail(`expected 2 exact-link refs, found ${exact}`);
  tabs === 2 ? ok('all location buttons open in a new tab with noopener noreferrer') : fail(`expected 2 safe new-tab links, found ${tabs}`);
}
css.includes('overflow-x: hidden') ? ok('horizontal overflow guard present') : fail('overflow guard missing');
css.includes('prefers-reduced-motion') ? ok('reduced-motion support present') : fail('reduced-motion missing');
(css.includes('max-width: 760px') || css.includes('max-width:760px')) ? ok('mobile breakpoint present') : fail('mobile breakpoint missing');
existsSync('public/assets/emblem.svg') ? ok('emblem asset present') : fail('emblem asset missing');
const dataCode = data.replace(/\/\/.*$/gm, '');
if (/rsvpPhone:\s*["']\d{6,}["']/.test(dataCode)) fail('placeholder phone number detected');
else ok('no fabricated phone number');
console.log(process.exitCode ? 'Check FAILED' : 'All checks passed.');
