import React from 'react';
import { Card, Typography } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Image } from "./../service/ImageInterfaces";

const { Meta } = Card;
const { Paragraph } = Typography;

interface SearchPageProps {
  image: Image,
  liked: boolean,
  onLike: (assetId: string) => void,
}

export class ImagePreview extends React.Component<SearchPageProps, {}> {
  render(): JSX.Element {
    return (
      <Card
        hoverable
        style={{ width: 300, margin: 10 }}
        cover={
          <img
            alt={this.props.image.id}
            src={this.props.image.imgUrl}
          />
        }
        actions={[
          this.props.liked ? <HeartFilled onClick={() => this.props.onLike(this.props.image.id)} /> :
          <HeartOutlined onClick={() => this.props.onLike(this.props.image.id)} />,
        ]}
      >
        <Meta
          title={this.props.image.title}
          description={<Paragraph ellipsis={{rows: 3}}>{this.props.image.description}</Paragraph>}
        />
      </Card>
    );
  }
}