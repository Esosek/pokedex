import { State } from '../state'
import { Pokemon } from '../pokeapi'

// Chance of catching a pokemon
const EXPERIENCE_THRESHOLD = 50

export async function commandCatch(state: State, pokemonName: string) {
  console.log(`Throwing a Pokeball at ${pokemonName}...`)
  try {
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName)
    if (pokemon && resolveCatch(pokemon)) {
      console.log(`${pokemon.name} was caught!`)
      console.log('You may now inspect it with the inspect command.')
      state.pokedex[pokemon.name] = pokemon
    } else {
      console.log(`${pokemonName} escaped!`)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

function resolveCatch(pokemon: Pokemon) {
  return Math.random() * pokemon.base_experience < EXPERIENCE_THRESHOLD
}
