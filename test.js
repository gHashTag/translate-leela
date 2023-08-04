require('dotenv').config()
const { Translate } = require('@google-cloud/translate').v2

// Your Google Cloud Platform project ID
const projectId = process.env.PROJECT_ID

// Your Google Cloud Platform API Key
const key = process.env.GOOGLE_API_KEY

// Instantiates a client
const translate = new Translate({ projectId, key })

async function quickstart(
  text = 'Hello, world!', // The text to translate
  target = 'ru' // The target language
) {
  // The text to translate
  const [translation] = await translate.translate(text, target)
  console.log(`Text: ${text}`)
  console.log(`Translation: ${translation}`)
}

quickstart()
