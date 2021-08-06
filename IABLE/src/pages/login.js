import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { navigate } from "gatsby"
import * as classes from "./login.module.scss"
import LoadingIcon from "../images/icons/loading.inline.svg"

import { setLoggedUser } from "../store/app"
import Layout from "../components/Layout/Layout"
import Seo from "../components/SEO/seo"
import { getToken, getUserFromToken } from "../utils/lib"
import { login } from "../utils/auth"
import TextInput from "../components/TextInput/TextInput"
import Button from "../components/Button/Button"
import { Formik, Form } from "formik"
import * as yup from "yup"

const LoginPage = ({ location }) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  // validation schema
  const validationSchema = yup.object().shape({
    username: yup.string().required().label("Username"),
    password: yup.string().required().label("Password"),
  })

  const shouldInformUser = action => {
    if (location && location.search) {
      if (
        location.search.split("&")[0] &&
        location.search.split("&")[0].split("=")[1] === action
      )
        return true
    }

    return false
  }

  async function handleLogin({ username, password }) {
    setLoading(true)
    var token = await getToken(username, password).catch(e => {
      setError(
        "A user with that username/password combination doesn't exist, please try again or register bellow"
      )
      setLoading(false)
    })

    if (!token) return setLoading(false)

    const user = await getUserFromToken(token).catch(e => {
      // error / register
      setError("Please try again or come back later")
      setLoading(false)
    })

    if (!user) return setLoading(false)

    setLoading(false)

    dispatch(setLoggedUser({ id: user.id, token }))
    login({ id: user.id, token })

    const refer = location.search.split("&")[1]
      ? location.search.split("&")[1].split("=")[1]
      : false
    if (refer) {
      navigate(refer)
    } else {
      navigate("/")
    }
  }

  return (
    <Layout noSearch>
      <Seo title="Login" />
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, handleChange }) => (
          <div className={classes.container}>
            <h1 className={classes.title}>Please Login</h1>

            {shouldInformUser("bookmark") && (
              <div className={classes.inform}>
                Please login see your bookmarks and bookmark your favorite articles
              </div>
            )}

            <Form className={classes.form}>
              <TextInput
                type="text"
                name="username"
                placeholder="Username"
                error={errors.username}
                onChange={handleChange}
                value={values.username}
              />

              <TextInput
                type="password"
                name="password"
                placeholder="Password"
                error={errors.password}
                onChange={handleChange}
                value={values.password}
              />

              {error && <div className={classes.error}>{error}</div>}

              <Button type="submit" className={classes.submitButton}>
                Login
              </Button>

              {loading && (
                <div className={classes.loading}>
                  <LoadingIcon className={classes.loadingIcon} />
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </Layout>
  )
}

export default LoginPage
