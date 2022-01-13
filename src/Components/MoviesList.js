import React, { Component } from 'react'
import { movies } from './getMovies';

class MoviesList extends Component {

    constructor(){
        super();
        this.state={
            hover : ''
        }
    }

    handleBtnShow=(cardId)=>{
        this.setState({
            hover : cardId
        })
    }

    handleBtnOff=()=>{
        this.setState({
            hover : '' 
        })
    }

    render() {
        let moviesArr = movies.result;
        // for writing JS within the return write within {}
        return ( 
        <> 
            {
                // since we will fetch data of movies from an API so will not get it instantaneoulsy
                // so untill we get the data till then show the loading animation
                moviesArr.length == 0 ?
                <div className = "spinner-border text-primary" role = "status">
                    <span className = "visually-hidden" > Loading... </span> 
                </div> :
                <div>
                    <h3 class = "text-center"> Trending </h3> 
                    <div class = "movies-list"> {
                        moviesArr.map((movieObj) => (

                            <div className = "card movie-card" onMouseEnter={()=>this.handleBtnShow(movieObj.id)} onMouseLeave={()=>this.handleBtnOff()}>
                                <img src = { `${movieObj.backdrop_path}` } className = "card-img-top movie-img" alt = "..." />
                                <div className = "card-body" >
                                    <h5 className = "card-title movie-title" > { movieObj.original_title } </h5> 
                                    <div className = "btn-cont favourites-btn-cont">
                                        {
                                            this.state.hover==movieObj.id && <a href = "#" className = "btn btn-primary" > Add To Favourites </a>
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
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
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