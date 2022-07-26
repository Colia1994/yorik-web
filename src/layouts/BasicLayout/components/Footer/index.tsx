import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      {/* <span className={styles.logo}>Alibaba Fusion</span> */}
      <br />
      <a className={styles.copyright} href="https://beian.miit.gov.cn/">沪ICP备20024959号</a>
    </p>
  );
}
