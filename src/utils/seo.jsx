// src/components/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const SEO = ({
  title,
  description,
  keywords = "PheonixStech, Tech Solutions",
  url = "https://www.pheonixstech.com",
  image ,
}) => {

    const defaultImage ="/logo.png"
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
