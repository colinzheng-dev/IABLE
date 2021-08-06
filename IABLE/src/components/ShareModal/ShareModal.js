import React, { useState, useEffect } from "react"

import Modal from "react-modal"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share"
import { CopyToClipboard } from "react-copy-to-clipboard"
import * as classes from "./ShareModal.module.scss"

import CloseIcon from "../../images/icons/close.inline.svg"
import CopyIcon from "../../images/icons/copy.inline.svg"

const ShareModal = ({ shareURL, active, onHide }) => {
  Modal.setAppElement("#___gatsby")

  return (
    <>
      <Modal
        isOpen={active}
        onRequestClose={() => onHide()}
        className={classes.modal}
        overlayClassName={classes.overlay}
        contentLabel="Social Share Modal"
      >
        <div className={classes.header}>
          <span className={classes.header__title}>Share Article</span>

          <button className={classes.header__closeBtn} onClick={() => onHide()}>
            <CloseIcon className={classes.header__closeIcon} />
          </button>
        </div>

        <ul className={classes.media}>
          <li className={classes.mediaItem}>
            <FacebookShareButton
              url={shareURL}
              className={classes.mediaItem__button}
            >
              <FacebookIcon round size={50} />
            </FacebookShareButton>

            <span className={classes.mediaItem__text}>Facebook</span>
          </li>
          <li className={classes.mediaItem}>
            <TwitterShareButton
              url={shareURL}
              className={classes.mediaItem__button}
            >
              <TwitterIcon round size={50} />
            </TwitterShareButton>

            <span className={classes.mediaItem__text}>Twitter</span>
          </li>
          <li className={classes.mediaItem}>
            <LinkedinShareButton
              url={shareURL}
              className={classes.mediaItem__button}
            >
              <LinkedinIcon round size={50} />
            </LinkedinShareButton>

            <span className={classes.mediaItem__text}>Linkedin</span>
          </li>
        </ul>

        <div className={classes.link}>
          <span className={classes.link__text}>{shareURL}</span>
          <CopyToClipboard text={shareURL}>
            <button className={classes.link__btn}>
              <CopyIcon className={classes.link__icon} />
            </button>
          </CopyToClipboard>
        </div>
      </Modal>
    </>
  )
}

export default ShareModal
