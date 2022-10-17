import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const WatchlistItem = ({ item, onDelete, onClick }) => {
  return (
    <div className="note">
      <h3 onClick={() => onClick(item.item_name)}> {item.item_name}</h3>
      <FaTrashAlt
        style={{ color: "red", cursor: "default", display: "flex" }}
        onClick={() => onDelete(item.id)}
      />
    </div>
  );
};

export default WatchlistItem;
