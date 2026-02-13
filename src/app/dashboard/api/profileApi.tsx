// import { api } from "@/utils/axios";

// // 1. Define the nested profile structure
// export interface ProfileDetails {
//   address: string;
//   profile_picture: string | null;
// }

// // 2. Define the Main User Profile data
// export interface UserProfile {
//   id: number;
//   email: string;
//   first_name: string;
//   last_name: string;
//   phone_number: string;

//   // --- ADD THESE LINES ---
//   profile_picture?: string | null; // Optional string or null
//   address?: string | null; // Optional string or null
//   is_approved: boolean;
// }

// // 3. Update payload to match the nested structure for updates if necessary
// export interface UpdateProfilePayload {
//   first_name?: string;
//   last_name?: string;
//   phone_number?: string;
//   address?: string;
//   profile_picture?: File;
// }

// class APIClient {
//   private static instance: APIClient;
//   private constructor() {}

//   static getInstance(): APIClient {
//     if (!APIClient.instance) {
//       APIClient.instance = new APIClient();
//     }
//     return APIClient.instance;
//   }

//   private handleResponse<T>(response: any): T {
//     return response.data;
//   }

//   async getProfile(): Promise<UserProfile> {
//     const response = await api.get("/profile/");
//     return this.handleResponse<UserProfile>(response);
//   }

//   async updateProfile(data: UpdateProfilePayload): Promise<UserProfile> {
//     const formData = new FormData();

//     if (data.first_name) formData.append("first_name", data.first_name);
//     if (data.last_name) formData.append("last_name", data.last_name);
//     if (data.phone_number) formData.append("phone_number", data.phone_number);

//     // If your backend expects 'address' inside the nested profile,
//     // you might need to adjust these keys based on your Django Serializer
//     if (data.address) formData.append("address", data.address);

//     if (data.profile_picture) {
//       formData.append("profile_picture", data.profile_picture);
//     }

//     const response = await api.patch("/profile/", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     return this.handleResponse<UserProfile>(response);
//   }
// }

// export const apiClient = APIClient.getInstance();

import { api } from "@/utils/axios";

// ... [Keep your existing interfaces: ProfileDetails, UserProfile, UpdateProfilePayload] ...

// 1. Define response shape for the new view
export interface HeaderData {
  profile_image: string | null;
  has_notifications: boolean;
  unread_count: number;
}

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture?: string | null;
  address?: string | null;
  is_approved: boolean;
}

// ... [UpdateProfilePayload interface] ...
export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  profile_picture?: File;
}

class APIClient {
  private static instance: APIClient;
  private constructor() {}

  static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private handleResponse<T>(response: any): T {
    return response.data;
  }

  async getProfile(): Promise<UserProfile> {
    const response = await api.get("/profile/");
    return this.handleResponse<UserProfile>(response);
  }

  // --- ADD THIS METHOD ---
  async getHeaderData(): Promise<HeaderData> {
    const response = await api.get("/header-data/");
    return this.handleResponse<HeaderData>(response);
  }

  async updateProfile(data: UpdateProfilePayload): Promise<UserProfile> {
    const formData = new FormData();

    if (data.first_name) formData.append("first_name", data.first_name);
    if (data.last_name) formData.append("last_name", data.last_name);
    if (data.phone_number) formData.append("phone_number", data.phone_number);

    // If your backend expects 'address' inside the nested profile,
    // you might need to adjust these keys based on your Django Serializer
    if (data.address) formData.append("address", data.address);

    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    }

    const response = await api.patch("/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return this.handleResponse<UserProfile>(response);
  }
}

export const apiClient = APIClient.getInstance();
