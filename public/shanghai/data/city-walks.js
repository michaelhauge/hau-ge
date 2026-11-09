// Sources describe individual stops; access and opening hours can change.
const CITY_WALKS = {
  SH012: {
    title: "Wukang Lu",
    subtitle: "A little architecture, a little wandering, and plenty to look at.",
    introduction: "Start at Wukang Mansion and head north along Wukang Road. Take your time: the best bits are often just above eye level.",
    stops: [
      { name: "Wukang Mansion", address: "1850 Huaihai Middle Road, at Wukang Road", description: "Start at the unmistakable flatiron-shaped apartment building. Find a safe spot across the intersection for the view.", access: "Residential building; enjoy the exterior from the street.", source: "https://www.meet-in-shanghai.net/en/guide/roaming-and-savoring-the-leisurely-atmosphere-of-wukang-road-city-walk-974379/", rating: "4.4 / 5 · 791 Google reviews", placeId: "ChIJFezOP0llsjURgZUzT-yILHw" },
      { name: "Huang Xing’s former residence", address: "393 Wukang Road", description: "A historic house associated with revolutionary Huang Xing, near the street’s old-house information centre.", access: "Viewing and entry arrangements may change; check locally.", source: "https://english.shanghai.gov.cn/en-ScenicSpots/20231218/596192f5f59048bbbc3fa54d92304e93.html", rating: "3.4 / 5 · 9 Google reviews", placeId: "ChIJkWU-sk5lsjURKXZ4Fs-8U4o" },
      { name: "The villa at No. 390", address: "390 Wukang Road", description: "Look for the pale walls, red roof and arches of this former Italian consul’s residence.", access: "View from the street; do not assume the property is open to visitors.", source: "https://www.travelchinaguide.com/attraction/shanghai/wukang-road.htm" },
      { name: "Wukang Court / Ferguson Lane", address: "376–378 Wukang Road", description: "A courtyard tucked off the street, with places to eat and browse. A natural pause along the way.", access: "Individual businesses set their own hours.", source: "https://www.meet-in-shanghai.net/en/guide/roaming-and-savoring-the-leisurely-atmosphere-of-wukang-road-city-walk-974379/" },
      { name: "Romeo’s Balcony", address: "210 Wukang Road", description: "Look up for the little balcony whose nickname comes from a story about Shanghai’s romantic side.", access: "Not open to the public; view from the pavement.", source: "https://www.meet-in-shanghai.net/en/shanghai-citywalk-route-recommendations/roaming-and-savoring-the-leisurely-atmosphere-of-wukang-road-city-walk-776979/" },
      { name: "Ba Jin’s former residence", address: "113 Wukang Road", description: "The writer Ba Jin lived in this garden house for many years. It’s a quieter place to finish the walk.", access: "Visitor access is unconfirmed; sources disagree about whether renovation has finished.", source: "https://www.meet-in-shanghai.net/en/guide/roaming-and-savoring-the-leisurely-atmosphere-of-wukang-road-city-walk-974379/", rating: "4.4 / 5 · 31 Google reviews", placeId: "ChIJPUSp3E1lsjUR5d66ad6YezA" },
    ],
  },
};

