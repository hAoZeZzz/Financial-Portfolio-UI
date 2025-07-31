import React, { useEffect, useState } from "react";
import InvestmentCard from "./InvestmentCard";
import NetWorthChart from "./NetWorthChart";
import ComboCard from "./ComboCard";
import TopNavBar from "./TopNavBar";
import PortfoliosList from "./PortfoliosList";
import { BACKEND_URL } from "../assets/CONST";
import { CiSquarePlus } from "react-icons/ci";
import NewsTickers from "./NewsTickers";

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [paginatedStocks, setPaginatedStocks] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioRefreshKey, setPortfolioRefreshKey] = useState(0);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(stocks.length / itemsPerPage);

  const handleInvestmentClick = (stock) => {
    setSelectedInvestment(stock);
  };

  // fetch data of all stocks
  const getAllStock = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/stocks/getAllStockInfo`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const respond = await res.json();
      if (respond?.result) {
        console.log(respond.result);
        setStocks(respond.result);
      }
    } catch (error) {
      console.error("Failed to fetch stock info:", error);
    }
  };

  // 初始加载
  useEffect(() => {
    getAllStock();
  }, []);

  // 当 stocks 或 currentPage 改变时重新分页
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const paginated = stocks.slice(startIndex, endIndex);
    setPaginatedStocks(paginated);
  }, [stocks, currentPage]);

  return (
    <div className="min-h-screen bg-neutral-900 text-default-font px-4 py-4 lg:px-8">
      <TopNavBar />
      <NewsTickers />
      <div className="px-6 mt-6 flex flex-col space-y-12">
        {/* 上半部分 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左：Stock List */}
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">Stock List</h2>
            {paginatedStocks.length > 0 && paginatedStocks.map((stock, index) => (
              <InvestmentCard key={index} stock={stock} onClick={() => handleInvestmentClick(stock)} />
            ))}
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 rounded bg-brand-600 text-white disabled:opacity-50 text-body"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </button>
              <span className="text-subtext-color">Page {currentPage} of {totalPages}</span>
              <button
                className="px-4 py-2 rounded bg-brand-600 text-white disabled:opacity-50 text-body"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>

          {/* 右：Net Worth Chart */}
          <div className="col-span-2">
            <NetWorthChart stock={selectedInvestment} />
          </div>
        </div>

        {/* 下半部分 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左：Portfolios */}
          <div className="col-span-1">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-semibold text-brand-primary mb-4">Portfolios</h2>
              {selectedPortfolio && (
              <CiSquarePlus 
                className="font-bold text-brand-primary mr-2 w-8 h-8 cursor-pointer hover:text-brand-700 transition-colors" 
                onClick={() => {setSelectedPortfolio(null);}}
              />)}
            </div>
            <PortfoliosList 
              setSelectedPortfolio={setSelectedPortfolio}
              selectedPortfolio={selectedPortfolio}
              refreshKey={portfolioRefreshKey}
            />
          </div>

          {/* 右：ComboCard */}
          <div className="col-span-2">
            <ComboCard 
              investments={stocks} 
              selectedPortfolio={selectedPortfolio}
              onPortfolioCreatedOrUpdated={() => setPortfolioRefreshKey(key => key + 1)}  
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
