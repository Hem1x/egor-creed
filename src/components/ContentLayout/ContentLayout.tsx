import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import AnalyticPage from '../../pages/AnalyticPage';
import Best from '../../pages/Best';
import Relocate from '../../pages/Relocate';

const ContentLayout = () => {
  return (
    <Layout.Content style={{ paddingInline: 50, paddingBlock: 25 }}>
      <Routes>
        <Route path={'/analytic'} element={<AnalyticPage />} />
        <Route path={'/best'} element={<Best />} />
        <Route path={'/relocate'} element={<Relocate />} />
        <Route path={'/*'} element={<AnalyticPage />} />
      </Routes>
    </Layout.Content>
  );
};

export default ContentLayout;
