import { PieChartOutlined, StarOutlined, CompassOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const menuItems = [
    {
      key: 'best',
      label: 'Лучшие вложения',
      icon: <StarOutlined style={{ color: '#FFA800' }} />,
    },
    {
      key: 'analytic',
      label: 'Аналитика',
      icon: <PieChartOutlined style={{ color: '#7000FF' }} />,
    },
    {
      key: 'relocate',
      label: 'Релокация точки',
      icon: <CompassOutlined style={{ color: '#724c07' }} />,
    },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout.Sider
      style={{ backgroundColor: '#F8F8F8' }}
      collapsible
      width={264}
      theme="light">
      <Typography.Title style={{ paddingLeft: 40, fontWeight: '800' }}>
        AI Office
      </Typography.Title>
      <Menu
        defaultOpenKeys={['analytic']}
        items={menuItems}
        mode="inline"
        selectedKeys={[pathname.split('/')[1]]}
        style={{ paddingInline: 10, backgroundColor: '#F8F8F8', border: 'none' }}
        onClick={(e) => navigate('/' + e.key)}
      />
    </Layout.Sider>
  );
};

export default Navigation;
