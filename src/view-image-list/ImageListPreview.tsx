import React from 'react';
import { observer } from "mobx-react"
import { List, Typography } from 'antd';
import moment from 'moment';
import { HeartOutlined, HeartFilled, FileSearchOutlined } from '@ant-design/icons';
import { Image } from "./../service/ImageInterfaces";

const { Item } = List
const { Paragraph } = Typography;

interface ImageListPreviewProps {
  image: Image,
  liked: boolean,
  onLike: (assetId: string) => void,
  onDetail: (assetId: string) => void,
}

@observer
export class ImageListPreview extends React.Component<ImageListPreviewProps, {}> {
  render(): JSX.Element {
    return (
      <Item
        key={this.props.image.id}
        actions={[
          <FileSearchOutlined key="details" onClick={() => this.props.onDetail(this.props.image.id)} />,
          this.props.liked ? <HeartFilled onClick={() => this.props.onLike(this.props.image.id)} /> :
          <HeartOutlined onClick={() => this.props.onLike(this.props.image.id)} />,
        ]}
        extra={
          <img
            width={350}
            alt={this.props.image.id}
            src={this.props.image.imgUrl}
          />
        }
      >
        <Item.Meta
          title={this.props.image.title}
          description={moment(this.props.image.date).format("MMM D YYYY, h:mm:ss a")}
        />
        {<Paragraph ellipsis={{rows: 3}}>{this.props.image.description}</Paragraph>}
      </Item>
    );
  }
}