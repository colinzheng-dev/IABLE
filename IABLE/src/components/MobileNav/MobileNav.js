import React from "react"

import { Link } from "gatsby"
import { isLogin } from "../../utils/auth"

import HomeIcon from "../../images/icons/home.inline.svg"
import HeartIcon from "../../images/icons/heart.inline.svg"
import FileIcon from "../../images/icons/file.inline.svg"

import * as classes from "./MobileNav.module.scss"

const MobileNav = () => {
  const items = [
    {
      label: "Home",
      to: "/",
      icon: HomeIcon,
    },
    {
      label: "Bookmark",
      to: isLogin() ? "/bookmark" : "/login?action=bookmark&refer=/bookmark",
      icon: HeartIcon,
    },
    {
      label: "Unread",
      to: "/unread",
      icon: FileIcon,
    },
  ]
  return (
    <nav className={classes.nav}>
      {items.map(item => (
        <Link
          key={item.label}
          to={item.to}
          className={classes.navItem}
          activeClassName={classes.navItemActive}
        >
          <item.icon className={classes.navItem__icon} />
          <span className={classes.navItem__text}>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default MobileNav
