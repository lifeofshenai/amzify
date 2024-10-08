import React from "react";
import OrderTable from "../../components/OrderTable";
import LoadingSpinner from "../../components/LoadingSpinner"
import { useGlobalContext } from "../../context/ContextAnalytics";

const Orders = () => {
  const { orders, loading,  } = useGlobalContext();

  if (loading) {
    return <div>
      <LoadingSpinner />
    </div>;
  }
  return (
    <div className="rounded-lg">
      <OrderTable orders={orders.orders} />
    </div>
  );
};

export default Orders;
