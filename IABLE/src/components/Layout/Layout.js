import React from "react"

import * as classes from "./Layout.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { toggleSideMenu } from "../../store/app"
import classNames from "classnames"
import PropTypes from "prop-types"
import SideMenu from "../SideMenu/SideMenu"
import Header from "../Header/Header"
import Overlay from "../Overlay/Overlay"
import MobileNav from "../MobileNav/MobileNav"

import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

const Layout = ({ children, noSearch = false }) => {
  const dispatch = useDispatch()
  const isSideMenuOpen = useSelector(state => state.app.isSideMenuOpen)
  const searchKey = useSelector(state => state.app.searchKey)

  return (
    <div className={classes.layout}>
      <Overlay
        active={isSideMenuOpen}
        className={classes.sideMenuOverlay}
        onClick={() => dispatch(toggleSideMenu(false))}
      />
      <SideMenu />
      <section
        className={classNames(classes.main, {
          [classes.mainSearching]: searchKey,
        })}
      >
        {!noSearch && <Header />}
        <main className={classes.contentWrapper}>
          <PerfectScrollbar>
            <div className={classes.content}>{children}</div>
          </PerfectScrollbar>
          <MobileNav />
        </main>
      </section>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
