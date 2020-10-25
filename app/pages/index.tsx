import React from 'react'
import { NextPage, NextPageContext } from "next"
import { Card } from '@app/components/card'
import { initializeStore } from '@app/redux/store'
import { exampleDemoAction } from '@app/modules/example'

const IndexPage: NextPage = () => {
  return (
    <div>IndexPage
      <Card/>
    </div>
  ) 
}

IndexPage.getInitialProps = async (ctx : NextPageContext) => {
  const reduxStore = initializeStore()

  await reduxStore.dispatch(exampleDemoAction())

  const initialReduxState = reduxStore.getState()

  return { initialReduxState }
}

export default IndexPage