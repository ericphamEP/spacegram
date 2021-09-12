import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { Row, Col, Typography, Spin } from 'antd';
import { ImagePreview } from './ImagePreview';

const { Text } = Typography;

interface SearchPageProps {
  imageStore: ImageStore,
  imageUiStore: ImageUiStore,
}

@observer
export class SearchPage extends React.Component<SearchPageProps, {}> {
  render() {
    return (
      <Row gutter={8}>
        {
          this.props.imageUiStore.getIsLoading() ? <Spin size="large" /> :
          this.props.imageStore.imagesList.length <= 0 ? <Text>No results. Try searching!</Text> :
            this.props.imageStore.imagesList.map((imageData) => {
              return <Col span={4}><ImagePreview key={imageData.id} image={imageData} onLike={this.props.imageStore.onLike} liked={this.props.imageStore.likedImages[imageData.id]} /></Col>
            })
        }
      </Row>
      
    );
  }
}