import React, { useRef, useState } from "react";
import PieChart from "./PieChart";
import RewardsPopup from "./RewardsPopup";
import { BACKEND_URL } from "../assets/CONST";

const ComboCard = ({ investments }) => {
  const [portfolioName, setPortfolioName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  // 统一管理 investment 名称和比例
  const [investmentStates, setInvestmentStates] = useState([]);
  // 用 ref 避免频繁渲染导致颜色改变
  const investmentColors = useRef({});

  // 生成随机色
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  // 获取或生成投资对应颜色
  const getInvestmentColor = (investment) => {
    if (!investmentColors.current[investment]) {
      investmentColors.current[investment] = generateRandomColor();
    }
    return investmentColors.current[investment];
  };

  // 切换下拉
  const toggleDropdown = () => setIsOpen(!isOpen);

  // 选/取消选投资
  const handleSelection = (investmentName) => {
    setInvestmentStates((prev) => {
      const exists = prev.find(item => item.name === investmentName);
      let next;
      if (exists) {
        // 取消选
        next = prev.filter(item => item.name !== investmentName);
      } else {
        // 新增选项
        next = [...prev, { name: investmentName, percent: 0 }];
      }
      // 平均分配百分比
      const avg = next.length > 0 ? (100 / next.length) : 0;
      return next.map(item => ({ ...item, percent: avg }));
    });
  };

  // 百分比变更
  const handlePercentChange = (investmentName, percent) => {
    setInvestmentStates((prev) =>
      prev.map(item =>
        item.name === investmentName
          ? { ...item, percent: percent }
          : item
      )
    );
  };

  // 重置百分比为平均
  const handleClickReset = () => {
    setInvestmentStates((prev) => {
      const avg = prev.length > 0 ? (100 / prev.length) : 0;
      return prev.map(item => ({ ...item, percent: avg }));
    });
  };

  // 只取当前选中的 investment 名字
  const selectedInvestments = investmentStates.map(item => item.name);

  const handleClickCreate = async () => {
    let formattedData = {
      name: portfolioName,
      details:[],
    };

    investmentStates.forEach(i => {
      const match = investments.find(j => 
        j.chineseName === i.name
      );
      if (match) {
        formattedData.details.push({
          stockCode: match.stockCode,
          ratio: Number((i.percent / 100).toFixed(2))
        });
      }
    });
    
    try {
      const res = await fetch(`${BACKEND_URL}/portfolios/createPortfolio`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      })

      if (!res.ok) {
        throw new Error('Failed to create portfolio');
      };
      const result = await res.json();
      setPopupContent(result.data)
      setShowPopup(true);
      
    } catch (error) {
      console.error("Failed to create a new portfolio:", error);
    }

  }
  return (
    <div className="bg-neutral-800 rounded-lg shadow-md p-6 flex flex-row">
      <div className="w-1/2">
        <h3 className="text-heading-2 font-semibold text-brand-primary mb-4">
          Choose Your Next Portfolio
        </h3>
        <div className="relative">
          {/* Dropdown */}
          <div
            id="investmentSelect"
            onClick={toggleDropdown}
            className="bg-neutral-700 text-neutral-100 rounded-md p-3 mt-2 w-full flex justify-between items-center cursor-pointer text-body-bold font-medium"
          >
            <span>
              {selectedInvestments.length > 0
                ? `${selectedInvestments.length} selected`
                : "Choose Investments"}
            </span>
            <span className="ml-2 text-body-bold">{isOpen ? "▲" : "▼"}</span>
          </div>

          {/* Dropdown List */}
          {isOpen && (
            <div className="absolute bg-neutral-700 text-neutral-100 rounded-md w-full mt-2 max-h-60 overflow-y-auto z-10 shadow-lg">
              {investments.map((investment, index) => (
                <div
                  key={index}
                  onClick={() => handleSelection(investment.chineseName)}
                  className="flex items-center p-3 hover:bg-brand-600 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedInvestments.includes(investment.chineseName)}
                    readOnly
                    className="mr-3"
                  />
                  <span>{investment.chineseName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 显示已选投资及其比例 */}
        {investmentStates.length > 0 && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-neutral-300 font-semibold mb-2" htmlFor="portfolioName">
                Portfolio Name
              </label>
              <input
                id="portfolioName"
                type="text"
                className="w-full rounded-md bg-neutral-700 text-neutral-100 p-2"
                value={portfolioName}
                onChange={e => setPortfolioName(e.target.value)}
                placeholder="By default: portfolio1"
              />
            </div>
            <p className="text-heading-3 font-semibold text-neutral-300">You have selected:</p>
            <ul className="list-none pl-0">
              {investmentStates.map(({ name, percent }) => (
                <li key={name} className="text-body text-neutral-200 flex justify-between items-center mt-3">
                  <span className="text-brand-primary">{name}</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={percent}
                      onChange={(e) => handlePercentChange(name, Number(e.target.value))}
                      className="w-20 p-2 text-center bg-neutral-600 text-neutral-100 rounded-md"
                      min={0}
                      max={100}
                    />
                    <span className="text-neutral-400">%</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-row p-2 mt-2 justify-between items-center">
              <button
                className="px-2 py-2 rounded bg-brand-500 text-white disabled:opacity-50 text-body"
                onClick={handleClickCreate}
              >
                Create
              </button>
              <button
                className="px-2 py-2 rounded bg-neutral-400 text-white disabled:opacity-50 text-body"
                onClick={handleClickReset}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {investmentStates.length > 1 && (
        <div className="w-1/2">
          <PieChart
            investmentStates={investmentStates}
            getInvestmentColor={getInvestmentColor}
          />
        </div>
      )}
      <RewardsPopup
        content={showPopup ? popupContent : null}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};

export default ComboCard;
