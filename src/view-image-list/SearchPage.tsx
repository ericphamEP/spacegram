import React from 'react';
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { Typography } from 'antd';

const { Text } = Typography;

interface SearchPageProps {
    imageStore: ImageStore,
    imageUiStore: ImageUiStore,
}

export class SearchPage extends React.Component<SearchPageProps, {}> {
    render() {
      return (
        this.props.imageStore.imagesList ? this.props.imageStore.imagesList : <Text>No results. Try searching!</Text>
      );
    }
  }