import React from 'react';
import { observer } from "mobx-react"
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { Pagination } from 'antd';

interface QueryBarProps {
  imageStore: ImageStore,
  imageUiStore: ImageUiStore,
}

@observer
export class QueryBar extends React.Component<QueryBarProps, {}> {
  showTotalAssets = (total: number, range: number[]): string => {
    return `${range[0]}-${range[1]} of ${total} items`;
  }
  onPageChange = (page: number): void => {
    this.props.imageUiStore.setPage(page);
    this.props.imageUiStore.loadSearchResults();
  }

  render(): JSX.Element {
    const currentPage = this.props.imageUiStore.getPage();
    return (
      <Pagination 
        size="small" 
        total={this.props.imageStore.totalImagesCount > 1000 ? 1000 : this.props.imageStore.totalImagesCount} // Maximum of 1000 results per query is allowed by NASA API
        current={currentPage} 
        showTotal={this.showTotalAssets} 
        pageSize={100} 
        showQuickJumper 
        showSizeChanger={false}
        onChange={this.onPageChange}
        style={{paddingBottom: 20}}
      />
    );
  }
}