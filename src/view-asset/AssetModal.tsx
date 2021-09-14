import React from 'react';
import { Typography, Spin, Modal, Image, Tag, Descriptions, Divider } from 'antd';
import moment from 'moment';
import { observer } from 'mobx-react';
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from '../store/ImageUiStore';

const { Text } = Typography;
const { Item } = Descriptions;

interface AssetModalProps {
  imageStore: ImageStore,
  imageUiStore: ImageUiStore,
}

@observer
export class AssetModal extends React.Component<AssetModalProps, {}> {
  handleClose = (): void => {
    this.props.imageUiStore.setIsDetailsOpen(false);
    this.props.imageUiStore.resetImageDetails();
  }

  render(): JSX.Element {
    const image = this.props.imageStore.imageDetails.image;
    const visible = this.props.imageUiStore.getIsDetailsOpen();
    const loading = this.props.imageUiStore.getIsDetailsLoading();
    
    return (
      <Modal 
        title={image ? image.title : "Details"}
        visible={visible} 
        onOk={this.handleClose} 
        onCancel={this.handleClose}
        footer={null}
        style={{minWidth: 1000}}
      >
        <div style={{margin: 20}}>
          {
          loading ? <Spin size="large" /> :
          !image ? "No image selected" : 
          <React.Fragment>
            <div style={{textAlign: "center"}}>
              <Image
                src={image.imgUrl}
              />
            </div>
            <Descriptions bordered style={{padding: 50}}>
              <Item label="Date Created">{moment(image.date).format("MMM D YYYY, h:mm:ss a")}</Item>
              <Item label="Center">{image.center}</Item>
              <Item label="Location">{image.location}</Item>
            </Descriptions>
            <Text>{image.description}</Text>
            <Divider />
            {image.keywords?.map((word) => {
              return <Tag key={word.toLowerCase()}>{word.toLowerCase()}</Tag>
            })}
          </React.Fragment>
          }
        </div>
      </Modal>
    );
  }
}