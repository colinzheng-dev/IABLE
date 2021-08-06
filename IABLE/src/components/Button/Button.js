import React from "react"

import * as classes from "./Button.module.scss"
import classNames from "classnames"

const Button = ({ children, onClick = () => {}, type, className }) => {
  return (
    <button
      className={classNames(classes.button, className)}
      type={type}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

export default Button
