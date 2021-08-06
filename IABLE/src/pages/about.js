import React from "react"

import Layout from "../components/Layout/Layout"
import Seo from "../components/SEO/seo"

import URL from "../constants/WebURL"

const AboutPage = () => (
  <Layout>
    <Seo title="About" />
    <h1 className="main-title">About LactFacts</h1>
    <p className="main-paragraph">
      <a className="main-link" href={URL.about}>
        The Institute for Lactation and Breastfeeding Education
      </a>
      (IABLE) is a nonprofit membership organization whose mission is to
      optimize the promotion and support of breastfeeding for families in the
      outpatient sector.
    </p>
    <p className="main-paragraph">
      IABLE is dedicated to building
      <a className="main-link" href={URL.breastfeeding}>
        Breastfeeding Knowledgeable Medical Systems.
      </a>
    </p>
    <h3 className="main-subtitle">The Clinical Question of the Week</h3>
    <p className="main-paragraph">
      Every week IABLE reviews a recent policy statement or other major article
      that has an impact on best practices in the care of breastfeeding mothers
      and babies. Reading these are not only quick and easy, but will help you
      feel more confident when counseling on breastfeeding. The full list of
      CQ's, with links to the blog posts,
      <a className="main-link" href={URL.questions}>
        can be viewed here.
      </a>
    </p>
    <h3 className="main-subtitle">LactFacts</h3>
    <p className="main-paragraph">
      LactFacts are short summaries of the Clinical Questions. Please share with
      your favorite physicians or others who need succinct evidence-based
      breastfeeding info!
    </p>
  </Layout>
)

export default AboutPage
