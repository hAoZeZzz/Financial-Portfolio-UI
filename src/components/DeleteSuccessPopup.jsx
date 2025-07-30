const DeleteSuccessPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-neutral-900 rounded-lg shadow-lg p-8 flex flex-col items-center min-w-[340px] border border-error-400">
        <div className="flex flex-col items-center w-full">
          {/* 红色打勾或垃圾桶icon */}
          <svg width="48" height="48" fill="none" className="mb-4">
            <circle cx="24" cy="24" r="24" fill="rgb(220,38,38)" fillOpacity={0.15} />
            <path d="M16 24l6 6 10-10" stroke="rgb(220,38,38)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-heading-2 font-heading-2 text-error-600 mb-2">Portfolio Deleted</h2>
          <p className="text-body font-body text-neutral-400 mb-5 text-center">
            Your portfolio has been deleted successfully.
          </p>
          <button
            className="mt-2 w-full py-3 bg-error-600 hover:bg-error-700 transition rounded-lg font-body-bold text-[16px] text-white shadow-md"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSuccessPopup;