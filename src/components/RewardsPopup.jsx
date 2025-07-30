const RewardsPopup = ({ content, onClose }) => {
  if (content === null) return null;
  console.log(content);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-neutral-900 rounded-lg shadow-lg p-8 flex flex-col items-center min-w-[340px] border border-brand-400">
        <div className="flex flex-col items-center w-full">
          <svg width="48" height="48" fill="none" className="mb-4">
            <circle cx="24" cy="24" r="24" fill="rgb(70,167,88)" fillOpacity={0.15} />
            <path d="M16 24l6 6 10-10" stroke="rgb(70,167,88)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-heading-2 font-heading-2 text-brand-600 mb-2">{content.portfolioId ? "Portfolio Created" : "Portfolio Updated"}</h2>
          <p className="text-body font-body text-neutral-400 mb-5 text-center">
            Your portfolio has been {content.portfolioId ? "Created" : "Updated"} successfully.
          </p>
          <div className="w-1/2 flex flex-col items-center mb-6">
            <span className="text-neutral-300 text-caption mb-1">Expected Return Rate</span>
            <span className="text-[32px] leading-[40px] font-bold text-brand-600 font-heading-1 drop-shadow">
              {Number(content.reward)*100}%
            </span>
          </div>
          <div className="w-1/2 flex flex-col items-center mb-6">
            <span className="text-neutral-300 text-caption mb-1">Expected Volatility</span>
            <span className="text-[32px] leading-[40px] font-bold text-error-600 font-heading-1 drop-shadow">
              {Number(content.risk)*100}%
            </span>
          </div>
          <button
            className="mt-2 w-full py-3 bg-brand-600 hover:bg-brand-700 transition rounded-lg font-body-bold text-[16px] text-white shadow-md"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsPopup;
