import React from "react";
import { Helmet } from "react-helmet"

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";
import "animate.css/animate.min.css";

export default ({ children }) => (
  <>
    <Helmet>
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"/>
      <link href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" rel="stylesheet"/>
      <title>Material Kit PRO React</title>
    </Helmet>
    { children }
  </>
);
