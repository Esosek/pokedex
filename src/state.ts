import { createInterface, type Interface } from 'readline'
import { stdin, stdout } from 'node:process'

import { PokeAPI } from './pokeapi.js'
import { commandExit } from './command_exit.js'
import { commandHelp } from './command_help.js'
import { commandMap, commandMapb } from './command_map.js'

export type CLICommand = {
  name: string
  description: string
  callback: (state: State) => Promise<void>
}

export type State = {
  readline: Interface
  pokeAPI: PokeAPI
  nextLocationsURL: string
  prevLocationsURL: string
  commands: Record<string, CLICommand>
}

export function initState(): State {
  return {
    readline: createInterface({
      input: stdin,
      output: stdout,
      prompt: 'Pokedex > ',
    }),
    pokeAPI: new PokeAPI(),
    nextLocationsURL: '?offset=20',
    prevLocationsURL: '',
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
      map: {
        name: 'map',
        description:
          'Displays the names of 20 location areas in the Pokemon world. Each subsequent use displays the next 20 areas.',
        callback: commandMap,
      },
      mapb: {
        name: 'mapb',
        description:
          'Displays the names of 20 previous location areas in the Pokemon world.',
        callback: commandMapb,
      },
    },
  }
}
