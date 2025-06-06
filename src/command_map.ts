import { State } from './state'

let mapCalledCount = 0

export async function commandMap(state: State) {
  try {
    const locations = await state.pokeAPI.fetchLocations(
      mapCalledCount === 0 ? undefined : state.nextLocationsURL
    )
    Object.values(locations).forEach((loc) => {
      console.log(loc.name)
    })
    mapCalledCount++
    state.prevLocationsURL =
      mapCalledCount > 2 ? `?offset=${(mapCalledCount - 2) * 20}` : ''
    state.nextLocationsURL = `?offset=${mapCalledCount * 20}`
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log(error)
    }
  }
}

export async function commandMapb(state: State) {
  if (mapCalledCount <= 1) {
    console.log("you're on the first page")
  } else {
    try {
      const locations = await state.pokeAPI.fetchLocations(
        state.prevLocationsURL
      )
      Object.values(locations).forEach((loc) => {
        console.log(loc.name)
      })
      mapCalledCount--
      state.prevLocationsURL = `?offset=${(mapCalledCount - 2) * 20}`
      state.nextLocationsURL = `?offset=${mapCalledCount * 20}`
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    }
  }
}
