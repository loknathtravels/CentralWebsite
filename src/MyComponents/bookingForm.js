import React, {useState} from 'react';
import { useFormik } from 'formik';
import Navbar from './navbar';
import FooterComp from './footer';
import "../CSS/bookingForm.css"

const BookingForm = () => {
  const mystyle = {
    backgroundColor: "lightblue",
    borderRadius: "10px",
    boxShadow: "7px 7px 15px #bebebe, -7px -7px 15px #ffffff",
    border: "none",
    padding: "10px",
    fontSize: "14px",
    width: "50%",
    marginBottom: "15px",
  };

  const Validate = (values) => {
  }

  const formik = useFormik({
    initialValues: {
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  React.useEffect(() => {
    formik.setFieldValue(
        "totalCost",
        (Number(formik.values.numberOfAdults) * Number(formik.values.tourCostAdult) +
          Number(formik.values.numberOfChildren) * Number(formik.values.tourCostChildren))
          *(1-Number(formik.values.discount)/100)
      );
    formik.setFieldValue(
        "due",
        Number(formik.values.totalCost) - Number(formik.values.advancePaid)
        )
  }, [formik, formik.values.discount,formik.values.numberOfChildren, 
    formik.values.numberOfAdults, formik.values.tourCostAdult,  
    formik.values.tourCostChildren, formik.values.advancePaid]);
  const [travelers, setTravelers] = useState([
    { name: "", dob: "", age: "", phone: "", email: "", remarks: "" },
  ]);
  const deleteTraveler = () => {
    var l = travelers.length;
    if (l > 1){
        const updatedTravelers = travelers.slice(0,-1);
        setTravelers(updatedTravelers); 
    }
    else{
        alert("Cannot delete the last traveler.");
    }
  };
  const addTraveler = () => {
    setTravelers([
      ...travelers,
      { name: "", dob: "", age: "", phone: "", email: "", remarks: "" },
    ]);
  };

  const handleTravelerChange = (index, field, value) => {
    const newTravelers = [...travelers];
    newTravelers[index][field] = value;
    setTravelers(newTravelers);
  };

  return (
    <>
    <Navbar />
    <h1>Booking Form</h1>
    <form onSubmit={formik.handleSubmit} style={{ display: "grid", gap: "20px" }}>
      {/* Section 1 */}
      <div>
        <h3>Section 1</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[
            { id: "name", label: "Name", type: "text", required: true},
            { id: "numberOfAdults", label: "Number of Travelers (Adult)", type: "number", required: true },
            { id: "numberOfChildren", label: "Number of Travelers (Children)", type: "number", required:true},
            { id: "address", label: "Address", type: "text", required:true},
            { id: "phoneNumber", label: "Phone Number", type: "text", required:true},
            { id: "altPhoneNumber", label: "Alternate Phone Number", type: "text", required:false},
            { id: "destination", label: "Destination", type: "dropdown", options: ["Option 1", "Option 2"], required:true},
            { id: "dateOfJourney", label: "Date of Journey", type: "date", required:true},
            { id: "tourCostAdult", label: "Tour Cost (Adult)", type: "text", required:true},
            { id: "tourCostChildren", label: "Tour Cost (Children)", type: "text", required:true},
            { id: "discount", label: "Discount in Percentage", type: "text", required:false},
            { id: "totalCost", label: "Total Cost", type: "text", required:true, disabled:true},
            { id: "advancePaid", label: "Advance Amount Paid", type: "text", required:true},
            { id: "due", label: "Due", type: "text", required:false, disabled:true},
            { id: "internalRemarks", label: "Remarks (Internal Purpose)", type: "text", required:false},
            { id: "travelerNotes", label: "Notes (for Travelers)", type: "text", required:false},
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label} {field.required && <span style={{ color: "red" }}>*</span>}</label>
              {field.type === "dropdown" ? (
                <select id={field.id} name={field.id} style={mystyle}>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  style={mystyle}
                  onChange={formik.handleChange}
                  value={formik.values[field.id]}
                  required={field.required}
                  disabled={field.id === "totalCost" || field.id === "due"}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <h3>Section 2</h3>
        {travelers.map((traveler, index) => (
          <div
            key={index}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
          >
            <div>
              <label htmlFor={`travelerName_${index}`}>Name of the Traveler</label>
              <input
                id={`travelerName_${index}`}
                type="text"
                style={mystyle}
                value={traveler.name}
                onChange={(e) =>
                  handleTravelerChange(index, "name", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor={`dob_${index}`}>Date of Birth</label>
              <input
                id={`dob_${index}`}
                type="date"
                style={mystyle}
                value={traveler.dob}
                onChange={(e) =>
                  handleTravelerChange(index, "dob", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor={`age_${index}`}>Age</label>
              <input
                id={`age_${index}`}
                type="number"
                style={mystyle}
                value={traveler.age}
                onChange={(e) =>
                  handleTravelerChange(index, "age", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor={`phone_${index}`}>Phone Number</label>
              <input
                id={`phone_${index}`}
                type="text"
                style={mystyle}
                value={traveler.phone}
                onChange={(e) =>
                  handleTravelerChange(index, "phone", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor={`email_${index}`}>Email</label>
              <input
                id={`email_${index}`}
                type="text"
                style={mystyle}
                value={traveler.email}
                onChange={(e) =>
                  handleTravelerChange(index, "email", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor={`remarks_${index}`}>Remarks</label>
              <input
                id={`remarks_${index}`}
                type="text"
                style={mystyle}
                value={traveler.remarks}
                onChange={(e) =>
                  handleTravelerChange(index, "remarks", e.target.value)
                }
              />
            </div>
            <hr></hr>
          </div>
        ))}
        <button
          type="button"
          onClick={addTraveler}
          style={{
            ...mystyle,
            width: "150px",
            cursor: "pointer",
            textAlign: "center",
            margin: "10px auto",
          }}
        >
          Add Traveler
        </button>
        <button
          type="button"
          onClick={deleteTraveler}
          style={{
            ...mystyle,
            width: "150px",
            cursor: "pointer",
            textAlign: "center",
            margin: "10px auto",
            textColor:"black"
          }}
        >
          delete
        </button>
      </div>

      {/* Section 3 */}
      <div>
        <h3>Section 3</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label htmlFor="otherBills">Other Bill Amount</label>
            <input
              id="otherBills"
              type="text"
              style={mystyle}
              onChange={formik.handleChange}
              value={formik.values.otherBills}
            />
          </div>
          <div>
            <label htmlFor="reason">Reason</label>
            <input
              id="reason"
              type="text"
              style={mystyle}
              onChange={formik.handleChange}
              value={formik.values.reason}
            />
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div>
        <h3>Section 4</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[
            { id: "totalTourBill", label: "Total Tour Bill" },
            { id: "totalTicketBill", label: "Total Ticket Bill" },
            { id: "otherBill", label: "Other Bill" },
            { id: "totalBill", label: "Total Bill" },
            { id: "totalAdvancePaid", label: "Total Advance Paid" },
            { id: "totalBillDue", label: "Total Bill Due" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                id={field.id}
                type="text"
                style={mystyle}
                onChange={formik.handleChange}
                value={formik.values[field.id]}
              />
            </div>
          ))}
        </div>
      </div>

      <button type="submit" style={{
        ...mystyle,
        width: "150px",
        cursor: "pointer",
        textAlign: "center",
        margin: "20px auto",
      }}>
        Submit
      </button>
      <hr></hr>
    </form>
    <FooterComp />
    </>
  );
};

export default BookingForm;
