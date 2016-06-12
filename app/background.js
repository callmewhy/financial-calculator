// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

const path = require('path')
const electron = require('electron') // eslint-disable-line
const app = electron.app
const BrowserWindow = electron.BrowserWindow

// DEBUG
require('electron-debug')({
  showDevTools: false,
  enabled: true,
  extensions: {
    devtron: path.resolve(__dirname, '../node_modules/devtron'),
    'Vue.js devtools': path.resolve(__dirname, '../resource/tools/vue-devtools'),
  },
})

// APP
let mainWindow
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  })

  // Load the HTML file directly from the webpack dev server if
  // hot reload is enabled, otherwise load the local file.
  const mainURL = process.env.HOT
    // ? `http://localhost:${process.env.PORT}/main.html`
    ? `http://localhost:${process.env.PORT}/webpack-dev-server/main.html`
    : `file://${path.join(__dirname, 'main.html')}`

  mainWindow.loadURL(mainURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
