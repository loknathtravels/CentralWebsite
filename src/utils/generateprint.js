import { jsPDF } from "jspdf";

const generatePDF = (formData, otherBills, travelers) => {
  const pdf = new jsPDF();

  const labels = [
  {"bookingId":"Booking ID"},
  {"status":"Booking Status"},
  {"name":"Name"},
  {"numberOfAdults":"Number Of Adults"},
  {"numberOfChildren":"Number Of Children"},
  {"address":"Address"},
  {"phoneNumber":"Primary Phone Number"},
  {"altphoneNumber":"Alternate Phone Number"},
  {"destination":"Destination"},
  {"dateOfJourney":"Date Of Journey"},
  {"tourCostAdult":"Tour Cost Adult"},
  {"tourCostChildren":"Tour Cost Children"},
  {"discount":"Discount"},
  {"totalCost":"Total Cost"},
  {"internalRemarks":"Internal Remarks"},
  {"travelerNotes":"Traveler Notes"},
  {"amount":"Amount"},
  {"reason":"Reason"}
]

const summary = [
  {"totalTicketBill":"Total Ticket Bill"},
  {"totalBill":"Total Bill"},
  {"advanceToBePaid":"Advance to be Paid"},
  {"totalAdvancePaid":"Total Advance Paid"},
  {"totalBillDue":"Total Bill Due"}
]
  
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
  pdf.setFontSize(8);
  pdf.text("25/1 A.K.Debi Road, Naihati, 24 Parganas North, West Bengal, India", 10, 15);
  pdf.setFontSize(8);
  pdf.text("We do not have any branch", 10, 20);
  pdf.setFontSize(12);
  pdf.text("From Bengal to all of India", 10, 30);

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
    console.log(otherBills)
    let yPosition = 40; // Starting y-coordinate for content

    // Tour Details Section
    pdf.setFontSize(16);
    pdf.text("Tour Details", 10, yPosition);
    yPosition += 10;
    labels.forEach(item => {
      const field = Object.keys(item)[0];
      const label = item[field];
      const value = formData[field] || "N/A";
    
      pdf.setFontSize(12);
      if (value !== "N/A"){
        pdf.text(`${label}: ${value}`, 10, yPosition);
        yPosition += 7;
      }
    });

    // Other Bills Section
    pdf.setFontSize(16);
    yPosition += 10;
    pdf.text("Other Bills Section", 10, yPosition);
    yPosition += 10;
    labels.forEach(item => {
      const field = Object.keys(item)[0];
      const label = item[field];
      let value = "N/A"
      otherBills.forEach(otherBill => {
        value = otherBill[field] || "N/A";
      })
    
      pdf.setFontSize(12);
      if(value !== "N/A"){
      pdf.text(`${label}: ${value}`, 10, yPosition);
      yPosition += 7;
    }
    });

    // Summary Section
    pdf.setFontSize(16);
    yPosition += 10;
    pdf.text("Summary Section", 10, yPosition);
    yPosition += 10;
    summary.forEach(item => {
      const field = Object.keys(item)[0];
      const label = item[field];
      const value = formData[field] || "N/A";
    
      pdf.setFontSize(12);
      if (value !== "N/A"){
        pdf.text(`${label}: ${value}`, 10, yPosition);
        yPosition += 7;
      }
    });

    // Save or open the PDF
    pdf.save("TourDetails.pdf");
  };

  // Add branding image and then content
  addBrandingImage();
  addContent();
};

export default generatePDF;
