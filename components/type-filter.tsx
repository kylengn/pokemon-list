'use client'

import { Button } from '@/components/ui/button'

const types = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground',
  'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
]

type TypeFilterProps = {
  selectedTypes: string[];
  onTypeChange: (type: string) => void;
}

export const TypeFilter = ({ selectedTypes, onTypeChange }: TypeFilterProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg md:text-2xl font-semibold mb-4">Filter by Types</h2>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <Button
            key={type}
            onClick={() => onTypeChange(type)}
            variant={selectedTypes.includes(type) ? 'default' : 'outline'}
            size="sm"
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  )
}