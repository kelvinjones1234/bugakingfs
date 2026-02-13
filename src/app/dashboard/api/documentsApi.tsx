import { api } from "@/utils/axios";

// --- Interfaces ---

export interface DocumentStats {
  total: number;
  agreements: number;
  deeds: number;
  reports: number;
}

export interface DocumentItem {
  id: number;
  title: string;
  category: "agreement" | "deed" | "report" | "other";
  file_url: string;
  file_size: string;
  file_type: string;
  upload_date: string;
}

class DocumentsAPI {
  private static instance: DocumentsAPI;

  private constructor() {}

  static getInstance(): DocumentsAPI {
    if (!DocumentsAPI.instance) {
      DocumentsAPI.instance = new DocumentsAPI();
    }
    return DocumentsAPI.instance;
  }

  // --- Helper to extract data ---
  private handleResponse<T>(response: any): T {
    return response.data;
  }

  // --- API Methods ---

  /**
   * Fetches the statistics for the user's documents (counts per category).
   */
  async getDocumentStats(): Promise<DocumentStats> {
    const response = await api.get("/documents/stats/");
    return this.handleResponse<DocumentStats>(response);
  }

  /**
   * Fetches the list of documents, optionally filtered by search or category.
   */
  async getDocuments(params?: {
    search?: string;
    category?: string;
  }): Promise<DocumentItem[]> {
    const response = await api.get("/documents/", { params });
    return this.handleResponse<DocumentItem[]>(response);
  }
}

export const documentsApi = DocumentsAPI.getInstance();
