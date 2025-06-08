import { State } from '../state'

export async function commandPokedex(state: State) {
  const pokemonNames = Object.keys(state.pokedex)
  if (pokemonNames.length) {
    console.log('Your Pokedex:')
    pokemonNames.forEach((name) => {
      console.log(`- ${name}`)
    })
  } else
    console.log(
      'Your pokedex is empty. Try using the /catch [pokemon] command to catch a pokemon.'
    )
}
