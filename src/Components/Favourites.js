import React, { Component } from 'react';
import { movies } from './getMovies.js';

class Favourites extends Component {

    constructor(){
        super();
        // we want to show genres for all current movies, also page should re-render when this list changes so make it state variable
        this.state={
            genresList:[],
            // currently active genre, movies to be changed depending on this so make it state variable
            activeGenre:"All Genres"
        }
    }

    render() {

        let moviesArr = movies.results;
        console.log(moviesArr);

        // creats
        let genreIdsMap = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let tempArr=[]
        moviesArr.map((movieObj) => {
            if(tempArr.includes(genreIdsMap[movieObj.genre_ids[0]])==false){
                tempArr.push(genreIdsMap[movieObj.genre_ids[0]]);
            }
        })

        tempArr.unshift("All Genres");

        console.log("tempArr:",tempArr);

        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3">
                            <ul className="list-group genres-list">
                                {
                                    tempArr.map((item)=>(
                                        this.state.activeGenre==item ? <li className="list-group-item active"> {item} </li>
                                        : <li className="list-group-item"> {item} </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="col-9 favourites-table">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder='Search'/>
                                <input type="number" className="input-group-text col" placeholder='Rows Count'/>
                            </div>

                            <div class="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col"> Title </th>
                                            <th scope="col"> Genre </th>
                                            <th scope="col"> Popularity </th>
                                            <th scope="col"> Rating </th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            moviesArr.map((movieObj) => (
                                                <tr>
                                                    <td> <img src={`https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`} style={{width : "5rem",}} /></td> 
                                                    <td> { movieObj.original_title } </td>
                                                    <td> { genreIdsMap[movieObj.genre_ids[0]] } </td>
                                                    <td> { movieObj.popularity } </td>
                                                    <td> { movieObj.vote_average } </td>
                                                    <td> <button type="button" class="btn btn-danger"> Delete </button> </td>
                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Favourites;