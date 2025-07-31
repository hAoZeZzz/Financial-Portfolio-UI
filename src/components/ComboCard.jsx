import React, { useEffect, useRef, useState } from "react";
import PieChart from "./PieChart";
import RewardsPopup from "./RewardsPopup";
import { BACKEND_URL } from "../assets/CONST";
import DeleteSuccessPopup from "./DeleteSuccessPopup";

const ComboCard = ({ investments, selectedPortfolio, onPortfolioCreatedOrUpdated }) => {
  // 全部股票主数据：[{ stockCode, chineseName, ... }]
  const [portfolioName, setPortfolioName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // **唯一数据源，编辑的持仓项 [{ stockCode, chineseName, percent }]**
  const [investmentStates, setInvestmentStates] = useState([]);

  // 在ComboCard顶部，保留你的配色相关代码
  const investmentColors = useRef({});

  // 随机生成颜色
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // 获取或生成某投资的颜色
  const getInvestmentColor = (investment) => {
  // 支持传对象或者字符串
  const key = typeof investment === 'string'
    ? investment // 兼容传 name 的老写法
    : investment.stockCode || investment.chineseName; // 优先用 stockCode
  if (!investmentColors.current[key]) {
    investmentColors.current[key] = generateRandomColor();
  }
  return investmentColors.current[key];
};



  // 持仓编辑区初始化
  useEffect(() => {
    if (selectedPortfolio && selectedPortfolio.id) {
      // 拉取详情
      (async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/portfolios/${selectedPortfolio.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const respond = await res.json();
          const data = respond.result || respond;
          setPortfolioName(data.portfolioName || "");

          // 组合 details 和 investments，生成 { stockCode, chineseName, percent }
          const merged = (data.details || []).map(detail => {
            // 在所有股票里找到对应的股票名
            const match = (investments || []).find(item => item.stockCode === detail.stockCode);
            return {
              stockCode: detail.stockCode,
              chineseName: match?.chineseName || match?.name || detail.stockCode,
              percent: +(detail.ratio * 100).toFixed(2),
            }
          });
          setInvestmentStates(merged);
        } catch (e) {
          console.error("fetch portfolio with something wrong: ", e);
          setPortfolioName("");
          setInvestmentStates([]);
        }
      })();
    } else {
      // 切回自定义模式
      setPortfolioName("");
      setInvestmentStates([]);
    }
  }, [selectedPortfolio, investments]);

  // 选择/取消选择投资
  const handleSelection = (stockCode) => {
    setInvestmentStates((prev) => {
      const exists = prev.find(item => item.stockCode === stockCode);
      let next;
      if (exists) {
        next = prev.filter(item => item.stockCode !== stockCode);
      } else {
        // 新增选项
        const match = investments.find(i => i.stockCode === stockCode);
        next = [
          ...prev,
          {
            stockCode,
            chineseName: match?.chineseName || match?.name || stockCode,
            percent: 0,
          },
        ];
      }
      // 平均分配
      const avg = next.length > 0 ? (100 / next.length) : 0;
      return next.map(item => ({ ...item, percent: avg }));
    });
  };

  // 修改比例
  const handlePercentChange = (stockCode, percent) => {
    setInvestmentStates((prev) =>
      prev.map(item =>
        item.stockCode === stockCode
          ? { ...item, percent }
          : item
      )
    );
  };

  // 重置比例
  const handleClickReset = () => {
    setInvestmentStates((prev) => {
      const avg = prev.length > 0 ? (100 / prev.length) : 0;
      return prev.map(item => ({ ...item, percent: avg }));
    });
  };

  // 提交，创建或更新
  const handleClickCreateOrUpdate = async () => {
    let formattedData = {
      name: portfolioName,
      details: investmentStates.map(i => ({
        stockCode: i.stockCode,
        ratio: Number((i.percent / 100).toFixed(4)), // 保留小数
      })),
    };

    try {
      // 区分创建和更新
      const url = selectedPortfolio && selectedPortfolio.id
        ? `${BACKEND_URL}/portfolios/${selectedPortfolio.id}`
        : `${BACKEND_URL}/portfolios/createPortfolio`;

      const method = selectedPortfolio && selectedPortfolio.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
      if (!res.ok) throw new Error('Failed to create/update portfolio');
      const result = await res.json();
      setPopupContent(result.data)
      setShowPopup(true);
      if (onPortfolioCreatedOrUpdated) {
        onPortfolioCreatedOrUpdated();
      }
    } catch (error) {
      console.error("Failed to create/update portfolio:", error);
    }
  }

  const handleClickDelete = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/portfolios/${selectedPortfolio.id}`, {
        method:"DELETE",
        headers:{'Content-Type': 'application/json'}
      });
      if (!res.ok) throw new Error('Failed to delete portfolio');
      setShowDeletePopup(true);
      if (onPortfolioCreatedOrUpdated) {
        onPortfolioCreatedOrUpdated();
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 当前选中的股票 code
  const selectedCodes = investmentStates.map(i => i.stockCode);

  return (
    <div className="bg-neutral-800 rounded-lg shadow-md p-6 flex flex-row">
      <div className="w-1/2">
        <h3 className="text-heading-2 font-semibold text-brand-primary mb-4">
          {selectedPortfolio ? 'Edit Portfolio' : 'Create Portfolio'}
        </h3>
        {/* 编辑组合名 */}
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
            placeholder="Enter portfolio name"
          />
        </div>
        {/* 股票多选 */}
        <div className="relative">
          <div
            id="investmentSelect"
            onClick={() => setIsOpen(v => !v)}
            className="bg-neutral-700 text-neutral-100 rounded-md p-3 mt-2 w-full flex justify-between items-center cursor-pointer text-body-bold font-medium"
          >
            <span>
              {selectedCodes.length > 0
                ? `${selectedCodes.length} selected`
                : "Choose Investments"}
            </span>
            <span className="ml-2 text-body-bold">{isOpen ? "▲" : "▼"}</span>
          </div>
          {isOpen && (
            <div className="absolute bg-neutral-700 text-neutral-100 rounded-md w-full mt-2 max-h-60 overflow-y-auto z-10 shadow-lg">
              {investments.map((investment, index) => (
                <div
                  key={index}
                  onClick={() => handleSelection(investment.stockCode)}
                  className="flex items-center p-3 hover:bg-brand-600 cursor-pointer transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedCodes.includes(investment.stockCode)}
                    readOnly
                    className="mr-3"
                  />
                  <span>{investment.chineseName || investment.name || investment.stockCode}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 编辑比例 */}
        {investmentStates.length > 0 && (
          <div className="mt-6">
            <p className="text-heading-3 font-semibold text-neutral-300">You have selected:</p>
            <ul className="list-none pl-0">
              {investmentStates.map(({ stockCode, chineseName, percent }) => (
                <li key={stockCode} className="text-body text-neutral-200 flex justify-between items-center mt-3">
                  <span className="text-brand-primary">{chineseName}</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={percent}
                      onChange={(e) => handlePercentChange(stockCode, Number(e.target.value))}
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
                className="px-2 py-2 rounded bg-brand-500 text-white disabled:opacity-50 text-body hover:bg-brand-600 focus:bg-brand-600 focus:ring-2 focus:ring-brand-400 active:scale-95"
                onClick={handleClickCreateOrUpdate}
              >
                {selectedPortfolio ? "Update" : "Create"}
              </button>
              {selectedPortfolio && (
                <button
                  className="px-2 py-2 rounded bg-error-500 text-white disabled:opacity-50 text-body hover:bg-error-600 focus:bg-error-600 focus:ring-2 focus:ring-error-300 active:scale-95"
                  onClick={handleClickDelete}
                >
                  Delete
                </button>
              )}
              <button
                className="px-2 py-2 rounded bg-neutral-400 text-white disabled:opacity-50 text-body hover:bg-neutral-500 focus:bg-neutral-500 focus:ring-2 focus:ring-neutral-300 active:scale-95"
                onClick={handleClickReset}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
      {/* 右侧饼图 */}
      {investmentStates.length > 1 && (
        <div className="w-1/2">
          <PieChart
            investmentStates={investmentStates}
            getInvestmentColor={getInvestmentColor}  // 可选，保持你原有的配色方案
          />
        </div>
      )}
      <RewardsPopup
        content={showPopup ? popupContent : null}
        onClose={() => setShowPopup(false)}
      />
      <DeleteSuccessPopup show={showDeletePopup} onClose={() => setShowDeletePopup(false)} />
    </div>
  );
};

export default ComboCard;
