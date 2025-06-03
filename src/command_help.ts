import type { CLICommand } from './command'

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log('Welcome to the Pokedex!')
  console.log('Usage: \n')

  Object.values(commands).forEach((cmd) => {
    console.log(`${cmd.name}: ${cmd.description}`)
  })
}
