import { Tracker } from 'meteor/tracker';
import '/lib/i18n/en';
import '/lib/i18n/tr';

const getLang = function () {
  const lang = navigator.languages && navigator.languages[0] ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    'en-US'

  return lang
};

i18n.setLocale(getLang());
const CurrentLocale = new ReactiveVar(i18n.getLocale());
const Translate = i18n.createReactiveTranslator();

Tracker.autorun(function () {
  const language = localStorage.getItem('language');

  if (!language) {
    return;
  }

  CurrentLocale.set(language);
});

Tracker.autorun(function () {
  const language = CurrentLocale.get();

  if (!language) {
    return;
  }

  localStorage.setItem('language', language);
  i18n.setLocale(language);
  document.documentElement.setAttribute('lang', language.slice(0, 2));
});

export { CurrentLocale, Translate };