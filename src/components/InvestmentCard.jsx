function InvestmentCard({ stock, onClick }) {
  if (!stock) return null
  return (
    <div
      className="bg-neutral-800 p-4 mb-2 rounded-md shadow-md flex flex-row justify-between cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-body-bold font-semibold text-brand-400">{stock.chineseName}</h3>
      <p className="text-body-bold font-body-bold text-brand-600">Close Yest: {stock.close}</p>
    </div>
  );
}

export default InvestmentCard;
