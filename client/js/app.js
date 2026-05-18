(() => {
  'use strict';

  const log = (level, message, ctx) => {
    const ts = new Date().toISOString();
    const fn = console[level] || console.log;
    fn(`[${ts}] [${level}] ${message}`, ctx || '');
  };

  const onReady = (fn) => {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  /* ── i18n translations ── */
  const translations = {
    en: {
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.eshop': 'E-shop',
      'nav.contact': 'Contact',
      'hero.eyebrow': 'Athens · Photography · Est. 2014',
      'hero.title.1': 'Quiet light,',
      'hero.title.2': 'loud feeling.',
      'hero.desc': 'I\u2019m Aneria \u2014 an Athens-based photographer documenting weddings, portraits and editorial stories across Greece and the wider Mediterranean.',
      'hero.cta.work': 'View the work',
      'hero.cta.contact': 'Begin a conversation \u2192',
      'hero.scroll': 'scroll',
      'work.eyebrow': 'Selected work \u00b7 2018 \u2014 2026',
      'work.title.1': 'Stories told in ',
      'work.title.2': 'natural light.',
      'work.desc': 'A small, slow archive \u2014 chosen for feeling rather than volume. Click any frame to open the story.',
      'work.cta': 'Request the full portfolio \u2192',
      'about.eyebrow': 'About \u2014 \u039b\u03af\u03b3\u03b1 \u03bb\u03cc\u03b3\u03b9\u03b1',
      'about.title.1': 'I photograph the way memory ',
      'about.title.2': 'actually feels.',
      'about.p1': 'I grew up between Athens and a small village on the slopes of Pelion, which is probably why I keep coming back to slow afternoons, warm stone, and the people who sit inside them.',
      'about.p2': 'For the last decade I\u2019ve worked with couples, families and magazines who want photographs that breathe \u2014 unhurried, unposed, and made on real film whenever the day allows it.',
      'about.caption': 'Self-portrait, Exarcheia studio \u00b7 2024',
      'about.based': 'Based',
      'about.based.val': 'Athens, GR',
      'about.travels': 'Travels',
      'about.travels.val': 'Worldwide',
      'about.speaks': 'Speaks',
      'about.speaks.val': '\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac \u00b7 English \u00b7 Italiano',
      'about.featured': 'Featured',
      'about.featured.val': 'Vogue Greece \u00b7 Kinfolk \u00b7 Cereal',
      'services.eyebrow': 'Services',
      'services.title.1': 'Three ways to ',
      'services.title.2': 'work together.',
      'services.wed.title': 'Weddings',
      'services.wed.desc': 'Documentary coverage of the full day \u2014 from the morning\u2019s first coffee in Greek to the last dance under the lights. Available across Greece & Europe.',
      'services.wed.price': 'From <strong>\u20ac2,800</strong>',
      'services.port.title': 'Portraits',
      'services.port.desc': 'Personal sessions, family portraits, and authors\u2019 headshots made on location in Athens or in studio. Two-hour minimum, hand-edited gallery.',
      'services.port.price': 'From <strong>\u20ac450</strong>',
      'services.edit.title': 'Editorial & Brand',
      'services.edit.desc': 'Commissions for magazines, hospitality and slow-living brands. Concept, location scout, and small-team production handled end to end.',
      'services.edit.price': 'By quotation',
      'contact.eyebrow': 'Begin \u00b7 \u039e\u03b5\u03ba\u03b9\u03bd\u03ae\u03c3\u03c4\u03b5',
      'contact.title.1': 'Let\u2019s make',
      'contact.title.2': 'something quiet',
      'contact.title.3': 'and lasting.',
      'contact.desc': 'Tell me about the day, the place, or the idea you\u2019re carrying. I read every email and reply within two working days.',
      'contact.email': 'Email',
      'contact.studio': 'Studio',
      'contact.visit': 'Visit',
      'contact.follow': 'Follow',
      'footer.line': 'Athens, Greece \u00b7 Available worldwide',
      'footer.copy.pre': '\u00a9 ',
      'footer.copy.post': ' Aneria. All photographs & words \u2014 made by hand.',
      'eshop.title': 'E-shop',
      'eshop.desc': 'Order all your photography products in one place. Transform your favourite photos and have them printed on mugs, t-shirts, mouse pads and many other items. Prints, albums, enlargements \u2014 everything available at your fingertips.',
    },
    el: {
      'nav.work': '\u0388\u03c1\u03b3\u03b1',
      'nav.about': '\u03a3\u03c7\u03b5\u03c4\u03b9\u03ba\u03ac',
      'nav.services': '\u03a5\u03c0\u03b7\u03c1\u03b5\u03c3\u03af\u03b5\u03c2',
      'nav.eshop': 'E-shop',
      'nav.contact': '\u0395\u03c0\u03b9\u03ba\u03bf\u03b9\u03bd\u03c9\u03bd\u03af\u03b1',
      'hero.eyebrow': '\u0391\u03b8\u03ae\u03bd\u03b1 \u00b7 \u03a6\u03c9\u03c4\u03bf\u03b3\u03c1\u03b1\u03c6\u03af\u03b1 \u00b7 \u0391\u03c0\u03cc \u03c4\u03bf 2014',
      'hero.title.1': '\u0389\u03c3\u03c5\u03c7\u03bf \u03c6\u03c9\u03c2,',
      'hero.title.2': '\u03b4\u03c5\u03bd\u03b1\u03c4\u03cc \u03c3\u03c5\u03bd\u03b1\u03af\u03c3\u03b8\u03b7\u03bc\u03b1.',
      'hero.desc': '\u0395\u03af\u03bc\u03b1\u03b9 \u03b7 Aneria \u2014 \u03c6\u03c9\u03c4\u03bf\u03b3\u03c1\u03ac\u03c6\u03bf\u03c2 \u03c3\u03c4\u03b7\u03bd \u0391\u03b8\u03ae\u03bd\u03b1 \u03c0\u03bf\u03c5 \u03b1\u03c0\u03bf\u03c4\u03c5\u03c0\u03ce\u03bd\u03c9 \u03b3\u03ac\u03bc\u03bf\u03c5\u03c2, \u03c0\u03bf\u03c1\u03c4\u03c1\u03ad\u03c4\u03b1 \u03ba\u03b1\u03b9 editorial \u03b9\u03c3\u03c4\u03bf\u03c1\u03af\u03b5\u03c2 \u03c3\u03b5 \u03cc\u03bb\u03b7 \u03c4\u03b7\u03bd \u0395\u03bb\u03bb\u03ac\u03b4\u03b1 \u03ba\u03b1\u03b9 \u03c4\u03b7 \u039c\u03b5\u03c3\u03cc\u03b3\u03b5\u03b9\u03bf.',
      'hero.cta.work': '\u0394\u03b5\u03af\u03c4\u03b5 \u03c4\u03b7 \u03b4\u03bf\u03c5\u03bb\u03b5\u03b9\u03ac',
      'hero.cta.contact': '\u039e\u03b5\u03ba\u03b9\u03bd\u03ae\u03c3\u03c4\u03b5 \u03bc\u03b9\u03b1 \u03c3\u03c5\u03bd\u03bf\u03bc\u03b9\u03bb\u03af\u03b1 \u2192',
      'hero.scroll': 'scroll',
      'work.eyebrow': '\u0395\u03c0\u03b9\u03bb\u03b5\u03b3\u03bc\u03ad\u03bd\u03b1 \u03ad\u03c1\u03b3\u03b1 \u00b7 2018 \u2014 2026',
      'work.title.1': '\u0399\u03c3\u03c4\u03bf\u03c1\u03af\u03b5\u03c2 \u03bc\u03b5 ',
      'work.title.2': '\u03c6\u03c5\u03c3\u03b9\u03ba\u03cc \u03c6\u03c9\u03c2.',
      'work.desc': '\u0388\u03bd\u03b1 \u03bc\u03b9\u03ba\u03c1\u03cc, \u03b1\u03c1\u03b3\u03cc \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u2014 \u03b5\u03c0\u03b9\u03bb\u03b5\u03b3\u03bc\u03ad\u03bd\u03bf \u03bc\u03b5 \u03b2\u03ac\u03c3\u03b7 \u03c4\u03bf \u03c3\u03c5\u03bd\u03b1\u03af\u03c3\u03b8\u03b7\u03bc\u03b1 \u03ba\u03b1\u03b9 \u03cc\u03c7\u03b9 \u03c4\u03b7\u03bd \u03c0\u03bf\u03c3\u03cc\u03c4\u03b7\u03c4\u03b1. \u039a\u03ac\u03bd\u03c4\u03b5 \u03ba\u03bb\u03b9\u03ba \u03c3\u03b5 \u03bf\u03c0\u03bf\u03b9\u03bf\u03b4\u03ae\u03c0\u03bf\u03c4\u03b5 \u03ba\u03b1\u03c1\u03ad.',
      'work.cta': '\u0396\u03b7\u03c4\u03ae\u03c3\u03c4\u03b5 \u03c4\u03bf \u03c0\u03bb\u03ae\u03c1\u03b5\u03c2 portfolio \u2192',
      'about.eyebrow': '\u03a3\u03c7\u03b5\u03c4\u03b9\u03ba\u03ac \u2014 \u039b\u03af\u03b3\u03b1 \u03bb\u03cc\u03b3\u03b9\u03b1',
      'about.title.1': '\u03a6\u03c9\u03c4\u03bf\u03b3\u03c1\u03b1\u03c6\u03af\u03b6\u03c9 \u03cc\u03c0\u03c9\u03c2 ',
      'about.title.2': '\u03bd\u03b9\u03ce\u03b8\u03b5\u03b9 \u03b7 \u03bc\u03bd\u03ae\u03bc\u03b7.',
      'about.p1': '\u039c\u03b5\u03b3\u03ac\u03bb\u03c9\u03c3\u03b1 \u03b1\u03bd\u03ac\u03bc\u03b5\u03c3\u03b1 \u03c3\u03c4\u03b7\u03bd \u0391\u03b8\u03ae\u03bd\u03b1 \u03ba\u03b1\u03b9 \u03ad\u03bd\u03b1 \u03bc\u03b9\u03ba\u03c1\u03cc \u03c7\u03c9\u03c1\u03b9\u03cc \u03c3\u03c4\u03b9\u03c2 \u03c0\u03bb\u03b1\u03b3\u03b9\u03ad\u03c2 \u03c4\u03bf\u03c5 \u03a0\u03b7\u03bb\u03af\u03bf\u03c5, \u03b3\u03b9\u2019 \u03b1\u03c5\u03c4\u03cc \u03af\u03c3\u03c9\u03c2 \u03b5\u03c0\u03b9\u03c3\u03c4\u03c1\u03ad\u03c6\u03c9 \u03c0\u03ac\u03bd\u03c4\u03b1 \u03c3\u03c4\u03b1 \u03b1\u03c1\u03b3\u03ac \u03b1\u03c0\u03bf\u03b3\u03b5\u03cd\u03bc\u03b1\u03c4\u03b1, \u03c4\u03b7 \u03b6\u03b5\u03c3\u03c4\u03ae \u03c0\u03ad\u03c4\u03c1\u03b1 \u03ba\u03b1\u03b9 \u03c4\u03bf\u03c5\u03c2 \u03b1\u03bd\u03b8\u03c1\u03ce\u03c0\u03bf\u03c5\u03c2 \u03c0\u03bf\u03c5 \u03ba\u03ac\u03b8\u03bf\u03bd\u03c4\u03b1\u03b9 \u03bc\u03ad\u03c3\u03b1 \u03c4\u03bf\u03c5\u03c2.',
      'about.p2': '\u03a4\u03b7\u03bd \u03c4\u03b5\u03bb\u03b5\u03c5\u03c4\u03b1\u03af\u03b1 \u03b4\u03b5\u03ba\u03b1\u03b5\u03c4\u03af\u03b1 \u03b4\u03bf\u03c5\u03bb\u03b5\u03cd\u03c9 \u03bc\u03b5 \u03b6\u03b5\u03c5\u03b3\u03ac\u03c1\u03b9\u03b1, \u03bf\u03b9\u03ba\u03bf\u03b3\u03ad\u03bd\u03b5\u03b9\u03b5\u03c2 \u03ba\u03b1\u03b9 \u03c0\u03b5\u03c1\u03b9\u03bf\u03b4\u03b9\u03ba\u03ac \u03c0\u03bf\u03c5 \u03b8\u03ad\u03bb\u03bf\u03c5\u03bd \u03c6\u03c9\u03c4\u03bf\u03b3\u03c1\u03b1\u03c6\u03af\u03b5\u03c2 \u03c0\u03bf\u03c5 \u03b1\u03bd\u03b1\u03c0\u03bd\u03ad\u03bf\u03c5\u03bd \u2014 \u03c7\u03c9\u03c1\u03af\u03c2 \u03b2\u03b9\u03b1\u03c3\u03cd\u03bd\u03b7, \u03c7\u03c9\u03c1\u03af\u03c2 \u03c0\u03cc\u03b6\u03b1, \u03c3\u03b5 \u03c6\u03b9\u03bb\u03bc \u03cc\u03c0\u03bf\u03c4\u03b5 \u03c4\u03bf \u03b5\u03c0\u03b9\u03c4\u03c1\u03ad\u03c0\u03b5\u03b9 \u03b7 \u03bc\u03ad\u03c1\u03b1.',
      'about.caption': '\u0391\u03c5\u03c4\u03bf\u03c0\u03bf\u03c1\u03c4\u03c1\u03ad\u03c4\u03bf, \u03c3\u03c4\u03bf\u03cd\u03bd\u03c4\u03b9\u03bf \u0395\u03be\u03b1\u03c1\u03c7\u03b5\u03af\u03c9\u03bd \u00b7 2024',
      'about.based': '\u0388\u03b4\u03c1\u03b1',
      'about.based.val': '\u0391\u03b8\u03ae\u03bd\u03b1, GR',
      'about.travels': '\u03a4\u03b1\u03be\u03af\u03b4\u03b9\u03b1',
      'about.travels.val': '\u03a0\u03b1\u03b3\u03ba\u03bf\u03c3\u03bc\u03af\u03c9\u03c2',
      'about.speaks': '\u039c\u03b9\u03bb\u03ac\u03c9',
      'about.speaks.val': '\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac \u00b7 English \u00b7 Italiano',
      'about.featured': '\u0394\u03b7\u03bc\u03bf\u03c3\u03b9\u03b5\u03cd\u03c3\u03b5\u03b9\u03c2',
      'about.featured.val': 'Vogue Greece \u00b7 Kinfolk \u00b7 Cereal',
      'services.eyebrow': '\u03a5\u03c0\u03b7\u03c1\u03b5\u03c3\u03af\u03b5\u03c2',
      'services.title.1': '\u03a4\u03c1\u03b5\u03b9\u03c2 \u03c4\u03c1\u03cc\u03c0\u03bf\u03b9 \u03bd\u03b1 ',
      'services.title.2': '\u03c3\u03c5\u03bd\u03b5\u03c1\u03b3\u03b1\u03c3\u03c4\u03bf\u03cd\u03bc\u03b5.',
      'services.wed.title': '\u0393\u03ac\u03bc\u03bf\u03b9',
      'services.wed.desc': '\u039d\u03c4\u03bf\u03ba\u03b9\u03bc\u03b1\u03bd\u03c4\u03b5\u03c1\u03b9\u03c3\u03c4\u03b9\u03ba\u03ae \u03ba\u03ac\u03bb\u03c5\u03c8\u03b7 \u03bf\u03bb\u03cc\u03ba\u03bb\u03b7\u03c1\u03b7\u03c2 \u03c4\u03b7\u03c2 \u03b7\u03bc\u03ad\u03c1\u03b1\u03c2 \u2014 \u03b1\u03c0\u03cc \u03c4\u03bf\u03bd \u03c0\u03c1\u03c9\u03b9\u03bd\u03cc \u03ba\u03b1\u03c6\u03ad \u03ad\u03c9\u03c2 \u03c4\u03bf\u03bd \u03c4\u03b5\u03bb\u03b5\u03c5\u03c4\u03b1\u03af\u03bf \u03c7\u03bf\u03c1\u03cc. \u0394\u03b9\u03b1\u03b8\u03ad\u03c3\u03b9\u03bc\u03bf \u03c3\u03b5 \u0395\u03bb\u03bb\u03ac\u03b4\u03b1 & \u0395\u03c5\u03c1\u03ce\u03c0\u03b7.',
      'services.wed.price': '\u0391\u03c0\u03cc <strong>\u20ac2.800</strong>',
      'services.port.title': '\u03a0\u03bf\u03c1\u03c4\u03c1\u03ad\u03c4\u03b1',
      'services.port.desc': '\u03a0\u03c1\u03bf\u03c3\u03c9\u03c0\u03b9\u03ba\u03ad\u03c2 \u03c3\u03c5\u03bd\u03b5\u03b4\u03c1\u03af\u03b5\u03c2, \u03bf\u03b9\u03ba\u03bf\u03b3\u03b5\u03bd\u03b5\u03b9\u03b1\u03ba\u03ac \u03c0\u03bf\u03c1\u03c4\u03c1\u03ad\u03c4\u03b1 \u03ba\u03b1\u03b9 headshots \u03c3\u03c5\u03b3\u03b3\u03c1\u03b1\u03c6\u03ad\u03c9\u03bd \u03c3\u03b5 \u03c4\u03bf\u03c0\u03bf\u03b8\u03b5\u03c3\u03af\u03b1 \u03ae \u03c3\u03c4\u03bf\u03cd\u03bd\u03c4\u03b9\u03bf. \u0395\u03bb\u03ac\u03c7\u03b9\u03c3\u03c4\u03bf 2 \u03ce\u03c1\u03b5\u03c2, \u03b5\u03c0\u03b9\u03bc\u03b5\u03bb\u03b7\u03bc\u03ad\u03bd\u03b7 \u03c3\u03c5\u03bb\u03bb\u03bf\u03b3\u03ae.',
      'services.port.price': '\u0391\u03c0\u03cc <strong>\u20ac450</strong>',
      'services.edit.title': 'Editorial & Brand',
      'services.edit.desc': '\u03a3\u03c5\u03bd\u03b5\u03c1\u03b3\u03b1\u03c3\u03af\u03b5\u03c2 \u03bc\u03b5 \u03c0\u03b5\u03c1\u03b9\u03bf\u03b4\u03b9\u03ba\u03ac, \u03be\u03b5\u03bd\u03bf\u03b4\u03bf\u03c7\u03b5\u03af\u03b1 \u03ba\u03b1\u03b9 brands. Concept, \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae \u03c4\u03bf\u03c0\u03bf\u03b8\u03b5\u03c3\u03af\u03b1\u03c2 \u03ba\u03b1\u03b9 \u03c0\u03b1\u03c1\u03b1\u03b3\u03c9\u03b3\u03ae \u03b1\u03c0\u03cc \u03c4\u03b7\u03bd \u03b1\u03c1\u03c7\u03ae \u03ad\u03c9\u03c2 \u03c4\u03bf \u03c4\u03ad\u03bb\u03bf\u03c2.',
      'services.edit.price': '\u039a\u03b1\u03c4\u03cc\u03c0\u03b9\u03bd \u03c0\u03c1\u03bf\u03c3\u03c6\u03bf\u03c1\u03ac\u03c2',
      'contact.eyebrow': '\u039e\u03b5\u03ba\u03b9\u03bd\u03ae\u03c3\u03c4\u03b5',
      'contact.title.1': '\u0391\u03c2 \u03c6\u03c4\u03b9\u03ac\u03be\u03bf\u03c5\u03bc\u03b5',
      'contact.title.2': '\u03ba\u03ac\u03c4\u03b9 \u03ae\u03c3\u03c5\u03c7\u03bf',
      'contact.title.3': '\u03ba\u03b1\u03b9 \u03b4\u03b9\u03b1\u03c7\u03c1\u03bf\u03bd\u03b9\u03ba\u03cc.',
      'contact.desc': '\u03a0\u03b5\u03af\u03c4\u03b5 \u03bc\u03bf\u03c5 \u03b3\u03b9\u03b1 \u03c4\u03b7\u03bd \u03b7\u03bc\u03ad\u03c1\u03b1, \u03c4\u03bf\u03bd \u03c4\u03cc\u03c0\u03bf \u03ae \u03c4\u03b7\u03bd \u03b9\u03b4\u03ad\u03b1 \u03c0\u03bf\u03c5 \u03ad\u03c7\u03b5\u03c4\u03b5 \u03c3\u03c4\u03bf \u03bc\u03c5\u03b1\u03bb\u03cc. \u0394\u03b9\u03b1\u03b2\u03ac\u03b6\u03c9 \u03ba\u03ac\u03b8\u03b5 email \u03ba\u03b1\u03b9 \u03b1\u03c0\u03b1\u03bd\u03c4\u03ce \u03b5\u03bd\u03c4\u03cc\u03c2 \u03b4\u03cd\u03bf \u03b5\u03c1\u03b3\u03ac\u03c3\u03b9\u03bc\u03c9\u03bd \u03b7\u03bc\u03b5\u03c1\u03ce\u03bd.',
      'contact.email': 'Email',
      'contact.studio': '\u03a3\u03c4\u03bf\u03cd\u03bd\u03c4\u03b9\u03bf',
      'contact.visit': '\u0395\u03c0\u03af\u03c3\u03ba\u03b5\u03c8\u03b7',
      'contact.follow': '\u0391\u03ba\u03bf\u03bb\u03bf\u03c5\u03b8\u03ae\u03c3\u03c4\u03b5',
      'footer.line': '\u0391\u03b8\u03ae\u03bd\u03b1, \u0395\u03bb\u03bb\u03ac\u03b4\u03b1 \u00b7 \u0394\u03b9\u03b1\u03b8\u03ad\u03c3\u03b9\u03bc\u03bf \u03c0\u03b1\u03b3\u03ba\u03bf\u03c3\u03bc\u03af\u03c9\u03c2',
      'footer.copy.pre': '\u00a9 ',
      'footer.copy.post': ' Aneria. \u038c\u03bb\u03b5\u03c2 \u03bf\u03b9 \u03c6\u03c9\u03c4\u03bf\u03b3\u03c1\u03b1\u03c6\u03af\u03b5\u03c2 & \u03ba\u03b5\u03af\u03bc\u03b5\u03bd\u03b1 \u2014 \u03c7\u03b5\u03b9\u03c1\u03bf\u03c0\u03bf\u03af\u03b7\u03c4\u03b1.',
      'eshop.title': 'E-shop',
      'eshop.desc': '\u03a0\u03b1\u03c1\u03b1\u03b3\u03b3\u03b5\u03af\u03bb\u03b5\u03c4\u03b5 \u03cc\u03bb\u03b1 \u03c4\u03b1 \u03c6\u03c9\u03c4\u03bf\u03b3\u03c1\u03b1\u03c6\u03b9\u03ba\u03ac \u03c0\u03c1\u03bf\u03ca\u03cc\u03bd\u03c4\u03b1 \u03c3\u03b5 \u03ad\u03bd\u03b1 \u03bc\u03ad\u03c1\u03bf\u03c2. \u039c\u03b5\u03c4\u03b1\u03c4\u03c1\u03ad\u03c8\u03c4\u03b5 \u03c4\u03b9\u03c2 \u03b1\u03b3\u03b1\u03c0\u03b7\u03bc\u03ad\u03bd\u03b5\u03c2 \u03c3\u03b1\u03c2 \u03c6\u03c9\u03c4\u03bf\u03b3\u03c1\u03b1\u03c6\u03af\u03b5\u03c2 \u03ba\u03b1\u03b9 \u03c4\u03c5\u03c0\u03ce\u03c3\u03c4\u03b5 \u03c4\u03b5\u03c2 \u03c3\u03b5 \u03ba\u03bf\u03cd\u03c0\u03b5\u03c2, \u03bc\u03c0\u03bb\u03bf\u03cd\u03b6\u03b5\u03c2, mouse pads \u03ba\u03b1\u03b9 \u03c0\u03bf\u03bb\u03bb\u03ac \u03ac\u03bb\u03bb\u03b1. \u0395\u03ba\u03c4\u03c5\u03c0\u03ce\u03c3\u03b5\u03b9\u03c2, \u03ac\u03bb\u03bc\u03c0\u03bf\u03c5\u03bc, \u03bc\u03b5\u03b3\u03b5\u03b8\u03cd\u03bd\u03c3\u03b5\u03b9\u03c2 \u2014 \u03cc\u03bb\u03b1 \u03b4\u03b9\u03b1\u03b8\u03ad\u03c3\u03b9\u03bc\u03b1 \u03b1\u03bc\u03ad\u03c3\u03c9\u03c2.',
    },
  };

  const initI18n = () => {
    const saved = localStorage.getItem('aneria-lang') || 'el';
    applyLang(saved);

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-switch button[data-lang]');
      if (!btn) return;
      const lang = btn.dataset.lang;
      localStorage.setItem('aneria-lang', lang);
      applyLang(lang);
    });
  };

  function applyLang(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.documentElement.lang = lang === 'el' ? 'el' : 'en';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key] == null) return;
      if (el.children.length === 0) {
        el.innerHTML = dict[key];
      } else {
        el.childNodes.forEach((node) => {
          if (node.nodeType === 3 && node.textContent.trim()) {
            node.textContent = dict[key];
          }
        });
        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
          el.innerHTML = dict[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    document.querySelectorAll('.lang-switch button').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
  }

  const initMarqueePause = () => {
    const btn = document.querySelector('.marquee-pause');
    const marquee = document.querySelector('.marquee');
    if (!btn || !marquee) return;

    btn.addEventListener('click', () => {
      const playing = btn.dataset.playing === 'true';
      marquee.classList.toggle('is-paused', playing);
      btn.dataset.playing = String(!playing);
      btn.textContent = playing ? '▶' : '❚❚';
      btn.setAttribute('aria-label', playing ? 'Play scrolling text' : 'Pause scrolling text');
    });
  };

  const initStickyHeader = () => {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  const initMobileNav = () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-mobile');
    if (!toggle || !menu) return;

    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.hidden = true;
      menu.style.display = '';
      document.body.classList.remove('menu-open');
    };

    const open = () => {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      menu.hidden = false;
      menu.style.display = 'block';
      document.body.classList.add('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        close();
      } else {
        open();
      }
    });

    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', close);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  };

  const initRevealOnScroll = () => {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll(
      '.section__head, .gallery__item, .service, .journal__item, .split__media, .split__text, .contact__card'
    );
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1)';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
  };

  const initFontSizeCtrl = () => {
    const ctrl = document.querySelector('.font-size-ctrl');
    if (!ctrl) return;

    const sizes = { small: 'fs-small', medium: '', large: 'fs-large' };
    const saved = localStorage.getItem('aneria-fs') || 'medium';
    applySize(saved);

    ctrl.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-size]');
      if (!btn) return;
      applySize(btn.dataset.size);
      localStorage.setItem('aneria-fs', btn.dataset.size);
    });

    function applySize(size) {
      const root = document.documentElement;
      root.classList.remove('fs-small', 'fs-large');
      if (sizes[size]) root.classList.add(sizes[size]);
      ctrl.querySelectorAll('button').forEach((b) => {
        b.classList.toggle('is-active', b.dataset.size === size);
      });
    }
  };

  const initYear = () => {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  };

  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 56;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  };

  onReady(() => {
    try {
      initStickyHeader();
      initMobileNav();
      initFontSizeCtrl();
      initI18n();
      initMarqueePause();
      initRevealOnScroll();
      initSmoothAnchors();
      initYear();
      log('info', 'aneria.gr client ready', { url: window.location.href });
    } catch (err) {
      log('error', 'init failed', { message: err.message, stack: err.stack });
    }
  });
})();
