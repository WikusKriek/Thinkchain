import React,{Component} from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import NoteProduct from "components/NoteProduct/NoteProduct.js";
import { withStyles } from "@material-ui/core/styles";


import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/blogStyle.js";

 class LatestNotes extends Component{
    
    constructor(props){
        super(props);
        this.state ={notes: []};
        
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/notes/')
        .then(response=>{
            this.setState({notes:response.data})
        })
        .catch((error)=>{
            console.log(error);
        }

        )}
    
    noteList(){
        
        return this.state.notes.map (currentNote =>{
            const {classes} = this.props;
            return(
                
            
                
                
                        <NoteProduct notes={currentNote} title={currentNote.username} description={currentNote.description} key={currentNote._id}>
                        
                        </NoteProduct>
                
                
            
        )   
        }
            
            )
    }
    
    render(){
        const {classes} = this.props
        return(
            
            
            <div className={classes.section}>
            <div className={classes.container}>
              <h2 className={classes.sectionTitle}>Latest Notes</h2>
              <GridContainer>
              {this.noteList()}
              </GridContainer>
            </div>
          </div>
        )
    }

}

LatestNotes.propTypes = {
    classes: PropTypes.object,
  }
export default withStyles(styles)(LatestNotes)