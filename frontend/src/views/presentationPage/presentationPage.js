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
        brand="Day-bu-2"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "primary"
        }}
      />
      <Parallax
        image={require("../../assets/img/profile/post-media/25.jpg")}
        filter="dark"
        small
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}>Ecommerce Page!</h1>
                <h4>
                  Free global delivery for all products. Use coupon{" "}
                  <b>25summer</b> for an extra 25% Off
                </h4>
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
