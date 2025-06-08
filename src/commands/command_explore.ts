import { State } from '../state'

export async function commandExplore(state: State, locationName: string) {
  console.log(`Exploring ${locationName}...`)
  try {
    const { name, pokemon } = await state.pokeAPI.fetchLocation(locationName)
    console.log('Found Pokemon:')
    pokemon.forEach((p) => console.log(`- ${p}`))
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log('An unexpected error occurred')
    }
  }
}
