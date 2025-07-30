import React, { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import { BACKEND_URL } from "../assets/CONST";

const itemsPerPage = 6;

const PortfoliosList = ({ setSelectedPortfolio, selectedPortfolio, refreshKey }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(portfolios.length / itemsPerPage);

  const getAllPortfolios = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/portfolios`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const respond = await res.json();
      setPortfolios(respond.result || respond); // 根据你的返回结构调整
    } catch (error) {
      console.error(`Failed to fetch portfolio info: ${error}`);
    }
  };

  useEffect(() => {
    getAllPortfolios();
  }, []);

  useEffect(() => {
    getAllPortfolios();
  }, [refreshKey]);

  useEffect(() => {
    // 如果切换数据量少于当前页，自动跳到最后一页
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages, currentPage]);

  // 当前页数据
  const paginatedPortfolios = portfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="col-span-1">
      {paginatedPortfolios.length > 0 ? (
        <>
          {paginatedPortfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              selected={selectedPortfolio && selectedPortfolio.id === portfolio.id}
              onClick={() => setSelectedPortfolio(portfolio)}
            />
          ))}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 rounded bg-brand-600 text-white disabled:opacity-50 text-body"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span className="text-subtext-color">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              className="px-4 py-2 rounded bg-brand-600 text-white disabled:opacity-50 text-body"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-gray-400 text-center py-8">No portfolios found.</div>
      )}
    </div>
  );
};

export default PortfoliosList;
