import { useEffect, useState } from 'react';
import {
  Typography,
  Form,
  Select,
  Modal,
  Button,
  Row,
  Col,
  Slider,
  InputNumber,
  Checkbox,
  Space,
} from 'antd';
import { numberFormatter } from '../helpers/numberFormatter';
import axios from 'axios';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { dataCost } from '../helpers/data';
import { Communal } from '../components/Communal/Communal';
import { Communal2 } from '../components/Communal2/Communal2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
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

const ResponseDataComponent = ({
  data,
  year,
}: {
  data: ResponseDataForm;
  year: number;
}) => {
  const [serverData, setServerData] = useState<ResponseData[] | null>(null);

  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post(
          `https://alexbobr.ru/invest/?summa=${data.donationSum}&chekbox=${data.selectedDonationType}&square=${data.area}`,
        );
        setServerData(response.data);
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    }

    postData();
  }, [data.area, data.donationSum, data.selectedDonationType]);

  const headers = serverData
    ? [
        {
          text: 'Оплата за эл. энергию',
          value: serverData[0].electro,
          type: 'руб.',
        },
        {
          text: 'Оплата за тепл. энергию',
          value: serverData[0].teplo,
          type: 'руб.',
        },
        {
          text: 'Оплата водоснабжения',
          value: serverData[0].kanal,
          type: 'руб.',
        },
        {
          text: 'Оплата за газ',
          value: serverData[0].gaz,
          type: 'руб.',
        },
        {
          text: 'Средняя температура',
          value: serverData[0].pogoda,
          type: 'градусы',
        },
      ]
    : [];

  return (
    <div>
      {}
      <h1>за {year} год</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 30,
          backgroundColor: '#f0f0f0',
          padding: 16,
          paddingRight: 32,
          borderRadius: 10,
        }}>
        {headers.map((el) => (
          <div key={el.text}>
            <div style={{ color: '#878787', fontSize: 14 }}>{el.text}</div>
            <div>
              <span
                style={{
                  fontSize: 20,
                }}>
                {el.value}{' '}
              </span>
              <span
                style={{
                  color: '#a8a8a8',
                  fontSize: 13,
                }}>
                {el.type}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ color: '#68B1FF', fontWeight: '600', marginTop: 10 }}>
        Прогноз инфляции ком. платежей
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ArrowUpOutlined style={{ color: '#00D62F', fontSize: 25 }} />
        <span style={{ fontSize: 24, fontWeight: '700' }}>8</span>
        <span style={{ alignSelf: 'center', color: '#8d8d8d' }}>%</span>
      </div>
    </div>
  );
};

const ModalData = ({ asyncData }: { asyncData: ResponseDataForm }) => {
  const [serverData, setServerData] = useState<ResponseData[] | null>(null);
  const labels = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июнь', 'июль', 'авг'];

  const options = {
    scales: {
      y: {
        min: -2,
        max: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Инфляция',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '2023',
        data: dataCost['2023'],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '2022',
        data: dataCost['2022'],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: '2021',
        data: dataCost['2021'],
        borderColor: 'rgb(4, 38, 61)',
        backgroundColor: 'rgb(4, 38, 61)',
      },
      {
        label: '2020',
        data: dataCost['2020'],
        borderColor: 'rgb(96, 235, 53)',
        backgroundColor: 'rgb(96, 235, 53)',
      },
      {
        label: '2019',
        data: dataCost['2019'],
        borderColor: 'rgb(235, 187, 53)',
        backgroundColor: 'rgb(235, 187, 53)',
      },
      {
        label: '2018',
        data: dataCost['2018'],
        borderColor: 'rgb(235, 53, 211)',
        backgroundColor: 'rgb(235, 53, 211)',
      },
      {
        label: '2017',
        data: dataCost['2017'],
        borderColor: 'rgb(102, 53, 235)',
        backgroundColor: 'rgb(102, 53, 235)',
      },
    ],
  };
  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post(
          `https://alexbobr.ru/invest/?summa=${asyncData.donationSum}&chekbox=${asyncData.selectedDonationType}&square=${asyncData.area}`,
        );
        setServerData(response.data);
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    }

    postData();
  }, [asyncData.area, asyncData.donationSum, asyncData.selectedDonationType]);
  return (
    <>
      {serverData && (
        <div style={{ float: 'right', textAlign: 'right', marginTop: 20 }}>
          <p
            style={{ margin: 0, color: '#D098EC', fontSize: 17, fontWeight: '600' }}>
            Срок окупаепости
          </p>
          <span style={{ fontSize: 25, fontWeight: '700', marginRight: 4 }}>
            {serverData[0].okupaemost}
          </span>
          <span style={{ color: '#bbb' }}>год</span>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 70,
          paddingInline: 30,
        }}>
        {serverData && (
          <>
            <ResponseDataComponent data={asyncData} year={2022} />
            <ResponseDataComponent data={asyncData} year={2023} />
            <ResponseDataComponent data={asyncData} year={2024} />
            <Line options={options} data={data} />
            <Communal />
            <Communal2 />
          </>
        )}
      </div>
    </>
  );
};

