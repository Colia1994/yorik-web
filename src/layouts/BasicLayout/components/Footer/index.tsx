import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
        <span className={styles.copyright}>沪ICP备20024959号-1</span>
      </a>
    </p>
  );
}
