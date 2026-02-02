import React from "react";

const Alert = ({ alert }) => {
  if (!alert) return null;

  const getAlertClass = (type) => {
    switch (type) {
      case "success":
        return "alert-success";
      case "danger":
        return "alert-danger";
      case "warning":
        return "alert-warning";
      default:
        return "alert-info";
    }
  };

  return (
    <>
      <div
        className={`alert ${getAlertClass(
          alert.type,
        )} alert-dismissible fade show text-center alert-modern`}
        role="alert"
      >
        <strong>{alert.type.toUpperCase()}:</strong> {alert.msg}
      </div>

      <div className={`alert-modern alert-modern-${alert.type}`} role="alert">
        {alert.msg}
      </div>
    </>
  );
};

export default Alert;
