import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Row, Col } from 'react-flexbox-grid';
import {teal50 } from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader,
        CardMedia,CardText,FlatButton } from 'material-ui';

const style = {
                space: { margin: '15'},  
                cardcolor: {
                                backgroundColor: teal50
                            }
              };
              
class display extends React.Component {
    constructor(props) 
    {
        super(props);      
        this.state = {
                        shadow: 1,         
                        poster: ' ',       
                        title: false,          
                        action: false,        
                        detailsAboutMovie: false,     
                        movietitle: this.props.movie.title      
                    };         
        this.onMouseOver = this.onMouseOver.bind(this);   
        this.onMouseOut = this.onMouseOut.bind(this);   
    }
    /*flag to show more action buttons and title on mouse over*/
    onMouseOver() 
    {
        this.setState({action: true}); 
        this.setState({title: true});   
        this.setState({shadow: 3});   
    }
    /*flag to hide title and more details of the movie when mouse moves away*/
    onMouseOut() 
    {
        this.setState({action: false});      
        this.setState({title: false}); 
        this.setState({shadow: 1});
        this.setState({detailsAboutMovie: false});  
    }
    
    detailsAboutMovie() 
    {
        this.setState({detailsAboutMovie: true});  
    }
    /*flag to show more details about the movie*/
    deleteMovieFromFavList() 
    {
        this.props.deleteMovieFromFavList({movietitle: this.state.movietitle}); 
    }
           
    render() 
    {
        return ( 
            < MuiThemeProvider >     
                < div style = {style.space} >    
                    < Row center = 'xs' > 
                        < Col xs = {6} >    
                            < Card onMouseOver = {this.onMouseOver}      
                                   onMouseOut = {this.onMouseOut} 
                                   zDepth = {this.state.shadow} > 
                                {
                                    this.state.title ? < CardHeader style = {style.cardcolor}  
                                    title = {this.props.movie.title}    
                                    open = {this.state.title} />: ''
                                } 
                                < CardMedia >               
                                    < img height = {400} src = {'http://image.tmdb.org/t/p/w185' + this.props.movie.poster_path}  alt = "" / >   
                                < /CardMedia>    
                                < CardActions style = {style.cardcolor} >          
                                    < svg xmlns = "http://www.w3.org/2000/svg" width = "30" onClick = {this.detailsAboutMovie.bind(this)}  
                                          onMouseOut = {this.onMouseOut} height = "30" viewBox = "0 0 24 24" > 
                                        < path d = "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" / >
                                    < /svg> 
                                    < svg xmlns = "http://www.w3.org/2000/svg"  width = "30" height = "30"
                                          onClick = {this.deleteMovieFromFavList.bind(this)}    
                                          viewBox = "0 0 24 24" >
                                        < path d = "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" / >
                                    < /svg>
                                < /CardActions> 
                                {
                                    this.state.detailsAboutMovie ? 
                                    < CardText open = {this.state.detailsAboutMovie} >
                                    Movie Name : { this.props.movie.title} < br / >   
                                    Release Date: { this.props.movie.release_date } < br / >        
                                    Popularity: { this.props.movie.popularity} < br / >         
                                    Overview: { this.props.movie.overview }
                                    < /CardText> : " "
                                } 
                            < /Card> 
                        < /Col>
                    < /Row>
                < /div>
            < /MuiThemeProvider>    
                );               
      }               
}               
export default display;
                       