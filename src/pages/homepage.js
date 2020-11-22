import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Mediacard from '../components/Mediacard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



//TODO make sure that only the latest calls returned from the api update the state.results in the case that an older call returns late.

export class homepage extends Component {
    state = {
        results:null,
        page:1,
        searchQuery:""
    }
    
    componentDidMount(){
        this.search();
    }

    search(){
        if(this.state.searchQuery !== null && this.state.searchQuery !== ""){
            axios.get(`https://hn.algolia.com/api/v1/search?query=${this.state.searchQuery}&tags=story&page=${this.state.page}`)
            .then(res =>{
                this.setState({
                    results:res.data.hits
                })
            }).catch(err=> console.log(err))

        }else{
            axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`)
            .then(res =>{
                this.setState({
                    results:res.data.hits
                })

            }).catch(err=> console.log(err))
        }

    }

    onchangeSearch(e){
        this.setState({
            page:1,
            results:null,
            searchQuery:e.target.value
        }, () => this.search())      
    }

    inceasePageNumber(){
        //let tempvalue = this.state.page +value;
        this.setState({
            page:this.state.page +1,
        }, () => this.search()) 
    }

    deceasePageNumber(){
        //let tempvalue = this.state.page +value;
        this.setState({
            page:this.state.page - 1,
        }, () => this.search()) 
    }
    
     //<div>test </div>
    render() {
        let currentResults = this.state.results ? (
            this.state.results.map(result => 
                <Mediacard key={result.objectID} data={result} />
                //<p ><a href={result.url}>{result.title}</a></p>
              
            )
        ) : <p>Loading</p>;
        //let inceaseButtonDisabled = this.state.searchQuery ==""? true:false;
        let deceaseButtonDisabled = ( this.state.page == 1)?true:false;
        return (
            <div>
                
                <TextField
                     onChange={this.onchangeSearch.bind(this)}
                    id="outlined-full-width"
                    label="Search"
                    style={{ margin: 8 }}
                    placeholder="Enter search topic here"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    
                />

                <div>
                    {currentResults}   
                </div>
                
                <div className="paginationSection">
                    <Button disabled={deceaseButtonDisabled} onClick={this.deceasePageNumber.bind(this)}>Previous</Button>
                    PAGE:{this.state.page}
                    <Button  onClick={this.inceasePageNumber.bind(this)}>Next</Button>
                </div>
            </div>
            
        )
    }
}

export default homepage
