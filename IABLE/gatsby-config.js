let activeEnv = process.env.GATSBY_ACTIVE_ENV || "dev"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

console.info("activeEnv: ", activeEnv)

console.info("publication url: ", process.env.GATSBY_PUBLICATION_ADMIN_URL)

module.exports = {
  siteMetadata: {
    title: `LactFacts`,
    description: `Nonprofit membership organization whose mission is to optimize the promotion and support of breastfeeding for families in the outpatient sector`,
    author: `@codechrous`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("autoprefixer")({
            browsers: ["last 2 version"],
            flexbox: `no-2009`,
          }),
          require("postcss-normalize")({ browsers: ["last 2 version"] }),
          require(`postcss-preset-env`)({ stage: 0 }),
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logos/lact-facts.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, '/about', '/bookmark', '/unread'],
        workboxConfig: {
          importWorkboxFrom: `cdn`,
        },
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.GATSBY_PUBLICATION_ADMIN_URL,
      },
    }
  ],
}
