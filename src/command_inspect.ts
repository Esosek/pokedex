import { State } from './state'

export async function commandInspect(state: State, pokemonName: string) {
  const pokemon = state.pokedex[pokemonName]
  if (pokemon) {
    console.log('Name: ' + pokemon.name)
    console.log('Height: ' + pokemon.height)
    console.log('Weight: ' + pokemon.weight)

    console.log('Stats:')
    for (const [key, value] of Object.entries(pokemon.stats)) {
      console.log(` -${key}: ${value}`)
    }

    console.log('Types:')
    for (const type of pokemon.types) {
      console.log(` -${type}`)
    }
  } else {
    console.log('you have not caught that pokemon')
  }
}
