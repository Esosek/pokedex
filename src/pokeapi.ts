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
      return body.results as ShallowLocations ?? []
    } catch (error) {
      throw new Error(
        'You realized there is no map in your pocket. Pray to Pokegod and try again later...'
      )
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
    return { message: 'Not implemented' }
  }
}

export type ShallowLocations = {
  name: string
  url: string
}[]

export type Location = {
  // TODO: update the properties
  [key: string]: any
}
