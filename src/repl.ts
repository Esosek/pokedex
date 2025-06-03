import { initState } from './state.js'

export function startREPL() {
  const { readline, commands } = initState()
  readline.prompt()
  readline.on('line', (input) => {
    const cleanIn = cleanInput(input)
    if (!cleanIn.length) {
      readline.prompt()
    } else {
      const cmndIndex = Object.keys(commands).findIndex((c) => c === cleanIn[0])
      if (cmndIndex === -1) {
        console.log('Unknown command')
      } else {
        try {
          commands[cleanIn[0]].callback({ readline, commands })
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
