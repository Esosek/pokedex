import type { State } from './state.js'

export function commandHelp(state: State) {
  console.log('Welcome to the Pokedex!')
  console.log('Usage: \n')

  Object.values(state.commands).forEach((cmd) => {
    console.log(`${cmd.name}: ${cmd.description}`)
  })
}
