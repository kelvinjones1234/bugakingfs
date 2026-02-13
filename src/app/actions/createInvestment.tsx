"use server";

import prisma from "../../../lib/data/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/cloudinary";
import { PlanConfig } from "../admin/projects/components/AddInvestmentModal";

// Define types that match Prisma Enums
enum InvestmentType {
  AGRICULTURE = "AGRICULTURE",
  REAL_ESTATE = "REAL_ESTATE",
}

enum AssetType {
  TERRACE = "TERRACE",
  FARMLAND = "FARMLAND",
}

enum PaymentMode {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ONE_TIME = "ONE_TIME",
}

export async function createInvestment(formData: FormData) {
  console.log("🔥 SERVER ACTION STARTED");

  try {
    // Extract raw data
    const name = formData.get("name") as string;
    const investmentType = formData.get("investmentType") as InvestmentType;
    const assetType = formData.get("assetType") as AssetType;
    const location = formData.get("location") as string;
    const investmentDetail = formData.get("investmentDetail") as string;
    const roiStartAfterDays = Number(formData.get("roiStartAfterDays"));
    const expectedRoiPercent = Number(formData.get("expectedRoiPercent"));
    const active = formData.get("active") === "true";
    const pricingOptionsJson = formData.get("pricingOptions") as string;
    const imageFile = formData.get("projectImg") as File | null;

    // --- STEP 1: UPLOAD IMAGE ---
    let projectImgPublicId = "default-placeholder";
    
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      console.log("📸 Uploading image...");
      try {
        const uploadResult = await uploadImage(imageFile, "");
        projectImgPublicId = uploadResult.publicId;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        throw new Error("Failed to upload project image");
      }
    }

    // --- STEP 2: CREATE PROJECT ---
    console.log("1️⃣ Creating Project...");
    const project = await prisma.investmentProject.create({
      data: {
        name,
        investmentType,
        assetType,
        location,
        investmentDetail,
        roiStartAfterDays,
        expectedRoiPercent,
        active,
        projectImg: projectImgPublicId,
      },
    });
    console.log("✅ Project Created ID:", project.id);

    // --- STEP 3: SAVE PRICING OPTIONS ---
    const pricingOptions: PlanConfig[] = pricingOptionsJson ? JSON.parse(pricingOptionsJson) : [];

    if (pricingOptions.length === 0) {
      console.warn("⚠️ No pricing options received!");
    } else {
      console.log(`2️⃣ Saving ${pricingOptions.length} pricing plans...`);

      for (const option of pricingOptions) {
        const price = Number(option.totalPrice);
        const deposit = Number(option.minimumDeposit);
        const duration = Number(option.durationDays);

        if (isNaN(price) || isNaN(deposit)) {
          continue;
        }

        await prisma.projectPricing.create({
          data: {
            projectId: project.id,
            planName: option.planName,
            durationDays: duration,
            paymentMode: option.paymentMode as PaymentMode,
            totalPrice: price,
            minimumDeposit: deposit,
          },
        });
      }
    }

    revalidatePath("/admin/projects");
    return { success: true, projectId: project.id };

  } catch (error) {
    console.error("❌ DATABASE ERROR:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown Error" };
  }
}













