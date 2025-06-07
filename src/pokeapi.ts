import { Cache } from './pokecache.js'

export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2'
  #cache: Cache
  constructor() {
    this.#cache = new Cache(1000 * 60)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullUrl = `${PokeAPI.baseURL}/location-area${pageURL ?? ''}`

    const cached = this.#cache.get<ShallowLocations>(fullUrl)
    if (cached) {
      return cached
    }

    try {
      const res = await fetch(fullUrl)
      const body = await res.json()
      this.#cache.add(fullUrl, body.results as ShallowLocations)
      return (body.results as ShallowLocations) ?? []
    } catch (error) {
      throw new Error(
        'You realized there is no map in your pocket. Pray to Pokegod and try again later...'
      )
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullUrl = `${PokeAPI.baseURL}/location-area/${locationName}`
    const cached = this.#cache.get<Location>(fullUrl)
    if (cached) {
      return cached
    }

    try {
      const res = await fetch(fullUrl)
      const body = await res.json()
      const result = {
        name: body.name,
        pokemon: body.pokemon_encounters.map((enc: any) => enc.pokemon.name)
      } as Location
      this.#cache.add(fullUrl, result)
      return result
    } catch (error) {
      throw new Error(
        `You failed while exploring ${locationName}. Maybe it doesn't exist?`
      )
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon | undefined> {
    const fullUrl = `${PokeAPI.baseURL}/pokemon/${pokemonName}`

    try {
      const res = await fetch(fullUrl)
      if (!res.ok) {
        return undefined
      }
      const body = await res.json()
      return {
        name: body.name,
        base_experience: body.base_experience
      } as Pokemon
    } catch (error) {
      throw new Error(
        'You have failed to catch the Pokemon due to unexpected circumstances... Try again later...'
      )
    }
  }
}

export type ShallowLocations = {
  name: string
  url: string
}[]

export type Location = {
  name: string
  pokemon: string[]
}

export type Pokemon = {
  name: string
  base_experience: number
}
