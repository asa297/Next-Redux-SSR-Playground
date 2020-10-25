import { NextPage, NextPageContext } from "next"


const IndexPage: NextPage = () => {
  return <div>IndexPage</div>
}

IndexPage.getInitialProps = (ctx : NextPageContext) => {
  return {
    au : [1,2,5]
  }
}

export default IndexPage