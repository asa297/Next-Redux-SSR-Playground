import React from 'react'
import { NextPage, NextPageContext } from "next"
import { Card } from '@app/components/card'


const IndexPage: NextPage = () => {
  return (
    <div>IndexPage
      <Card/>
    </div>
  ) 
}

IndexPage.getInitialProps = (ctx : NextPageContext) => {
  return {
    au : [1,2,5]
  }
}

export default IndexPage