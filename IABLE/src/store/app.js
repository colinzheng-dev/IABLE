// state
const LOGGED_USER = "lactfacts_logged_user"

const getUserInfoFromLocal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem(LOGGED_USER)) {
      return JSON.parse(localStorage.getItem(LOGGED_USER))
    }
  }

  return {
    id: "",
    token: "",
  }
}

const initialState = {
  isSideMenuOpen: false,
  searchKey: "",
  user: getUserInfoFromLocal(),
}

// types
const TOGGLE_SIDE_MENU = "TOGGLE_SIDE_MENU"
const UPDATE_SEARCHKEY = "UPDATE_SEARCHKEY"
const SET_LOGGED_USER = "SET_LOGGED_USER"

// actions
export const toggleSideMenu = isOpen => ({
  type: TOGGLE_SIDE_MENU,
  isOpen,
})

export const updateSearchKeyword = searchKey => ({
  type: UPDATE_SEARCHKEY,
  searchKey,
})

export const setLoggedUser = user => ({
  type: SET_LOGGED_USER,
  user,
})

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_MENU:
      return { ...state, isSideMenuOpen: action.isOpen }
    case UPDATE_SEARCHKEY:
      return { ...state, searchKey: action.searchKey }
    case SET_LOGGED_USER:
      return { ...state, user: action.user }
    default:
      return state
  }
}
