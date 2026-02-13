// utils/investmentMath.ts
import { addDays, addMonths, addWeeks } from "date-fns"; // Recommended for accuracy

export const calculateSchedules = (
  mode: "WEEKLY" | "MONTHLY" | "ONE_TIME",
  durationDays: number,
  totalPrice: number,
  startDate: Date
) => {
  const schedules = [];
  let currentDate = new Date(startDate);
  let installmentAmount = 0;
  let count = 0;

  if (mode === "ONE_TIME") {
    return [{
      title: "Outright Payment",
      installmentNumber: 1,
      dueDate: currentDate, // Due immediately
      amount: totalPrice,
      status: "PENDING"
    }];
  }

  // Determine number of installments based on duration
  if (mode === "WEEKLY") {
    // e.g., 90 days / 7 = ~12 installments
    count = Math.floor(durationDays / 7); 
    installmentAmount = totalPrice / count;
  } else if (mode === "MONTHLY") {
    // e.g., 180 days / 30 = 6 installments
    count = Math.floor(durationDays / 30);
    installmentAmount = totalPrice / count;
  }

  // Generate the array
  for (let i = 1; i <= count; i++) {
    // For first payment, it is usually due immediately (User clicked "Invest")
    // Subsequent payments are spaced out
    const dueDate = i === 1 
      ? currentDate 
      : mode === "WEEKLY" 
        ? addWeeks(currentDate, i - 1) 
        : addMonths(currentDate, i - 1);

    schedules.push({
      title: `${mode === "WEEKLY" ? "Week" : "Month"} ${i} Installment`,
      installmentNumber: i,
      dueDate: dueDate,
      amount: parseFloat(installmentAmount.toFixed(2)), // Fix decimal precision
      status: i === 1 ? "PENDING" : "UPCOMING" // First one is pending payment, others are upcoming
    });
  }

  return schedules;
};