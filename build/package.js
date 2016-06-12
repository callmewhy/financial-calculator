/**
 * Packages the application into executable .app and .exe files.
 * For more info, see https://github.com/electron-userland/electron-packager.
 */
const argv = require('minimist')(process.argv.slice(2))
const packager = require('electron-packager')
const appManifest = require('../app/package.json').appManifest
const devManifest = require('../package.json')
const config = require('../config')

function getElectronVersion() {
  const v = config.release.electronVersion ||
    (devManifest.devDependencies || {})['electron-prebuilt'] ||
    (devManifest.dependencies || {})['electron-prebuilt']
  if (v) {
    return v.replace(/^\D+/, '')
  }
  console.log('No electron version was found in config.js or package.json.')
  return null
}

const packagerConfig = {
  name: appManifest.productName,
  dir: config.build.outputRoot,
  out: config.build.releasesRoot,
  version: getElectronVersion(),
  platform: argv.platform || config.release.platform,
  arch: argv.arch || 'all',
  prune: true,
  icon: config.build.iconPath,
  overwrite: true,
  ignore: Object.keys((appManifest.devDependencies || {})).map((name) => {
    return `/node_modules/${name}($|/)`
  }),
  'app-version': appManifest.version,
}

if (packagerConfig.platform === 'mas') {
  Object.assign(packagerConfig, {
    'app-bundle-id': appManifest.bundleId,
    'osx-sign': true,
  })
}

console.log(packagerConfig)

packager(packagerConfig, (err, appPath) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`packaged to ${appPath}`)
})
