import { useState } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

function PokemonsList({ pokemons }) {
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (event) => {
    setPokemonsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Selector para elegir cuántos Pokémon mostrar por página */}
      <div className="text-center mb-4">
        <label htmlFor="pokemonsPerPage" className="mr-2">
          Pokémon por página:
        </label>
        <select
          id="pokemonsPerPage"
          value={pokemonsPerPage}
          onChange={handlePerPageChange}
          className="border p-2 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
        </select>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
        {currentPokemons.map(pokemon => (
          <PokemonCard key={pokemon.name} url={pokemon.url} />
        ))}
        {currentPokemons.length === 0 && <p>No hay Pokémon...</p>}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PokemonsList;