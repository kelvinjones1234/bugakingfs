import jsPDF from "jspdf";
import "jspdf-autotable";
import { AdminTransactionUI } from "@/app/actions/adminTransactions";

export const generateTransactionReceipt = (transaction: AdminTransactionUI) => {
  const doc = new jsPDF();

  // -- Header --
  doc.setFillColor(23, 21, 18); // #171512 (Charcoal)
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(208, 165, 57); // #d0a539 (Gold)
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("BUGAH KING", 20, 25);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("OFFICIAL RECEIPT", 160, 25);

  // -- Transaction Details --
  const startY = 60;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text(`Receipt Reference: ${transaction.paymentReference}`, 20, startY);
  
  doc.setFontSize(10);
  doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 20, startY + 8);

  // -- Table Data --
  const tableData = [
    ["Client Name", transaction.userFullName],
    ["Email Address", transaction.userEmail],
    ["Project", transaction.projectName],
    ["Sector", transaction.investmentType],
    ["Location", transaction.location],
    ["Transaction Date", new Date(transaction.date).toLocaleDateString()],
    ["Amount Paid", `NGN ${transaction.amount.toLocaleString()}`],
    ["Status", "SUCCESSFUL"],
  ];

  // @ts-ignore
  doc.autoTable({
    startY: startY + 20,
    head: [['Description', 'Details']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [23, 21, 18], textColor: [208, 165, 57] },
    styles: { fontSize: 11, cellPadding: 6 },
    columnStyles: { 0: { fontStyle: 'bold', width: 60 } }
  });

  // -- Footer --
  const finalY = (doc as any).lastAutoTable.finalY + 30;
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Thank you for investing with Bugah King Limited.", 20, finalY);
  doc.text("For support, contact: support@bugahking.com", 20, finalY + 6);

  // -- Save --
  doc.save(`Receipt_${transaction.paymentReference}.pdf`);
};