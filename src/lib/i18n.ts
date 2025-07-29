import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('fr', () => import('./locales/fr.json'));
register('en', () => import('./locales/en.json'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator()
});
