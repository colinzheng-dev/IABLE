import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { graphql, useStaticQuery } from "gatsby"
import * as JsSearch from "js-search"

import Layout from "../components/Layout/Layout"
import Seo from "../components/SEO/seo"
import Card from "../components/Card/Card"

const IndexPage = () => {
  const {
    allWpArticle: { nodes: allArticles },
  } = useStaticQuery(LACTFACTS_ARTICLES)
  const [renderArticles, setRenderArticles] = useState([])
  const searchKey = useSelector(state => state.app.searchKey)

  useEffect(() => {
    const dataToSearch = new JsSearch.Search("slug")

    dataToSearch.addIndex("title")
    dataToSearch.addDocuments(allArticles)
    setRenderArticles(dataToSearch.search(searchKey))
  }, [searchKey])

  return (
    <Layout>
      <Seo title="Home" />

      <h1 className="main-title">LactFacts Article’s</h1>

      {(searchKey.length !== 0 ? renderArticles : allArticles).map(article => {
        return (
          <Card
            slug={article.slug}
            key={article.slug}
            title={article.title}
            date={article.date}
            content={article.block.flexibleContent[0].value}
          />
        )
      })}
    </Layout>
  )
}

const LACTFACTS_ARTICLES = graphql`
  query {
    allWpArticle {
      nodes {
        slug
        date
        title
        block {
          flexibleContent {
            ... on WpArticle_Block_FlexibleContent_Body {
              value
            }
          }
        }
      }
    }
  }
`

export default IndexPage
