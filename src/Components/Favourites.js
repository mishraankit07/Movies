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
            searchText: '',
            // default value 5
            moviesPerPage: 5,
            currPage: 1
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

    sortPopularity=(order)=>{
        
        let moviesList=[...this.state.movies];
        if(order=="asc"){
            moviesList.sort(function(objA,objB){
                return (objA.popularity - objB.popularity);
            });
        }

        else{
            moviesList.sort(function(objA,objB){
                return (objB.popularity - objA.popularity);
            });
        }

        this.setState({
            movies: [...moviesList]
        })
    }

    handlePageChange=(page)=>{
        this.setState({
            currPage: page
        })
    }

    sortRating=(order)=>{
        let moviesList=[...this.state.movies];
        if(order=="asc"){
            moviesList.sort(function(objA,objB){
                return (objA.vote_average - objB.vote_average);
            });
        }

        else{
            moviesList.sort(function(objA,objB){
                return (objB.vote_average - objA.vote_average);
            });
        }

        this.setState({
            movies: [...moviesList]
        });
    }

    handleMovieSearch(text){
        this.setState({
            searchText: text
        });
    }

    handleRowCount(value){
        this.setState({
            moviesPerPage: value
        });
    }

    handleDelete=(id)=>{
        let filterArr=[];

        filterArr=this.state.movies.filter((movieObj)=>{
            return (movieObj.id!=id);
        })

        this.setState({
            movies:[...filterArr]
        })

        localStorage.setItem("favMovies",JSON.stringify(filterArr));
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

        // we need to display movies as per the limit given to us by user
        // i.e user tells the number of movies per page

        let numPages=Math.ceil(filteredMovies.length/this.state.moviesPerPage);
        let pagesArr=[];

        for(let i=1;i<=numPages;i++){
            pagesArr.push(i);
        }

        let startMovieIdx=(this.state.currPage-1)*this.state.moviesPerPage;
        let aheadEndMovieIdx=startMovieIdx+this.state.moviesPerPage;

        filteredMovies=filteredMovies.slice(startMovieIdx,aheadEndMovieIdx);

        console.log("currPage:",this.state.currPage);
        console.log("start:",startMovieIdx," end:",aheadEndMovieIdx);
        console.log("movies for this page:",filteredMovies);

        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <ul className="list-group genres-list">
                                {
                                    this.state.genresList.map((item)=>(
                                        this.state.activeGenre==item ? <li className="list-group-item active" onClick={()=>this.handleActiveGenre(item)}> {item} </li>
                                        : <li className="list-group-item" onClick={()=>this.handleActiveGenre(item)}> {item} </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="col-lg-9 favourites-table col-sm-12">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder='Search' 
                                value={this.state.searchText} onChange={(e)=>{this.handleMovieSearch(e.target.value)}}/>

                                <input type="number" className="input-group-text col" placeholder='Rows Count Default 5'
                                value={this.state.moviesPerPage} onChange={(e)=>{this.handleRowCount(e.target.value)}} />
                            </div>

                            <div class="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col"> Title </th>
                                            <th scope="col"> Genre </th>
                                            <th scope="col"><i class="fas fa-sort-up" onClick={()=>this.sortPopularity("desc")}/> Popularity <i class="fas fa-sort-down" onClick={()=>this.sortPopularity("asc")}/></th>
                                            <th scope="col"><i class="fas fa-sort-up" onClick={()=>this.sortRating("desc")}/> Rating <i class="fas fa-sort-down" onClick={()=>this.sortRating("asc")}/></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredMovies.map((movieObj) => (
                                                <tr>
                                                    <td> <img src={`https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`} style={{width : "5rem"}} /></td> 
                                                    <td> { movieObj.title } </td>
                                                    <td> { genreIdsMap[movieObj.genre_ids[0]] } </td>
                                                    <td> { movieObj.popularity } </td>
                                                    <td> { movieObj.vote_average } </td>
                                                    <td> <button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}> Delete </button> </td>
                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {
                                        pagesArr.map((page)=>(
                                            <li class="page-item" 
                                                onClick={()=>{this.handlePageChange(page)}}><a class="page-link">{page}</a></li>        
                                        ))
                                    }
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