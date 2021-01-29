import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

const BasicHydodo = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="商品查询"
          breadcrumbs={[{ name: '羊毛慧' }, { name: '商品查询' }]}
          description="模拟查询，查询佣金等完整参数"
        />
      </Cell>

      <Cell colSpan={12}>
        <BasicList />
      </Cell>
    </ResponsiveGrid>
  );
};

export default BasicHydodo;
