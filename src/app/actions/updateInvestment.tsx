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

/**
 * CREATE NEW INVESTMENT
 */
export async function createInvestment(formData: FormData) {
  console.log("🔥 CREATE SERVER ACTION STARTED");

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

    // --- STEP 1: HANDLE IMAGE UPLOAD (OPTIONAL) ---
    let projectImgPublicId: string | undefined = undefined;

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      console.log("📸 Uploading image...");
      try {
        const uploadResult = await uploadImage(imageFile, "investments");
        projectImgPublicId = uploadResult.publicId;
        console.log("✅ Image uploaded:", projectImgPublicId);
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

    // --- STEP 3: CREATE PRICING OPTIONS ---
    const pricingOptions: PlanConfig[] = pricingOptionsJson
      ? JSON.parse(pricingOptionsJson)
      : [];

    if (pricingOptions.length === 0) {
      console.warn("⚠️ No pricing options received!");
    }

    console.log(`2️⃣ Creating ${pricingOptions.length} pricing plans...`);

    for (const option of pricingOptions) {
      const price = Number(option.totalPrice);
      const deposit = Number(option.minimumDeposit);
      const duration = Number(option.durationDays);

      if (isNaN(price) || isNaN(deposit)) {
        console.warn(`⚠️ Skipping invalid pricing option: ${option.planName}`);
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
      console.log(`✅ Created pricing plan: ${option.planName}`);
    }

    revalidatePath("/admin/projects");
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error("❌ DATABASE ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}

/**
 * UPDATE EXISTING INVESTMENT
 */
export async function updateInvestment(projectId: string, formData: FormData) {
  console.log("🔥 UPDATE SERVER ACTION STARTED for ID:", projectId);

  try {
    // Verify project exists
    const existingProject = await prisma.investmentProject.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      throw new Error("Investment project not found");
    }

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

    // --- STEP 1: HANDLE IMAGE UPLOAD (OPTIONAL) ---
    let projectImgPublicId = existingProject.projectImg;

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      console.log("📸 Uploading new image...");
      try {
        const uploadResult = await uploadImage(imageFile, "investments");
        projectImgPublicId = uploadResult.publicId;
        console.log("✅ New image uploaded:", projectImgPublicId);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        throw new Error("Failed to upload project image");
      }
    }

    // --- STEP 2: UPDATE PROJECT ---
    console.log("1️⃣ Updating Project...");
    const project = await prisma.investmentProject.update({
      where: { id: projectId },
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
    console.log("✅ Project Updated ID:", project.id);

    // --- STEP 3: UPDATE PRICING OPTIONS ---
    const pricingOptions: PlanConfig[] = pricingOptionsJson
      ? JSON.parse(pricingOptionsJson)
      : [];

    if (pricingOptions.length === 0) {
      console.warn("⚠️ No pricing options received!");
    }

    console.log(`2️⃣ Processing ${pricingOptions.length} pricing plans...`);

    // Get existing pricing plans with investment counts
    const existingPlans = await prisma.projectPricing.findMany({
      where: { projectId: project.id },
      select: {
        id: true,
        planName: true,
        durationDays: true,
        paymentMode: true,
        totalPrice: true,
        minimumDeposit: true,
        _count: {
          select: { investments: true },
        },
      },
    });

    // Extract IDs of plans that should be kept (existing plans in the new list)
    const planIdsToKeep = pricingOptions
      .filter((p) => p.id) // Only existing plans have database IDs
      .map((p) => p.id as string);

    // Find plans to delete: existing plans NOT in the keep list AND have no investments
    const plansToDelete = existingPlans.filter(
      (plan) =>
        !planIdsToKeep.includes(plan.id) && plan._count.investments === 0
    );

    // Delete unused plans
    if (plansToDelete.length > 0) {
      console.log(`🗑️ Deleting ${plansToDelete.length} unused plans...`);
      await prisma.projectPricing.deleteMany({
        where: {
          id: { in: plansToDelete.map((p) => p.id) },
        },
      });
      console.log("✅ Deleted plans:", plansToDelete.map((p) => p.planName));
    }

    // Find plans that can't be deleted due to active investments
    const plansWithInvestments = existingPlans.filter(
      (plan) =>
        !planIdsToKeep.includes(plan.id) && plan._count.investments > 0
    );

    if (plansWithInvestments.length > 0) {
      console.warn(
        `⚠️ ${plansWithInvestments.length} pricing plan(s) have active investments and cannot be deleted:`,
        plansWithInvestments.map((p) => p.planName)
      );
    }

    // Process pricing options (update existing, create new)
    for (const option of pricingOptions) {
      const price = Number(option.totalPrice);
      const deposit = Number(option.minimumDeposit);
      const duration = Number(option.durationDays);

      if (isNaN(price) || isNaN(deposit)) {
        console.warn(`⚠️ Skipping invalid pricing option: ${option.planName}`);
        continue;
      }

      if (option.id) {
        // Update existing plan
        await prisma.projectPricing.update({
          where: { id: option.id },
          data: {
            planName: option.planName,
            durationDays: duration,
            paymentMode: option.paymentMode as PaymentMode,
            totalPrice: price,
            minimumDeposit: deposit,
          },
        });
        console.log(`♻️ Updated existing plan: ${option.planName}`);
      } else {
        // Create new plan (no id means it's new)
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
        console.log(`✨ Created new plan: ${option.planName}`);
      }
    }

    revalidatePath("/admin/projects");
    return {
      success: true,
      projectId: project.id,
      warnings:
        plansWithInvestments.length > 0
          ? `${plansWithInvestments.length} plan(s) with active investments were kept and cannot be removed.`
          : undefined,
    };
  } catch (error) {
    console.error("❌ DATABASE ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}

/**
 * DELETE INVESTMENT (Optional - for completeness)
 */
export async function deleteInvestment(projectId: string) {
  console.log("🔥 DELETE SERVER ACTION STARTED for ID:", projectId);

  try {
    // Check if project has any active investments
    const project = await prisma.investmentProject.findUnique({
      where: { id: projectId },
      include: {
        pricingOptions: {
          include: {
            _count: {
              select: { investments: true },
            },
          },
        },
      },
    });

    if (!project) {
      throw new Error("Investment project not found");
    }

    // Check if any pricing option has investments
    const hasInvestments = project.pricingOptions.some(
      (option) => option._count.investments > 0
    );

    if (hasInvestments) {
      return {
        success: false,
        error:
          "Cannot delete project with active investments. Please archive it instead.",
      };
    }

    // Delete project (will cascade to pricing options)
    await prisma.investmentProject.delete({
      where: { id: projectId },
    });

    console.log("✅ Project deleted successfully");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("❌ DELETE ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}




export async function toggleInvestmentActive(projectId: string, newStatus: boolean) {
  try {
    await prisma.investmentProject.update({
      where: { id: projectId },
      data: {
        active: newStatus,
      },
    });

    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("❌ TOGGLE ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}