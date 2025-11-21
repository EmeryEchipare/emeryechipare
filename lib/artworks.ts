export interface Artwork {
  id: number;
  title: string;
  filename: string;
  date: string; // YYYY-MM-DD format
  description?: string; // Optional artist description
}

export const artworks: Artwork[] = [
  { id: 1, title: "20250611-LowRes-01", filename: "20250611-LowRes-01.jpg", date: "2025-06-11" },
  { id: 2, title: "20250611-LowRes-02", filename: "20250611-LowRes-02.jpg", date: "2025-06-11" },
  { id: 3, title: "20250611-LowRes-03", filename: "20250611-LowRes-03.png", date: "2025-06-11" },
  { id: 4, title: "20250611-LowRes-04", filename: "20250611-LowRes-04.jpg", date: "2025-06-11" },
  { id: 5, title: "20250611-LowRes-05", filename: "20250611-LowRes-05.jpg", date: "2025-06-11" },
  { id: 6, title: "20250612-LowRes-01", filename: "20250612-LowRes-01.jpg", date: "2025-06-12" },
  { id: 7, title: "20250612-LowRes-02", filename: "20250612-LowRes-02.jpg", date: "2025-06-12" },
  { id: 8, title: "20250618-LowRes-01", filename: "20250618-LowRes-01.jpg", date: "2025-06-18" },
  { id: 9, title: "20250622-LowRes-01", filename: "20250622-LowRes-01.jpg", date: "2025-06-22" },
  { id: 10, title: "20250622-LowRes-02", filename: "20250622-LowRes-02.jpg", date: "2025-06-22" },
  { id: 11, title: "20250622-LowRes-03", filename: "20250622-LowRes-03.jpg", date: "2025-06-22" },
  { id: 12, title: "20250627-LowRes-01", filename: "20250627-LowRes-01.jpg", date: "2025-06-27" },
  { id: 13, title: "20250627-LowRes-02", filename: "20250627-LowRes-02.jpg", date: "2025-06-27" },
  { id: 14, title: "20250627-LowRes-03", filename: "20250627-LowRes-03.jpg", date: "2025-06-27" },
  { id: 15, title: "20250627-LowRes-04", filename: "20250627-LowRes-04.jpg", date: "2025-06-27" },
  { id: 16, title: "20250628-LowRes-01", filename: "20250628-LowRes-01.jpg", date: "2025-06-28" },
  { id: 17, title: "20250628-LowRes-02", filename: "20250628-LowRes-02.jpg", date: "2025-06-28" },
  { id: 18, title: "20250628-LowRes-03", filename: "20250628-LowRes-03.jpg", date: "2025-06-28" },
  { id: 19, title: "20250628-LowRes-04", filename: "20250628-LowRes-04.jpg", date: "2025-06-28" },
  { id: 20, title: "20250628-LowRes-05", filename: "20250628-LowRes-05.jpg", date: "2025-06-28" },
  { id: 21, title: "20250628-LowRes-06", filename: "20250628-LowRes-06.jpg", date: "2025-06-28" },
  { id: 22, title: "20250628-LowRes-07", filename: "20250628-LowRes-07.jpg", date: "2025-06-28" },
  { id: 23, title: "20250628-LowRes-08", filename: "20250628-LowRes-08.jpg", date: "2025-06-28" },
  { id: 24, title: "20250628-LowRes-09", filename: "20250628-LowRes-09.jpg", date: "2025-06-28" },
  { id: 25, title: "20250628-LowRes-10", filename: "20250628-LowRes-10.jpg", date: "2025-06-28" },
  { id: 26, title: "20250629-LowRes-01", filename: "20250629-LowRes-01.jpg", date: "2025-06-29" },
  { id: 27, title: "20250629-LowRes-02", filename: "20250629-LowRes-02.jpg", date: "2025-06-29" },
  { id: 28, title: "20250629-LowRes-03", filename: "20250629-LowRes-03.jpg", date: "2025-06-29" },
  { id: 29, title: "20250629-LowRes-04", filename: "20250629-LowRes-04.jpg", date: "2025-06-29" },
  { id: 30, title: "20250629-LowRes-05", filename: "20250629-LowRes-05.jpg", date: "2025-06-29" },
  { id: 31, title: "20250629-LowRes-06", filename: "20250629-LowRes-06.jpg", date: "2025-06-29" },
  { id: 32, title: "20250629-LowRes-07", filename: "20250629-LowRes-07.jpg", date: "2025-06-29" },
  { id: 33, title: "20250629-LowRes-08", filename: "20250629-LowRes-08.jpg", date: "2025-06-29" },
  { id: 34, title: "20250629-LowRes-09", filename: "20250629-LowRes-09.jpg", date: "2025-06-29" },
  { id: 35, title: "20250629-LowRes-10", filename: "20250629-LowRes-10.jpg", date: "2025-06-29" },
  { id: 36, title: "20250629-LowRes-11", filename: "20250629-LowRes-11.jpg", date: "2025-06-29" },
  { id: 37, title: "20250629-LowRes-12", filename: "20250629-LowRes-12.jpg", date: "2025-06-29" },
  { id: 38, title: "20250706-LowRes-01", filename: "20250706-LowRes-01.jpg", date: "2025-07-06" },
  { id: 39, title: "20251003-LowRes-01", filename: "20251003-LowRes-01.jpg", date: "2025-10-03" },
  { id: 40, title: "20251006-LowRes-01", filename: "20251006-LowRes-01.jpg", date: "2025-10-06" },
  { id: 41, title: "20251006-LowRes-02", filename: "20251006-LowRes-02.jpg", date: "2025-10-06" },
  { id: 42, title: "20251006-LowRes-03", filename: "20251006-LowRes-03.jpg", date: "2025-10-06" },
  { id: 43, title: "20251006-LowRes-04", filename: "20251006-LowRes-04.jpg", date: "2025-10-06" },
  { id: 44, title: "20251006-LowRes-05", filename: "20251006-LowRes-05.png", date: "2025-10-06" },
  { id: 45, title: "20251020-LowRes-01", filename: "20251020-LowRes-01.jpg", date: "2025-10-20" },
  { id: 46, title: "20251020-LowRes-02", filename: "20251020-LowRes-02.png", date: "2025-10-20" },
  { id: 47, title: "20251119-LowRes-01", filename: "20251119-LowRes-01.jpg", date: "2025-11-19" },
];

// Helper function to get the latest artworks
export function getLatestArtworks(count: number = 3): Artwork[] {
  return [...artworks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

// Helper function to get all artworks sorted by date (newest first)
export function getAllArtworksSorted(): Artwork[] {
  return [...artworks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper function to get an artwork by ID
export function getArtworkById(id: number): Artwork | undefined {
  return artworks.find((art) => art.id === id);
}

// Helper function to get previous and next artwork IDs
export function getAdjacentArtworkIds(currentId: number): { prevId: number | null; nextId: number | null } {
  const sortedArtworks = getAllArtworksSorted();
  const currentIndex = sortedArtworks.findIndex((art) => art.id === currentId);
  
  if (currentIndex === -1) {
    return { prevId: null, nextId: null };
  }
  
  const prevId = currentIndex > 0 ? sortedArtworks[currentIndex - 1].id : null;
  const nextId = currentIndex < sortedArtworks.length - 1 ? sortedArtworks[currentIndex + 1].id : null;
  
  return { prevId, nextId };
}
