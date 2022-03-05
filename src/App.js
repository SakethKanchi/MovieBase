import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=26496d83'
const App = () =>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const searchMovies = async (title) => {
        axios.get(`${API_URL}&s=${title}`)
        .then((response) =>{
            const data = response.data;
            setMovies(data.Search);
        })
    }
    useEffect (() =>{
        searchMovies('batman');
    }, []);

    return(
        <div className="app">
            <h1>MovieBase</h1>
            <div className="search">
                <input
                    placeholder="Search for a movie"
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                />
                <img
                src = {SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0  //If movies length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                           <MovieCard movie = {movie} />
                        ))}
                    </div>
                ) :( // If there are no movies
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                ) 
            }
            
        </div>
    );
}

export default App;
