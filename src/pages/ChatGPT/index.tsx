import React from 'react';
import styles from './index.module.scss';
import { ResponsiveGrid } from '@alifd/next';

const { Cell } = ResponsiveGrid;

function ChatGPT() {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <iframe
          src="http://47.99.180.120:3000/" // 在这里替换为你想要嵌入的百度页面的URL
          className={styles.fullscreen}
        />
      </Cell>
    </ResponsiveGrid>
  );
}

export default ChatGPT;
