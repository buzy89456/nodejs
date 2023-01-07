import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetails = () => {
  const [error, setError] = useState(null);
  const [stockDetails, setStockDetails] = useState([]);
  const { stockId } = useParams();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  // 為了處理網址
  let navigate = useNavigate();

  // console.log('StockDetails', stockId);

  useEffect(() => {
    console.log('page 改變', page);
    async function getStockDetails() {
      let response = await axios.get(
        `http://localhost:3001/api/stocks/${stockId}?page=${page}`
      );
      // console.log(response);
      setStockDetails(response.data.data);
      setTotalPage(response.data.pagination.totalPage);
    }
    getStockDetails();
  }, [page]);

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li
          key={i}
          style={{
            display: 'inline-block',
            margin: '2px',
            backgroundColor: page === i ? '#00d1b2' : '',
            borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            setPage(i);
            // 處理網址
            navigate(`/stock/${stockId}/${i}`);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <>
      <div>
        {error && <div>{error}</div>}
        <ul>{getPages()}</ul>
        目前在第 {page} 頁
        {stockDetails.map((v, index) => {
          const {
            stock_id,
            date,
            open_price,
            high_price,
            low_price,
            close_price,
            delta_price,
            transactions,
            volume,
            amount,
          } = v;
          return (
            <div
              className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6"
              key={date}
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                日期：{date}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                成交金額：{amount}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                成交股數： {volume}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                開盤價：{open_price}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                收盤價：{close_price}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                漲跌價差：{delta_price}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                最高價：{high_price}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                最低價：{low_price}
              </h2>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                成交筆數：{transactions}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StockDetails;
