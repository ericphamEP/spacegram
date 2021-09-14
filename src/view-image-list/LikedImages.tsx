import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { Row, Col, Typography, Spin } from 'antd';
import { ImagePreview } from './ImagePreview';

const { Text } = Typography;

interface LikedImagesProps {
  imageStore: ImageStore,
  imageUiStore: ImageUiStore,
}

@observer
export class LikedImages extends React.Component<LikedImagesProps, {}> {
  async componentDidMount(): Promise<void> {
    await this.props.imageUiStore.loadLikedImages();
  }

  render(): JSX.Element {
    return (
      <Row gutter={8}>
        {
          this.props.imageUiStore.getIsLikeLoading() ? <Spin size="large" /> :
          this.props.imageStore.likedImagesList.length <= 0 ? <Col span={8}><Text>No liked images to display</Text></Col> :
            this.props.imageStore.likedImagesList.map((imageData) => {
              return <Col span={4} key={imageData.id}><ImagePreview image={imageData} onDetail={this.props.imageUiStore.loadImageDetails} onLike={this.props.imageStore.onLike} liked={this.props.imageStore.likedImages[imageData.id]} /></Col>
            })
        }
      </Row>
    );
  }
}