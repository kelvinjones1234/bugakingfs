import { api } from "@/utils/axios";

// --- 1. User Profile Interfaces ---
export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  profile_picture: string | null;
  is_approved: boolean;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  profile_picture?: File;
}

export interface InvestmentResponse {
  message: string;
  investment_id: number;
  status: string;
}

// --- 2. Investment Interfaces ---

export interface PricingOption {
  id: number;
  plan_name: string; // e.g., "Weekly 3 Months"
  plan_duration_days: number;
  payment_mode: "weekly" | "monthly" | "one_time";
  total_price: string; // Decimal returns as string from API usually
  minimum_deposit: string;
  roi_start_display: string; // e.g., "Month 13" or "Immediate"
}

export interface InvestmentProject {
  id: number;
  name: string; // e.g., "Azure Heights Residency"
  investment_type: string;
  asset_type: string;
  location: string;
  category_display: string; // e.g., "Real Estate • Lagos, NG"
  investment_detail: string;
  project_img: string | null;
  expected_roi_percent: string; // e.g., "18.00"
  active: boolean;
  pricing_options: PricingOption[];
}

// --- 3. API Client Class ---

class APIClient {
  private static instance: APIClient;

  private constructor() {}

  static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  // --- Helper to extract data ---
  private handleResponse<T>(response: any): T {
    return response.data;
  }

  // --- Investment Methods ---

  /**
   * Fetches the list of active investment projects with their pricing plans.
   */
  async getInvestments(): Promise<InvestmentProject[]> {
    // Assumes your URL pattern is /investments/ or similar
    const response = await api.get("/investments/");
    return this.handleResponse<InvestmentProject[]>(response);
  }

  /**
   * Example: If you need to fetch a single detail page later
   */
  async getInvestmentDetail(id: number): Promise<InvestmentProject> {
    const response = await api.get(`/investments/${id}/`);
    return this.handleResponse<InvestmentProject>(response);
  }

  async submitInvestment(pricingId: number): Promise<InvestmentResponse> {
    const response = await api.post("/investments/create/", {
      pricing_id: pricingId,
    });
    return this.handleResponse<InvestmentResponse>(response);
  }
}

export const apiClient = APIClient.getInstance();
