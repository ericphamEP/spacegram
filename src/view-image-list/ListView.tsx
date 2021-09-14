import React from 'react';
import { observer } from "mobx-react"
import { List } from 'antd';
import { ImageStore } from './../store/ImageStore';
import { ImageListPreview } from './ImageListPreview';

interface ListViewProps {
  imageStore: ImageStore,
}

@observer
export class ListView extends React.Component<ListViewProps, {}> {
  render(): JSX.Element {
    return (
      <List
        itemLayout="vertical"
        size="large"
        bordered
        style={{padding: 70, backgroundColor: 'white'}}
      >
        {
          this.props.imageStore.imagesList.map((imageData) => {
            return <ImageListPreview key={imageData.id} image={imageData} onLike={this.props.imageStore.onLike} liked={this.props.imageStore.likedImages[imageData.id]} />
          })
        }
      </List>
    );
  }
}