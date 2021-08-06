import React, { useState } from "react"
import * as classes from "./Header.module.scss"
import { useDispatch } from "react-redux"
import { toggleSideMenu, updateSearchKeyword } from "../../store/app"

import MagnifyIcon from "../../images/icons/magnify.inline.svg"
import MenuIcon from "../../images/icons/menu-dots.inline.svg"
import CloseIcon from "../../images/icons/close.inline.svg"

const Header = () => {
  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState("")

  return (
    <header className={classes.header}>
      <button
        className={classes.menuButton}
        onClick={() => dispatch(toggleSideMenu(true))}
      >
        <MenuIcon className={classes.menuButtonIcon} />
      </button>

      <div className={classes.search}>
        <div className={classes.search__iconWrapper}>
          <MagnifyIcon className={classes.search__icon} />
        </div>

        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Search Lactfacts..."
          className={classes.search__input}
          value={searchInput}
          onChange={e => {
            setSearchInput(e.target.value)
            dispatch(updateSearchKeyword(e.target.value))
          }}
        />

        {searchInput.length > 0 && (
          <button
            className={classes.clearInputButton}
            onClick={() => {
              setSearchInput("")
              dispatch(updateSearchKeyword(""))
            }}
          >
            <CloseIcon className={classes.clearInputIcon} />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
