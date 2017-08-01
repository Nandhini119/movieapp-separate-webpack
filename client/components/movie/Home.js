import React from 'react'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar,RaisedButton,Drawer,MenuItem,
        TextField,FlatButton,Dialog,AutoComplete} from 'material-ui';
import { teal500, teal100, teal50 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Link, Redirect } from 'react-router-dom';
import {Row, Col } from 'react-flexbox-grid';
import $ from 'jquery';
import SearchData from './Search.js';
import DisplayData from './display.js';
import Route from './../../congifroute/routes.js';

injectTapEventPlugin();
 
const style = {
                appbarstyle: {
                                textAlign: 'center', 
                                backgroundColor: teal500 
                            },    
                raisedstyle: {
                                margin: '12'  
                             }, 
                dialogstyle: {
                                textAlign: 'center' 
                             }
            }; 
const menuProps = {
                    desktop: true, 
                    disableAutoFocus: true,
                  };
const mov = [];
             
class Home extends React.Component {
    constructor() {
        super();   
        this.state = {
            open: false,
            drawer: false, 
            moviename: "",   
            title: "",      
            poster: "",     
            date: "",       
            logout: false,  
            suggestion: [],  
            display: false,   
            displayData: '',  
            };          
            this.handleToggle = this.handleToggle.bind(this); 
            this.handleOpen = this.handleOpen.bind(this); 
            this.handleClose = this.handleClose.bind(this); 
            this.handleChangeSuggest = this.handleChangeSuggest.bind(this);           
            this.displayFavouriteList = this.displayFavouriteList.bind(this);   
            }
            
    /*opens dialog box and ask for movie name*/   
    handleOpen()
    {
        this.setState({open: true});  
        this.setState({drawer: false});  
    };   
    /*opens slider menu*/   
    handleToggle() 
    {
        this.setState({drawer: !this.state.drawer});  
    }         
    /*close dialog box and slider*/  
    handleClose() 
    {
        this.setState({drawer: false});  
        this.setState({open: false});  
    }
    /* adds the movie data to database which carries data to controller*/
    addMovieToFavouriteList(movie) 
    {
        $.ajax({
            url: Route.movieadd,
            type: 'POST',
            data: { title: movie.movietitle,
                    poster_path: movie.poster_path,
                    release_data: movie.release_date,
                    overview: movie.overview, 
                    popularity: movie.popularity,
                    email: localStorage.getItem("email") 
                 },
            success: function(response) {
                if (response == 200) {
                    alert("movie already in favourite list");    
                    } else {
                        alert("successfully added to favourite list");   
                        }          
                        },      
                        error: function(err) {
                            alert("error in inserting movie to favourite list");      
                            }   
                        }); 
    }
    /*displays favourite list of the user who logged in.takes email as data to 
      controller to display movie list of that particular user*/
    displayFavouriteList() 
    {
            this.setState({drawer: false}); 
            var moviedatas = '';
            /*assigning this of the class to a temporary variable to be used inside ajax call*/
            var object = this;    
            $.ajax({
                url: Route.moviedisplay,
                type: 'GET',
                data: {email: localStorage.getItem("email")}, 
                success: function(response) {
                    /*the response is iterated and sent to display.js to be displayed in card*/
                    moviedatas = response.map(moviedata => {
                        return (<DisplayData movie = {moviedata} 
                        deleteMovieFromFavList = {object.deleteMovieFromFavList.bind(object)}/>    
                                );   
                                });  
                                object.setState({displayData: moviedatas});
                                },     
                                error: function(err) {
                                    alert("error in displaying favourite list"); 
                                    }     
                    });    
    }
    /*deletes movie from the favourite list*/
    deleteMovieFromFavList(movie) 
    {
            /*assigning this of the class to a temporary variable to be used inside ajax call*/
            var object = this;    
            $.ajax({
                url: Route.moviedelete,
                type: 'GET', 
                data: {title: movie.movietitle,
                       email: localStorage.getItem("email")}, 
                success: function(response) {
                    alert("movie successfully deleted from favourite list"); 
                    /*to auto display the favourite list after deleting the movie the function display is again called*/
                    object.displayFavouriteList();   
                    },            
                    error: function(err) {
                        alert("error in deletion");      
                        }           
                })      
    }    
    /****to fetch data from tmdb api for suggestion ***/ 
    handleChangeSuggest(name) 
    {
        var suggest = [];
        /*assigning this of the class to a temporary variable to be used inside ajax call*/
        var object = this; 
        this.setState({moviename: name}); 
        $.ajax({
                type: "GET",
                url: 'https://api.themoviedb.org/3/search/keyword?api_key=360fb236234213ff65f11eac623fb645&query=' + name,
                data: {},     
                contentType: "application/json; charset=utf-8", 
                dataType: "json",     
                success: function(response) {
                    response.results.map(moviedata => {suggest.push(moviedata.name)});            
                    object.setState({suggestion: suggest}); 
                    },     
                    error: function(response) {
                                   
                    }      
                    });   
    }
    /*search for movies from tmdb api*/
    getMovieNamefromUser() 
    {
        this.setState({open: false}); 
        var moviedatas = '';
        /*assigning this of the class to a temporary variable to be used inside ajax call*/
        var object = this;   
        let movie = this.state.moviename;  
        if (movie.length === 0) {
            alert("Please enter movie name");     
            } else {
                $.ajax({
                    url: 'https://api.themoviedb.org/3/search/movie?api_key=360fb236234213ff65f11eac623fb645&query=' + this.state.moviename,
                    type: 'GET',        
                    data: {},     
                    success: function(response) {
                        if (response.total_results == 0) {
                            alert("there is no such movie..Please enter correct name")    
                            } else {
                                moviedatas = response.results.map(moviedata => {
                                    /*the response is iterated and sent to search.js to be displayed in card*/
                                    return ( < SearchData movie = {moviedata}  
                                    addMovieToFavouriteList = {object.addMovieToFavouriteList.bind(object)}/> 
                                    );          
                            });                 
                            object.setState({displayData: moviedatas});  
                        }          
                        },        
                        error: function(err) {
                            alert("error in getching movie");    
                            }         
                        });       
                    }   
    }
    /*to destroy the session of the user logout route is called and flag is set and redirected*/
    handlelogout() 
    {
        /*assigning this of the class to a temporary variable to be used inside ajax call*/
         let obj = this;       
         $.ajax({
             url: Route.logout,
             type: 'GET',   
             data: {},      
             success: function(response) {
                 obj.setState({logout: true});
                 alert("logged out successfully");  
                 },            
                 error: function(err) {
                     alert("error in logout");    
                     }       
                }); 
    }
    
