import { LineChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
    PH: 2890,
    'Turbidez': 2338,
  },
  {
    date: 'Feb 22',
    PH: 2756,
    'Turbidez': 2103,
  },
  {
    date: 'Mar 22',
    PH: 3322,
    'Turbidez': 2194,
  },
  {
    date: 'Apr 22',
    PH: 3470,
    'Turbidez': 2108,
  },
  {
    date: 'May 22',
    PH: 3475,
    'Turbidez': 1812,
  },
  {
    date: 'Jun 22',
    PH: 3129,
    'Turbidez': 1726,
  },
  {
    date: 'Jul 22',
    PH: 3490,
    'Turbidez': 1982,
  },
  {
    date: 'Aug 22',
    PH: 2903,
    'Turbidez': 2012,
  },
  {
    date: 'Sep 22',
    PH: 2643,
    'Turbidez': 2342,
  },
  {
    date: 'Oct 22',
    PH: 2837,
    'Turbidez': 2473,
  },
  {
    date: 'Nov 22',
    PH: 2954,
    'Turbidez': 3848,
  },
  {
    date: 'Dec 22',
    PH: 3239,
    'Turbidez': 3736,
  },
];

const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function GraficaLineal() {
  return (
    <LineChart
      className="h-80"
      data={chartdata}
      index="date"
      categories={['PH', 'Turbidez']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}