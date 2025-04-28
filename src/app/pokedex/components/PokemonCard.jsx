import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

function PokemonCard( { url }) {
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setPokemon(response.data)
            })
            .catch(error => console.error(error))
    }, [url])

    if (!pokemon.types) return null

  return (
    <Link 
      to={`/pokedex/${pokemon.name}`} 
      className={`block border-8 type-border--${pokemon.types?.[0].type.name}`}
    >
      <div className='aspect-video'>
        <img 
          className={`size-full object-contain type-bg--${pokemon.types?.[0].type.name}`}
          src={pokemon.sprites?.other?.['official-artwork']?.front_default} 
          alt={pokemon.name} />
      </div>
      <div className='p-4 text-center'>
        <h2 className='capitalize text-2xl font-semibold'>{pokemon.name}</h2>
        <p className='capitalize'>{pokemon.types.map(p => p.type.name).join(' / ')}</p>
        <span className='text-gray-400 text-sm'>Tipo </span>
        <ul className='border-t-1 border-gray-200 mt-4 pt-4 grid grid-cols-2 gap-4'>
          <li className='text-gray-400 text-sm'>
            HP
            <span className='block text-black text-base'>{pokemon.stats[0].base_stat}</span>
          </li>
          <li className='text-gray-400 text-sm'>
            ATAQUE
            <span className='block text-black text-base'>{pokemon.stats[1].base_stat}</span>
          </li>
          <li className='text-gray-400 text-sm'>
            DEFENSA
            <span className='block text-black text-base'>{pokemon.stats[2].base_stat}</span>
          </li>
          <li className='text-gray-400 text-sm'>
            VELOCIDAD
            <span className='block text-black text-base'>{pokemon.stats[5].base_stat}</span>
          </li>
        </ul>
      </div>
      
      
    </Link>
  )
}
export default PokemonCard