    render() 
    {
        const actions = [ < FlatButton label = "Cancel" primary = {true}
                            onClick = {this.handleClose}/>
                        ];
        return ( 
        < MuiThemeProvider >  
            < div >          
                < AppBar style = {style.appbarstyle} title = "Movie Ground"     
                         onLeftIconButtonTouchTap = {this.handleToggle}
                         iconElementRight = { < FlatButton label = "Logout" 
                         onClick = {this.handlelogout.bind(this)}/>
                         }/ > 
                < Drawer docked = {false} width = {200} 
                         open = {this.state.drawer}     
                         onRequestChange = {(open) => this.setState({open})} >   
                    < MenuItem onClick = {this.handleOpen} > Search < /MenuItem>
                    < MenuItem onClick = {this.displayFavouriteList} > Display Favourites < /MenuItem> 
                    < MenuItem onClick = {this.handleClose} > Close < /MenuItem> 
                < /Drawer > 
                < Row center = 'xs' xs = {12} md = {6} >
                    < Dialog style = {style.dialogstyle}
                             bodyStyle = {{backgroundColor: teal50}} titleStyle = {{backgroundColor: teal100}} 
                             actionsContainerStyle = {{backgroundColor: teal50}}  
                             title = "Search for a movie" actions = {actions}   
                             modal = {false} open = {this.state.open} onRequestClose = {this.handleClose} >   
                        < AutoComplete ref = "name" hintText = "Type moviename"
                                       onUpdateInput = {this.handleChangeSuggest}   
                                       completionThreshold = {0} dataSource = {this.state.suggestion} 
                                       menuProps = {this.menuProps}/>
                        < RaisedButton label = "Search" secondary = {true}        
                                       onClick = {this.getMovieNamefromUser.bind(this)}   
                                       style = {style.raisedstyle }/> 
                    < /Dialog > 
                < /Row> 
                {/*to render the data to be listed in the home page itself, assigned the data to a state variable*/}
                {this.state.displayData} 
                {this.state.logout ? < Redirect to = '/' > < /Redirect> : " "}
            < /div >
        < /MuiThemeProvider>
               ); 
    }
}

export default Home;