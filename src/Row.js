import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    // useEffect(() => {
    //     async function fetchData() {
    //         const request = await axios.get(fetchUrl)
    //         console.log(request)
    //     }
    //     fetchData();
    // }, [])
    const baseURL = "https://api.themoviedb.org/3";
    const base_url = "https://image.tmdb.org/t/p/original/";
    useEffect(() => {
        const fetchMethod = () => {
            fetch(`${baseURL}${fetchUrl}`)
                .then(res => res.json())
                .then(data => {
                    setMovies(data.results)
                    // console.log(data.results)
                })

        }
        fetchMethod()
    }, [fetchUrl])

    const opt ={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        },
    }

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
            .then((url) =>{
                const useParams =new URLSearchParams(new URL(url).search);
                console.log(useParams,"##########")
                setTrailerUrl(useParams.get("v")) 
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className='row'>
            <h2 className= 'row_title'>{title}</h2>
            <div className= 'row_poster'>
                {
                    movies.map((movie) => {
                        return (
                            <img
                                key={movie.id}
                                onClick = {() => handleClick(movie)}
                                className={`movie_poster ${isLargeRow && "isLargePoster"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />

                        )
                    })
                }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opt}  /> }
           
        </div>


    )
}

export default Row