const AnalyticPage = () => {
  const [form] = Form.useForm();
  const [donationType, setDonationType] = useState(false);
  const [donationSum, setDonationSum] = useState(0);
  const [asyncData, setAsyncData] = useState<ResponseDataForm | null>(null);

  const handleOk = () => {
    setAsyncData(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setAsyncData(null);
  };

  const onChangeSum = (newValue: number) => {
    setDonationSum(newValue);
  };

  const onFinish = (value: ResponseDataForm) => {
    if (value.selectedCity && value.donationSum && value.selectedAddress) {
      const formData = { ...value, donationSum };
      setAsyncData(formData);
    }
  };

  const onReset = () => {
    form.resetFields();
    setDonationSum(0);
    setDonationType(false);
  };

  const [cities, setCities] = useState<string[] | null>(null);
  const [addresses, setAddresses] = useState<string[] | null>(null);

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

  async function fetchAddress() {
    try {
      const response = await axios.get(
        `https://alexbobr.ru/test_adres/?city=${decodeURIComponent(
          form.getFieldValue('selectedCity'),
        )}`,
      );
      setAddresses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {asyncData && (
        <Modal
          okText="Продолжить"
          cancelText="Закрыть"
          width={1000}
          title="Рассчёт эффективности"
          open={!!asyncData}
          onOk={handleOk}
          onCancel={handleCancel}>
          <ModalData asyncData={asyncData} />
        </Modal>
      )}

      <Typography.Title style={{ fontWeight: '700', marginBottom: 30 }} level={2}>
        Аналитика
      </Typography.Title>

      <Form form={form} name={'form'} onFinish={onFinish} layout="vertical">
        <Col span={12} style={{ marginBlock: 50 }}>
          <Form.Item
            style={{ marginBlock: 30 }}
            label="Выберите город"
            name="selectedCity">
            <Select
              showSearch
              placeholder="Выберите город"
              onChange={() => {
                fetchAddress();
                form.setFieldValue('selectedAddress', null);
              }}>
              {cities ? (
                cities.map((el) => <Select.Option value={el}>{el}</Select.Option>)
              ) : (
                <Select.Option>Нет данных</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item label="Выберите адрес" name="selectedAddress">
            <Select placeholder="Выберите адрес" disabled={!addresses}>
              {addresses ? (
                addresses.map((el) => <Select.Option value={el}>{el}</Select.Option>)
              ) : (
                <Select.Option>Нет данных</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 40 }} label="Сумма инвестиций">
            <Row style={{ paddingInline: 50, marginBlock: 10 }}>
              <Col span={16}>
                <Slider
                  min={0}
                  max={60000000}
                  step={100000}
                  onChange={onChangeSum}
                  value={donationSum}
                />
              </Col>
              <Col span={8} style={{ paddingLeft: 20 }}>
                <Typography.Text
                  editable={{
                    onChange: (e) => setDonationSum(+e),
                    text: donationSum.toString(),
                  }}>
                  {numberFormatter(donationSum)} ₽
                </Typography.Text>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            style={{ marginTop: 40 }}
            name="area"
            label="Расширить площадь здания">
            <InputNumber style={{ width: '100%' }} placeholder="введите площадь" />
          </Form.Item>

          <Row style={{ marginBlock: 30 }}>
            <Col span={12}>
              <Checkbox
                value={donationType}
                style={{ marginBlock: 5 }}
                onChange={() => {
                  form.setFieldValue('selectedDonationType', 0);
                  setDonationType((prev) => !prev);
                }}>
                Выбрать пункты для инвестиций
              </Checkbox>
            </Col>

            <Col span={12}>
              <Form.Item name={'selectedDonationType'} style={{ marginBlock: 1 }}>
                {donationType && (
                  <Select placeholder="0" popupMatchSelectWidth={250}>
                    <Select.Option disabled value={0}>
                      Выберите пункты для инвестиций
                    </Select.Option>
                    <Select.Option value={1}>Утепление здания</Select.Option>
                    <Select.Option value={2}>Улучшение водопровода</Select.Option>
                    <Select.Option value={3}>
                      Улучшение энергоэффективности
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

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

interface ResponseDataForm {
  area: number;
  donationSum: number;
  selectedAddress: string;
  selectedCity: string;
  selectedDonationType: number;
}

export default AnalyticPage;
