import { createInterface, type Interface } from 'readline'
import { stdin, stdout } from 'node:process'
import { commandExit } from './command_exit.js'
import { commandHelp } from './command_help.js'

export type CLICommand = {
  name: string
  description: string
  callback: (state: State) => void
}

export type State = {
  readline: Interface
  commands: Record<string, CLICommand>
}

export function initState(): State {
  return {
    readline: createInterface({
      input: stdin,
      output: stdout,
      prompt: 'Pokedex > ',
    }),
    commands: {
      exit: {
        name: 'exit',
        description: 'Exits the pokedex',
        callback: commandExit,
      },
      help: {
        name: 'help',
        description: 'Displays a help message',
        callback: commandHelp,
      },
    },
  }
}
