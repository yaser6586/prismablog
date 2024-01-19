import { MetadataRoute } from "next";
import { getAllPostsForSitemap } from "./lib/data";
export const revalidate = 30

export default async  function sitemap() : Promise<MetadataRoute.Sitemap> {
 
 try {
  const posts = await getAllPostsForSitemap();
   const allPosts = posts.map((pt ) => ( {
    url: `https://teknext.ir/posts/${decodeURI(pt.slug as string)}`,
    lastModified: pt.updatedAt,
    changeFrequency: "weekly" as "weekly",
    priority: 0.8 ,
  }))
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
    }, ... allPosts as MetadataRoute.Sitemap
  ];
 } catch (error) {
  console.log(error)
 }
return[  {
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
}]
 
}
