import { MetadataRoute } from "next";


export default  function sitemap() : MetadataRoute.Sitemap {


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
    }
  ];
}
