import React from 'react';
import { ImageStore } from './store/ImageStore';
import { ImageUiStore } from './store/ImageUiStore';
import { Layout, Typography, Input } from 'antd'
import './App.css';
import { SearchPage } from './view-image-list/SearchPage';
import { QueryBar } from './view-image-list/QueryBar';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;

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
      <Content style={{margin: 30}}>
        <Search style={{paddingBottom: 30}} placeholder="Search images" onSearch={handleSearch} enterButton />
        <QueryBar imageStore={imageStore} imageUiStore={imageUiStore} />
        <SearchPage imageStore={imageStore} imageUiStore={imageUiStore} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Eric Pham for Shopify&apos;s Front End Developer Intern Challenge - Winter 2022</Footer>
    </Layout>
  );
}

export default App;
