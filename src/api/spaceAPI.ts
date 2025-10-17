import type { SearchRequest } from "../types/search";
import api from "./index";

export const searchSpaces = async (
  searchInput: SearchRequest,
  token?: string
) => {
  try {
    const response = await api.post("/api/space/search", searchInput, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Search API error:", error.response.data);
      throw new Error(error.response.data?.message || "Search failed");
    }
    throw new Error("Network error");
  }
};

export const getMySpaces = () => api.get("/api/space");
export const createSpace = (data: any) => api.post("/api/space", data);
export const updateSpace = (id: number, data: any) =>
  api.patch(`/api/space/${id}`, data);
export const deleteSpace = (id: number) => api.delete(`/api/space/${id}`);
export const getSpaceById = (id: number) => api.get(`/api/space/${id}`);
