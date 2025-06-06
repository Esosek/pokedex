import { initState } from './state.js'

export function startREPL() {
  const state = initState()
  const { readline, commands } = state

  readline.prompt()
  readline.on('line', async (input) => {
    const cleanIn = cleanInput(input)
    if (!cleanIn.length) {
      readline.prompt()
    } else {
      const cmndIndex = Object.keys(commands).findIndex((c) => c === cleanIn[0])
      if (cmndIndex === -1) {
        console.log('Unknown command')
      } else {
        try {
          await commands[cleanIn[0]].callback(state)
        } catch (error) {
          console.log(error)
        }
      }
      readline.prompt()
    }
  })
}

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/)
}
