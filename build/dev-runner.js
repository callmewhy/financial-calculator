/**
 * Runs both the express dev server and the electron client with
 * a single command. When one process exits, all processes exit.
 * Stdout and stderr from both processes is logged to the same console.
 */
const exec = require('child_process').exec
const config = require('../config')

const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const END = '\x1b[0m'

function repeat(str, times) {
  return (new Array(times + 1)).join(str)
}

function format(command, data, color) {
  const dataStr = data.trim().replace(/\n/g, `\n${repeat(' ', command.length + 2)}`)
  return `${color}${command}${END}  ${dataStr}\n`
}

const children = []

function exit(code) {
  children.forEach((child) => {
    child.kill()
  })
  process.exit(code)
}

function run(command, color) {
  const child = exec(command)
  child.stdout.on('data', (data) => {
    console.log(format(command.split(' ')[2], data, color))
  })
  child.stderr.on('data', (data) => {
    console.error(format(command.split(' ')[2], data, color))
  })
  child.on('exit', (code) => {
    exit(code)
  })
  children.push(child)
}

run('npm run dev:server', YELLOW)
run(`npm run dev:client -- ${config.build.outputRoot}`, BLUE)
