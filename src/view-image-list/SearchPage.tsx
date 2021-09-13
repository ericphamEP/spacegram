import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { Row, Col, Typography, Spin } from 'antd';
import { ImagePreview } from './ImagePreview';

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
            this.props.imageStore.imagesList.map((imageData) => {
              return <Col span={4} key={imageData.id}><ImagePreview image={imageData} onLike={this.props.imageStore.onLike} liked={this.props.imageStore.likedImages[imageData.id]} /></Col>
            })
        }
      </Row>
    );
  }
}