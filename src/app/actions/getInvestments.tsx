"use server";

import prisma from "../../../lib/data/prisma";
// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export interface UIPricingOption {
  id: string;
  plan_name: string;
  plan_duration_days: number;
  payment_mode: string;
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
// HELPERS
// -----------------------------------------------------------------------------

function calculateRoiStartDisplay(
  paymentMode: string,
  planDuration: number,
  projectRoiStartDays: number
) {
  let daysWait = projectRoiStartDays;

  if (paymentMode !== "ONE_TIME") {
    daysWait = planDuration + projectRoiStartDays;
  }

  if (daysWait <= 0) return "Immediate";
  if (daysWait < 30) return `${daysWait} Days`;

  return `Month ${Math.round(daysWait / 30)}`;
}

function getCategoryDisplay(investmentType: string, location: string) {
  return `${investmentType.replace("_", " ")} • ${location}`;
}

// -----------------------------------------------------------------------------
// FETCH ALL PROJECTS
// -----------------------------------------------------------------------------

export async function getAllProjects(isAdmin: boolean = false): Promise<UIInvestmentProject[]> {
  
  const projects = await prisma.investmentProject.findMany({
    // 👇 DYNAMIC FILTER:
    // If isAdmin is true, 'where' becomes {}, fetching everything.
    // If isAdmin is false, 'where' becomes { active: true }, fetching only active.
    where: isAdmin ? {} : { active: true },
    
    include: {
      pricingOptions: true, 
    },
    orderBy: { createdAt: "desc" },
  });

  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    // Fix: Ensure DB enum strings map correctly to your UI expectations
    investment_type: project.investmentType, 
    asset_type: project.assetType,
    location: project.location,
    category_display: getCategoryDisplay(project.investmentType, project.location),
    investment_detail: project.investmentDetail,
    roi_start_after_days: project.roiStartAfterDays,
    project_img: project.projectImg,
    expected_roi_percent: project.expectedRoiPercent,
    active: project.active, // This will now correctly return false for inactive projects

    pricing_options: project.pricingOptions.map((po) => ({
      id: po.id,
      plan_name: po.planName,
      plan_duration_days: po.durationDays,
      payment_mode: po.paymentMode,
      total_price: po.totalPrice,
      minimum_deposit: po.minimumDeposit,
      roi_start_display: calculateRoiStartDisplay(
        po.paymentMode,
        po.durationDays,
        project.roiStartAfterDays
      ),
    })),
  }));
}