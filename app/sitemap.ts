import { MetadataRoute } from "next";
import {  getAllPostsForSitemap } from "./lib/data";
export const revalidate = 30;
export default async function sitemap( ) : Promise<{
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
}[]> {
   const post = await getAllPostsForSitemap()

  const postSiteMap = post.map((post) => {
    return {
      url: `https://teknext.ir/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });
  return [
    {
      url: "https://teknext.ir",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://teknext.ir/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...postSiteMap,
  ];
}
