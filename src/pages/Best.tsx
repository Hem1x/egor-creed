import { useState } from 'react';
import { Modal, Form, Input, Typography, Slider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { numberFormatter } from '../helpers/numberFormatter';
import axios from 'axios';

const Best = () => {
  const [moduleState, setModuleState] = useState(true);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [donationValueState, setDonationValueState] = useState(0);

  const handleOk = () => {
    setModuleState(false);
    navigate('/analytic');
  };

  const handleCancel = () => {
    setModuleState(false);
    navigate('/analytic');
  };

  const [data, setData] = useState<[string, number, number][] | null>(null);

  const onClick = () => {
    async function fetchData() {
      try {
        const response = await axios.get('https://alexbobr.ru/get_best_adresses/');
        if (response.data && donationValueState) {
          setData(response.data);
        } else {
          // Обработка случая, когда данные отсутствуют в ответе
          console.error('No data found in the response');
          setData(null);
        }
      } catch (error) {
        console.error(error);
        setData(null);
      }
    }

    fetchData();
    console.log(data);
  };
  return (
    <div>
      <Modal
        okText="Продолжить"
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        cancelText="Закрыть"
        width={750}
        title=""
        open={moduleState}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div style={{ paddingInline: 40 }}>
          <Typography.Title level={2} style={{ fontWeight: '700' }}>
            Лучшие варианты вложений
          </Typography.Title>
          <Form form={form} layout="vertical" style={{ marginBlock: 30 }}>
            <Form.Item label="Сумма инвестиций" name="donationValue">
              <Input
                placeholder="введите сумму"
                type="number"
                value={donationValueState}
                onChange={(e) => setDonationValueState(+e.target.value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Typography.Text style={{ fontSize: 18, fontWeight: '600' }}>
                {numberFormatter(donationValueState)} ₽
              </Typography.Text>
            </div>

            <Form.Item>
              <Slider
                min={0}
                max={60000000}
                step={100000}
                onChange={(e) => setDonationValueState(+e)}
                value={donationValueState}
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="button"
                onClick={onClick}
                style={{ float: 'right' }}
                type={'primary'}>
                Применить
              </Button>
            </Form.Item>
          </Form>

          <div style={{ display: 'flex', gap: 24, overflowX: 'scroll' }}>
            {data &&
              data.map((el) => (
                <div
                  style={{
                    minWidth: 200,
                    position: 'relative',
                    padding: 12,
                    border: '1px solid #b4b4b4',
                    borderRadius: 4,
                  }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      borderRadius: 9999,
                      width: 2,
                      height: '100%',
                      backgroundColor: '#0066FF',
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: '#F4F4F8',
                      width: 'fit-content',
                      paddingBlock: 2,
                      paddingInline: 8,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}>
                    Топ инвестиций
                  </div>
                  <div style={{ fontWeight: '600', marginBottom: 5 }}>{el[0]}</div>
                  <div>
                    {el[1]} - {el[1]}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Best;
