import React from "react";
import PropTypes from "prop-types";

const MetricCard = ({title, value, icon}) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center">
      {icon && <div className="text-blue-500 mr-4">{icon}</div>}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
};

export default MetricCard;
