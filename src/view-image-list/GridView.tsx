import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { Row, Col } from 'antd';
import { ImagePreview } from './ImagePreview';

interface GridViewProps {
  imageStore: ImageStore,
}

@observer
export class GridView extends React.Component<GridViewProps, {}> {
  render(): JSX.Element {
    return (
      <Row gutter={8}>
        {
          this.props.imageStore.imagesList.map((imageData) => {
            return <Col span={4} key={imageData.id}><ImagePreview image={imageData} onLike={this.props.imageStore.onLike} liked={this.props.imageStore.likedImages[imageData.id]} /></Col>
          })
        }
      </Row>
    );
  }
}