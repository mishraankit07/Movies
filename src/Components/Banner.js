import React, { Component } from 'react'
import { movies } from './getMovies'

class Banner extends Component {
    render() {
        let moviesArr = movies.results;
        let movie=moviesArr[0];
        // the tags need to be closed in react so img tag needs to be made self closing
        return (
            <>
                {
                    // since we will fetch data of movies from an API so will not get it instantaneoulsy
                    // so untill we get the data till then show the loading animation
                    moviesArr == "" ?  
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div className="card banner-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className="card-img-top banner-img" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title banner-title">{movie.original_title} </h5>
                            <p className="card-text banner-text"> {movie.overview} </p>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default Banner;