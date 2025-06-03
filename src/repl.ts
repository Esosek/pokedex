import { stdin, stdout } from 'node:process'
import * as readline from 'node:readline/promises'
import { getCommands } from './command.js'

export function startREPL() {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  })
  rl.prompt()
  rl.on('line', (input) => {
    const cleanIn = cleanInput(input)
    if (!cleanIn.length) {
      rl.prompt()
    } else {
      const cmnds = getCommands()
      const cmndIndex = Object.keys(cmnds).findIndex((c) => c === cleanIn[0])
      if (cmndIndex === -1) {
        console.log('Unknown command')
        rl.prompt()
      } else {
        try {
          cmnds[cleanIn[0]].callback(cmnds)
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
}

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/)
}
