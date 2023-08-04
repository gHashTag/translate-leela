require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { Translate } = require('@google-cloud/translate').v2

// Your Google Cloud Platform project ID
const projectId = process.env.PROJECT_ID

// Your Google Cloud Platform API Key
const key = process.env.GOOGLE_API_KEY

// Instantiates a client
const translate = new Translate({ projectId, key })

// Путь до папки с исходными файлами
const sourceDirectoryPath = './docs'

// Путь до папки, куда будут записываться новые файлы
const targetDirectoryPath = './locales'

// Языки
const languages = [
  'zh',
  'es',
  'en',
  'hi',
  'bn',
  'pt',
  'ru',
  'ja',
  'pa',
  'mr',
  'jv',
  'te',
  'tr',
  'ko',
  'fr',
  'de',
  'vi',
  'ta',
  'ur'
]

languages.forEach((lang) => {
  const newDirectoryPath = path.join(targetDirectoryPath, lang)

  // Создаем папку для языка, если она еще не существует
  if (!fs.existsSync(newDirectoryPath)) {
    fs.mkdirSync(newDirectoryPath, { recursive: true })
  }

  fs.readdir(sourceDirectoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }

    files.forEach(async (file) => {
      const fullPath = path.join(sourceDirectoryPath, file)

      // Проверяем, является ли элемент файлом
      if (fs.statSync(fullPath).isFile()) {
        // Игнорируем файлы, которые уже имеют суффикс языка
        if (!file.endsWith(`.md`)) {
          return
        }

        // Читаем содержимое файла
        const content = fs.readFileSync(fullPath, 'utf8')

        // Переводим содержимое файла
        const [translation] = await translate.translate(content, lang)

        // Путь нового файла
        const newPath = path.join(newDirectoryPath, file.replace('.md', `-${lang}.md`))

        // Записываем перевод в новый файл
        fs.writeFileSync(newPath, translation, 'utf8')
      }
    })
  })
})
