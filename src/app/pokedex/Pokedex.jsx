import { useEffect, useState } from "react"
import axios from "axios"
import { useName } from "../../contexts/NameContext"
import PokemonsList from "./components/PokemonsList"
import PokemonCard from "./components/PokemonCard"
import { useNavigate } from "react-router"

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

function Pokedex () {
    const [state] = useName()
    const [allPokemons, setAllPokemons] = useState([])
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [types, setTypes] = useState([])
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('all')
    const [singlePokemon, setSinglePokemon] = useState(null)

    const navigate = useNavigate()

    //Función para cargar los primeros 150 pokemones
    const getPokemons = async () => {
      try {
        const response = await axios.get(`${baseUrl}?limit=100000&offset=0`)
        setAllPokemons(response.data.results)
        setFilteredPokemons(response.data.results)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      getPokemons()
    }, [])
    
    useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/type?limit=21')
      .then(response => {
        setTypes(response.data.results)
      })
      .catch(error => console.error(error))
    }, [])

    const handleClick = () => {
      navigate('/');
    };

      // Aplicar filtros de tipo y nombre
  useEffect(() => {
    const applyFilters = async () => {
      let filtered = allPokemons

      // Filtrar por tipo
      if (selectedType !== 'all') {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`)
          const typePokemonNames = response.data.pokemon.map(p => p.pokemon.name)
          filtered = filtered.filter(p => typePokemonNames.includes(p.name))
        } catch (error) {
          console.error(error)
        }
      }

      // Filtrar por nombre
      if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      }

      setFilteredPokemons(filtered)
      setSinglePokemon(null)
    };

    applyFilters();
  }, [selectedType, search, allPokemons])

  const searchPokemon = () => {
    if (!search) {
      setFilteredPokemons(allPokemons)
      setSinglePokemon(null);
      return;
    }

    axios.get(`${baseUrl}/${search.toLowerCase()}`)
      .then(response => {
        setSinglePokemon(`${baseUrl}/${response.data.name}`)
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <button 
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700 mb-6"
          onClick={handleClick}>
            Inicio
          </button>  
          <h2 className="m-9"><span className="text-red-500 font-semibold">Bienvenido {state.name}</span>, aquí podrás encontrar tu pokemón favorito</h2>

          {/* Aquí va el buscador del filtro */}
          <div className="m-9">
            <input 
              type="text" 
              placeholder="buscar pokemón..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
            <button className="btn" onClick={searchPokemon}>
              Buscar
            </button>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input ml-4"
            >
              <option value="all">All Pokemon</option>
              {types.map(type => (
                <option key={type.name} value={type.name} className="capitalize">
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {singlePokemon ? (
          <PokemonCard url={singlePokemon} />
        ):(
          <PokemonsList pokemons={filteredPokemons} />
        )}
      </div>
     </div>
  )
}
export default Pokedex