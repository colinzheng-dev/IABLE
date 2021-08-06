import React, { useState, useEffect } from "react"

import * as classes from "./Overlay.module.scss"
import classNames from "classnames"

const Overlay = ({ active, onClick, className }) => {
  const [isInDom, setIsInDom] = useState(false)

  useEffect(() => {
    handleToggleOverlay(active)
  }, [active])

  const handleToggleOverlay = isActive => {
    if (isActive) {
      setIsInDom(isActive)
    } else {
      // set a timer to remove from dom in .2s
      setTimeout(() => {
        setIsInDom(isActive)
      }, 200)
    }
  }
  return (
    <>
      {isInDom && (
        <div
          onClick={() => onClick()}
          className={classNames(classes.overlay, className, {
            [classes.overlayActive]: active,
          })}
        ></div>
      )}
    </>
  )
}

export default Overlay
