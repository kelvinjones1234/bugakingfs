"use server";
import prisma from "../../../lib/data/prisma";
import { revalidatePath } from "next/cache";

export async function deleteInvestment(projectId: string) {
  console.log("🔥 DELETE SERVER ACTION STARTED for ID:", projectId);

  try {
    // Verify project exists
    const existingProject = await prisma.investmentProject.findUnique({
      where: { id: projectId },
      include: {
        pricingOptions: true, // Include pricingOptions options to see what will be deleted
      },
    });

    if (!existingProject) {
      throw new Error("Investment project not found");
    }

    console.log(`📦 Found project: ${existingProject.name}`);
    console.log(`📊 Has ${existingProject.pricingOptions.length} pricingOptions options`);

    // --- STEP 1: DELETE pricingOptions OPTIONS ---
    console.log("1️⃣ Deleting pricingOptions options...");
    await prisma.projectPricing.deleteMany({
      where: { projectId: projectId },
    });
    console.log("✅ pricingOptions options deleted");

    // --- STEP 2: DELETE PROJECT ---
    console.log("2️⃣ Deleting project...");
    await prisma.investmentProject.delete({
      where: { id: projectId },
    });
    console.log("✅ Project deleted");

    // Optional: Delete image from Cloudinary
    // Uncomment if you want to clean up images when deleting projects
    // if (existingProject.projectImg && existingProject.projectImg !== "default-placeholder") {
    //   console.log("🗑️ Deleting image from Cloudinary...");
    //   await deleteImage(existingProject.projectImg);
    // }

    revalidatePath("/admin/projects");
    return { success: true, message: "Investment project deleted successfully" };
  } catch (error) {
    console.error("❌ DELETE ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}