import React from 'react';
import { Card, Typography } from 'antd';
import moment from 'moment';
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
        style={{ width: 300, height: 500, margin: 10, overflow: 'hidden' }}
        cover={
          <div style={{ overflow: "hidden", height: "265px" }}>
            <img
              style={{ height: "100%", display: 'block', marginLeft: "auto", marginRight: "auto" }}
              alt={this.props.image.id}
              src={this.props.image.imgUrl}
            />
          </div>
        }
        actions={[
          this.props.liked ? <HeartFilled onClick={() => this.props.onLike(this.props.image.id)} /> :
          <HeartOutlined onClick={() => this.props.onLike(this.props.image.id)} />,
        ]}
      >
        <Meta
          title={this.props.image.title}
          description={<React.Fragment><Paragraph ellipsis={{rows: 3}}>{moment(this.props.image.date).format("MMM D YYYY, h:mm:ss a")}</Paragraph><Paragraph ellipsis={{rows: 3}}>{this.props.image.description}</Paragraph></React.Fragment>}
        />
      </Card>
    );
  }
}