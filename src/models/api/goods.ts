/**
 * 商品管理
 */
import {
  sourceSDK,
} from '@/models/source-sdk';

import {
  GoodsCatsDTO,
  GoodsDetailRequest,
  GoodsDetailDTO,
  GoodsRecommendRequest,
  GoodsListDTO,
  GoodsSearchRequest,
} from '../schema/goods';

// 商品类目信息
export const getAllCats = () => {
  return sourceSDK.wrappedRequest<GoodsCatsDTO>({
    url: 'api/goods/getAllCats',
  })
};

// 获取商品详情
export const getGoodsDetail = (body: GoodsDetailRequest) => {
  return sourceSDK.wrappedRequest<GoodsDetailDTO>({
    url: 'api/goods/getGoodsDetail',
    body: body,
  })
};

// 获取推荐商品信息
export const getGoodsList = (body: GoodsRecommendRequest) => {
  return sourceSDK.wrappedRequest<GoodsListDTO>({
    url: 'api/goods/getRecommendGoods',
    body: body,
  })
};

// 搜索商品
export const searchGoods = (body: Partial<GoodsSearchRequest>) => {
  return sourceSDK.wrappedRequest<GoodsListDTO>({
    url: 'api/goods/searchGoods',
    body: body,
  })
};
