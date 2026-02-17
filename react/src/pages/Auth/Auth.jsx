// Auth.js (Modified)
import { createContext } from "react";

const TableContext = createContext({
  submittedData: [],
  setSubmittedData: () => {},
});

export default TableContext;
