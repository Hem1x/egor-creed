import { Layout } from 'antd';
import Navigation from './components/Navigation/Navigation';
import ContentLayout from './components/ContentLayout/ContentLayout';

const App = () => {
  // const [collapsed, setCollapsed] = useState(true);

  // const toggleCollapsed = () => {
  //   setCollapsed((prev) => !prev);
  // };

  return (
    <Layout style={{ width: '100%', height: '100vh', backgroundColor: '#fff' }}>
      <Navigation />
      <ContentLayout />
    </Layout>
  );
};

export default App;
