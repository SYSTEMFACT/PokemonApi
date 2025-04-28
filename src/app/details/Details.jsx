import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from 'axios'

function Details() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => {
          setPokemon(res.data)
          setError(null)
        })
        .catch((err) => {
          console.error(err)
          setError('No se pudo cargar el Pokémon.')
        })
    }
  }, [name])

  const handleClick = () => {
		navigate('/pokedex');
	};

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!pokemon) {
    return <div className="text-center">Cargando...</div>
  }

  const stats = pokemon.stats
  const abilities = pokemon.abilities.map(abi => abi.ability.name)
  const types = pokemon.types.map(type => type.type.name)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button 
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700 mb-6"
        onClick={handleClick}>
				  Atrás
			</button>   

      {/* Imagen */}
      <div className={`w-full h-60 flex items-center justify-center type-bg--${pokemon.types?.[0]?.type?.name} mb-6`}>
        <img
          className="w-60 h-60 object-contain"
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.   name}
        />
      </div>

      {/* Info General */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-xl">#{pokemon.id}</p>
        <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
      
        <section className="max-w-5xl mx-auto px-4 py-8">
          {/* Peso y altura */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-gray-500">Peso</p>
              <p className="font-semibold">{pokemon.weight / 10} kg</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Altura</p>
              <p className="font-semibold">{pokemon.height / 10} m</p>
            </div>
          </div>

          {/* Tipo y habilidades */}  
          <div className="grid grid-cols-2 gap-8 items-start">

            {/* Tipos */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Tipo</h3>
              <div className="flex flex-wrap justify-center gap-2 ">
                {pokemon.types?.map((typeObj) => (
                  <span 
                    key={typeObj.type.name}
                    className={`px-4 py-1 rounded-md text-white capitalize type-bg--${typeObj.type.name}`}>
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Habilidades */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Habilidades</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {pokemon.abilities?.map((abilityObj) => (
                  <span 
                    key={abilityObj.ability.name} 
                    className="px-4 py-1 rounded-md text-gray-700 border capitalize">
                    {abilityObj.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
        
      {/* Stats */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Stats</h3>
        <div className="space-y-4">
          {stats.map((statItem, idx) => (
            <div key={idx}>
              <p className="text-gray-700 capitalize">{statItem.stat.name}: {statItem.base_stat}/150</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`type-bg--${pokemon.types?.[0]?.type?.name} h-4 rounded-full`}
                  style={{ width: `${(statItem.base_stat / 150) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-3xl font-extrabold mb-10 text-center text-gray-800">Movimientos por Nivel</h3>

        <div className="space-y-8">
          {(() => {
            const movesByLevel = {};

            pokemon.moves
              .filter(move => move.version_group_details.some(detail => detail.move_learn_method.name === 'level-up'))
              .forEach(move => {
                const levelDetail = move.version_group_details.find(detail => detail.move_learn_method.name === 'level-up');
                const level = levelDetail.level_learned_at;
                if (!movesByLevel[level]) {
                  movesByLevel[level] = [];
                }
                movesByLevel[level].push(move.move.name);
              });

            const sortedLevels = Object.keys(movesByLevel)
              .map(level => parseInt(level))
              .sort((a, b) => a - b);

            return (
              <>
                {sortedLevels.map(level => (
                  <div key={level} className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Nivel {level === 0 ? 'Inicial' : level}
                      </div>
                      <div className="h-px flex-grow bg-gray-300"></div>
                    </div>

                    {/* Contenedor de Movimientos en Grid con 2 columnas */}
                    <div className="grid grid-cols-2 gap-3">
                      {movesByLevel[level].map(moveName => (
                        <span
                          key={moveName}
                          className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium capitalize hover:bg-blue-200 transition"
                        >
                          {moveName}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            );
          })()}
        </div>
      </div>

    </div>
  )
}

export default Details