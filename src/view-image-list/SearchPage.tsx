import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { Row, Col, Typography, Spin } from 'antd';
import { GridView } from './GridView';
import { ListView } from './ListView';

const { Title } = Typography;

interface SearchPageProps {
  imageStore: ImageStore,
  imageUiStore: ImageUiStore,
}

@observer
export class SearchPage extends React.Component<SearchPageProps, {}> {
  async componentDidMount(): Promise<void> {
    await this.props.imageUiStore.loadSearchResults();
  }

  render(): JSX.Element {
    return (
      <Row gutter={8}>
        {
          this.props.imageUiStore.getIsLoading() ? <Spin size="large" /> :
          this.props.imageStore.imagesList.length <= 0 ? <Col span={8}><Title level={2}>No results :(</Title></Col> :
          this.props.imageUiStore.getIsListView() ? <ListView imageStore={this.props.imageStore} /> : <GridView imageStore={this.props.imageStore} />
        }
      </Row>
    );
  }
}