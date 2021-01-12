import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Favorite from "@material-ui/icons/Favorite";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Badge from "components/Badge/Badge.js";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Rating from '@material-ui/lab/Rating';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import dg6 from "assets/img/dg6.jpg";


import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/blogStyle.js";

const useStyles = makeStyles(styles);

export default function NoteProduct(props) {
  const classes = useStyles();
  return (
    
          <GridItem md={6} sm={12}>
            <Card product>
              <CardHeader image>
                <a href="#pablo">
                  <img src={dg6} alt="..." />
                  <div className={classes.cardTitleAbsolute}>
                  <Badge  color="primary">{`Engineering`}</Badge>
                  <Badge  color="info">{`Notes`}</Badge>
                  <Badge  color="success">{`${25} Sold`}</Badge>
                        </div>
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{ backgroundImage: `url(${dg6})`, opacity: 1 }}
                />
              </CardHeader>
              <CardBody>
                <h6
                  className={classNames(classes.cardCategory, classes.textRose)}
                >
                  {props.title}
                </h6>
                <h4 className={classes.cardTitle}>
                  <a href="#pablo">
                    Learn how to wear your scarf with a floral print shirt
                  </a>
                </h4>
                <p className={classes.cardDescription}>
                  {props.description}
                </p>
                
            

                    
            
          
              </CardBody>
              <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>{`R ${150.00}`}</h4>
                    </div>
                    <div className={classes.stats}>
                   
                      <Tooltip
                        id="tooltip-top"
                        title="Add To Cart"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon link>
                        <ShoppingCart />
                        </Button>
                      </Tooltip>
                      
                    </div>
                    <Tooltip className={classes.cardCategory}
                      id="tooltip-rating"
                      title={`${25} Ratings`}
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Box component="fieldset"  borderColor="transparent">
                
                      <Rating name="read-only" value={3} size="small" readOnly />
                
                    </Box>
                    </Tooltip>
                    <div className={classes.typo}>
              
              <h5>(25)</h5>
            </div>
                  </CardFooter>
              
                
                    
                    
                  
                  
                
            </Card>
          </GridItem>    
  );
}
