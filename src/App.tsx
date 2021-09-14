import { ImageStore } from './store/ImageStore';
import { ImageUiStore } from './store/ImageUiStore';
import { Layout, Typography, Input, Collapse } from 'antd'
import './App.css';
import { SearchPage } from './view-image-list/SearchPage';
import { QueryBar } from './view-image-list/QueryBar';
import { LikedImages } from './view-image-list/LikedImages';
import { AssetModal } from './view-asset/AssetModal';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

const imageStore = new ImageStore();
const imageUiStore = new ImageUiStore(imageStore);

function App(): JSX.Element {
  const handleSearch = (search: string) => {
    imageUiStore.setSearch(search);
    imageUiStore.loadSearchResults();
  }
  const resetSearch = () => {
    handleSearch("");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title style={{paddingTop: 5, color: 'white'}} onClick={resetSearch}>NASA&apos;s Photobook</Title>
      </Header>
      <Content style={{margin: 50}}>
        <Collapse defaultActiveKey={['1']} style={{marginBottom: 20}}>
          <Panel header="Liked Images" key="1">
            <LikedImages imageStore={imageStore} imageUiStore={imageUiStore} />
          </Panel>
        </Collapse>
        <Search style={{paddingBottom: 30}} placeholder="Search images" onSearch={handleSearch} enterButton size="large" />
        <QueryBar imageStore={imageStore} imageUiStore={imageUiStore} />
        <SearchPage imageStore={imageStore} imageUiStore={imageUiStore} />
        <AssetModal imageStore={imageStore} imageUiStore={imageUiStore} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Eric Pham for Shopify&apos;s Front End Developer Intern Challenge - Winter 2022</Footer>
    </Layout>
  );
}

export default App;
