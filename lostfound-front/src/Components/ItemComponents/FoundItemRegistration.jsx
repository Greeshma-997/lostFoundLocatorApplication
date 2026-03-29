import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getUserId } from "../../Services/LoginService";
import { generateFoundId, saveFoundItem } from "../../Services/FoundItemService";

const FoundItemRegistration = () => {

  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState('');
let [fdate,setFdate]=useState(new Date());
  const [userId, setUserId] = useState("");

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: "",
    status: false
  });


  const setFoundItemId = () => {
    generateFoundId().then(response => {
      setNewId(response.data);
    });
  };

  
  const setUsername = () => {
    getUserId().then(response => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setFoundItemId();
    setUsername();
    setFlag(false);
  }, []);


  const onChangeHandler = (event) => {
    setFlag(false);
    const { name, value } = event.target;

    setFoundItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const foundItemSubmit = () => {

    const updatedFoundItem = {
      ...foundItem,
      foundItemId: newId,
      username: userId,
      foundDate: fdate
    };

    saveFoundItem(updatedFoundItem).then(() => {
      setFlag(true);

      setFoundItem({
        foundItemId: "",
        foundItemName: "",
        color: "",
        brand: "",
        category: "",
        location: "",
        username: "",
        foundDate: "",
        status: false
      });
    });
  };


  const handleValidation = (event) => {

    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }

    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }

    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }

    if (!foundItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!foundItem.location.trim()) {
      tempErrors.location = "Found Location is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      foundItemSubmit();
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };

  const nextItem = () => {
    navigate("/found-entry");
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <div className="login-box">

              <h2 className="text-center">
                <u>Found Item Form Submission</u>
              </h2>

              <form onSubmit={handleValidation}>

                <div className="form-group">
                  <label>Item Id:</label>
                  <input
                    className="form-control"
                    value={newId}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Found Item Name:</label>
                  <input
                    name="foundItemName"
                    className="form-control"
                    value={foundItem.foundItemName}
                    onChange={onChangeHandler}
                  />
                  {errors.foundItemName && (
                    <p style={{ color: "red" }}>{errors.foundItemName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Item Category:</label>
                  <input
                    name="category"
                    className="form-control"
                    value={foundItem.category}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Item Color:</label>
                  <input
                    name="color"
                    className="form-control"
                    value={foundItem.color}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Item Brand:</label>
                  <input
                    name="brand"
                    className="form-control"
                    value={foundItem.brand}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Location of Found Item:</label>
                  <input
                    name="location"
                    className="form-control"
                    value={foundItem.location}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Select Found Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setFdate(e.target.value)}
                  />
                </div>

                <br />

                <button type="submit" className="btn btn-primary" disabled={flag}>
                  Submit
                </button>

                &nbsp;&nbsp;

                <button type="button" className="btn btn-success" onClick={returnBack}>
                  Return
                </button>

              </form>

              {flag && (
                <p style={{ color: "blue" }}>
                  Found Item Form Submitted.....
                  <button className="btn btn-warning ms-3" onClick={nextItem}>
                    New Form Submission
                  </button>
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItemRegistration;