import React, { useContext } from "react";
import TableContext from "./Auth";
import "./Table.css";

const Table = () => {
  const context = useContext(TableContext);
  const submittedData = context?.submittedData || [];

  if (!Array.isArray(submittedData) || submittedData.length === 0) {
    return <p className="no-data">No Data Submitted Yet</p>;
  }

  return (
    <div className="table-container">
      <h2>Submitted Forms</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>City</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={data.id || index}>
                <td>{index + 1}</td>
                <td>{data.username}</td>
                <td>{data.city}</td>
                <td>{data.gender}</td>
                <td>{data.phone}</td>
                <td>{data.feedback || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;