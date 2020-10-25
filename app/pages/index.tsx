import React from 'react'
import { NextPage, NextPageContext } from "next"
import Link from 'next/link'
import { Card } from '@app/components/card'
import { initializeStore } from '@app/redux/store'
import { exampleDemoAction } from '@app/modules/example'
import { useExample } from '@app/modules/example'

const IndexPage: NextPage = () => {
  const exampleModule = useExample()
  return (
    <div>IndexPage
      <Link href='/au'>
        <a>
          <Card/>
        </a>
      </Link>
      {exampleModule.states.message}
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