import Axios from "axios"

/**
 * Converts js object to form-body format
 * @param {*} obj object to convert to form format
 */
const objToFormBody = obj =>
  Object.keys(obj)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&")

/**
 * Gets an access token from the LACTED.ORG site
 * @param {string} username username
 * @param {string} password password
 * @returns {Promise} res(token: string) || rej(error: string)
 */
async function getToken(username, password) {
  const payload = {
    grant_type: "password",
    username,
    password,
    client_id: "vwN6MBTJ1gxKJc2EdFYkD2sgvSF4h6SLRuCQZl4k",
    client_secret: "Dl6OMsf4Tp7KxQRVTE6Gmm6KntLJPXC1Q2VyrJl5",
  }

  return new Promise((res, rej) => {
    const formBody = objToFormBody(payload)
    const url = `${process.env.GATSBY_LACTED_URL}?oauth=token` // site that doesn’t send Access-Control-*
    Axios.post(url, formBody, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(({ data }) => {
        return res(data.access_token)
      })
      .catch(e => {
        return rej(e)
      })
  })
}

/**
 * Gets logged in user from LACTED.ORG site
 * @param {string} token auth0 access token
 * @returns {*} res(user: object) || rej(error: string)
 */
async function getUserFromToken(token) {
  return new Promise((res, rej) => {
    Axios.get(
      `${process.env.GATSBY_LACTED_URL}/wp-json/wp/v2/users/me?access_token=${token}`
    )
      .then(({ data: user }) => res(user))
      .catch(e => rej(e))
  })
}

export { getToken, getUserFromToken }
