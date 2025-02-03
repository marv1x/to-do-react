import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBitcoinPrices } from "../store/bitcoinSlice";
import { RootState, AppDispatch } from "../store/store";

const BitcoinPrice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prices, status, error } = useSelector(
    (state: RootState) => state.bitcoin
  );

  useEffect(() => {
    dispatch(fetchBitcoinPrices());

    // Обновлять курс каждые 60 секунд
    const interval = setInterval(() => {
      dispatch(fetchBitcoinPrices());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      {status === "loading" && <p>Загрузка...</p>}
      {status === "failed" && <p>Ошибка: {error}</p>}
      {status === "succeeded" && (
        <p>
          1  <img src="bitcoin.png" alt="Bitcoin" width="40" height="40" style={{ verticalAlign: "text-bottom" }} /> = {prices.USD?.toFixed(2)} <img src="usd.png" alt="Bitcoin" width="40" height="40" style={{ verticalAlign: "text-bottom" }} /> |
          1  <img src="bitcoin.png" alt="Bitcoin" width="40" height="40" style={{ verticalAlign: "text-bottom" }} /> = {prices.EUR?.toFixed(2)} <img src="euro.png" alt="Bitcoin" width="40" height="40" style={{ verticalAlign: "text-bottom" }} /> |
          1  <img src="bitcoin.png" alt="Bitcoin" width="40" height="40" style={{ verticalAlign: "text-bottom" }} /> = {prices.GBP?.toFixed(2)} <img src="gbp.png" alt="Bitcoin" width="40" height="40" style={{ verticalAlign: "text-bottom" }} />
        </p>
      )}
    </div>
  );
};

export default BitcoinPrice;
