import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const SITE_URL = "https://www.lasglowtech.com.ng";
const DEFAULT_IMAGE = `${SITE_URL}/LOGO.png`;

const SEO = ({
  title,
  description,
  keywords = "Lasglowtech, web development Nigeria, mobile apps, UI UX design, IT tutoring, tech training, service catalogue, instant checkout, buy services online, digital agency Nigeria",
  url = SITE_URL,
  image = DEFAULT_IMAGE,
  type = "website",
  schema = null,
}) => {
  const canonical = url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;

  const schemaItems = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || DEFAULT_IMAGE} />

      {schemaItems.map((item, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SEO;
