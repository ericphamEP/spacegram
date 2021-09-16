import React from 'react';
import { observer } from "mobx-react"
import { Moment } from 'moment';
import { ImageStore } from './../store/ImageStore';
import { ImageUiStore } from './../store/ImageUiStore';
import { Col, Pagination, Row, Switch, Popover, Tag, Button, Input, Select, DatePicker, Typography } from 'antd';
import { PictureOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface QueryBarProps {
  imageStore: ImageStore,
  imageUiStore: ImageUiStore,
}

@observer
export class QueryBar extends React.Component<QueryBarProps, {}> {
  mapFilterKeysToNames: { [x: string]: string } = {
    description: "Description",
    description_508: "Description 508",
    keywords: "Keywords",
    location: "Location",
    photographer: "Photographer",
    secondary_creator: "Secondary Creator",
    title: "Title",
    year_start: "Year Start",
    year_end: "Year End",
  }

  showTotalAssets = (total: number, range: number[]): string => {
    return `${range[0]}-${range[1]} of ${total} images`;
  }
  onPageChange = (page: number): void => {
    this.props.imageUiStore.setPage(page);
    this.props.imageUiStore.loadSearchResults();
  }
  onViewChange = (checked: boolean): void => {
    this.props.imageUiStore.setIsListView(!checked);
  }
  onFilterOptionChange = (option: string): void => {
    this.props.imageUiStore.setSelectedFilter(option);
  }
  onFilterValueChange = (input: any): void => {
    this.props.imageUiStore.editFilter(input.target.value);
  }
  onFilterDateChange = (date: Moment | null, dateString: string): void => {
    let year = "";
    if (date) {
      year = date?.format("YYYY");
    } else {
      year = dateString;
    }
    this.props.imageUiStore.editFilter(year);
  }
  onRemoveFilter = (option: string): void => {
    this.props.imageUiStore.removeFilter(option);
  }

  render(): JSX.Element {
    const currentPage = this.props.imageUiStore.getPage();
    const filters: { [x: string]: string } = this.props.imageUiStore.getFilters();
    return (
      <React.Fragment>
        <Row>
          <Col span={8}>
            <Pagination
              size="small"
              total={this.props.imageStore.totalImagesCount > 1000 ? 1000 : this.props.imageStore.totalImagesCount} // Maximum of 1000 results per query is allowed by NASA API
              current={currentPage}
              showTotal={this.showTotalAssets}
              pageSize={100}
              showQuickJumper
              showSizeChanger={false}
              onChange={this.onPageChange}
              style={{ paddingBottom: 20 }}
            />
          </Col>
          <Col span={8} offset={8} style={{ textAlign: "right" }}>
            <Switch
              checkedChildren={<PictureOutlined />}
              unCheckedChildren={<UnorderedListOutlined />}
              onChange={this.onViewChange}
              defaultChecked
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Popover style={{ width: 200 }} trigger="click" content={
              <Input.Group compact>
                <Select defaultValue={this.props.imageUiStore.getSelectedFilter()} onChange={this.onFilterOptionChange} showSearch style={{ width: 200, marginBottom: 10 }}>
                  {Object.keys(this.mapFilterKeysToNames).map((filterValue) => <Select.Option value={filterValue} key={filterValue}>{this.mapFilterKeysToNames[filterValue]}</Select.Option>)}
                </Select>
                {this.props.imageUiStore.getSelectedFilter() == "year_start" || this.props.imageUiStore.getSelectedFilter() == "year_end" ?
                  <DatePicker onChange={this.onFilterDateChange} picker="year" /> : <Input placeholder={"Enter filter value"} onChange={this.onFilterValueChange} allowClear />}
              </Input.Group>
            }>
              <Button>Add Filter</Button>
            </Popover>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: 20, marginBottom: 10 }}>
            <Text>Filters: </Text>
            {Object.keys(filters).map((key: string) =>
              <Tag key={key} closable onClose={() => this.onRemoveFilter(key)}>{this.mapFilterKeysToNames[key]}: {filters[key]}</Tag>)}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}