const BASE_URL = "https://flashcard-app-backend-dw04.onrender.com";

export interface Collection {
  id: number;
  name: string;
  description?: string;
  creator_id: number;
  public: boolean;
  created_at?: string;
  updated_at?: string;
  card_count?: number;
}

export interface CollectionWithPermissions {
  collection: Collection;
  canRead: boolean;
  canWrite: boolean;
}

export interface PaginatedCards {
  cards: any[];
  total: number;
  limit: number;
  offset: number;
}

// ✅ FIXED: Always return a HeadersInit-compatible object
function authHeader(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Example usage in API calls:
export async function getMyCollections(): Promise<Collection[]> {
  const res = await fetch(`${BASE_URL}/collections/my`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error("Failed to fetch user collections");
  return res.json();
}
// 🔹 Search public collections
export async function searchCollections(query: string): Promise<Collection[]> {
  const res = await fetch(`${BASE_URL}/collections/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search collections");
  return res.json();
}

// 🔹 Get single collection with permissions
export async function getCollection(id: string): Promise<CollectionWithPermissions> {
  const res = await fetch(`${BASE_URL}/collections/${id}`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error("Collection not found or unauthorized");
  return res.json();
}

// 🔹 Get aggregate data (cards + pagination)
export async function getAggregateCollection(
  id: string,
  limit = 10,
  offset = 0
): Promise<PaginatedCards> {
  const res = await fetch(`${BASE_URL}/collections/${id}/aggregate?limit=${limit}&offset=${offset}`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error("Failed to fetch aggregate data");
  return res.json();
}

// 🔹 Create new collection
export async function createCollection(data: Partial<Collection>): Promise<Collection> {
  const res = await fetch(`${BASE_URL}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create collection");
  return res.json();
}

// 🔹 Update a collection
export async function updateCollection(id: string, data: Partial<Collection>): Promise<Collection> {
  const res = await fetch(`${BASE_URL}/collections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error("Failed to update collection");
  return res.json();
}

// 🔹 Delete a collection
export async function deleteCollection(id: string): Promise<{ success?: boolean }> {
  const res = await fetch(`${BASE_URL}/collections/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error("Failed to delete collection");
  return res.json();
}
