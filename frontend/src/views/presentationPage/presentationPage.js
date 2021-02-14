/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "./components/Header/Header.js";
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import Parallax from "./components/Parallax/Parallax.js";

// sections for this page
import HeaderLinks from "./components/Header/HeaderLinks.js";
//import SectionLatestOffers from "views/EcommercePage/Sections/SectionLatestOffers.js";
//import SectionProducts from "./Sections/SectionProducts.js";
import SectionFeatures from "./Sections/SectionFeatures.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionFooter from "./Sections/SectionFooter.js";
import SectionPricing from "./Sections/SectionPricing.js";
//import SectionLatestNotes from "./Sections/SectionLatestNotes.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import Inventory from "../../assets/img/inventory.png";

// @material-ui icons


import styles from "./jss/material-kit-pro-react/views/ecommerceStyle.js";

const useStyles = makeStyles(styles);

export default function EcommercePage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Day-bu"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "info"
        }}
      />
      <Parallax
        image={require("../../assets/img/profile_1.png")}
        className={classes.parallax}
        
      >
        <div className={classes.container}>
          <GridContainer>
          <GridItem md={7} sm={7}>
            <div className={classes.imageContainer}>
              <img src={Inventory} alt="views" />
            </div>
          </GridItem>
          <GridItem md={4} sm={5} className={classes.mlAuto}>
            <div className={classes.sectionDescription}>
              <h3 className={classes.title}>Unconventional Cards</h3>
              <h6 className={classes.description}>
                One Card for Every Problem
              </h6>
              <h5 className={classes.description}>
                We love cards and everybody on the web seems to. We have gone
                above and beyond with options for you to organise your
                information. From cards designed for blog posts, to product
                cards or user profiles, you will have many options to choose
                from. All the cards follow the material principles and have a
                design that stands out.
              </h5>
            </div>
          </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        
        {/*<SectionLatestNotes />
       // <SectionProducts />*/}
       <SectionPricing/>
        
      </div>
      <div className={classes.container}>
          <SectionPills />
      </div>
        <SectionFeatures  />
      <div
          className={classNames(
            classes.section,
            classes.sectionGray,
            "cd-section"
          )}
          id="footers"
        >
          
          <SectionFooter />
      </div>
    </div>
  ); 
}
