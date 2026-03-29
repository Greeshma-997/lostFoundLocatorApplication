import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveLostItem } from "../../Services/LostItemService";

const LostItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  let [newId, setNewId] = useState('');
  let [ldate, setLdate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: "",
    status: false
  });

  // Generate Item ID
  const setLostItemId = () => {
    generateId().then(response => {
      setNewId(response.data);
    });
  };

  // Get Logged-in Username
  const setUsername = () => {
    getUserId().then(response => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setLostItemId();
    setUsername();
    setFlag(false);
  }, []);

  // Handle Input Change
  const onChangeHandler = (event) => {
    setFlag(false);
    const { name, value } = event.target;
    setLostItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit Form
  const lostItemSubmit = () => {
    const updatedLostItem = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate
    };

    saveLostItem(updatedLostItem).then(() => {
      setFlag(true);

      // Clear form after submission
      setLostItem({
        lostItemId: "",
        lostItemName: "",
        color: "",
        brand: "",
        category: "",
        location: "",
        username: "",
        lostDate: "",
        status: false
      });
    });
  };



  // Validation
  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }

    if (!lostItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }

    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }

    if (!lostItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!lostItem.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      lostItemSubmit();
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };

  // const nextItem = () => {
  // window.location.reload();
  //};




  const clearAll = () => {
    newId = "";
    lostItem.lostItemId = "";
    lostItem.lostItemName = "";
    lostItem.color = "";
    lostItem.brand = "";
    lostItem.category = "";
    lostItem.location = "";
    lostItem.lostDate = new Date();
    ldate = new Date();
  }

  let nextItem = () => {
    newId = "";
    lostItem.lostItemId = "";
    lostItem.lostItemName = "";
    lostItem.color = "";
    lostItem.brand = "";
    lostItem.category = "";
    lostItem.location = "";
    lostItem.lostDate = new Date();
    ldate = new Date();
    navigate("/lost-entry");
  }
  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <div className="login-box">
              <h2 className="text-center">
                <u>Lost Item Form Submission</u>
              </h2>

              <form onSubmit={handleValidation}>
                <div className="form-group">
                  <label>Item Id:</label>
                  <input
                    name="itemId"
                    className="form-control"
                    value={newId}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Lost Item Name:</label>
                  <input
                    name="lostItemName"
                    className="form-control"
                    value={lostItem.lostItemName}
                    onChange={onChangeHandler}
                  />
                  {errors.lostItemName && (
                    <p style={{ color: "red" }}>
                      {errors.lostItemName}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Item Category:</label>
                  <input
                    name="category"
                    className="form-control"
                    value={lostItem.category}
                    onChange={onChangeHandler}
                  />
                  {errors.category && (
                    <p style={{ color: "red" }}>{errors.category}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Item Color:</label>
                  <input
                    name="color"
                    className="form-control"
                    value={lostItem.color}
                    onChange={onChangeHandler}
                  />
                  {errors.color && (
                    <p style={{ color: "red" }}>{errors.color}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Item Brand Name:</label>
                  <input
                    name="brand"
                    className="form-control"
                    value={lostItem.brand}
                    onChange={onChangeHandler}
                  />
                  {errors.brand && (
                    <p style={{ color: "red" }}>{errors.brand}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Location of Lost Item:</label>
                  <input
                    name="location"
                    className="form-control"
                    value={lostItem.location}
                    onChange={onChangeHandler}
                  />
                  {errors.location && (
                    <p style={{ color: "red" }}>
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Select Lost Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={ldate}
                    onChange={(e) => setLdate(e.target.value)}
                  />
                </div>

                <br />

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={flag}
                  >
                    Submit
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={returnBack}
                  >
                    Return
                  </button>
                  <button className="btn btn-warning" onClick={clearAll}>
                    Clear
                  </button>
                  &nbsp;&nbsp;&nbsp;
                </div>
              </form>

              <br />

              {flag && (
                <p style={{ color: "blue" }}>
                  Lost Item Form Submitted.....
                  <button
                    className="btn btn-warning ms-3"
                    onClick={nextItem}
                  >
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

export default LostItemRegistration;