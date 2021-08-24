import Layout from "../components/Layout";
import TokenData from "../components/TokenData";
import config from "../config";

const IndexPage = () => (
  <Layout>
    <TokenData addresses={Object.values(config.tokens)} />
  </Layout>
);

export default IndexPage;
