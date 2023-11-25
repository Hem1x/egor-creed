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
import { Line } from 'react-chartjs-2';
import { graphData } from '../../helpers/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Коммунальные показатели №1',
    },
  },
};

const labels = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июнь', 'июль', 'авг'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Оплата за тепловую энергию по тарифам здание',
      data: graphData.map(
        (el) => el['Оплата за тепловую энергию по тарифам здание'],
      ),
      borderColor: 'rgb(141, 99, 255)',
      backgroundColor: 'rgba(128, 99, 255, 0.5)',
    },
    {
      label: 'Оплата за электроэнергию по тарифам',
      data: graphData.map((el) => el['Оплата за электроэнергию по тарифам']),
      borderColor: 'rgb(255, 122, 99)',
      backgroundColor: 'rgba(255, 148, 99, 0.5)',
    },
  ],
};

export const Communal2 = () => {
  return <Line options={options} data={data} />;
};
