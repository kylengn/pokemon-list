import { PokemonClient } from "pokenode-ts"

const api = new PokemonClient()

export const getPokemon = async (page: number, types: string[]) => {
  const limit = 20
  const offset = (page - 1) * limit

  try {
    let pokemonList = []
    let totalCount = 0

    if (types.length > 0) {
      const typePromises = types.map(type =>
        api.getTypeByName(type.toLowerCase())
      )
      const typeData = await Promise.all(typePromises)
      const pokemonSets = typeData.map(
        data => new Set(data.pokemon.map(p => p.pokemon.name))
      )
      const intersectedPokemon = Array.from(
        pokemonSets.reduce((a, b) => new Set([...a].filter(x => b.has(x))))
      )
      totalCount = intersectedPokemon.length
      pokemonList = intersectedPokemon.slice(offset, offset + limit)
    } else {
      const allPokemon = await api.listPokemons(0, 1000)
      totalCount = allPokemon.count
      pokemonList = allPokemon.results.slice(offset, offset + limit)
    }

    const pokemonDetails = await Promise.all(
      pokemonList.map(async p => {
        const details = await api.getPokemonByName(
          typeof p === "string" ? p : p.name
        )
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          type: details.types[0].type.name,
        }
      })
    )

    return {
      pokemon: pokemonDetails,
      totalPages: Math.ceil(totalCount / limit),
    }
  } catch (error) {
    console.error("Error fetching Pokemon:", error)
    throw error
  }
}
