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
      label: 'Оплата за холодное водоснабжение',
      data: graphData.map((el) => el['Оплата за холодное водоснабжение']),
      borderColor: 'rgb(255, 99, 203)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Оплата за услуги водоотведения',
      data: graphData.map((el) => el['Оплата за услуги водоотведения']),
      borderColor: 'rgb(252, 255, 99)',
      backgroundColor: 'rgba(232, 255, 99, 0.5)',
    },
  ],
};

export const Communal = () => {
  return <Line options={options} data={data} />;
};
