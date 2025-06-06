export class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2'
  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullUrl = `${PokeAPI.baseURL}/location-area${pageURL ?? ''}`

    try {
      const res = await fetch(fullUrl)
      const body = await res.json()
      return body.results ?? []
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
