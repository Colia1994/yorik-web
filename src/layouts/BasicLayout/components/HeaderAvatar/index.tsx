import React, {useEffect, useState}from 'react';

import { Avatar, Message,Overlay, Menu, Icon } from '@alifd/next';
import styles from './index.module.scss';
import { logout, currentUser } from '@/models/api/login';

const { Item } = Menu;
const { Popup } = Overlay;

export interface Props {
  name: string;
  avatar: string;
  mail: string;
}




// const UserProfile = ({ name, avatar, mail }) => {
//   return (
//     <div className={styles.profile}>
//       <div className={styles.avatar}>
//         <Avatar src={avatar} alt="用户头像" />
//       </div>
//       <div className={styles.content}>
//         <h4>{name}</h4>
//         <span>{mail}</span>
//       </div>
//     </div>
//   );
// };



const HeaderAvatar = (props: Props) => {

  const [name ,setName] = useState<String>(props.name);
  const [avatar ,setAvatar] = useState<String>(props.avatar);
  const [mail ,setMail] = useState<String>(props.mail);

  useEffect(() => {
    getCurretnUser();
  }, []);


   /**
   * 获取登陆用户
   */
  const getCurretnUser = () => {
    currentUser().then(res => {
      setName(res.userName);
    }).catch(()=>{})
    };

  const userLogout =() =>{
  logout().then(res => {
      Message.success('登出成功');
      window.location.href = "/#/user/login";
    });
  }

  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <Avatar size="small" src={avatar} alt="用户头像" />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </div>
      }
      triggerType="click"
    >
      <div className={styles.avatarPopup}>
        {/* <UserProfile {...props} /> */}
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Avatar src={avatar} alt="用户头像" />
          </div>
          <div className={styles.content}>
            <h4>{name}</h4>
            <span>{mail}</span>
          </div>
        </div>
        <Menu className={styles.menu}>
          <Item><Icon size="small" type="account" />个人设置</Item>
          <Item><Icon size="small" type="set" />系统设置</Item>
          <Item onClick={userLogout}><Icon size="small" type="exit" />退出</Item>
        </Menu>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  name: 'undify',
  mail: 'undify',
  avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
};

export default HeaderAvatar;
