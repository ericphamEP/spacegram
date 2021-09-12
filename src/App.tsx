import React from 'react';
import { ImageStore } from './store/ImageStore';
import { ImageUiStore } from './store/ImageUiStore';
import { Layout, Typography, Input } from 'antd'
import './App.css';
import { SearchPage } from './view-image-list/SearchPage';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;

const imageStore = new ImageStore();
const imageUiStore = new ImageUiStore(imageStore);

function App() {
  const handleSearch = (search: string) => {
    imageUiStore.setSearch(search);
    imageUiStore.loadSearchResults();
  }

  return (
    <Layout>
      <Header>
        <Title>NASA Photobook</Title>
        <Search placeholder="Search images" onSearch={handleSearch} enterButton />
      </Header>
      <Content>
        <SearchPage imageStore={imageStore} imageUiStore={imageUiStore} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Eric Pham for Shopify's Front End Developer Intern Challenge - Winter 2022</Footer>
    </Layout>
  );
}

export default App;
