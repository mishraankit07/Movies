import React, { Component } from 'react'
const axios = require("axios");

// e7d54b67cd1e1b19df17e759463fd34b

class MoviesList extends Component {

    constructor() {
        super();
        this.state = {
            hover: '',
            pagesArr: [1],
            currPage: 1,
            movies: [], // we need movies as a state as well bcoz for different pages movies list are
            // different so need to render everytime this list changes,
            // if a movie is marked favourite, then also UI needs to change, so storing it 
            // as state variable
            favMoviesId:[]
        }
    }

    handleBtnShow = (cardId) => {
        this.setState({
            hover: cardId
        })
    }

    handleBtnOff = () => {
        this.setState({
            hover: ''
        })
    }

    componentDidMount = async () => {
        console.log("Component Did Mount Called!");
        console.log("Before making request!");
        let res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=e7d54b67cd1e1b19df17e759463fd34b&language=en-US&page=${this.state.currPage}`);
        let moviesArr=res.data.results
        //console.log("Result",res);
        //console.log("After making request!");
        
        let favouritesArr=JSON.parse(localStorage.getItem("favMovies") || "[]");
        let favMoviesId=[]
        if(favouritesArr.length!=0){
            favouritesArr.map((movieObj)=>{
                favMoviesId.push(movieObj.id);
            })
        }

        console.log("favMoviesId:",favMoviesId);

        //console.log("movies:",moviesArr);
        this.setState({
            movies: [...moviesArr],
            favMovies: [...favMoviesId]
        });
    }

    componentDidUpdate = () => {
        //console.log("Component Getting Updated!");
    }

    componentWillUnmount = () => {
        //console.log("Component Getting Unmounted!");
    }

    nextPage=()=>{

        let newPagesArr=[]
        if(this.state.currPage==this.state.pagesArr.length){
            for(let i=1;i<=this.state.pagesArr.length+1;i++){
                newPagesArr.push(i);
            }
        }

        else{
            newPagesArr=[...this.state.pagesArr];
        }

        this.setState({
            pagesArr: [...newPagesArr],
            currPage: this.state.currPage+1
        },this.loadMovies)

        // after changing the pages available, load data for the next page active 
        // but this will not work properly, because this.setState is an async function
        // so if we need to do task after setState then need to add it as callback
    }

    prevPage=()=>{
        if(this.state.currPage==1){
            return;
        }

        this.setState({
            currPage: this.state.currPage-1
        },this.loadMovies)
    }

    // on page change, makes an api request and loads content for that page
    loadMovies=async()=>{
        let res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=e7d54b67cd1e1b19df17e759463fd34b&language=en-US&page=${this.state.currPage}`);
        let moviesArr=res.data.results
        this.setState({
            movies: [...moviesArr]
        })
    }

    handlePageClick=(page)=>{
        this.setState({
            currPage : page
        },this.loadMovies)
    }

    handleInfo=(movieObj)=>{
        //console.log("Title Clicked!");
        //localStorage.setItem("ShowData",JSON.stringify(movieObj));
        //<Link to="/info" />
    }

    handleFavourites=(movieObj)=>{
        
        let prevMovies=JSON.parse(localStorage.getItem("favMovies") || "[]");// [...this.state.favMovies]
        
        // current movie was previously marked favourite,so remove it
        if(this.state.favMoviesId.includes(movieObj.id)){
            // filter the movies and remove current movie
            prevMovies=prevMovies.filter((movie)=>{
                return movie.id!=movieObj.id;
            })
        }

        else{
            prevMovies.push(movieObj);
        }

        localStorage.setItem("favMovies",JSON.stringify(prevMovies));
        let favIds=[];
        prevMovies.map((movie)=>{
            favIds.push(movie.id);    
        })

        this.setState({
            favMoviesId:favIds
        });
    }

    render() {
        console.log("render called!");
        // for writing JS within the return write within {}
        return (
            <>
                {
                    // since we will fetch data of movies from an API so will not get it instantaneoulsy
                    // so untill we get the data till then show the loading animation
                    this.state.movies.length == 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden" > Loading... </span>
                        </div> :
                        <div>
                            <h3 class="text-center"> Trending </h3>
                            <div class="movies-list"> {
                                this.state.movies.map((movieObj) => (

                                    <div className="card movie-card" onMouseEnter={() => this.handleBtnShow(movieObj.id)} onMouseLeave={() => this.handleBtnOff()}>
                                        <img src={`https://image.tmdb.org/t/p/w500${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title movie-title" onClick={()=>this.handleInfo(movieObj)}> {movieObj.title} </h5>
                                            <div className="btn-cont favourites-btn-cont">
                                                {
                                                    this.state.hover == movieObj.id && <a className="btn btn-primary" onClick={()=>this.handleFavourites(movieObj)}> {this.state.favMoviesId.includes(movieObj.id)==true ? "Remove From Favourites" : "Add To Favourites"} </a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>

                            <div className="page-navigation">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.prevPage}>Previous</a></li>
                                        {
                                            this.state.pagesArr.map((value) => (
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageClick(value)}> {value} </a></li>
                                            ))
                                        }

                                        <li class="page-item"><a className="page-link" onClick={this.nextPage}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }

            </>
        )
    }
}

export default MoviesList;