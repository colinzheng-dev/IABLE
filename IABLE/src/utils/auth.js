const LOGGED_USER = "lactfacts_logged_user"

export const login = user => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOGGED_USER, JSON.stringify(user))
  }
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOGGED_USER)
  }
}

export const isLogin = () => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem(LOGGED_USER) &&
      JSON.parse(localStorage.getItem(LOGGED_USER)).token
    ) {
      return true
    }
  }

  return false
}
