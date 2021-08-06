import React, { useState } from "react"

import * as classes from "./TextInput.module.scss"
import classNames from "classnames"

const TextInput = ({
  placeholder,
  type = "text",
  name,
  autoComplete,
  onChange,
  value = "",
  error = "",
}) => {
  const inputRandomId = `input-id-${Math.random()}`
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <div className={classes.textInput}>
      <input
        type={type}
        id={inputRandomId}
        className={classNames(classes.input, {
          [classes.inputActive]: (value && value.length) > 0 || isInputFocused,
          [classes.inputNotValid]: (error && error.length) > 0,
        })}
        name={name}
        autoComplete={autoComplete}
        onChange={e => onChange(e)}
        value={value}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />

      <label htmlFor={inputRandomId} className={classes.label}>
        {placeholder}
      </label>

      <div className={classes.errors}>
        <span className={classes.errorMessage}>{error}</span>
      </div>
    </div>
  )
}

export default TextInput
