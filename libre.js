const axios = require('axios')

const translate = async (text, source, target) => {
  const res = await axios.post('https://libretranslate.com/translate', {
    q: text,
    source: source,
    target: target
  })

  return res.data.translatedText
}

// Пример использования
translate('Привет, мир!', 'ru', 'en')
  .then((translatedText) => console.log(translatedText))
  .catch((err) => console.error(err))
