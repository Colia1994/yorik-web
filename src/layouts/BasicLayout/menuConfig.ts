const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '羊毛慧',
    path: '/',
    icon: 'picture',
    children: [
      {
        name: '商品查询',
        path: '/hydodo/goods',
      },
    ],
  },
  {
    name: 'OpenAI',
    path: '/openAI',
    icon: 'atm',
    children: [
      {
        name: 'chatGPT',
        path: '/chatgpt',
      },
    ],
  },
  // {
  //   name: '数据页面',
  //   path: '/',
  //   icon: 'chart-pie',
  //   children: [
  //     {
  //       name: '分析页面',
  //       path: '/dashboard/analysis',
  //     },
  //     {
  //       name: '监控页面',
  //       path: '/dashboard/monitor',
  //     },
  //     {
  //       name: '工作台',
  //       path: '/dashboard/workplace',
  //     },
  //   ],
  // },
];

export { headerMenuConfig, asideMenuConfig };
