'use client'

import { PokemonList } from "./pokemon-list";

export const AppPage = () => {
  return (
    <main className="container max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pokémon List</h1>
      <PokemonList />
    </main>
  )
}