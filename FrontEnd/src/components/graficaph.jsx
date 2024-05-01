/* eslint-disable react/prop-types */
import { AreaChart } from '@tremor/react';
import { SensoresContext } from "../context/sensores.context";
import { useContext } from "react";



export function GraficaPh() {
  const { historialPh } = useContext(SensoresContext);
const ultimos10Registros = historialPh.slice(0, 10).reverse();

const chartdata = ultimos10Registros.map(item => ({
  date: new Date(item.fecha).toLocaleDateString(), 
  PH: item.nivel_ph
}));

  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Average BPM</h3>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        categories={['PH']}
        colors={['indigo']}
        yAxisWidth={30}
        customTooltip={customTooltip}
      />
    </>
  );
}