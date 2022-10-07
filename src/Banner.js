import React, { useEffect, useState } from 'react';
import requests from './Requests';
import "./Banner.css"

function Banner() {
    const baseURL = "https://api.themoviedb.org/3";
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch(`${baseURL}${requests.fetchNetflixOriginals}`)
                .then(res => res.json())
                .then(data => setMovie(data.results[
                    Math.floor(Math.random() * (data.results.length - 1))
                ]))
        }
        fetchData();
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
                backgroundPosition: "center center"
            }}
        >
            <div className='banner_content'>
                <h1 className='banner_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <div className=" banner_descriptions">
                    <h2>{truncate(movie?.overview, 150)}</h2>
                </div>

            </div>
            <div className=" banner_fadeBottom"></div>

        </div>
    )
}

export default Banner