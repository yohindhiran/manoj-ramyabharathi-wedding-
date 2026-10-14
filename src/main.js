import './style.css';
import { wedding } from './wedding-data.js';

const $ = (sel, root = document) => root.querySelector(sel);

/* ── icons (inline SVG, no external assets) ── */
const ICONS = {
  lamp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3v2M5.5 6.5l1.4 1.4M18.5 6.5l-1.4 1.4M12 8a5 5 0 0 0-3 9c.6.5 1 1.2 1 2h4c0-.8.4-1.5 1-2a5 5 0 0 0-3-9z"/></svg>',
  knot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5c-3 2.5-3 5.5 0 8.5 3 3 3 6 0 8.5M12 3.5c3 2.5 3 5.5 0 8.5-3 3-3 6 0 8.5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>'
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ── hydrate simple data fields ── */
const setText = (field, value) =>
  document.querySelectorAll(`[data-field="${field}"]`).forEach((el) => { el.textContent = value; });

setText('weddingDate', wedding.weddingDateDisplay);
setText('muhurtham', wedding.muhurtham);
setText('blessings', wedding.blessings.text);
setText('footerLine', wedding.footerLine);

/* ── family invitation ── */
$('#invitationBody').innerHTML = wedding.invitation.body
  .map((p) => `<p>${esc(p)}</p>`)
  .join('');
$('#familyGrid').innerHTML = wedding.invitation.families
  .map((f) => `<div><h3>${esc(f.label)}</h3><p>${esc(f.names)}</p></div>`)
  .join('');

/* ── event cards ── */
$('#eventGrid').innerHTML = wedding.events
  .map(
    (e) => `
    <article class="event-card">
      <div class="event-icon">${ICONS[e.icon] || ICONS.knot}</div>
      <h3>${esc(e.name)}</h3>
      <p class="event-tamil" lang="ta">${esc(e.tamilName)}</p>
      <p class="event-date">${esc(e.date)}</p>
      <p class="event-time">${esc(e.time)}</p>
      <p class="event-venue">${esc(e.venue)}</p>
      <p class="event-addr">${esc(e.address)}</p>
      <p class="event-note">${esc(e.note)}</p>
      <div class="event-actions">
        <a class="btn btn-gold" href="${wedding.venueMapsLink}" target="_blank" rel="noopener noreferrer">View Location</a>
      </div>
    </article>`
  )
  .join('');

/* ── timeline ── */
$('#timeline').innerHTML = wedding.schedule
  .map(
    (s) => `
    <li>
      <span class="t-dot" aria-hidden="true"></span>
      <p class="t-time">${esc(s.time)}</p>
      <p class="t-title">${esc(s.title)}</p>
      <p class="t-detail">${esc(s.detail)}</p>
    </li>`
  )
  .join('');

/* ── single common venue card (reception & muhurtham share one mahal) ── */
const reception = wedding.events.find((e) => e.id === 'reception');
const ceremony = wedding.events.find((e) => e.id === 'wedding');
const mahal = ceremony || wedding.events[0];
$('#venueGrid').innerHTML = `
    <article class="venue-card">
      <p class="venue-kind">Our Wedding Mahal</p>
      <h3>${esc(mahal.venue)}</h3>
      <address>${esc(mahal.address)}</address>
      <p class="venue-when">Reception — ${esc(reception.date)} · ${esc(reception.time)}</p>
      <p class="venue-when">Wedding — ${esc(ceremony.date)} · ${esc(ceremony.time)}</p>
      <a class="btn btn-gold" href="${wedding.venueMapsLink}" target="_blank" rel="noopener noreferrer">View Location</a>
    </article>`;

/* ── live countdown (Asia/Kolkata, from wedding-data.js — never hardcoded) ── */
const target = new Date(wedding.weddingDateISO).getTime();
const pad = (n) => String(n).padStart(2, '0');
// Calendar-day comparison in Indian time so "wedding day" is correct worldwide.
const kolkataDay = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
const weddingDay = Number.isNaN(target) ? '' : kolkataDay.format(new Date(target));
let countdownTimer = null;
// Skip the value-change pulse for visitors who prefer reduced motion.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setBox(id, value) {
  const el = $(id);
  const text = String(value);
  if (el.textContent === text) return; // unchanged — no work, no transition
  el.textContent = text;
  if (reduceMotion) return;
  el.classList.remove('pulse');
  void el.offsetWidth; // restart the transition for the new value
  el.classList.add('pulse');
  setTimeout(() => el.classList.remove('pulse'), 350);
}

function setBoxes(d, h, m, s) {
  setBox('#cd-days', d);
  setBox('#cd-hours', h);
  setBox('#cd-mins', m);
  setBox('#cd-secs', s);
}

function tick() {
  const msg = $('#countdownMsg');
  if (Number.isNaN(target)) {
    msg.textContent = 'Save the date — November 2026!';
    msg.hidden = false;
    return;
  }
  // Recomputed from the live clock on every tick — never manually decremented.
  const diff = target - Date.now();
  if (diff <= 0) {
    // Never show negatives: clamp to zero, then pick the graceful message.
    setBoxes('0', '00', '00', '00');
    const todayKol = kolkataDay.format(new Date());
    if (todayKol === weddingDay) {
      msg.textContent = 'Today Is Our Wedding Day!';
      document.querySelector('.countdown')?.setAttribute('aria-label', 'Today is the wedding day!');
    } else {
      msg.textContent = 'Our Beautiful Journey Begins';
      document.querySelector('.countdown')?.setAttribute('aria-label', 'The wedding has been celebrated.');
    }
    msg.hidden = false;
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
    return;
  }
  msg.hidden = true;
  setBoxes(
    Math.floor(diff / 86400000),
    pad(Math.floor(diff / 3600000) % 24),
    pad(Math.floor(diff / 60000) % 60),
    pad(Math.floor(diff / 1000) % 60)
  );
}
tick();
countdownTimer = setInterval(tick, 1000);

/* ── nav links (used for active-section highlight) ── */
const links = $('#navLinks');

/* ── active section highlight ── */
const navAnchors = [...links.querySelectorAll('a')];
const sections = navAnchors
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navAnchors.forEach((a) =>
        a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`)
      );
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => spy.observe(s));

/* ── reveal on scroll ── */
const revealer = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        revealer.unobserve(en.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));
