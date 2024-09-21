import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export type PokemonCardProps = {
  pokemon: {
    id: string;
    name: string;
    image: string;
    type: string;
  }
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card className="w-60 h-[21rem] relative overflow-hidden border-none shadow-none transition-all hover:scale-105 rounded-xl hover:drop-shadow-xl">
      {/* TODO: Just a sample placeholder for now, will replace with actual pokemon placeholder image based on the pokemon's type later */}
      <Image
        src="https://www.nicepng.com/png/detail/241-2416628_tcg-blanks-neo-jumbo-pokemon-trading-card-blank.png"
        alt="Pokemon card background"
        fill
        sizes="100%"
        priority
        className="object-cover scale-[1.08]"
      />
      <CardContent className="p-4 relative z-10 h-full flex flex-col justify-between">
        <div className="text-left">
          <span className="font-bold px-2">#{pokemon.id}</span>
        </div>
        <div className="flex justify-center items-start h-48">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={100}
            height={100}
            sizes="100%"
            priority
            className="object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-sm font-bold tracking-wide capitalize mb-1">{pokemon.name}</h2>
          {/* <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-${pokemon.type.toLowerCase()}`}>
            {pokemon.type}
          </span> */}
        </div>
      </CardContent>
    </Card>
  )
}