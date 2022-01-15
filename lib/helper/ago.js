export default ago = (date, lang = 'tr') => {
  return Chronos.moment(date).locale(lang).fromNow();
}