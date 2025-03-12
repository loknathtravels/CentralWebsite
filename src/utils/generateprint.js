import { jsPDF } from "jspdf";

const generatePDF = (formData) => {
  const pdf = new jsPDF();

  const labels = [{label:"Name", field:"name"},
  {label:"Number Of Adults", field:"number_of_adults"},
  {label:"Number Of Children", field:"number_of_children"},
  {label:"Address", field:"address"},
  {label:"Primary Phone Number", field:"phone_number"},
  {label:"Alternate Phone Number", field:"alt_phone_number"},
  {label:"Destination", field:"destination"},
  {label:"Date Of Journey", field:"date_of_journey"},
  {label:"Tour Cost Adult", field:"tour_cost_adult"},
  {label:"tour Cost Children", field:"tour_cost_children"},
  {label:"Discount", field:"discount"},
  {label:"TotalCost", field:"total_cost"},
  {label:"Internal Remarks", field:"internal_remarks"},
  {label:"Traveler Notes", field:"traveler_notes"},
  {label:"Booking Status", field:"booking_status"}]
  
//   for(data in formData){
//     if (labels[data]){
//         console.log(labels[data], formData[data])
//     }
//   }
  const getLabel = (input) => {
     if (input.includes(labels.field)){
        return labels.label, input.value
     } 
   }

  // Add Branding Text
  pdf.setFontSize(20);
  pdf.text("Lokenath Caterer and Travels", 10, 10); // Example branding text
  pdf.setFontSize(12);
  pdf.text("Short tagline coming here", 10, 20);

  // Add Branding Image
  // Replace 'brandingImageUrl' with the path/URL of your image
  const brandingImageUrl = "path/to/your/branding-image.png";
  const addBrandingImage = () => {
    const img = new Image();
    img.src = brandingImageUrl;
    img.onload = () => {
      pdf.addImage(img, "PNG", 150, 5, 50, 20); // Adjust position and size as needed
      addContent();
    };
  };

  // Add PDF Content
  const addContent = () => {
    let yPosition = 40; // Starting y-coordinate for content

    // Tour Details Section
    pdf.setFontSize(16);
    pdf.text("Tour Details", 10, yPosition);
    yPosition += 10;
    Object.entries(formData)
      .filter(([key]) =>
        [
          "name",
          "numberOfAdults",
          "numberOfChildren",
          "address",
          "phoneNumber",
          "altPhoneNumber",
          "destination",
          "dateOfJourney",
          "tourCostAdult",
          "tourCostChildren",
          "discount",
          "totalCost",
          "internalRemarks",
          "travelerNotes",
        ].includes(key)
      )
      .forEach(([key, value]) => {
        pdf.setFontSize(12);
        pdf.text(`${key}: ${value || "N/A"}`, 10, yPosition);
        yPosition += 7;
      });

    // Other Bills Section
    pdf.setFontSize(16);
    yPosition += 10;
    pdf.text("Other Bills Section", 10, yPosition);
    yPosition += 10;
    Object.entries(formData)
      .filter(([key]) => ["otherBills", "otherRemarks"].includes(key))
      .forEach(([key, value]) => {
        pdf.setFontSize(12);
        pdf.text(`${key}: ${value || "N/A"}`, 10, yPosition);
        yPosition += 7;
      });

    // Summary Section
    pdf.setFontSize(16);
    yPosition += 10;
    pdf.text("Summary Section", 10, yPosition);
    yPosition += 10;
    Object.entries(formData)
      .filter(([key]) =>
        [
          "totalTicketBill",
          "totalBill",
          "advanceToBePaid",
          "totalAdvancePaid",
          "totalBillDue",
        ].includes(key)
      )
      .forEach(([key, value]) => {
        pdf.setFontSize(12);
        pdf.text(`${key}: ${value || "N/A"}`, 10, yPosition);
        yPosition += 7;
      });

    // Save or open the PDF
    pdf.save("TourDetails.pdf");
  };

  // Add branding image and then content
  addBrandingImage();
  addContent();
};

export default generatePDF;
