import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from '../store/ImageUiStore';
import { List } from 'antd';
import { ImagePreview } from './ImagePreview';

const { Item } = List;

interface GridViewProps {
  imageStore: ImageStore,
  imageUiStore: ImageUiStore,
}

@observer
export class GridView extends React.Component<GridViewProps, {}> {
  render(): JSX.Element {
    const onLike = (assetId: string): void => {
      this.props.imageStore.onLike(assetId);
      this.forceUpdate();
    }
    const likedImages = this.props.imageStore.likedImages;
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
        dataSource={this.props.imageStore.imagesList}
        renderItem={imageData => (
          <Item key={imageData.id}>
            <ImagePreview image={imageData} onDetail={this.props.imageUiStore.loadImageDetails} onLike={onLike} liked={likedImages[imageData.id]} />
          </Item>
        )}
      />
    );
  }
}
