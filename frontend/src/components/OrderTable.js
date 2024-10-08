import React from "react";

const OrderTable = ({ orders = [] }) => {


  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="badge badge-warning text-xs text-white font-medium   p-3">
            Pending
          </span>
        );
      case "Completed":
        return <span className="badge badge-success text-xs text-white font-medium   p-3">Completed</span>;
      case "Cancelled":
        return (
          <span className="badge badge-error text-xs text-white font-medium   p-3">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="badge badge-neutral text-xs text-white font-medium   p-3">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-dark-pink font-bold text-white">Store Name</th>
              <th className="bg-dark-pink font-bold text-white">Platform</th>
              <th className="bg-dark-pink font-bold text-white">
                Product Name
              </th>
              <th className="bg-dark-pink font-bold text-white">Price</th>
              <th className="bg-dark-pink font-bold text-white">Quantity</th>
              <th className="bg-dark-pink font-bold text-white">Order No.</th>
              <th className="bg-dark-pink font-bold text-white">F. Status</th>
              <th className="bg-dark-pink font-bold text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-slate-200"
                } rounded-lg shadow-lg font-medium`}
              >
                <td>{order.store?.name || "N/A"}</td>
                <td>{order.platform}</td>
                {order.lineItems?.length === 1 ? (
                  order.lineItems?.map((product, productIndex) => (
                    <React.Fragment key={productIndex}>
                      <td>
                        <div>{product.name}</div>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                    </React.Fragment>
                  ))
                ) : (
                  <td colSpan="3">Multiple products</td>
                  
                )}
                <td>{order.id}</td>
                <td>{getStatusBadge(order.financialStatus || "Unknown")}</td>
                <td>{getStatusBadge(order.fulfillmentStatus || "Unknown")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
