


import { getAllPostsForSitemap } from "@/app/lib/data";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
  
 const posts = await getAllPostsForSitemap();
 const ids = posts?.map((pt) => ({id : pt.slug as string})); 
  return ids
}
export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
 
  
 const posts = await getAllPostsForSitemap();
  return posts?.map((pt) => ({
    url: `https://teknext.ir/posts/${pt.slug}`,
    lastModified: pt.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
