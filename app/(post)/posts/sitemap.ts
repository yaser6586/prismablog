




import { getAllPostsForSitemap } from "@/app/lib/data";
import { MetadataRoute } from "next";
import { afterEach } from "node:test";



export async function generateSitemaps() {
   try {
    const posts = await getAllPostsForSitemap();


 const ids = posts.map((pt ) => ({id : pt.slug as string})); 
  return ids
   } catch (error) {
    
   }
   return [{id : "1"}]
 }
export default async function sitemap({
  id,
}: {
  id: string
}): Promise<MetadataRoute.Sitemap> {
 
  const start = Number(id) * 50000
  const end = start + 50000

  try {
    const posts = await getAllPostsForSitemap();
 

    // return []
      return posts.map((pt ) => ( {
        url: `https://teknext.ir/posts/${pt.slug}`,
        lastModified: pt.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8 ,
      }))
  } catch (error) {
    console.log(error)
  }

return[]


}
 
