import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../Services/LoginService";
import { getAllMatchItems } from "../../Services/MatchItemService";
import "../../DisplayView.css";

const MatchItemReport = () => {

  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [role, setRole] = useState("");

  const showMatchItems = () => {
    getRole().then((response) => {
      setRole(response.data);
      getAllMatchItems().then((res) => {
        setItemList(res.data);
      });
    });
  };

  useEffect(() => {
    showMatchItems();
  }, []);

  const returnBack = () => {
    if (role === 'Admin')
      navigate('/admin-menu');
    else if (role === 'Student')
      navigate('/student-menu');
  };

  return (
    <div className="text-center">

      {
        role === 'Admin'
          ? <h1 className="text-center" style={{
              fontSize: "40px",
              fontWeight: "800",
              letterSpacing: "2px",
              marginBottom: "20px"
            }}>
              Admin Match Item List
            </h1>
          :
            <h1 className="text-center" style={{
              fontSize: "40px",
              fontWeight: "800",
              letterSpacing: "2px",
              marginBottom: "20px"
            }}>
              Student Match Item List
            </h1>
      }

      <hr style={{ height: "3px", backgroundColor: "green" }} />

      <div className="row">
        <table className="table table-striped table-bordered">

          <thead>
            <tr>
              <th>Lost Item Id</th>
              <th>Found Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Lost Username</th>
              <th>Found Username</th>
            </tr>
          </thead>

          <tbody>
            {
              itemList.map((item) => (
                <tr key={`${item.matchItemId.lostItemId}-${item.matchItemId.foundItemId}`}>
                  <td>{item.matchItemId.lostItemId}</td>
                  <td>{item.matchItemId.foundItemId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.category}</td>
                  <td>{item.lostUsername}</td>
                  <td>{item.foundUsername}</td>
                </tr>
              ))
            }
          </tbody>

        </table>

        <br />

        <div className="form-group">
          <button
            onClick={returnBack}
            className="btn btn-success"
          >
            Return
          </button>
        </div>

      </div>
    </div>
  );
};

export default MatchItemReport;