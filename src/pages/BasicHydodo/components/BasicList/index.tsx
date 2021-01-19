import React, { useState, useEffect} from 'react';
import { Box, Search, Card, Tag, Divider, Typography, Icon, Loading, Button, Pagination } from '@alifd/next';
import { searchGoods, getAllCats } from '@/models/api/goods';
import { GoodsDetailDTO, GoodsCatDTO } from '@/models/schema/goods';


import styles from './index.module.scss';

const { Group: TagGroup, Selectable: SelectableTag } = Tag;

export interface ICardItem {
  title?: string;
  content?: string;
  subContent?: string;
}

export interface DataSource {
  datas: GoodsDetailDTO[]
  pageNo: number
  total: number
  value: string
  tabs: GoodsCatDTO[]
  currentCatId: number
  currentTabIndex: number
}

const DEFAULT_DATA: DataSource = {
  datas: [],
  pageNo: 1,
  total: 0,
  value: '',
  tabs: [],
  currentCatId: 0,
  currentTabIndex: 0,

};

const BasicList: React.FunctionComponent = (): JSX.Element => {


  const [loading, setLoading] = useState<boolean>(true);
  //标签
  const [tabs, setTabs] = useState<GoodsCatDTO[]>([]);
  //当前选中标签
  const [currentCatId, setCatId] = useState<number>(DEFAULT_DATA.currentCatId);
  //商品数据
  const [datas, setDatas] = useState<GoodsDetailDTO[]>(DEFAULT_DATA.datas);
  //页码
  const [pageNo, setPageNo] = useState<number>(DEFAULT_DATA.pageNo);
  //总数
  const [total, setTotal] = useState<number>(DEFAULT_DATA.total);


  useEffect(() => {
    requestCatsList();
  }, []);

  useEffect(() => {
    requestGoodsList();
  }, [currentCatId]);

  const onSearch = () => requestCatsList()

  const onTagValueChange = (v: number) => {
    setLoading(true);
    setCatId(v);
  };


  const onSearchClick = () => requestGoodsList();

  const onPaginationChange = (current: number) => {
    setPageNo(current);
    requestGoodsList();
  }

 /**
   * 获取全量标签
   */
  const requestCatsList = () => {
    getAllCats().then(res => {
      setTabs(res.goodsCatsList); 
      setCatId(res.goodsCatsList[0].catId);
    }).catch(()=>{})
  };

  const requestGoodsList = () => {
    setLoading(true);
    searchGoods({
      pageNo: pageNo,
      pageSize: 10,
      keyword:  undefined,
      catId: currentCatId === 0 ? undefined : currentCatId,
    }).then(res => {
      setDatas(res.records);
      setTotal(res.total);
      }).finally(() => setLoading(false))
  }

  const renderTabList = () => {
    //获取全量 tag 
    return tabs.map((tab: GoodsCatDTO, i: number) => (
      <SelectableTag
        key={tab.catId}
        checked={currentCatId === tab.catId}
        onChange={() => onTagValueChange(tab.catId)}
      >{tab.catName}
      </SelectableTag>
    ));
  };


  const renderCards = () => {
    return datas.map((c: GoodsDetailDTO, i: number) => (
      <div className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <div className={styles.left}>
            <img src={c.goodsThumbnailUrl} alt="img" />
            <div>
              <div className={styles.title}>
                {c.goodsName}
              </div>
              <div className={styles.content}>
                {c.goodsDesc}
              </div>
              <div className={styles.subContent}>
                {c.categoryName}
              </div>
              <div className={styles.subContent}>
                {c.minGroupPrice/100}
              </div>
              <div className={styles.subContent}>
                {c.minGroupPrice/100}
              </div>
              <div className={styles.subContent}>
                {c.promotionRate/10}%
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Button type="primary" text>查看详情</Button>
          </div>
        </div>
      </div>
    ));
  };


  return (
    <>
      <Card free className={styles.BasicList}>
        <Box align="center">
          <Search type="primary" hasIcon={false} searchText="搜索" onSearch={onSearchClick} />
        </Box>
        <Divider dashed style={{ margin: '24px 0' }} />
        <Box className={styles.TagBox}>
          <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>标签分类</Typography.Text>
            <TagGroup>{renderTabList()}</TagGroup>
          </div>
        </Box>

        <Loading visible={loading} className={styles.MainList}>
          <Box className={styles.MainContent} spacing={0.5}>
            {renderCards()}
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}>
                共<span>{total}</span>条
              </div>
              <Pagination current={pageNo} total={total} onChange={onPaginationChange} />
            </Box>
          </Box>
        </Loading>
      </Card>
    </>
  );
};

export default BasicList;
