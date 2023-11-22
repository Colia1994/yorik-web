import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import BasicLayout from '@/layouts/BasicLayout';
import Solution from '@/pages/Solution';
import Analysis from '@/pages/Analysis';
import Monitor from '@/pages/Monitor';
import Workplace from '@/pages/Workplace';
import CardListPage from '@/pages/CardListPage';

import BasicHydodo from '@/pages/BasicHydodo';
import ChatGPT from '@/pages/ChatGPT';


const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        // 惠多多 商品查询
        path: '/hydodo/goods',
        component: BasicHydodo,
      },
      {
        // 惠多多 商品查询
        path: '/openAI/chatgpt',
        component: ChatGPT,
      },
      // --- 下面是ice自动的模板 留着是为了学习
      {
        path: '/solution',
        component: Solution,
      },
      {
        path: '/dashboard/analysis',
        component: Analysis,
      },
      {
        path: '/dashboard/monitor',
        component: Monitor,
      },
      {
        path: '/dashboard/workplace',
        component: Workplace,
      },
      {
        path: '/list/card',
        component: CardListPage,
      },
      {
        path: '/',
        redirect: '/openAI/chatgpt',
      },
    ],
  },
];
export default routerConfig;
