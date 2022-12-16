import { useRef, useEffect } from "react";

const AddNote = ({ onAdd, symbol }) => {
  const stock_price = useRef("");
  const stock_symbol = useRef(symbol);
  const price_date = useRef("");
  const rating = useRef("");
  const reason = useRef("");
  const date_posted = useRef("");
  const renderCount = useRef(0);

  useEffect(() => {
    stock_symbol.current.value = symbol;
    renderCount.current = renderCount.current + 1;
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !stock_price.current.value ||
      !stock_symbol.current.value ||
      !price_date.current.value ||
      !reason.current.value ||
      !rating.current.value ||
      !date_posted.current.value
    ) {
      alert("Please add all info");
      return;
    }

    onAdd({
      stock_price: stock_price.current.value,
      stock_symbol: symbol,
      price_date: price_date.current.value,
      rating: rating.current.value,
      reason: reason.current.value,
      date_posted: date_posted.current.value,
    });
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Stock Price</label>
        <input ref={stock_price} type="number" placeholder="Add price" />
      </div>
      <div className="form-control">
        <label>Stock symbol</label>
        <input
          ref={stock_symbol}
          type="text"
          placeholder="Add symbol"
          readOnly={true}
        />
      </div>
      <div className="form-control">
        <label>Price Date</label>
        <input ref={price_date} type="date" placeholder="Add Date" />
      </div>
      <div className="form-control">
        <label>Rating</label>
        <select ref={rating} placeholder="Add Rating(Buy or Sell or Wait)">
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
          <option value="Wait">Wait</option>
        </select>
      </div>
      <div className="form-control">
        <label>Reason</label>
        <input
          ref={reason}
          type="text"
          placeholder="Add reason for your rating and thoughts about the stock"
        />
      </div>
      <div className="form-control">
        <label>created on</label>
        <input ref={date_posted} type="date" placeholder="Add Task" />
      </div>

      <input type="submit" value="Save note" className="btn btn-block" />
      <div>Rendered {renderCount.current} times</div>
    </form>
  );
};

export default AddNote;
