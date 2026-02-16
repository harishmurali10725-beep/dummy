import React, { useState } from "react";
import TableContext from "./Auth";

const TableProvider = ({ children }) => {
  const [submittedData, setSubmittedData] = useState([]);
  return (
    <TableContext.Provider value={{ submittedData, setSubmittedData }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