const WUKANG_PHOTOS = [
  { image: "photos/wukang-mansion.jpg", title: "Wukang Mansion", creator: "钉钉", source: "https://commons.wikimedia.org/wiki/File:Wukang_Mansion.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { image: "photos/wukang-huang.jpg", title: "393 Wukang Road", creator: "Windmemories", source: "https://commons.wikimedia.org/wiki/File:20260209_393_Wukang_Road.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { image: "photos/wukang-villa.jpg", title: "Former Italian consul’s residence", creator: "Livelikerw", source: "https://commons.wikimedia.org/wiki/File:Former_Residence_of_Italian_Consulate_General_Shanghai.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  { image: "photos/wukang-court.jpg", title: "Historic house at 376 Wukang Road", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E6%AD%A6%E5%BA%B7%E8%B7%AF376%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { image: "photos/wukang-romeo.jpg", title: "210 Wukang Road", creator: "Windmemories", source: "https://commons.wikimedia.org/wiki/File:20260209_210_Wukang_Road.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { image: "photos/wukang-bajin.jpg", title: "Former residence of Ba Jin", creator: "Zhou Guanhuai", source: "https://commons.wikimedia.org/wiki/File:Former_Residence_of_Ba_Jin.jpg", license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
];
CITY_WALKS.SH012.stops.forEach((stop, index) => { stop.photo = WUKANG_PHOTOS[index]; });

CITY_WALKS.SH012.foodAndDrink = [
  { name: "Coffee Tree", kind: "Coffee, dessert & light meals", address: "376 Wukang Road, inside Ferguson Lane", near: "At stop 4", note: "A garden café for a leisurely pause.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250411/1dfa64b624304bff969afd23b9d2bb24.html" },
  { name: "Fortunate Vegan Cafe", kind: "Vegan food & coffee", address: "8F, 378 Wukang Road", near: "Near stop 4", note: "A terrace option above the street.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250411/1dfa64b624304bff969afd23b9d2bb24.html" },
  { name: "Wukang Garden Restaurant", kind: "Modern Italian-inspired dining", address: "No. 1, Lane 100 Wukang Road", near: "Near stop 6", note: "A garden setting if you feel like a longer meal.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250411/1dfa64b624304bff969afd23b9d2bb24.html" },
  { name: "Dongxin Jiujia", kind: "Shanghai cuisine", address: "98 Wukang Road", near: "Near stop 6", note: "A local-cuisine option near the northern end of the walk.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250411/1dfa64b624304bff969afd23b9d2bb24.html" },
];

CITY_WALKS.SH011 = {
  title: "Anfu Lu",
  subtitle: "Theater, old houses, coffee stops and a little people-watching.",
  introduction: "Start by Wukang Road and wander east along Anfu Lu. Look past the shopfronts and you’ll find old Shanghai tucked between the newer arrivals.",
  guidance: "Follow Anfu Road east · Tap a stop for details",
  mapCenter: [121.439269, 31.215881],
  foodIntro: "A few ideas along the street. Listings and hours can change, so check before you go.",
  stops: [
    { name: "RAC and the No. 322 courtyard", address: "322 Anfu Road, near Wukang Road", description: "Start with a look into the courtyard. Michael’s RAC recommendation is here too, a handy place for a coffee or galette.", access: "The Anfu branch is a candidate match for Michael’s original RAC recommendation; check current opening details.", source: "https://www.smartshanghai.com/venue/15087/rac_anfu_lu", rating: "4.5 / 5 · 116 Google reviews", ratingNote: "Previously recorded for the Anfu Road branch; rating and count may have changed.", placeId: "ChIJ1Q89TSxlsjUR3GB7e5Vp9Ao", photo: { image: "photos/rac-anfu.jpg", title: "RAC on Anfu Road", creator: "Photographer not identified", source: "https://www.sohu.com/a/426749940_188703", license: "Reuse permission not verified" } },
    { name: "The photography entrance at No. 300", address: "300 Anfu Road", description: "Look for the address of the former Imaging Group art space, a reminder of the street’s creative life.", access: "The photo is from 2016; the current tenant and visitor access have not been verified.", source: "https://commons.wikimedia.org/wiki/File:Shanghai_Imaging_Group_entrance.jpg", photo: { image: "photos/anfu-imaging.jpg", title: "Imaging Group entrance in 2016", creator: "之乎", source: "https://commons.wikimedia.org/wiki/File:Shanghai_Imaging_Group_entrance.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "The theater district and No. 284 villa", address: "284–288 Anfu Road", description: "The Shanghai Dramatic Arts Centre is at No. 288. Next door, the garden villa at No. 284 is another reason to look up from the pavement.", access: "Check the theater’s schedule separately; the villa photo shows No. 284, not the theater entrance.", source: "https://www.meet-in-shanghai.net/en/shanghai-citywalk-route-recommendations/roaming-and-savoring-the-leisurely-atmosphere-of-wukang-road-city-walk-776979/", photo: { image: "photos/anfu-villa.jpg", title: "Historic villa at 284 Anfu Road", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:Shanghai_Dramatic_Arts_Center.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "The house at No. 255", address: "255 Anfu Road", description: "A residential building among the older houses on this stretch. Take in the roofline and the contrast with the shops around it.", access: "A residential property; view from the street and respect residents’ privacy.", source: "https://commons.wikimedia.org/wiki/File:Anfulu_255_Hao_Zhuzhai.JPG", photo: { image: "photos/anfu-255.jpg", title: "House at 255 Anfu Road in 2015", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:Anfulu_255_Hao_Zhuzhai.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "Dupleix Apartments", address: "233 Anfu Road", description: "Named for the road’s former French name, this historic apartment building is a nice architectural pause on the way east.", access: "Residential building; view from the street.", source: "https://commons.wikimedia.org/wiki/File:Dupleix_Apartments.JPG", photo: { image: "photos/anfu-dupleix.jpg", title: "Dupleix Apartments at 233 Anfu Road", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:Dupleix_Apartments.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "Wulumuqi Middle Road crossing", address: "Anfu Road and Wulumuqi Middle Road", description: "Finish at one of the neighborhood’s lively intersections. From here, you can keep wandering or turn back for a snack.", access: "A public intersection; use the crossings.", source: "https://commons.wikimedia.org/wiki/File:Wulumuqi_Rd._(M),_Shanghai_20251228_01.jpg", photo: { image: "photos/anfu-crossing.jpg", title: "The Anfu and Wulumuqi crossing in 2025", creator: "Vesekskiy", source: "https://commons.wikimedia.org/wiki/File:Wulumuqi_Rd._(M),_Shanghai_20251228_01.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "RAC (Anfu Road)", kind: "Galettes, coffee & wine", address: "Building 14, 322 Anfu Road", near: "At stop 1 · Michael’s favorite, branch candidate", note: "A courtyard stop for a bite or a glass. Listing details may be out of date.", source: "https://www.smartshanghai.com/venue/15087/rac_anfu_lu" },
    { name: "13de Marzo Cafe", kind: "Coffee", address: "Building 4, 322 Anfu Road", near: "Near stop 1", note: "Coffee with the brand’s teddy-bear theme; Shanghai’s city guide listed it in 2025.", source: "https://english.shanghai.gov.cn/en-SpecialtyShoppingAreas/20250401/02ac41cd3f76497083154ed520a8e7ee.html" },
    { name: "Sunflour", kind: "Bakery & coffee", address: "Rooms 103–104, 308 Anfu Road", near: "Between stops 1 and 2", note: "A bakery option for pastries or a quick coffee; check the branch before visiting.", source: "https://www.citynewsservice.cn/articles/cns/lifestyle/my-hood/a-neighborhood-through-the-eyes-of-an-art-insider-zmz80xqm" },
    { name: "Mi Thai (Anfu Road)", kind: "Thai food & wine", address: "2F, 195 Anfu Road", near: "Near stop 6", note: "A sit-down option; SmartShanghai’s listing is older, so check whether it is still operating.", source: "https://www.smartshanghai.com/venue/5013/mi_thai" },
  ],
};

CITY_WALKS.SH010 = {
  title: "Wulumuqi Lu",
  subtitle: "A neighborhood street with good browsing and a few stories.",
  introduction: "Start where the Anfu walk ends, then head south. This is a street for taking your time, looking in windows and stopping whenever something catches your eye.",
  guidance: "Anfu Road to Fuxing West Road · Tap a stop for details",
  mapCenter: [121.4415, 31.2139],
  foodIntro: "A few ideas close to the route. These listings may have changed, so check before setting out.",
  stops: [
    { name: "Anfu Road crossing", address: "Wulumuqi Middle Road and Anfu Road", description: "Pick up the walk at the Anfu intersection, where the two streets meet.", access: "Use the pedestrian crossings.", source: "https://commons.wikimedia.org/wiki/File:Wulumuqi_Rd._(M),_Shanghai_20251228_01.jpg", photo: { image: "photos/anfu-crossing.jpg", title: "Anfu and Wulumuqi crossing in 2025", creator: "Vesekskiy", source: "https://commons.wikimedia.org/wiki/File:Wulumuqi_Rd._(M),_Shanghai_20251228_01.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "Tagi and the little shopfronts", address: "247 Wulumuqi Middle Road", description: "Look for colorful homewares and independent shops on this stretch. Time Out highlighted Tagi's blue storefront and playful objects in 2024.", access: "Shop tenancy and opening hours can change; check locally.", source: "https://www.timeoutshanghai.com/features/Things_to_Do-Shanghai_walks/105539/9-wonderful-spots-on-Wulumuqi-Road.html", photo: { image: "photos/wulumuqi-tagi.jpg", title: "Tagi, photographed for Time Out Shanghai", creator: "Photographer not identified", source: "https://www.timeoutshanghai.com/features/Things_to_Do-Shanghai_walks/105539/9-wonderful-spots-on-Wulumuqi-Road.html", license: "Reuse permission not verified" } },
    { name: "Fuxing West Road crossing", address: "Wulumuqi Middle Road and Fuxing West Road", description: "Finish at the intersection and look for the apartment buildings that frame the corner. It is an easy place to continue into the surrounding streets.", access: "Residential buildings: enjoy the architecture from the street.", source: "https://www.historic-shanghai.com/the-street-formerly-known-as-wulumuqi-road/", photo: { image: "photos/wulumuqi-fuxing.jpg", title: "Wulumuqi and Fuxing West crossing in 2025", creator: "Vesekskiy", source: "https://commons.wikimedia.org/wiki/File:Wulumuqi_Rd._(M),_Shanghai_20251228_02.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "RAC (Anfu Road)", kind: "Galettes, coffee & wine", address: "Building 14, 322 Anfu Road", near: "Near the start · Michael’s favorite, branch candidate", note: "A courtyard stop before the walk; confirm current opening details.", source: "https://www.smartshanghai.com/venue/15087/rac_anfu_lu" },
    { name: "Seoul Snacks", kind: "Korean snacks", address: "298 Wulumuqi Middle Road", near: "Along the walk", note: "Time Out listed rice cakes and fishcake skewers here in 2024; check whether it is still open.", source: "https://www.timeoutshanghai.com/features/Things_to_Do-Shanghai_walks/105539/9-wonderful-spots-on-Wulumuqi-Road.html" },
    { name: "YISID Gelato", kind: "Gelato", address: "313–315 Wulumuqi Middle Road", near: "Along the walk", note: "A gelato option from Time Out's 2024 guide; check current status.", source: "https://www.timeoutshanghai.com/features/Things_to_Do-Shanghai_walks/105539/9-wonderful-spots-on-Wulumuqi-Road.html" },
  ],
};

CITY_WALKS.SH007 = {
  title: "Yanqing Lu",
  subtitle: "Old houses, coffee and a quieter stretch of Shanghai.",
  introduction: "This is a short one. Start at the green apartment building, take your time along the street, and stop for coffee or dumplings when you feel like it.",
  guidance: "From No. 2 toward No. 80 · Tap a stop for details",
  mapCenter: [121.4461, 31.2169],
  foodIntro: "Two places mentioned in local guides. Hours and tenants can change, so check before you go.",
  stops: [
    { name: "The green apartment at No. 2", address: "2 Yanqing Road", description: "Look for the green residential building that appears in the film B for Busy. A good introduction to the street's mix of everyday life and old architecture.", access: "Residential building; view from the pavement.", source: "https://english.shanghai.gov.cn/en-TrendyStores/20250624/9d2d5eeee2784a61ac9e9035aafcfc2b.html", photo: { image: "photos/yanqing-2.jpg", title: "No. 2 Yanqing Road in 2015", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:Yanqinglu_2_Hao_Zhuzhai.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "The lane at No. 4", address: "Lane 4, Yanqing Road", description: "Pause at the entrance and look at the older residential lane, one of the small details that makes this street worth walking slowly.", access: "Private residential lane; respect residents' privacy.", source: "https://commons.wikimedia.org/wiki/File:Yanqinglu_4_Long_Zhuzhai.JPG", photo: { image: "photos/yanqing-4.jpg", title: "Lane 4 Yanqing Road in 2015", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:Yanqinglu_4_Long_Zhuzhai.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "The house around No. 80", address: "Around 80 Yanqing Road", description: "Look out for another older house on this leafy stretch, and take a moment to browse the shops along the way.", access: "Residential property; view from the street. The photo's file name and description give different street numbers.", source: "https://commons.wikimedia.org/wiki/File:%E5%BB%B6%E5%BA%86%E8%B7%AF82%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", photo: { image: "photos/yanqing-80.jpg", title: "House described as 80 Yanqing Road in 2018", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E5%BB%B6%E5%BA%86%E8%B7%AF82%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "MANUAL Espresso Bar", kind: "Coffee", address: "15 Yanqing Road", near: "Near the start", note: "A small espresso bar recommended by a local in Shanghai's 2025 tourism guide; check current hours.", source: "https://www.meet-in-shanghai.net/en/news/a-creatives-guide-to-shanghais-neighborhood-gems-587622/" },
    { name: "Shandong Handmade Dumplings", kind: "Dumplings", address: "14 Yanqing Road", near: "Near the start", note: "A 2023 local recommendation; check whether the shop is still operating.", source: "https://www.citynewsservice.cn/articles/cns/shanghai-living/renowned-foodie-andrew-moo-tours-xuhui-restaurants-4m3x8z3m" },
  ],
};

CITY_WALKS.SH009 = {
  title: "Wuyuan Lu",
  subtitle: "Garden houses and the stories behind the gates.",
  introduction: "Start near Wukang Road and head east. Wuyuan is a good street for slowing down, looking at the houses and making room for a coffee break.",
  guidance: "From No. 314 toward No. 258 · Tap a stop for details",
  mapCenter: [121.4394, 31.2141],
  foodIntro: "Two nearby ideas from local guides. Check the latest hours before visiting.",
  stops: [
    { name: "Former China Welfare Foundation Nursery", address: "314 Wuyuan Road", description: "This garden house once housed a nursery established by Soong Ching Ling. Look for its arches and decorative details from the street.", access: "The building is used for offices; public entry is not confirmed.", source: "https://shanghairoots.com/places/wuyuan-cwi-nursery/", photo: { image: "photos/wuyuan-nursery.jpg", title: "Former nursery at 314 Wuyuan Road in 2016", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:China_Welfare_Institute.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "The houses at Lane 289", address: "Lane 289, Wuyuan Road", description: "Look toward the older residential lane as you continue east. The houses are among the street's protected historic buildings.", access: "A residential lane; please respect residents' privacy.", source: "https://commons.wikimedia.org/wiki/File:%E4%BA%94%E5%8E%9F%E8%B7%AF289%E5%BC%84%E4%BD%8F%E5%AE%85.jpg", photo: { image: "photos/wuyuan-lane.jpg", title: "Lane 289 in 2017", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E4%BA%94%E5%8E%9F%E8%B7%AF289%E5%BC%84%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "Liberty Apartments", address: "258 Wuyuan Road", description: "A compact apartment building among the garden houses. It makes a nice contrast with the lower buildings along the street.", access: "Residential property; enjoy it from the street.", source: "https://shanghairoots.com/places/wuyuan-road/", photo: { image: "photos/wuyuan-liberty.jpg", title: "Liberty Apartments in 2013", creator: "Livelikerw", source: "https://commons.wikimedia.org/wiki/File:Liberty_Apartments.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
  ],
  foodAndDrink: [
    { name: "Coffee Tree", kind: "Coffee & light meals", address: "376 Wukang Road, inside Ferguson Lane", near: "A short detour near the start", note: "A garden café listed in Shanghai's local guide; check current hours.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250411/1dfa64b624304bff969afd23b9d2bb24.html" },
    { name: "No Filter", kind: "Coffee, cocktails & snacks", address: "58 Wuyuan Road", near: "Further east on Wuyuan Road", note: "Recommended in a 2023 neighborhood guide; confirm it is still open before making the detour.", source: "https://www.citynewsservice.cn/articles/cns/shanghai-living/renowned-foodie-andrew-moo-tours-xuhui-restaurants-4m3x8z3m" },
  ],
};

CITY_WALKS.SH006 = {
  title: "Xinle Lu", subtitle: "A little shopping, a few old houses and an easy wander.",
  introduction: "Head east along Xinle Road and take a closer look at the houses between the shops. The shop mix changes, which is part of the fun of wandering.",
  guidance: "Lane 143 toward No. 28 · Tap a stop for details", mapCenter: [121.4507, 31.2195],
  foodIntro: "Suggestions from neighborhood guides; check current opening details before you go.",
  stops: [
    { name: "The lane at No. 143", address: "Lane 143, Xinle Road", description: "Look for the entrance to Xinle Fang, a historic residential lane.", access: "Residential lane; enjoy it from the street and respect residents.", source: "https://fgj.sh.gov.cn/yxlsjz1/20200414/b9946bf8508e4b9689671fcd4146bb86.html", photo: { image: "photos/xinle-143.jpg", title: "Lane 143 Xinle Road", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E6%96%B0%E4%B9%90%E8%B7%AF143%E5%BC%84.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "The house at No. 54", address: "54 Xinle Road", description: "Look up from the shopfronts for this older residential building.", access: "View from the street; the photograph is historical.", source: "https://commons.wikimedia.org/wiki/File:%E6%96%B0%E4%B9%90%E8%B7%AF54%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", photo: { image: "photos/xinle-54.jpg", title: "54 Xinle Road", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E6%96%B0%E4%B9%90%E8%B7%AF54%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "The house at No. 28", address: "28 Xinle Road", description: "Another residential facade to spot as you reach the eastern end of this stretch.", access: "Residential property; view from the street.", source: "https://commons.wikimedia.org/wiki/File:%E6%96%B0%E4%B9%90%E8%B7%AF28%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", photo: { image: "photos/xinle-28.jpg", title: "28 Xinle Road", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E6%96%B0%E4%B9%90%E8%B7%AF28%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "Yuan You Tao", kind: "Hunan food", address: "167 Xinle Road", near: "Near the start", note: "A neighborhood restaurant featured by City News Service; current operating status needs checking.", source: "https://www.citynewsservice.cn/articles/cns/fb/shanghai-secrets-a-hidden-hunan-resto-worth-trying-yuan-you-tao-env066pm" },
    { name: "MANUAL Espresso Bar", kind: "Coffee", address: "15 Yanqing Road", near: "A detour toward Yanqing Road", note: "A local recommendation from 2025; check the hours.", source: "https://www.meet-in-shanghai.net/en/news/a-creatives-guide-to-shanghais-neighborhood-gems-587622/" },
  ],
};

CITY_WALKS.SH008 = {
  title: "Changshu Lu", subtitle: "A useful connector with a few good reasons to slow down.",
  introduction: "Start near the metro, take in the neighborhood streets and head north toward the older house at No. 139.",
  guidance: "Metro station toward No. 139 · Tap a stop for details", mapCenter: [121.4439, 31.2173],
  stops: [
    { name: "Changshu Road station", address: "Changshu Road station, Exit 2", description: "An easy place to arrive and get your bearings before heading into the neighborhood.", access: "Metro exits and services can change; check signs at the station.", source: "https://commons.wikimedia.org/wiki/File:Exit_2_of_Changshu_Road_Station_in_Shanghai_2025.jpg", photo: { image: "photos/changshu-station.jpg", title: "Changshu Road station Exit 2 in 2025", creator: "Kmchang28", source: "https://commons.wikimedia.org/wiki/File:Exit_2_of_Changshu_Road_Station_in_Shanghai_2025.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "Yanqing Road corner", address: "Changshu Road and Yanqing Road", description: "Take a short look down Yanqing Road. The green apartment at No. 2 is a recognizable landmark from the film B for Busy.", access: "The apartment is residential; view it from the street.", source: "https://english.shanghai.gov.cn/en-TrendyStores/20250624/9d2d5eeee2784a61ac9e9035aafcfc2b.html", photo: { image: "photos/yanqing-2.jpg", title: "2 Yanqing Road in 2015", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:Yanqinglu_2_Hao_Zhuzhai.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "The house at No. 139", address: "139 Changshu Road", description: "Look for this early twentieth-century garden residence and the protected architecture along this stretch.", access: "View from the street; do not assume the property is open to visitors.", source: "https://www.sohu.com/a/642076940_121332532", photo: { image: "photos/changshu-139.jpg", title: "139 Changshu Road", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E5%B8%B8%E7%86%9F%E8%B7%AF139%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "MANUAL Espresso Bar", kind: "Coffee", address: "15 Yanqing Road", near: "Near the Yanqing Road corner", note: "A local recommendation from 2025; check current hours.", source: "https://www.meet-in-shanghai.net/en/news/a-creatives-guide-to-shanghais-neighborhood-gems-587622/" },
    { name: "Shandong Handmade Dumplings", kind: "Dumplings", address: "14 Yanqing Road", near: "Near the Yanqing Road corner", note: "A 2023 recommendation; confirm it is still operating.", source: "https://www.citynewsservice.cn/articles/cns/shanghai-living/renowned-foodie-andrew-moo-tours-xuhui-restaurants-4m3x8z3m" },
  ],
};

CITY_WALKS.SH013 = {
  title: "Huaihai Lu", subtitle: "A short architectural stretch around Wukang Mansion.",
  introduction: "Huaihai Road is long, so this walk focuses on a compact western section. Start at No. 1897, head east past Wukang Mansion, and look for the older houses along the way.",
  guidance: "From No. 1897 toward No. 1800 · Tap a stop for details", mapCenter: [121.4336, 31.2062],
  foodIntro: "Two ideas around the Wukang Road junction. Check current hours before visiting.",
  stops: [
    { name: "The house at No. 1897", address: "1897 Huaihai Middle Road", description: "Look for the garden house behind its wall and trees as you start the walk.", access: "View from the street; do not assume public entry.", source: "https://commons.wikimedia.org/wiki/File:20260209_1897_Middle_Huaihai_Road.jpg", photo: { image: "photos/huaihai-1897.jpg", title: "1897 Huaihai Middle Road in 2026", creator: "Windmemories", source: "https://commons.wikimedia.org/wiki/File:20260209_1897_Middle_Huaihai_Road.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "Wukang Mansion", address: "1850 Huaihai Middle Road", description: "The flatiron-shaped apartment building is the landmark here. Find a safe place across the intersection for a view.", access: "Residential building; enjoy the exterior from the street.", source: "https://english.shanghai.gov.cn/en-ScenicSpots/20231218/596192f5f59048bbbc3fa54d92304e93.html", photo: { image: "photos/wukang-mansion.jpg", title: "Wukang Mansion", creator: "钉钉", source: "https://commons.wikimedia.org/wiki/File:Wukang_Mansion.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "The house at No. 1800", address: "1800 Huaihai Middle Road", description: "Continue east to another protected residential building and its garden setting.", access: "Residential property; view from the street.", source: "https://commons.wikimedia.org/wiki/File:%E6%B7%AE%E6%B5%B7%E4%B8%AD%E8%B7%AF1800%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", photo: { image: "photos/huaihai-1800.jpg", title: "1800 Huaihai Middle Road", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E6%B7%AE%E6%B5%B7%E4%B8%AD%E8%B7%AF1800%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "Old Mai Coffee", kind: "Coffee", address: "1854 Huaihai Middle Road", near: "By Wukang Mansion", note: "A coffee stop listed by SmartShanghai; check current hours.", source: "https://www.smartshanghai.com/taxi/16309" },
    { name: "Coffee Tree", kind: "Coffee & light meals", address: "376 Wukang Road, Ferguson Lane", near: "A detour up Wukang Road", note: "A garden café from Shanghai's local guide; check hours before the detour.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250411/1dfa64b624304bff969afd23b9d2bb24.html" },
  ],
};

CITY_WALKS.SH004 = {
  title: "Changle Lu", subtitle: "Old houses and a changing neighborhood.",
  introduction: "Walk east along Changle Road, looking beyond the storefronts for the older buildings and lanes. Shops change quickly here, so leave room to discover what's new.",
  guidance: "From No. 800 toward No. 327 · Tap a stop for details", mapCenter: [121.4495, 31.2204],
  foodIntro: "A couple of nearby ideas; check opening details before visiting.",
  stops: [
    { name: "The house at No. 800", address: "800 Changle Road", description: "Start with this protected historic building and the surrounding street scene.", access: "View from the street; the photograph is from 2014.", source: "https://commons.wikimedia.org/wiki/File:800_Changle_Rd._Shanghai.JPG", photo: { image: "photos/changle-800.jpg", title: "800 Changle Road in 2014", creator: "Livelikerw", source: "https://commons.wikimedia.org/wiki/File:800_Changle_Rd._Shanghai.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "Lane 672", address: "Lane 672, Changle Road", description: "Look for the building at the lane entrance and the protected Liuyuan residential lanes behind it.", access: "Residential area; respect residents' privacy.", source: "https://commons.wikimedia.org/wiki/File:%E9%95%BF%E4%B9%90%E8%B7%AF672%E5%BC%84%E5%BC%84%E5%8F%A3%E4%B8%80%E5%A4%84%E5%BB%BA%E7%AD%91.jpg", photo: { image: "photos/changle-672.jpg", title: "Building at Lane 672", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E9%95%BF%E4%B9%90%E8%B7%AF672%E5%BC%84%E5%BC%84%E5%8F%A3%E4%B8%80%E5%A4%84%E5%BB%BA%E7%AD%91.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "The houses at Nos. 327–329", address: "327–329 Changle Road", description: "Finish with another pair of older residential facades along the street.", access: "Residential buildings; view from the pavement.", source: "https://commons.wikimedia.org/wiki/File:%E9%95%BF%E4%B9%90%E8%B7%AF327-329%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", photo: { image: "photos/changle-327.jpg", title: "327–329 Changle Road", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E9%95%BF%E4%B9%90%E8%B7%AF327-329%E5%8F%B7%E4%BD%8F%E5%AE%85.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "Lucky Mart", kind: "Drinks & snacks", address: "158 Fumin Road", near: "A detour near the Fumin Road crossing · Michael’s favorite", note: "A neighborhood bar from a 2022 guide; check whether it is still operating.", source: "https://www.timeoutshanghai.com/features/Bars_/104984/5-stylish-roadside-drinking-spots-you-should-stop-by-in-Shanghai.html" },
    { name: "Yuan You Tao", kind: "Hunan food", address: "167 Xinle Road", near: "A detour south toward Xinle Road", note: "A local restaurant profile; current status needs checking.", source: "https://www.citynewsservice.cn/articles/cns/fb/shanghai-secrets-a-hidden-hunan-resto-worth-trying-yuan-you-tao-env066pm" },
  ],
};

CITY_WALKS.SH005 = {
  title: "Fumin Lu", subtitle: "Coffee, neighborhood history and a favorite for a drink.",
  introduction: "Start at the northern end of Fumin Road and head south. There are old stories tucked behind the gates and plenty of reasons to pause along the street.",
  guidance: "From No. 1 toward the Changle Road crossing · Tap a stop for details", mapCenter: [121.4464, 31.2212],
  foodIntro: "Local guides mention these spots; check their current status and hours before you go.",
  stops: [
    { name: "SLAB TOWN coffee", address: "1 Fumin Road", description: "A coffee stop at the northern end, recommended by a local in a 2023 neighborhood guide.", access: "Current opening status and hours need checking.", source: "https://www.meet-in-shanghai.net/en/news/variety-and-vitality-in-the-dynamic-neighborhood-of-julu-fumin-roads-530027/", photo: { image: "photos/fumin-slabtown.jpg", title: "SLAB TOWN in a 2023 neighborhood guide", creator: "Photographer not identified", source: "https://www.meet-in-shanghai.net/en/news/variety-and-vitality-in-the-dynamic-neighborhood-of-julu-fumin-roads-530027/", license: "Reuse permission not verified" } },
    { name: "The former Yu family house", address: "43 Fumin Road", description: "A garden house associated with the Yu family sits inside the school grounds. The building is a reminder of the street's older history.", access: "Inside a school campus; entry and views are not guaranteed. Do not enter without permission.", source: "https://www.kankanews.com/detail/lm2XNY7RqQr", photo: { image: "photos/fumin-mansion.jpg", title: "Historic house inside 43 Fumin Road", creator: "Photographer not identified", source: "https://www.kankanews.com/detail/lm2XNY7RqQr", license: "Reuse permission not verified" } },
    { name: "Lucky Mart", address: "185 Fumin Road", description: "Michael's favorite neighborhood drinks stop, featured in the 2023 local guide. A good place to finish with a highball if it is open.", access: "The address and current operating status need checking before a visit.", source: "https://www.meet-in-shanghai.net/en/news/variety-and-vitality-in-the-dynamic-neighborhood-of-julu-fumin-roads-530027/", photo: { image: "photos/lucky-mart.jpg", title: "Lucky Mart on Fumin Road", creator: "Photographer not identified", source: "https://www.smartshanghai.com/venue/19906/lucky_mart_fumin_lu", license: "Reuse permission not verified" } },
  ],
  foodAndDrink: [
    { name: "Tres Perros", kind: "Spanish tapas & wine", address: "1A, Lane 148 Fumin Road", near: "Along the walk", note: "A tapas option featured in the Spanish cultural center's 2024 guide; check current hours.", source: "https://shanghai.cervantes.es/imagenes/File/biblioteca/Guia_de_Shanghai_2024.pdf" },
    { name: "SLAB TOWN", kind: "Coffee", address: "1 Fumin Road", near: "At the start", note: "Recommended in a 2023 neighborhood guide; check current status.", source: "https://www.meet-in-shanghai.net/en/news/variety-and-vitality-in-the-dynamic-neighborhood-of-julu-fumin-roads-530027/" },
  ],
};

CITY_WALKS.SH002 = {
  title: "The Bund", subtitle: "River views, grand buildings and a little old Shanghai.",
  introduction: "Start at Waibaidu Bridge and head south along the Bund. Take in the skyline across the river, then turn around and look at the buildings behind you.",
  guidance: "Waibaidu Bridge to Customs House · Tap a stop for details", mapCenter: [121.4855, 31.2409],
  foodIntro: "A drink or a meal with a sense of place. Check hours and reserve where needed.",
  stops: [
    { name: "Waibaidu Bridge", address: "Waibaidu Bridge, where Suzhou Creek meets the Huangpu", description: "Start at the historic steel bridge and look west along the creek before turning toward the Bund.", access: "Use pedestrian crossings and stay on the pavement.", source: "https://english.shanghai.gov.cn/en-Transportation/20241216/db6fd8ce6c5048f3a7faf511e95366f6.html", photo: { image: "photos/creek-waibaidu.jpg", title: "View along Suzhou Creek from Waibaidu Bridge", creator: "Daniel Case", source: "https://commons.wikimedia.org/wiki/File:Suzhou_Creek_from_Waibaidu_Bridge,_Shanghai.jpg", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "Fairmont Peace Hotel", address: "20 East Nanjing Road", description: "Look for the hotel at the Nanjing Road corner. If you have time, its lobby and jazz bar are worth a look.", access: "The photograph shows the interior; hotel and bar access depend on current arrangements.", source: "https://www.fairmont.com/en/hotels/shanghai/fairmont-peace-hotel/location-contact.html", photo: { image: "photos/bund-peace.jpg", title: "The Peace Hotel rotunda", creator: "Boubloub", source: "https://commons.wikimedia.org/wiki/File:Shanghai_PeaceHotel_Rotunda.jpg", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" } },
    { name: "Customs House", address: "13 Zhongshan East 1st Road", description: "Continue south for the Customs House and its clock tower, one of the most recognizable buildings on the historic waterfront.", access: "Enjoy the exterior from the public street or promenade.", source: "https://commons.wikimedia.org/wiki/File:ShanghaiBundCustomsHouse.jpg", photo: { image: "photos/bund-customs.jpg", title: "Customs House on the Bund", creator: "Diomidis Spinellis", source: "https://commons.wikimedia.org/wiki/File:ShanghaiBundCustomsHouse.jpg", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/" } },
  ],
  foodAndDrink: [
    { name: "The Jazz Bar", kind: "Cocktails & live jazz", address: "Ground floor, Fairmont Peace Hotel, 20 East Nanjing Road", near: "At stop 2", note: "A classic place for a drink; check the performance schedule.", source: "https://www.fairmont.com/en/hotels/shanghai/fairmont-peace-hotel/dining/the-jazz-bar.bar.html" },
    { name: "Mercato", kind: "Italian", address: "6F, Three on the Bund, 3 Zhongshan East 1st Road", near: "Further south along the Bund", note: "A sit-down option with river views; reservations are a good idea.", source: "https://www.threeonthebund.com/en/home" },
  ],
};

CITY_WALKS.SH003 = {
  title: "Suzhou Creek", subtitle: "Old warehouses, bridges and a waterfront wander.",
  introduction: "Start at Sihang Warehouse and make your way east toward the Bund. The highlighted line follows South Suzhou Road as a guide; use public crossings and waterfront paths where available.",
  guidance: "Sihang Warehouse to Waibaidu Bridge · Tap a stop for details", mapCenter: [121.4758, 31.2434],
  foodIntro: "Ideas near either end. Check current hours and the best crossing before visiting.",
  stops: [
    { name: "Sihang Warehouse", address: "21 Guangfu Road, near Xizang Road Bridge", description: "Start with the warehouse and memorial, a landmark of Shanghai's wartime history.", access: "Check museum access and hours. Cross safely to the south bank for the highlighted street.", source: "https://english.shanghai.gov.cn/en-Citywalk/20231210/c2f1f23dc67c4b47bb7ab9afff1a6ebe.html", photo: { image: "photos/creek-warehouse.jpg", title: "Sihang Warehouse in 2019", creator: "Siyuwj", source: "https://commons.wikimedia.org/wiki/File:Sihang_Warehouse,_2019-10-19_02.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "Zhejiang Road Bridge", address: "Zhejiang Road at Suzhou Creek", description: "Pause for the bridge and the view along the water. This is a good stretch for spotting how the old industrial waterfront has changed.", access: "Use the marked crossings; riverside paths may be diverted.", source: "https://english.shanghai.gov.cn/en-Transportation/20241216/db6fd8ce6c5048f3a7faf511e95366f6.html", photo: { image: "photos/creek-zhejiang.jpg", title: "Zhejiang Road Bridge", creator: "Fayhoo", source: "https://commons.wikimedia.org/wiki/File:Chekiang_Road_Bridge.jpg", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
    { name: "Waibaidu Bridge", address: "Waibaidu Bridge, Suzhou Creek", description: "Finish where the creek reaches the Huangpu. Turn back for the water view or continue south onto the Bund.", access: "Use the marked crossings; check for temporary path closures.", source: "https://english.shanghai.gov.cn/en-Transportation/20241216/db6fd8ce6c5048f3a7faf511e95366f6.html", photo: { image: "photos/creek-waibaidu.jpg", title: "Suzhou Creek from Waibaidu Bridge", creator: "Daniel Case", source: "https://commons.wikimedia.org/wiki/File:Suzhou_Creek_from_Waibaidu_Bridge,_Shanghai.jpg", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" } },
  ],
  foodAndDrink: [
    { name: "COMETA", kind: "Italian bistro & drinks", address: "1405 South Suzhou Road", near: "A detour west of the start", note: "A creekside bistro; check current hours before the detour.", source: "https://rachelgouk.com/listings/cometa/" },
    { name: "J'S Link", kind: "Coffee & drinks", address: "234 North Suzhou Road", near: "Near Zhapu Road Bridge, toward the finish", note: "A riverside café listed in Shanghai's 2024 guide; check current status.", source: "https://english.shanghai.gov.cn/en-Cafes/20240521/330f5762c816485b8f6d6121c838c7dc.html" },
  ],
};

CITY_WALKS.SH014 = {
  title: "Xintiandi", subtitle: "Shikumen lanes, a little history and a lake.",
  introduction: "Start at the historic congress site, wander through the restored lanes, and finish by the lake. This is a compact walk with plenty of places to stop for a bite.",
  guidance: "Congress site to the North Block and Taipingqiao Park · Tap a stop for details", mapCenter: [121.4713, 31.2225],
  foodIntro: "Two ideas in the North Block. Hours and menus can change, so check before you go.",
  stops: [
    { name: "Site of the First National Congress", address: "76 Xingye Road", description: "A preserved shikumen building and museum associated with the 1921 founding meeting of the Chinese Communist Party.", access: "Check current opening hours, identification and reservation requirements.", source: "https://www.travelchinaguide.com/attraction/shanghai/site-of-first-national-congress.htm", photo: { image: "photos/xintiandi-congress.jpg", title: "The congress site museum in 2013", creator: "Jpbowen", source: "https://commons.wikimedia.org/wiki/File:Museum_of_the_First_National_Congress_of_the_Chinese_Communist_Party.JPG", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
    { name: "Xintiandi North Block", address: "Lane 181, Taicang Road", description: "Wander the restored shikumen lanes and take in the old-style brickwork alongside the shops and cafés.", access: "Individual businesses and museums set their own hours.", source: "https://english.shanghai.gov.cn/en-PlanANightOut/20231217/2f954a83b78945ffb7dac1038e6797c4.html", photo: { image: "photos/xintiandi-lane.jpg", title: "Among the shops of the shikumen area", creator: "cogdogblog", source: "https://commons.wikimedia.org/wiki/File:Among_the_shops_of_Shikumen_area_(2863263878).jpg", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" } },
    { name: "Taipingqiao Park", address: "Taipingqiao Park, Xintiandi", description: "Finish with a walk around the lake and a different view of the surrounding neighborhood.", access: "Use the public paths; access can change for events.", source: "https://www.shanghaiwalk.com/walks/xintiandi-shikumen/", photo: { image: "photos/xintiandi-park.jpg", title: "Taipingqiao Park in 2015", creator: "Another Believer", source: "https://commons.wikimedia.org/wiki/File:Shanghai,_China,_December_2015_-_147.JPG", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" } },
  ],
  foodAndDrink: [
    { name: "Polux", kind: "French café & bistro", address: "5 Xintiandi Beili, Lane 181 Taicang Road", near: "In the North Block", note: "A relaxed bistro for a meal or coffee; check current hours.", source: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/polux" },
    { name: "The Peninsula Boutique & Café", kind: "Tea & desserts", address: "16, Lane 181 Taicang Road", near: "In the North Block", note: "An afternoon-tea option listed in Shanghai's 2025 guide; check current hours.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250303/9abcc0d313724a1f9735332e08f28892.html" },
  ],
};

CITY_WALKS.SH001 = {
  title: "French Concession", subtitle: "A favorite neighborhood, from Wukang Mansion to Anfu Road.",
  introduction: "Start at Wukang Mansion, wander north up Wukang Road, then turn east onto Anfu Road. There are plenty of excuses to stop for coffee along the way.",
  guidance: "Wukang Mansion to Anfu Road · Tap a stop for details", mapCenter: [121.4365, 31.2111],
  foodIntro: "Two of the neighborhood's café and meal options. Check current hours before you go.",
  stops: [CITY_WALKS.SH012.stops[0], CITY_WALKS.SH012.stops[3], CITY_WALKS.SH011.stops[0]],
  foodAndDrink: [
    { name: "Coffee Tree", kind: "Coffee & light meals", address: "376 Wukang Road, Ferguson Lane", near: "At stop 2", note: "A garden café for a leisurely break.", source: "https://english.shanghai.gov.cn/en-Restaurants/20250411/1dfa64b624304bff969afd23b9d2bb24.html" },
    { name: "RAC (Anfu Road)", kind: "Galettes, coffee & wine", address: "Building 14, 322 Anfu Road", near: "At stop 3", note: "A courtyard stop that may be the branch Michael recommended.", source: "https://www.smartshanghai.com/venue/15087/rac_anfu_lu" },
  ],
};

// Flexible planning estimates include time for the suggested stops, not only walking.
CITY_WALKS.riversideAfternoon = {
  parentId: "SH003", title: "A riverside afternoon", duration: "About 2–3 hours",
  subtitle: "From Suzhou Creek to the Bund skyline.",
  introduction: "Begin at Sihang Warehouse, follow the creek east to Waibaidu Bridge, then continue south along the Bund. Leave time for photos and a drink; museum visits would add extra time.",
  guidance: "Sihang Warehouse → Waibaidu Bridge → the Bund · Tap a stop for details",
  stops: [CITY_WALKS.SH003.stops[0], CITY_WALKS.SH003.stops[1], { ...CITY_WALKS.SH003.stops[2], description: "Pause where the creek reaches the Huangpu, then continue south onto the Bund." }, CITY_WALKS.SH002.stops[1], CITY_WALKS.SH002.stops[2]],
  foodIntro: "Take a break near the waterfront; check current hours before going.",
  foodAndDrink: [CITY_WALKS.SH003.foodAndDrink[1], { ...CITY_WALKS.SH002.foodAndDrink[0], near: "At stop 4" }],
};

CITY_WALKS.bundEvening = {
  parentId: "SH002", title: "Dinner, skyline and jazz", duration: "About 3–4 hours",
  subtitle: "A Bund evening with dinner and live music.",
  introduction: "Start with a skyline stroll, head south for dinner, then return to the Peace Hotel for jazz. Allow time for dinner and a set; book ahead and check the performance schedule.",
  guidance: "The Bund → dinner → Peace Hotel · Tap a stop for details",
  stops: [
    { ...CITY_WALKS.SH002.stops[0], description: "Start at the bridge for a view of the river and the Bund before walking south." },
    { name: "Mercato", address: "6F, Three on the Bund, 3 Zhongshan East 1st Road", description: "Pause for an Italian dinner with river views. Allow around 90 minutes and consider booking ahead.", access: "Check current opening hours and availability before setting out.", source: "https://www.threeonthebund.com/en/home" },
    { name: "The Jazz Bar, Fairmont Peace Hotel", address: "Ground floor, 20 East Nanjing Road", description: "Walk back north to finish with a drink and a live jazz set in the hotel.", access: "Performances, entry terms and table availability can change; check the schedule and reserve if needed.", source: "https://www.fairmont.com/en/hotels/shanghai/fairmont-peace-hotel/dining/the-jazz-bar.bar.html" },
  ],
};

CITY_WALKS.xintiandiAfternoon = {
  parentId: "SH014", title: "Lanes, lunch and a lake", duration: "About 2–3 hours",
  subtitle: "A relaxed Xintiandi afternoon.",
  introduction: "Start with the historic shikumen buildings, wander through the lanes, stop for lunch or coffee, and finish by the lake. Allow extra time if you visit the museum.",
  guidance: "Xingye Road → Xintiandi lanes → Taipingqiao Park · Tap a stop for details",
  stops: CITY_WALKS.SH014.stops,
  foodIntro: "Choose a break in the North Block; check current hours before going.",
  foodAndDrink: CITY_WALKS.SH014.foodAndDrink,
};

CITY_WALKS.SH001.duration = "About 2–3 hours";

CITY_WALKS.anfuBrunchDate = {
  parentId: "SH011", title: "Brunch and a wander on Anfu Road", duration: "About 2–3 hours",
  subtitle: "Galettes, old houses and people-watching.",
  introduction: "Begin with a leisurely brunch at RAC, then wander east past the theater and old houses to Wulumuqi Road. Leave room to browse or find another coffee along the way.",
  guidance: "RAC → Anfu Road → Wulumuqi Road · Tap a stop for details",
  stops: [
    { ...CITY_WALKS.SH011.stops[0], description: "Start with coffee or a galette in the courtyard. Allow about an hour for brunch, longer if there is a wait.", access: "Check current hours. This Anfu Road branch may be the RAC Michael recommended." },
    CITY_WALKS.SH011.stops[2], CITY_WALKS.SH011.stops[4], CITY_WALKS.SH011.stops[5],
  ],
  foodIntro: "Another coffee or pastry option along the walk; check current hours before visiting.",
  foodAndDrink: [{ ...CITY_WALKS.SH011.foodAndDrink[2], near: "Shortly after brunch" }],
};

CITY_WALKS.yanqingCoffeeDate = {
  parentId: "SH007", title: "A quiet coffee date on Yanqing Road", duration: "About 1–2 hours",
  subtitle: "Espresso, neighborhood lanes and a slow wander.",
  introduction: "Meet by the green apartment at the start of Yanqing Road, stop for espresso at MANUAL, then wander toward No. 80. This is a short route with plenty of time to linger and talk.",
  guidance: "No. 2 Yanqing Road → MANUAL → No. 80 · Tap a stop for details",
  stops: [
    CITY_WALKS.SH007.stops[0],
    { name: "MANUAL Espresso Bar", address: "15 Yanqing Road", description: "Stop for a coffee and take a little time over it before continuing along the street.", access: "A local guide recommended it in 2025; check current opening hours before going.", source: "https://www.meet-in-shanghai.net/en/news/a-creatives-guide-to-shanghais-neighborhood-gems-587622/" },
    CITY_WALKS.SH007.stops[2],
  ],
  foodIntro: "An optional savory stop near the start.",
  foodAndDrink: [CITY_WALKS.SH007.foodAndDrink[1]],
};
