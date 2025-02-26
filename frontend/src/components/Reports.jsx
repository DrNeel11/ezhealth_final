import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./reports.css";
import BottomNavBar from "./BottomNavBar";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/images/reports")
      .then((response) => response.json())
      .then((data) => setReports(data.reports))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  const deleteReport = (filename) => {
    if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
      fetch(`http://localhost:8000/images/reports/${filename}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete report");
          }
          return response.json();
        })
        .then(() => {
          setReports(reports.filter((report) => report.filename !== filename));
        })
        .catch((error) => console.error("Error deleting report:", error));
    }
  };

  const downloadPDF = (report) => {
    const doc = new jsPDF();
    doc.text(`Report: ${report.filename}`, 10, 10);
    doc.text(`Patient Name: ${report.patientName}`, 10, 20);
    doc.text(`Age: ${report.patientID}`, 10, 30);
    doc.text(`Gender: ${report.gender}`, 10, 40);
    doc.text(`SpecimenType:' ${report.specimenType}`, 10, 50);
    doc.text(`Patient Sn:' ${report.sn}`, 10, 60);
    doc.text(`Year:' ${report.year}`, 10, 70);
    doc.text(`Patient Age:' ${report.age}`, 10, 80);
    doc.text(`Tumor Size:' ${report.tumorSize}`, 10, 90);
    doc.text(`Inv Nodes:' ${report.invNodes}`, 10, 100);
    doc.text(`Breast Cancer Cell:' ${report.breastCancerCell}`, 10, 110);
    doc.text(`Menopause:' ${report.menopause ? 'YES' : 'NO'}`, 10, 120);
    doc.text(`Metastasis:' ${report.metastasis ? 'YES' : 'NO'}`, 10, 130);
    doc.text(`Breast Quadrant:' ${report.breastQuadrant ? 'YES' : 'NO'}`, 10, 140);
    doc.text(`History:' ${report.history ? 'YES' : 'NO'}`, 10, 150);
    doc.text(`Predicted Subtype: ${report.predicted_subtype}`, 10, 160);
    doc.text(`Confidence: ${report.confidence}`, 10, 170);
    doc.text(`Predicted stage: ${report.predicted_stage}`, 10, 180);
    doc.text(`Recommended Treatment: ${report.recommended_treatment}`, 10, 190);
    doc.save(`${report.filename}.pdf`);
  };

  return (
    <div className="reports-container">
      <h2>Microscopy Analysis Reports</h2>
      <div className="reports-list">
        {reports.length === 0 ? (
          <p>No reports available</p>
        ) : (
          reports.map((report, index) => (
            <div key={index} className="report-card">
              <h3>{report.filename}</h3>
              <p><strong>Patient Name:</strong> {report.patientName}</p>
              <p><strong>Patient ID:</strong> {report.patientID}</p>
              <p><strong>Gender:</strong> {report.gender}</p>
              <p><strong>Speicmen Type:</strong>{report.specimenType}</p>
              <p><strong>Patient Sn: </strong>{report.sn}</p>
              <p><strong>Year: </strong>{report.year}</p>
              <p><strong>Patient Age: </strong>{report.age}</p>
              <p><strong>Tumor size: </strong>{report.tumor_size}</p>
              <p><strong>Inv Nodes: </strong>{report.inv_nodes}</p>
              <p><strong>Breast Cancer Cell: </strong>{report.breast_cancer_cell}</p>
              <p><strong>Menopause: </strong>{report.menopause ? 'YES' : 'NO'}</p>
              <p><strong>Metastasis: </strong>{report.metastasis ? 'YES' : 'NO'}</p>
              <p><strong>Breast Quadrant: </strong>{report.breastQuadrant ? 'YES' : 'NO'}</p>
              <p><strong>History: </strong>{report.history ? 'YES' : 'NO'}</p>
              <p><strong> Cancerous: </strong>{['adenosis', 'fibroadenoma', 'phyllodes_tumor', 'tubular_adenoma'].includes(report.predicted_subtype) ? 'NO' : 'YES'}</p>
              <p><strong>Predicted Subtype:</strong> {report.predicted_subtype}</p>
              <p><strong>Predicted Stage:</strong> {report.predicted_stage}</p>
              <p><strong>Recommended Treatment:</strong> {report.recommended_treatment}</p>
              <p><strong>Confidence:</strong> {report.confidence}</p>
              <div className="images-container">
                <div className="image-section">
                  <span className="image-label">Original Image</span>
                  <img src={report.original_image} alt="Original" className="report-image" />
                </div>
                <div className="image-section">
                  <span className="image-label">Heatmap</span>
                  <img src={report.heatmap} alt="Heatmap" className="report-image" />
                </div>
              </div>
              <div className="report-actions">
                <button className="delete-btn" onClick={() => deleteReport(report.filename)}>🗑 Delete</button>
                <button className="download-btn" onClick={() => downloadPDF(report)}>📄 Download PDF</button>
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Reports;
