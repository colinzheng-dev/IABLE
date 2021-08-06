import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { graphql, useStaticQuery } from "gatsby"
import * as JsSearch from "js-search"
import firebase from "../utils/firebase"
import { isLogin } from "../utils/auth"
import { navigate } from "gatsby"
import * as classes from "./bookmark.module.scss"

import Layout from "../components/Layout/Layout"
import Seo from "../components/SEO/seo"
import Card from "../components/Card/Card"

import LoadingIcon from "../images/icons/loading.inline.svg"

const BookmarkPage = () => {
  const {
    allWpArticle: { nodes: allArticles },
  } = useStaticQuery(LACTFACTS_ARTICLES)

  const user = useSelector(state => state.app.user)
  const searchKey = useSelector(state => state.app.searchKey)

  const [renderArticles, setRenderArticles] = useState([])
  const [bookmarkArticles, setBookmarkArticles] = useState([])

  useEffect(() => {
    if (!isLogin()) navigate("/login?action=bookmark&refer=/bookmark")
  }, [])

  useEffect(() => {
    const dataToSearch = new JsSearch.Search("slug")

    dataToSearch.addIndex("title")
    dataToSearch.addDocuments(bookmarkArticles)
    setRenderArticles(dataToSearch.search(searchKey))
  }, [searchKey])

  useEffect(() => {
    handleFilterOutBookmarkArticles()
  }, [allArticles])

  const handleFilterOutBookmarkArticles = () => {
    const bookmarkItems = []
    const promises = []

    allArticles.forEach(article => {
      const promise = firebase
        .firestore()
        .doc(`user-bookmarks/${user.id}-${article.slug}`)
        .get()
        .then(function (doc) {
          if (typeof doc !== "undefined" && doc.data()) {
            if (doc.data().value) bookmarkItems.push(article)
          }
        })

      promises.push(promise)
    })

    Promise.all(promises).then(() => {
      setBookmarkArticles(bookmarkItems)
    })
  }

  return (
    <Layout>
      <Seo title="Bookmark" />

      <h1 className="main-title">Bookmark Articles</h1>

      {bookmarkArticles.length > 0 ? (
        (searchKey.length !== 0 ? renderArticles : bookmarkArticles).map(
          article => {
            return (
              <Card
                slug={article.slug}
                key={article.slug}
                title={article.title}
                date={article.date}
                content={article.block.flexibleContent[0].value}
                onBookmarkUpdate={() => handleFilterOutBookmarkArticles()}
              />
            )
          }
        )
      ) : (
        <div className={classes.loading}>
          <LoadingIcon className={classes.loading__icon} />
          <span>Loading, please wait...</span>
        </div>
      )}
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

export default BookmarkPage
