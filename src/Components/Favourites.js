import React, { Component } from 'react';
import { movies } from './getMovies.js';
import Info from './Info.js';

let genreIdsMap = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
};

class Favourites extends Component {

    constructor(){
        super();
        // we want to show genres for all current movies, also page should re-render when this list changes so make it state variable
        this.state={
            genresList:[],
            // currently active genre, movies to be changed depending on this so make it state variable
            activeGenre:"All Genres",
            movies:[],
            searchText: ''
        }
    }

    componentDidMount(){
        // doing the fetching work here so that UI dosen't get laggy
        let moviesArr=JSON.parse(localStorage.getItem("favMovies") || "[]");
        let tempArr=[]
        moviesArr.map((movieObj) => {
            if(tempArr.includes(genreIdsMap[movieObj.genre_ids[0]])==false){
                tempArr.push(genreIdsMap[movieObj.genre_ids[0]]);
            }
        })

        tempArr.unshift("All Genres");

        this.setState({
            genresList: [...tempArr],
            movies:[...moviesArr]
        })
    }

    handleActiveGenre=(genre)=>{
        this.setState({
            activeGenre: genre
        })
    }

    render() {

        // depending on the active genre, we need to show movies of that genre only
        let filteredMovies=[]

        // no need to filter, all movies are to be shown
        if(this.state.activeGenre=="All Genres"){
            filteredMovies=[...this.state.movies]
        }

        else{
            filteredMovies=this.state.movies.filter((movieObj)=>{
                return (genreIdsMap[movieObj.genre_ids[0]]==this.state.activeGenre);
            })
        }

        if(this.state.searchText!=''){
            filteredMovies=filteredMovies.filter((movieObj)=>{
                let movieTitle=movieObj.title.toLowerCase();
                return (movieTitle.includes(this.state.searchText.toLowerCase()));
            })
        }

        console.log("Filtered Movies:",filteredMovies);

        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3">
                            <ul className="list-group genres-list">
                                {
                                    this.state.genresList.map((item)=>(
                                        this.state.activeGenre==item ? <li className="list-group-item active" onClick={()=>this.handleActiveGenre(item)}> {item} </li>
                                        : <li className="list-group-item" onClick={()=>this.handleActiveGenre(item)}> {item} </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="col-9 favourites-table">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder='Search' 
                                onChange={(e)=>{
                                this.setState({searchText: e.target.value})}}/>

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
                                            filteredMovies.map((movieObj) => (
                                                <tr>
                                                    <td> <img src={`https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`} style={{width : "5rem",}} /></td> 
                                                    <td> { movieObj.title } </td>
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