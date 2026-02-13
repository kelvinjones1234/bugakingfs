"use server";

import prisma from "./prisma"; 
// Import the generated types directly from the client
import { PaymentMode } from "@prisma/client";

// -----------------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export interface UIPricingOption {
  id: string;
  plan_name: string;
  plan_duration_days: number;
  payment_mode: string; // UI expects string, Prisma gives Enum
  total_price: number;
  minimum_deposit: number;
  roi_start_display: string;
}

export interface UIInvestmentProject {
  id: string;
  name: string;
  investment_type: string;
  asset_type: string;
  location: string;
  category_display: string;
  investment_detail: string;
  roi_start_after_days: number;
  project_img: string | null;
  expected_roi_percent: number;
  active: boolean;
  pricing_options: UIPricingOption[];
}

// -----------------------------------------------------------------------------
// 2. HELPER FUNCTIONS
// -----------------------------------------------------------------------------

// Helper: Convert Prisma Enum to friendly String if needed, 
// or simply pass the string value.
function calculateRoiStartDisplay(
  paymentMode: PaymentMode, // Use Prisma Enum Type here
  planDuration: number, 
  projectRoiStartDays: number
) {
  let daysWait = projectRoiStartDays;

  // Compare against the Prisma Enum, not a raw string
  if (paymentMode !== "ONE_TIME") {
    daysWait = planDuration + projectRoiStartDays;
  }

  if (daysWait <= 0) return "Immediate";
  if (daysWait < 30) return `${daysWait} Days`;
  
  const months = Math.round(daysWait / 30);
  return `Month ${months}`;
}

function getCategoryDisplay(investmentType: string, location: string) {
  const formattedType = investmentType
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
    
  return `${formattedType} • ${location}`;
}

// -----------------------------------------------------------------------------
// 3. MAIN FETCH FUNCTION
// -----------------------------------------------------------------------------

export async function getAllProjects(): Promise<UIInvestmentProject[]> {
  try {
    const projects = await prisma.investmentProject.findMany({
      where: { active: true },
      include: {
        pricingOptions: true, 
      },
      orderBy: { createdAt: 'desc' } 
    });

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      // Convert Enums to Strings explicitly for UI
      investment_type: project.investmentType.toString().toLowerCase().replace("_", "-"),
      asset_type: project.assetType.toString().toLowerCase(),
      location: project.location,
      category_display: getCategoryDisplay(project.investmentType.toString(), project.location),
      investment_detail: project.investmentDetail,
      roi_start_after_days: project.roiStartAfterDays,
      project_img: project.projectImg,
      expected_roi_percent: project.expectedRoiPercent,
      active: project.active,

      pricing_options: project.pricingOptions.map((po) => ({
        id: po.id,
        plan_name: po.planName,              
        plan_duration_days: po.durationDays, 
        // Cast Enum to string for the UI interface
        payment_mode: po.paymentMode.toString(),        
        total_price: po.totalPrice,
        minimum_deposit: po.minimumDeposit,
        roi_start_display: calculateRoiStartDisplay(
          po.paymentMode, 
          po.durationDays, 
          project.roiStartAfterDays
        )
      }))
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// -----------------------------------------------------------------------------
// 4. SINGLE FETCH FUNCTION
// -----------------------------------------------------------------------------

export async function getProjectById(id: string): Promise<UIInvestmentProject | null> {
  try {
    const project = await prisma.investmentProject.findUnique({
      where: { id },
      include: {
        pricingOptions: true, 
      }
    });

    if (!project) return null;

    return {
      id: project.id,
      name: project.name,
      investment_type: project.investmentType.toString().toLowerCase().replace("_", "-"),
      asset_type: project.assetType.toString().toLowerCase(),
      location: project.location,
      category_display: getCategoryDisplay(project.investmentType.toString(), project.location),
      investment_detail: project.investmentDetail,
      roi_start_after_days: project.roiStartAfterDays,
      project_img: project.projectImg,
      expected_roi_percent: project.expectedRoiPercent,
      active: project.active,
      
      pricing_options: project.pricingOptions.map((po) => ({
        id: po.id,
        plan_name: po.planName,
        plan_duration_days: po.durationDays,
        payment_mode: po.paymentMode.toString(),
        total_price: po.totalPrice,
        minimum_deposit: po.minimumDeposit,
        roi_start_display: calculateRoiStartDisplay(
          po.paymentMode, 
          po.durationDays, 
          project.roiStartAfterDays
        )
      }))
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}