import React from "react"

import * as classes from "./SideMenu.module.scss"
import classNames from "classnames"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useSelector, useDispatch } from "react-redux"
import { toggleSideMenu, setLoggedUser } from "../../store/app"
import URL from "../../constants/WebURL"
import { isLogin, logout } from "../../utils/auth"
import { navigate } from "gatsby"

import HomeIcon from "../../images/icons/home.inline.svg"
import HeartIcon from "../../images/icons/heart.inline.svg"
import FileIcon from "../../images/icons/file.inline.svg"
import CalendarIcon from "../../images/icons/calendar.inline.svg"
import MicIcon from "../../images/icons/mic.inline.svg"
import FileCheckIcon from "../../images/icons/file-check.inline.svg"
import InfoIcon from "../../images/icons/circle-info.inline.svg"
import CloseIcon from "../../images/icons/close.inline.svg"
import BookIcon from "../../images/icons/book.inline.svg"
import LogoutIcon from "../../images/icons/logout.inline.svg"

const SideMenu = () => {
  const dispatch = useDispatch()
  const isSideMenuOpen = useSelector(state => state.app.isSideMenuOpen)

  const handleLogout = () => {
    dispatch(setLoggedUser({ id: "", token: "" }))
    logout()
    navigate("/")
  }

  const navItems = [
    {
      label: "Home",
      to: "/",
      icon: HomeIcon,
      mobileView: false,
      external: false,
    },
    {
      label: "Bookmark",
      to: isLogin() ? "/bookmark" : "/login?action=bookmark&refer=/bookmark",
      icon: HeartIcon,
      mobileView: false,
      external: false,
    },
    {
      label: "Unread",
      to: "/unread",
      icon: FileIcon,
      mobileView: false,
      external: false,
    },
    {
      label: "Events",
      to: URL.events,
      icon: CalendarIcon,
      mobileView: true,
      external: true,
    },
    {
      label: "Podcasts",
      to: URL.podcasts,
      icon: MicIcon,
      mobileView: true,
      external: true,
    },
    {
      label: "Handouts",
      to: URL.handouts,
      icon: FileCheckIcon,
      mobileView: true,
      external: true,
    },
    {
      label: "About",
      to: "/about",
      icon: InfoIcon,
      mobileView: true,
      external: false,
    },
    {
      label: "App Hub",
      to: URL.apphub,
      icon: BookIcon,
      mobileView: true,
      external: true,
    },
    {
      label: isLogin() ? "Log Out" : "Log In",
      to: isLogin() ? handleLogout : "/login",
      icon: LogoutIcon,
      mobileView: true,
      external: false,
    },
  ]

  return (
    <aside
      className={classNames(classes.sideMenu, {
        [classes.sideMenuActive]: isSideMenuOpen,
      })}
    >
      <button
        className={classes.closeButton}
        onClick={() => dispatch(toggleSideMenu(false))}
      >
        <CloseIcon className={classes.closeButtonIcon} />
      </button>

      <div className={classes.logo}>
        <StaticImage
          src="../../images/logos/lact-facts.png"
          className={classes.logo__img}
          placeholder="tracedSVG"
          alt="LactFacts Logo"
          height={60}
          width={60}
        />
        <span className={classes.logo__text}>LactFacts</span>
      </div>

      <nav>
        <ul className={classes.navList}>
          {navItems.map(item => (
            <li className={classes.navItem} key={item.label}>
              {!item.external ? (
                typeof item.to === "string" ? (
                  <Link
                    to={item.to}
                    className={classNames(classes.navLink, {
                      [classes.navLinkNoMobile]: !item.mobileView,
                    })}
                    activeClassName={classes.navLinkActive}
                    onClick={() => dispatch(toggleSideMenu(false))}
                  >
                    <item.icon className={classes.navLink__icon} />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      item.to()
                      dispatch(toggleSideMenu(false))
                    }}
                    className={classNames(classes.navLink, {
                      [classes.navLinkNoMobile]: !item.mobileView,
                    })}
                  >
                    <item.icon className={classes.navLink__icon} />
                    {item.label}
                  </button>
                )
              ) : (
                <a
                  href={item.to}
                  target="_blank"
                  className={classNames(classes.navLink, {
                    [classes.navLinkNoMobile]: !item.mobileView,
                  })}
                  onClick={() => dispatch(toggleSideMenu(false))}
                >
                  <item.icon className={classes.navLink__icon} />
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <footer className={classes.footer}>Powered by Lactfacts @ 2021</footer>
    </aside>
  )
}

export default SideMenu
