import run from './seed'

const force = process.argv[process.argv.length - 1] === '-f'
const setup = force ? process.argv[process.argv.length - 2] : process.argv[process.argv.length - 1]

run(setup, force)
