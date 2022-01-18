import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component{ 
    render(){
        return(
            <div style={{display:'flex',padding: "0.5rem"}}>
                <Link to="/"><h1 style={{marginLeft: '2rem'}}> Movies App </h1></Link>
                <Link to="/favourites"><h1 style={{marginLeft: '2rem'}}> Favourites </h1></Link>
            </div>
        )
    }
}

export default Navbar;