import { useState, useEffect } from "react";
import axios from "axios";

function usePagination(url, pokemonsPerPage) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);

  useEffect(() => {
    const offset = (currentPage - 1) * pokemonsPerPage;

    setLoading(true);
    setError(null);

    axios
      .get(`${url}?offset=${offset}&limit=${pokemonsPerPage}`)
      .then((response) => {
        setPokemons(response.data.results);
        setTotalPokemons(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        setError("No se pudo cargar los Pokémon.");
        setLoading(false);
      });
  }, [currentPage, pokemonsPerPage, url]);

  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  return {
    pokemons,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}

export default usePagination;