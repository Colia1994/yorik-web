import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

const BasicHydodo = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader />
      </Cell>

      <Cell colSpan={12}>
        <BasicList />
      </Cell>
    </ResponsiveGrid>
  );
};

export default BasicHydodo;
