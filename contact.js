// Nach Einrichtung bei Formspree die vollständige Formular-URL hier eintragen.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbgoywko';

(() => {
  const lang = document.documentElement.lang;
  const copy = {
    de: { title:'Kontakt', intro:'Sie stehen vor einer Veränderung oder prüfen eine Zusammenarbeit? Schreiben Sie uns – wir beginnen mit Ihrer Ausgangslage.', name:'Name', company:'Unternehmen (optional)', email:'E-Mail', message:'Ihre Nachricht', send:'Nachricht senden', note:'Ihre Angaben werden zur Bearbeitung Ihrer Anfrage verwendet. Bitte beachten Sie unsere Datenschutzerklärung.', privacy:'Datenschutzerklärung', off:'Das Formular wird derzeit eingerichtet. Bitte kontaktieren Sie uns per E-Mail oder Telefon.', details:'Kontakt', address:'Koppenstraße 93 · 10243 Berlin' },
    en: { title:'Contact', intro:'Facing a change or exploring a partnership? Tell us about your situation.', name:'Name', company:'Company (optional)', email:'Email', message:'Your message', send:'Send message', note:'We use your information to respond to your enquiry. Please read our privacy notice.', privacy:'Privacy notice (German)', off:'The form is being set up. Please contact us by email or phone.', details:'Contact details', address:'Koppenstraße 93 · 10243 Berlin, Germany' },
    fr: { title:'Contact', intro:'Vous préparez une transformation ou un partenariat ? Décrivez-nous votre situation.', name:'Nom', company:'Entreprise (facultatif)', email:'E-mail', message:'Votre message', send:'Envoyer', note:'Vos informations servent à répondre à votre demande. Consultez notre politique de confidentialité.', privacy:'Confidentialité (en allemand)', off:'Le formulaire est en cours de configuration. Contactez-nous par e-mail ou téléphone.', details:'Coordonnées', address:'Koppenstraße 93 · 10243 Berlin, Allemagne' }
  }[lang] || null;
  const footer = document.querySelector('footer');
  if (!copy || !footer) return;
  const configured = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+\/?$/.test(FORMSPREE_ENDPOINT);
  const section = document.createElement('section');
  section.className = 'contact-section'; section.id = 'contact';
  section.innerHTML = `<div class="contact-inner"><div><p class="eyebrow">NUTHEM · ${copy.title}</p><h2>${copy.title}</h2><p>${copy.intro}</p><form method="POST" ${configured ? `action="${FORMSPREE_ENDPOINT}"` : ''}><label>${copy.name}<input name="name" autocomplete="name" required></label><label>${copy.company}<input name="company" autocomplete="organization"></label><label>${copy.email}<input name="email" type="email" autocomplete="email" required></label><label>${copy.message}<textarea name="message" rows="6" required></textarea></label><p class="contact-privacy">${copy.note} <a href="datenschutz.html">${copy.privacy}</a></p><button class="button button-primary" type="submit" ${configured ? '' : 'disabled'}>${copy.send}</button>${configured ? '' : `<p role="status">${copy.off}</p>`}</form></div><aside><h3>${copy.details}</h3><p><strong>Bristol Emassi</strong><br>NUTHEM</p><p><a href="mailto:info@nuthem.com">info@nuthem.com</a><br><a href="tel:+4915567486992">+49 1556 7486992</a></p><p>${copy.address}</p><p>Deutsch · English · Français</p></aside></div>`;
  footer.before(section);
})();
