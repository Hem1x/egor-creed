import { useEffect, useState } from 'react';
import { Typography, Form, Col, Select, Input, Space, Button, Modal } from 'antd';
import axios from 'axios';

interface requestForm {
  area: number;
  communals: number;
  investSum: number;
  selectedCity: string;
}

interface ResponseData {
  electro: number;
  teplo: number;
  kanal: number;
  gaz: number;
  electro_old: number;
  teplo_old: number;
  kanal_old: number;
  gaz_old: number;
  price: number;
  price2: number;
  price3: number;
  price4: number;
  pogoda: number;
  oplata: number;
  okupaemost: number;
}

const Relocate = () => {
  const [form] = Form.useForm();
  const [cities, setCities] = useState<string[] | null>(null);
  const [asyncData, setAsyncData] = useState<requestForm | null>(null);
  const [serverData, setServerData] = useState<ResponseData[] | null>(null);

  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post(
          `https://alexbobr.ru/invest/?summa=${asyncData?.investSum}&chekbox=${asyncData?.communals}&square=${asyncData?.area}`,
        );
        setServerData(response.data);
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    }

    postData();
  }, [asyncData]);

  const onFinish = (value: requestForm) => {
    const formData = {
      ...value,
      area: +value.area,
      communals: +value.communals,
      investSum: +value.investSum,
    };
    setAsyncData(formData);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleOk = () => {
    setAsyncData(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setAsyncData(null);
  };

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await axios.get('https://alexbobr.ru/test_city/');
        setCities(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCities();
  }, []);

  return (
    <div>
      {serverData && (
        <Modal
          okText="Продолжить"
          cancelText="Закрыть"
          width={1000}
          title="Рассчёт эффективности"
          open={!!asyncData}
          onOk={handleOk}
          onCancel={handleCancel}></Modal>
      )}
      <Typography.Title style={{ fontWeight: '700', marginBottom: 30 }} level={2}>
        Релокация точки
      </Typography.Title>

      <Form form={form} name={'form'} onFinish={onFinish} layout="vertical">
        <Col span={12}>
          <Form.Item label="Выберите город" name="selectedCity">
            <Select showSearch placeholder="Выберите город">
              {cities ? (
                cities.map((el) => <Select.Option value={el}>{el}</Select.Option>)
              ) : (
                <Select.Option>Нет данных</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item label="Сумма затрат на релокацию" name={'investSum'}>
            <Input type="number" placeholder="введите сумму" />
          </Form.Item>

          <Form.Item label="Введите площадь нового здания" name="area">
            <Input type="number" placeholder="введите площадь" />
          </Form.Item>

          <Form.Item
            name="communals"
            label="Введите затраты на коммунальные платежи в старом здании в год в сумме">
            <Input type="number" placeholder="введите затраты" />
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right', gap: 10 }}>
              <Button danger htmlType="button" onClick={onReset}>
                Очистить
              </Button>

              <Button type="primary" htmlType="submit">
                Применить
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Form>
    </div>
  );
};

export default Relocate;
