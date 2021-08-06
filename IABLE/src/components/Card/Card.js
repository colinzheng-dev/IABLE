import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import Collapsible from "react-collapsible"
import classNames from "classnames"
import { format } from "date-fns"

import ShareModal from "../ShareModal/ShareModal"
import firebase from "../../utils/firebase"
import { isLogin } from "../../utils/auth"
import { navigate } from "gatsby"

import * as classes from "./Card.module.scss"

import ArrowIcon from "../../images/icons/arrow-top.inline.svg"
import HeartIcon from "../../images/icons/heart.inline.svg"
import ShareIcon from "../../images/icons/share.inline.svg"

const Card = ({ title, content, date, slug, onBookmarkUpdate = () => {} }) => {
  const user = useSelector(state => state.app.user)

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [footerSpace, setFooterSpace] = useState(0)

  const ref = useRef(null)
  const previewRef = useRef(null)

  useEffect(() => {
    if (isLogin()) {
      firebase
        .firestore()
        .doc(`user-bookmarks/${user.id}-${slug}`)
        .get()
        .then(function (doc) {
          if (typeof doc !== "undefined" && doc.data()) {
            setIsBookmarked(doc.data().value)
          }
        })
    } else {
      setIsBookmarked(false)
    }

    if (ref?.current) {
      setShareUrl(ref.current.querySelectorAll("a")[1].getAttribute("href"))
    }
  }, [user])

  useEffect(() => {
    handleCalcFooterSpace()
    window.addEventListener("resize", handleCalcFooterSpace)

    return () => {
      window.removeEventListener("resize", handleCalcFooterSpace)
    }
  }, [previewRef.current, isOpen])

  const handleCalcFooterSpace = () => {
    const marginTop = previewRef?.current?.getBoundingClientRect().height
    setFooterSpace(marginTop)
  }

  const handleTruncateText = (htmlContent, length, ending) => {
    if (typeof document === "undefined") return

    let str = htmlContent
      .match(/<p>(.*?)<br \/>/g)[0]
      .replace("<p>", "")
      .replace("<br />", "")

    let dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlContent.trim()

    str = dummyDiv.firstChild.textContent.substr(0, str.length)

    if (length == null) {
      length = 100
    }
    if (ending == null) {
      ending = "..."
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending
    } else {
      return str
    }
  }

  const toggleBookmark = () => {
    if (isLogin()) {
      firebase
        .firestore()
        .doc(`user-bookmarks/${user.id}-${slug}`)
        .set({ value: !isBookmarked })

      setIsBookmarked(!isBookmarked)

      onBookmarkUpdate()
    } else {
      navigate("/login?action=bookmark&refer=/")
    }
  }

  return (
    <div className={classes.card}>
      <Collapsible
        onOpening={() => setIsOpen(true)}
        onClosing={() => setIsOpen(false)}
        trigger={
          <>
            <button className={classes.header}>
              <h2 className={classes.header__title}>{title}</h2>
              <ArrowIcon
                className={classNames(classes.header__icon, {
                  [classes.header__iconActive]: isOpen,
                })}
              />
            </button>

            <p
              className={classNames(classes.preview, {
                [classes.previewHidden]: isOpen,
              })}
              ref={previewRef}
            >
              {handleTruncateText(content)}
            </p>
          </>
        }
      >
        <div
          ref={el => (ref.current = el)}
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Collapsible>

      <div
        style={{
          "--extra-margin": isOpen ? 0 : footerSpace + "px",
        }}
        className={classNames(classes.footer)}
      >
        <button
          className={classes.footer__action}
          onClick={() => toggleBookmark()}
        >
          <HeartIcon
            className={classNames(
              classes.footer__icon,
              classes.footer__iconLike,
              {
                [classes.footer__iconLikeActive]: isBookmarked,
              }
            )}
          />
        </button>

        <button
          className={classes.footer__action}
          onClick={() => setIsShareModalOpen(true)}
        >
          <ShareIcon className={classNames(classes.footer__icon)} />
        </button>

        <span className={classes.date}>
          {format(new Date(date), "do MMM, yyyy")}
        </span>
      </div>

      <ShareModal
        shareURL={shareUrl}
        active={isShareModalOpen}
        onHide={() => setIsShareModalOpen(false)}
      />
    </div>
  )
}

export default Card
