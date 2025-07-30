const PortfolioCard = ({portfolio, selected, onClick}) => {
    return (
      <div
        className={`
        bg-neutral-800 rounded-lg shadow-md p-4 mb-2 cursor-pointer transition-all duration-200
        ${selected ? 'border-2 border-brand-600 ring-2 ring-brand-600' : 'border border-neutral-700'}
        hover:shadow-lg
      `}
        onClick={onClick}
      >
        <h3 className="text-body-bold font-semibold text-brand-400">{portfolio.portfolioName}</h3>
      </div>
    );
}

export default PortfolioCard;