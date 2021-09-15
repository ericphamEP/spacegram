import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { List, Col, Typography, Spin } from 'antd';
import { ImagePreview } from './ImagePreview';

const { Text } = Typography;
const { Item } = List;

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
      <List 
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={this.props.imageStore.likedImagesList}
        renderItem={imageData => (
          <Item key={imageData.id}>
            <ImagePreview image={imageData} onDetail={this.props.imageUiStore.loadImageDetails} onLike={this.props.imageStore.onLike} liked={this.props.imageStore.likedImages[imageData.id]} />
          </Item>
        )}
      >
        {
          this.props.imageUiStore.getIsLikeLoading() ? <Spin size="large" /> :
          this.props.imageStore.likedImagesList.length <= 0 ? <Col span={8}><Text>No liked images to display</Text></Col> : null
        }
      </List>
    );
  }
}