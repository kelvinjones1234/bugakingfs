import { api } from "@/utils/axios";

// --- Types ---
export interface ResetResponse {
  message?: string;
  error?: string;
  detail?: string;
}

// --- Client ---
class PasswordResetClient {
  private static instance: PasswordResetClient;
  private constructor() {}

  static getInstance(): PasswordResetClient {
    if (!PasswordResetClient.instance) {
      PasswordResetClient.instance = new PasswordResetClient();
    }
    return PasswordResetClient.instance;
  }

  // Step 1: Request Link
  async requestReset(email: string) {
    const response = await api.post("/password-reset/", { email });
    return response.data;
  }

  // Step 2: Confirm New Password
  async confirmReset(
    uid: string,
    token: string,
    password: string,
    password_confirm: string,
  ) {
    const url = `/reset-password/${uid}/${token}/`;
    const response = await api.post(url, { password, password_confirm });
    return response.data;
  }
}

export const passwordResetClient = PasswordResetClient.getInstance();
