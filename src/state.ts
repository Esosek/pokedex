import { createInterface, type Interface } from 'readline'
import { stdin, stdout } from 'node:process'

import { PokeAPI, Pokemon } from './pokeapi.js'
import { commandExit } from './commands/command_exit.js'
import { commandHelp } from './commands/command_help.js'
import { commandMap, commandMapb } from './commands/command_map.js'
import { commandExplore } from './commands/command_explore.js'
import { commandCatch } from './commands/command_catch.js'
import { commandInspect } from './commands/command_inspect.js'
import { commandPokedex } from './commands/command_pokedex.js'

export type CLICommand = {
  name: string
  description: string
  callback: (state: State, ...args: string[]) => Promise<void>
}

export type State = {
  readline: Interface
  pokeAPI: PokeAPI
  nextLocationsURL: string
  prevLocationsURL: string
  pokedex: Record<string, Pokemon>
  commands: Record<string, CLICommand>
}

export function initState(): State {
  return {
    readline: createInterface({
      input: stdin,
      output: stdout,
      prompt: 'Pokedex > '
    }),
    pokeAPI: new PokeAPI(),
    nextLocationsURL: '?offset=20',
    prevLocationsURL: '',
    pokedex: {},
    commands: {
      exit: {
        name: 'exit',
        description: 'Exits the pokedex',
        callback: commandExit
      },
      help: {
        name: 'help',
        description: 'Displays a help message',
        callback: commandHelp
      },
      map: {
        name: 'map',
        description:
          'Displays the names of 20 location areas in the Pokemon world. Each subsequent use displays the next 20 areas.',
        callback: commandMap
      },
      mapb: {
        name: 'mapb',
        description:
          'Displays the names of 20 previous location areas in the Pokemon world.',
        callback: commandMapb
      },
      explore: {
        name: 'explore',
        description: 'Lists all pokemon in provided location.',
        callback: commandExplore
      },
      catch: {
        name: 'catch',
        description: 'Attempts to catch a pokemon.',
        callback: commandCatch
      },
      inspect: {
        name: 'inspect',
        description: 'Displays information about a caught pokemon.',
        callback: commandInspect
      },
      pokedex: {
        name: 'pokedex',
        description: 'Displays the names of all caught pokemon.',
        callback: commandPokedex
      }
    }
  }
}
