import React, { Component } from 'react'
import { movies } from './getMovies'

class Info extends Component {

    render() {

        console.log("id of the movie clicked:",this.props.id);
        let movie = movies.results[1];

        // creats
        let genreIdsMap = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        return (
            <div>
                <div style={{ display: "flex", gap: "5em"}}>
                    <h1> {movie.title} </h1>
                    <h4 style={{marginTop: "0.8rem"}}> Rating {movie.vote_average}/10</h4>

                </div>
                <div className="movie-images">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
                </div>

                <div className="genres-list">
                    {
                        movie.genre_ids.map((genreId) => (
                            <div> {genreIdsMap[genreId]} </div>
                        ))
                    }
                </div>

                <h4> About </h4>
                <div> {movie.overview}</div>
            </div>
        )
    }
}

export default Info;
