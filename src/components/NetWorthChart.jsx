import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { BACKEND_URL } from "../assets/CONST";

function InvestmentCard({ stock }) {
  // 只存配置，不含数据
  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick',
      height: 350, 
      toolbar: {show: false}
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: undefined,
        color: '#222' // 字体颜色
      },
      theme: 'dark'
    }
  });
  // 存数据
  const [series, setSeries] = useState([{ data: [] }]);

  // 获取股票详情数据
  const getStockDetails = async (stockCode) => {
    try {
      const res = await fetch(`${BACKEND_URL}/stocks/getStockInfoList/${stockCode}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const respond = await res.json();
      console.log(respond.data);
      
      // 格式化为apexcharts的K线数据格式
      const formattedData = respond.data.map(item => ({
        x: new Date(item.datetime),
        y: [
          Number(item.open),
          Number(item.high),
          Number(item.low),
          Number(item.close),
        ]
      }));
      setSeries([{ data: formattedData }]);
      setOptions(prev => ({
        ...prev,
        title: {
          text: `${stock.chineseName} -- K Chart`,
          align: "left",
          style: {
            fontSize: '18px',
            color: 'rgb(47, 110, 59)'
          }
        }
      }));
    } catch (error) {
      console.error("Failed to fetch stock info:", error);
      setSeries([{ data: [] }]);
    }
  };

  // stock 更新时触发获取数据
  useEffect(() => {
    if (stock?.stockCode) {
      getStockDetails(stock.stockCode);
    } else {
      setSeries([{ data: [] }]);
    }
  }, [stock]);

  return (
    <div className="bg-neutral-800 p-4 mb-2 rounded-md shadow-md">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={400}
      />
    </div>
  );
}

export default InvestmentCard;
