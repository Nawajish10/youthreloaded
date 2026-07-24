import { apiClient } from "@/lib/api";

export const apiService = {
  async submitLead(data: Record<string, unknown>) {
    const response = await apiClient.post("/leads", data);
    return response.data;
  },

  async getPlans() {
    const response = await apiClient.get("/plans");
    return response.data;
  },
};
