/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { getPokemon } from '@/lib/pokemon'
import { TypeFilter } from './type-filter'
import { Loader2 } from 'lucide-react'
import { PokemonCard, PokemonCardProps } from './pokemon-card'

export const PokemonList = () => {
  const [pokemon, setPokemon] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchPokemon = useCallback(async () => {
    setIsFetching(true)
    try {
      const { pokemon: fetchedPokemon, totalPages: fetchedTotalPages } = await getPokemon(page, selectedTypes)
      setPokemon(fetchedPokemon as any)
      setTotalPages(fetchedTotalPages)
    } catch (error) {
      console.error("Error fetching Pokemon:", error)
    } finally {
      setIsFetching(false)
    }
  }, [page, selectedTypes])

  useEffect(() => {
    fetchPokemon()
  }, [fetchPokemon])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
    setPage(1)
  }

  return (
    <div>
      <TypeFilter selectedTypes={selectedTypes} onTypeChange={handleTypeChange} />
      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : pokemon.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold">No pokemon found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 justify-items-center">
          {pokemon.map((pokemon: PokemonCardProps['pokemon']) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
      <div className="flex justify-center space-x-2">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}