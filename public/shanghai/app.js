const CATEGORY_COLORS = {
  Food: "#3ec8c4",
  Coffee: "#6eb6ff",
  Drinks: "#8b9ae8",
  Nightlife: "#a78bfa",
  Shop: "#5eead4",
  Beauty: "#a8c0e8",
  Art: "#5ec8e0",
  Attraction: "#38bdf8",
  Hotel: "#b7c8dc",
  Mall: "#94a3b8",
  Area: "#a8a29e",
  Other: "#c5ccd6",
};

const CATEGORY_ORDER = [
  "Food",
  "Coffee",
  "Drinks",
  "Nightlife",
  "Shop",
  "Beauty",
  "Art",
  "Attraction",
  "Hotel",
  "Mall",
  "Area",
];

const FAVORITE_IDS = [
  "SH023", // Egg cafe
  "SH024", // RAC
  "SH052", // Lotus Eatery
  "SH031", // Old Jesse 老吉士
  "SH158", // The Shanghai EDITION (Edition Hotel)
  "SH159", // VUE Bar
  "SH077", // Lucky Mart
  "SH094", // Power Station of Art
  "SH160", // Shanghai Urban Planning Exhibition Center (Museum)
  "SH015", // Xiangyang Park
  "SH026", // Godly vegetarian (Wuyuan/Wukang)
  "SH041", // Yaya’s Pasta Bar (Yaya’s)
  "SH162", // The Pearl
  "SH055", // Four Seasons Dumpling King
  "SH116", // Feiyue
  "SH163", // Lost Heaven
  "SH164", // Xibo
  "SH165", // Coconut Paradise
  "SH166", // Sichuan Citizen, Donghu Road
  "SH167", // Bar Constellation
  "SH168", // O’Mills Artisan Bakery
  "SH169", // The Roof (Yongjia Road)
  "SH170", // Colca
  "SH171", // Di Shui Dong 滴水洞湘菜馆
  "SH172", // Cotton Club
  "SH173", // Boom Boom Bagels
  "SH174", // Mercado
  "SH175", // Pierogi Ladies Polish Food
  "SH176", // Alimentari & Degusteria
  "SH177", // Laojishi (Shimen Road)
  "SH178", // Masala Art
  "SH179", // Mercato
  "SH180", // House of Blues & Jazz
];

// A small, locally hosted photo demo; credits link to the original files.
const PHOTO_DEMO = {
  SH008: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Exit_2_of_Changshu_Road_Station_in_Shanghai_2025.jpg", alt: "Changshu Road metro station exit", caption: "Changshu Road station entrance in 2025", creator: "Kmchang28", source: "https://commons.wikimedia.org/wiki/File:Exit_2_of_Changshu_Road_Station_in_Shanghai_2025.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH156: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Okura_Garden_Hotel_Shanghai.jpg", alt: "Historic French Club at Okura Garden Hotel Shanghai", caption: "Okura Garden Hotel’s historic French Club building in 2014; the recommended hotel is unconfirmed", creator: "Legolas1024", source: "https://commons.wikimedia.org/wiki/File:Okura_Garden_Hotel_Shanghai.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH109: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Colombia_Club_01.jpg", alt: "Historic Columbia Country Club building", caption: "Columbia Country Club building in 2018, before Tsutaya opened", creator: "WQL", source: "https://commons.wikimedia.org/wiki/File:Colombia_Club_01.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH095: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/20251129_Long_Museum_West_Bund_%28II%29.jpg", alt: "Long Museum West Bund exterior", caption: "Long Museum West Bund in 2025; the recommended branch is unconfirmed", creator: "Supanut Arunoprayote", source: "https://commons.wikimedia.org/wiki/File:20251129_Long_Museum_West_Bund_(II).jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY 4.0", license: "https://creativecommons.org/licenses/by/4.0/" },
  SH101: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shanghai-iapm-mall.jpg", alt: "IAPM mall in Shanghai", caption: "IAPM mall in 2018", creator: "Jianhui Gong", source: "https://commons.wikimedia.org/wiki/File:Shanghai-iapm-mall.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH001: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Quiet_Streets_Shanghai.jpg", alt: "A street in the former French Concession", caption: "A French Concession street in 2008", creator: "Alan Levine", source: "https://commons.wikimedia.org/wiki/File:Quiet_Streets_Shanghai.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY 2.0", license: "https://creativecommons.org/licenses/by/2.0/" },
  SH002: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Bund_at_night%2C_Shanghai%2C_Aug_10_2023.jpg", alt: "The Bund at night", caption: "The Bund at night in 2023", creator: "A Chinese ID", source: "https://commons.wikimedia.org/wiki/File:The_Bund_at_night,_Shanghai,_Aug_10_2023.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH004: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Changle_Rd._Shanghai.JPG", alt: "Changle Road in winter", caption: "Changle Road in winter 2014", creator: "Livelikerw", source: "https://commons.wikimedia.org/wiki/File:Changle_Rd._Shanghai.JPG", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/" },
  SH006: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/%E6%96%B0%E4%B9%90%E8%B7%AF143%E5%BC%84.jpg", alt: "Lane 143 on Xinle Road", caption: "Lane 143 on Xinle Road in 2018", creator: "Antigng", source: "https://commons.wikimedia.org/wiki/File:%E6%96%B0%E4%B9%90%E8%B7%AF143%E5%BC%84.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH009: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wuyuan_Rd..JPG", alt: "Wuyuan Road street scene", caption: "Wuyuan Road in 2013", creator: "Livelikerw", source: "https://commons.wikimedia.org/wiki/File:Wuyuan_Rd..JPG", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/" },
  SH010: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wulumuqi_Rd._%28M%29%2C_Shanghai_20251228_02.jpg", alt: "Middle Wulumuqi Road at Fuxing West Road", caption: "Middle Wulumuqi Road at Fuxing West Road in 2025", creator: "Vesekskiy", source: "https://commons.wikimedia.org/wiki/File:Wulumuqi_Rd._(M),_Shanghai_20251228_02.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH011: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/A_brunch_spot_at_Anfu_Rd.jpg", alt: "A brunch spot on Anfu Road", caption: "A brunch spot on Anfu Road in 2025", creator: "RunningTurtle8964", source: "https://commons.wikimedia.org/wiki/File:A_brunch_spot_at_Anfu_Rd.jpg", sourceName: "Wikimedia Commons", licenseName: "CC0 1.0", license: "https://creativecommons.org/publicdomain/zero/1.0/" },
  SH007: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/French_Concession%2C_Shanghai%2C_China_%289740638264%29.jpg", alt: "Near Yanqing Road in the French Concession", caption: "Near Yanqing Road in 2013", creator: "Fabio Achilli", source: "https://commons.wikimedia.org/wiki/File:French_Concession,_Shanghai,_China_(9740638264).jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY 2.0", license: "https://creativecommons.org/licenses/by/2.0/" },
  SH014: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Xintiandi.jpg", alt: "Xintiandi at night", caption: "Xintiandi at night in 2004", creator: "Samuel Li", source: "https://commons.wikimedia.org/wiki/File:Xintiandi.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY 2.0", license: "https://creativecommons.org/licenses/by/2.0/" },
  SH003: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Suzhou_Creek_from_Waibaidu_Bridge%2C_Shanghai.jpg", alt: "Suzhou Creek from Waibaidu Bridge", caption: "Suzhou Creek from Waibaidu Bridge in 2013", creator: "Daniel Case", source: "https://commons.wikimedia.org/wiki/File:Suzhou_Creek_from_Waibaidu_Bridge,_Shanghai.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/" },
  SH012: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Street_View_of_Wukang_Road.JPG", alt: "Street view of Wukang Road", caption: "Wukang Road in 2013", creator: "Livelikerw", source: "https://commons.wikimedia.org/wiki/File:Street_View_of_Wukang_Road.JPG", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/" },
  SH016: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fuxing_Park%2C_Shanghai.JPG", alt: "Fuxing Park in Shanghai", caption: "Fuxing Park in 2013", creator: "Jpbowen", source: "https://commons.wikimedia.org/wiki/File:Fuxing_Park,_Shanghai.JPG", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH020: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shanghai_PeaceHotel_Rotunda.jpg", alt: "Rotunda of the Peace Hotel", caption: "Peace Hotel rotunda in 2025", creator: "Boubloub", source: "https://commons.wikimedia.org/wiki/File:Shanghai_PeaceHotel_Rotunda.jpg", sourceName: "Wikimedia Commons", licenseName: "CC0 1.0", license: "https://creativecommons.org/publicdomain/zero/1.0/" },
  SH022: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Peace_Hotel_Jazz_Band.JPG", alt: "The Peace Hotel Jazz Band", caption: "The Peace Hotel Jazz Band, historical photo", creator: "ChinaTravelSavvy.Com - China Travel Guide", source: "https://commons.wikimedia.org/wiki/File:Peace_Hotel_Jazz_Band.JPG", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/" },
  SH096: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Museum_of_Art_Pudong.jpg", alt: "Museum of Art Pudong", caption: "Museum of Art Pudong in 2021", creator: "中文維基百科20021024", source: "https://commons.wikimedia.org/wiki/File:Museum_of_Art_Pudong.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH103: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/201907_Plaza_66_Shanghai.jpg", alt: "Plaza 66 in Shanghai", caption: "Plaza 66 in 2019", creator: "MNXANL", source: "https://commons.wikimedia.org/wiki/File:201907_Plaza_66_Shanghai.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 4.0", license: "https://creativecommons.org/licenses/by-sa/4.0/" },
  SH017: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Jing%27an_Temple%2C_Shanghai%2C_China.jpg", alt: "Jing’an Temple in Shanghai", caption: "Jing’an Temple in 2024", creator: "Nikolamikovic82", source: "https://commons.wikimedia.org/wiki/File:Jing%27an_Temple,_Shanghai,_China.jpg", sourceName: "Wikimedia Commons", licenseName: "CC0 1.0", license: "https://creativecommons.org/publicdomain/zero/1.0/" },
  SH059: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Three_on_the_Bund.jpg", alt: "Three on the Bund building at night", caption: "Three on the Bund, home to Canton Table, in 2009", creator: "Furyanto", source: "https://commons.wikimedia.org/wiki/File:Three_on_the_Bund.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/" },
  SH179: { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Three_on_the_Bund.jpg", alt: "Three on the Bund building at night", caption: "Three on the Bund, home to Mercato, in 2009", creator: "Furyanto", source: "https://commons.wikimedia.org/wiki/File:Three_on_the_Bund.jpg", sourceName: "Wikimedia Commons", licenseName: "CC BY-SA 3.0", license: "https://creativecommons.org/licenses/by-sa/3.0/" },
  SH163: { image: "photos/lost-heaven.jpg", alt: "Lost Heaven entrance on Gaoyou Road", caption: "Lost Heaven on Gaoyou Road", creator: "Photographer not identified", source: "https://tabelog.com/china/A5102/A510206/51000311/", sourceName: "Tabelog", licenseName: "Reuse permission not verified" },
  SH164: { image: "photos/xibo.jpg", alt: "Interior of Xibo", caption: "Xibo restaurant interior", creator: "Photographer not identified", source: "https://tabelog.com/china/A5102/A510206/51000886/", sourceName: "Tabelog", licenseName: "Reuse permission not verified" },
  SH026: { image: "photos/godly-wukang.jpg", alt: "Godly vegetarian restaurant sign", caption: "Godly sign from the Wukang listing; exact branch and date unconfirmed", creator: "Photographer not identified", source: "https://www.happycow.net/reviews/gongde-lin-godly-shanghai-17210", sourceName: "HappyCow", licenseName: "Reuse permission not verified" },
  SH055: { image: "photos/four-seasons.jpg", alt: "Four Seasons Dumpling King storefront at night", caption: "Four Seasons Dumpling King on Huaihai Middle Road in 2024", creator: "上海市ご飯情報", source: "https://note.com/h_l380/n/n53af00e34442", sourceName: "Shanghai food guide on note", licenseName: "Reuse permission not verified" },
  SH116: { image: "photos/feiyue-brand.jpg", alt: "A display of Feiyue shoes", caption: "Feiyue shoes; guide shop branch unresolved", creator: "Photographer not identified", source: "https://tabicoffret.com/article/34280/", sourceName: "Tabicoffret", licenseName: "Reuse permission not verified" },
  SH015: { image: "photos/xiangyang-park.jpg", alt: "Tree-lined path at Xiangyang Park", caption: "Xiangyang Park in winter", creator: "Photographer not identified", source: "https://www.jfdaily.com/sgh/detail?id=930650", sourceName: "Shanghai Observer", licenseName: "Reuse permission not verified" },
  SH041: { image: "photos/yayas.jpg", alt: "The bar at Yaya’s Pasta Bar", caption: "Yaya’s Pasta Bar", creator: "Photographer not identified", source: "https://www.smartshanghai.com/venue/27397/yaya_s", sourceName: "SmartShanghai", licenseName: "Reuse permission not verified" },
  SH077: { image: "photos/lucky-mart.jpg", alt: "The interior of Lucky Mart", caption: "Lucky Mart on Fumin Road", creator: "Photographer not identified", source: "https://www.smartshanghai.com/venue/19906/lucky_mart_fumin_lu", sourceName: "SmartShanghai", licenseName: "Reuse permission not verified" },
  SH162: { image: "photos/the-pearl.jpg", alt: "The Pearl’s illuminated exterior sign", caption: "The Pearl on Zhapu Road", creator: "Photographer not identified", source: "https://www.sohu.com/a/858078665_121124450", sourceName: "Sohu", licenseName: "Reuse permission not verified" },
  SH024: { image: "photos/rac-anfu.jpg", alt: "RAC storefront on Anfu Road", caption: "RAC on Anfu Road, candidate branch", creator: "Photographer not identified", source: "https://www.sohu.com/a/426749940_188703", sourceName: "Sohu", licenseName: "Reuse permission not verified" },
  SH052: { image: "photos/lotus-dingxi.jpg", alt: "Lotus Eatery on Dingxi Road", caption: "Lotus Eatery on Dingxi Road, candidate branch", creator: "Photographer not identified", source: "https://www.tripadvisor.com/Restaurant_Review-g308272-d4704064-Reviews-Lotus_Eatery_Dingxi_Road-Shanghai.html", sourceName: "Tripadvisor", licenseName: "Reuse permission not verified" },
  SH159: { image: "photos/vue-bar.jpg", alt: "VUE Bar interior", caption: "VUE Bar at Hyatt on the Bund", creator: "Photographer not identified", source: "https://www.smartshanghai.com/venue/3230/Vue_bar_-_Hyatt_on_the_Bund_shanghai", sourceName: "SmartShanghai", licenseName: "Reuse permission not verified" },
  SH158: { image: "photos/shanghai-edition.jpg", alt: "The Shanghai EDITION hotel exterior", caption: "The Shanghai EDITION exterior", creator: "Photographer not identified", source: "https://shanghaiedition.hoteledition.cn/cn", sourceName: "Hotel listing", licenseName: "Reuse permission not verified" },
  SH023: {
    image: "photos/egg-xhs.webp",
    alt: "Egg and avocado toast at Egg cafe",
    caption: "Brunch at Egg, photographed in 2024",
    creator: "肥奥娜的吃喝笔记",
    source: "https://www.xiaohongshu.com/discovery/item/657fdec20000000009023c54",
    sourceName: "Xiaohongshu",
    licenseName: "Reuse permission not verified",
    query: "上海 egg 襄阳北路12号",
  },
  SH031: {
    image: "photos/old-jesse.jpg",
    alt: "A dish photographed at Old Jesse in 2016",
    caption: "Food at Old Jesse, 2016 (branch not verified)",
    creator: "bryan...",
    source: "https://commons.wikimedia.org/wiki/File:Food_%E8%80%81%E5%90%89%E5%A3%AB,_%E4%B8%8A%E6%B5%B7%E8%8F%9C,_%E6%BB%AC%E8%8F%9C,_%E6%9C%AC%E5%B8%AE%E8%8F%9C,_%E4%B8%8A%E6%B5%B7,_%E4%B8%AD%E8%8F%AF%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9C%8B,_%E4%B8%AD%E5%9C%8B,_Shanghai,_People%27s_Republic_of_China,_PRC,_China_(30464119255).jpg",
    license: "https://creativecommons.org/licenses/by-sa/2.0/",
    licenseName: "CC BY-SA 2.0",
    query: "老吉士 天平路 上海",
  },
  SH094: {
    image: "photos/power-station-of-art.jpg",
    alt: "Power Station of Art in Shanghai, photographed in 2014",
    caption: "Power Station of Art, 2014",
    creator: "macchi",
    source: "https://commons.wikimedia.org/wiki/File:Shanghai_-_Power_Station_of_Art_(12250570163).jpg",
    license: "https://creativecommons.org/licenses/by-sa/2.0/",
    licenseName: "CC BY-SA 2.0",
    query: "上海当代艺术博物馆",
  },
  SH160: {
    image: "photos/urban-planning-center.jpg",
    alt: "Shanghai Urban Planning Exhibition Center, photographed in 2014",
    caption: "Shanghai Urban Planning Exhibition Center, 2014",
    creator: "Vanvelthem Cédric",
    source: "https://commons.wikimedia.org/wiki/File:Shanghai_Urban_Planning_Exhibition_Center.jpg",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    licenseName: "CC BY-SA 4.0",
    query: "上海城市规划展示馆",
  },
};

const EXTRA_PHOTOS = {
  SH023: [
    { id: 15, caption: "Egg’s exterior at 12 Xiangyang North Road", alt: "Egg cafe storefront with its sign and street number", creator: "小纪菜菜", post: "684ab847000000002102d55d" },
    { id: 10, caption: "A window seat inside Egg", alt: "Window seat inside Egg looking out onto the street", creator: "今天你吃甜品了吗", post: "6a98b389000000002602295c" },
    { id: 0, caption: "Eggs and mushrooms on toast", alt: "Eggs and mushrooms on toast at Egg", creator: "旺仔小馒头", post: "604c6ea7000000000102f6ad" },
    { id: 5, caption: "A brunch spread at Egg", alt: "Brunch dishes and flowers on a table at Egg", creator: "Jencrusent", post: "6a22da1d0000000035020ca2" },
    { id: 7, caption: "Breakfast at Egg", alt: "Eggs, toast and avocado at Egg", creator: "小丸子爱逛吃", post: "6a917ade00000000070062e2" },
    { id: 17, caption: "An egg sandwich at Egg", alt: "An egg sandwich at Egg cafe", creator: "广津区丧丧大王", post: "67de7225000000000d016677" },
  ].map((photo) => ({ ...photo, image: `photos/egg-${photo.id}.webp`, source: `https://www.xiaohongshu.com/discovery/item/${photo.post}`, sourceName: "Xiaohongshu", licenseName: "Reuse permission not verified" })),
  SH031: ["29831445033", "29831464443"].map((id, index) => ({
    image: `photos/old-jesse-${index + 2}.jpg`,
    alt: "A dish photographed at Old Jesse in 2016",
    caption: "Food at Old Jesse, 2016 (branch not verified)",
    creator: "bryan...",
    source: PHOTO_DEMO.SH031.source.replace("30464119255", id),
    license: "https://creativecommons.org/licenses/by-sa/2.0/",
    licenseName: "CC BY-SA 2.0",
  })),
  SH094: [
    {
      image: "photos/power-station-interior.jpg",
      alt: "Interior of Power Station of Art in 2020",
      caption: "Power Station of Art interior, 2020",
      creator: "Iswzo",
      source: "https://commons.wikimedia.org/wiki/File:Interior_of_Power_Station_of_Art.jpg",
      license: "https://creativecommons.org/licenses/by-sa/4.0/",
      licenseName: "CC BY-SA 4.0",
    },
    {
      image: "photos/power-station-exterior.jpg",
      alt: "Power Station of Art exterior in 2013",
      caption: "Power Station of Art exterior, 2013",
      creator: "Coolmanjackey",
      source: "https://commons.wikimedia.org/wiki/File:%E4%B8%8A%E6%B5%B7%E5%BD%93%E4%BB%A3%E8%89%BA%E6%9C%AF%E5%8D%9A%E7%89%A9%E9%A6%86.jpg",
      license: "https://creativecommons.org/licenses/by-sa/3.0/",
      licenseName: "CC BY-SA 3.0",
    },
  ],
};

const XHS_POSTS = {
  SH023: [
    { title: "Egg on Xiangyang North Road · 2024", url: "https://www.xiaohongshu.com/discovery/item/657fdec20000000009023c54" },
    { title: "Shanghai cafés, including Egg at No. 12 · 2023", url: "https://www.xiaohongshu.com/discovery/item/63ee08c400000000130321f5" },
  ],
};

const DEFAULT_VIEW = {
  center: [121.462, 31.224],
  zoom: 14.15,
  pitch: 58,
  bearing: -18,
};

const state = {
  meta: null,
  places: [],
  byId: new Map(),
  category: "All",
  query: "",
  showHidden: false,
  favoritesOnly: false,
  selectedId: null,
  markers: [],
  popup: null,
  map: null,
  locationMarker: null,
};

const el = {
  search: document.getElementById("search"),
  chips: document.getElementById("chips"),
  list: document.getElementById("list"),
  listMeta: document.getElementById("list-meta"),
  lede: document.getElementById("lede"),
  card: document.getElementById("card"),
  hidden: document.getElementById("show-hidden"),
  sidebar: document.getElementById("sidebar"),
  mobilePlace: document.getElementById("mobile-place"),
  sheetSize: document.getElementById("sheet-size"),
  sheetCollapse: document.getElementById("sheet-collapse"),
  sheetTitle: document.getElementById("sheet-title"),
  reset: document.getElementById("reset-view"),
  locate: document.getElementById("locate-me"),
  locationStatus: document.getElementById("location-status"),
  legend: document.getElementById("pin-legend"),
  legendToggle: document.getElementById("legend-toggle"),
  favoritesList: document.getElementById("favorites-list"),
  favoritesFilter: document.getElementById("favorites-filter"),
  clearFilters: document.getElementById("clear-filters"),
  mapStatus: document.getElementById("map-status"),
  mapStatusTitle: document.getElementById("map-status-title"),
  mapStatusDetail: document.getElementById("map-status-detail"),
  mapStatusRetry: document.getElementById("map-status-retry"),
};

function colorFor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isMobile() {
  return window.matchMedia("(max-width: 820px)").matches;
}

function isFavorite(place) {
  return FAVORITE_IDS.includes(place.id);
}

function pinKey(place) {
  return `${place.lat.toFixed(6)},${place.lon.toFixed(6)}`;
}

function statusClass(status) {
  if (status === "confirmed operating") return "ok";
  if (status === "closed" || status === "relocated") return "bad";
  if (status === "temporarily closed") return "bad";
  if (status === "(unconfirmed)") return "warn";
  return "";
}

// Visitor copy is kept separate from the source records and their research notes.
const VISITOR_NOTES = {
  SH016: "Published park hours differ. Check access times before you go.",
  SH017: "Sources disagree on which days the temple is open; check with the temple before visiting, especially around festivals.",
  SH020: "Check with the hotel about access to the lobby before visiting.",
  SH021: "The museum's heritage tour may require a hotel package or reservation; check with the hotel before visiting.",
  SH024: "This may be the Anfu Road branch; the intended branch has not been confirmed.",
  SH026: "The Wuyuan Road listing may be a match, but its identity and vegetarian menu are unconfirmed.",
  SH028: "Published opening times differ; check before visiting.",
  SH032: "Sources disagree on the street number. Confirm the address before visiting.",
  SH033: "Several branches have been listed; the intended branch has not been confirmed.",
  SH034: "Published opening hours differ; check before visiting.",
  SH035: "Fu 1039 is a possible match. The number in the original recommendation is uncertain.",
  SH038: "Published lunch hours differ; check before visiting.",
  SH044: "Published closing times differ; check before visiting.",
  SH047: "Published lunch hours differ; check before visiting.",
  SH048: "Published lunch and closing hours differ; check before visiting.",
  SH049: "Published dinner hours differ; check before visiting.",
  SH051: "SHARDAA may be the intended place, but the match has not been confirmed.",
  SH052: "The Dingxi Road listing may be a match; the intended branch is not confirmed.",
  SH055: "This is the Huaihai Middle Road branch. Published hours differ, so check before visiting.",
  SH071: "The hotel lists Sir Elly’s Terrace; confirm which venue and seasonal access before visiting.",
  SH073: "The hotel has several dining spaces. Check which bar is open before visiting.",
  SH074: "The hotel and exact location of this Long Bar are not confirmed.",
  SH084: "This venue was reported closed in August 2026.",
  SH090: "The former club has closed; SYSTEM has also operated as an event promoter.",
  SH091: "Le Baron has been reported at a new location. Confirm the address before visiting.",
  SH095: "The recommended Long Museum branch is not specified; confirm the branch before visiting.",
  SH097: "Check the current exhibition and visitor access before you go.",
  SH100: "The mall opposite TX Huaihai has not been identified.",
  SH116: "Feiyue is a shoe brand; a specific shop for this recommendation has not been confirmed.",
  SH119: "The Wulumuqi Road grocery was reported closed in January 2026.",
  SH160: "Also known as Shanghai Urban Planning Exhibition Hall. Check admission arrangements before visiting.",
  SH162: "Check the event calendar before visiting. The published phone hours are for bookings, not confirmed venue opening hours.",
  SH163: "One guide reports the Gaoyou Road branch has closed, while another still lists it. Confirm before visiting; the Bund restaurant is separate.",
  SH165: "DiningCity lists the former Fumin Road location as closed. Confirm current status before visiting.",
  SH166: "The original Donghu Road location closed and reportedly moved to Wukang Road. Check the newer location before visiting.",
  SH168: "Phone listings for the Yongjia Road branch differ; confirm the number before calling.",
  SH169: "This is a historical Yongjia Road bar listing. Its current operation is unconfirmed.",
  SH170: "Published lunch hours differ; check before visiting.",
  SH171: "The Dongping Road restaurant was reported closed; a reopening has not been confirmed.",
  SH175: "Sources disagree on whether this restaurant is still open. Check before visiting.",
  SH177: "Sources disagree on the floor at the Shimen Road shopping complex; check the location before visiting.",
  SH178: "Published hours and phone numbers differ; check before visiting.",
  SH179: "Published lunch hours differ; check before visiting.",
  SH180: "The venue reportedly moved to Jiujiang Road in 2026. Its new map location is not yet verified.",
};

const VISITOR_HOURS = {
  SH024: "Hours for the possible Anfu Road branch differ between listings; check before visiting.",
  SH026: "08:30–20:30 reported; days of operation are not confirmed.",
  SH036: "For the possible Tianjin Road branch, Trip.com lists 09:00–14:30 and 15:30–21:00. Confirm the branch and hours before visiting.",
  SH040: "A 2025 listing for the possible Xinle Road location gives Monday–Thursday 17:30–00:00 and Friday–Sunday 11:30–14:00 and 17:30–00:00. Current hours are not confirmed.",
  SH052: "For the possible Dingxi Road branch, Nomfluence lists weekdays 11:30–14:00 and 16:30–22:00, and weekends 11:30–22:00. Other listings differ.",
  SH068: "A 2026 guide lists Monday–Thursday 08:00–20:00 and Friday–Sunday 08:00–21:00 for a possible Rockbund branch. Confirm the branch before visiting.",
  SH077: "15:00–04:00 reported; days of operation are not confirmed.",
  SH145: "The operator lists 10:00–21:00 daily for a possible Wulumuqi Road store. Confirm the branch before visiting.",
};

function visitorName(place) {
  if (place.id === "SH051") return "SHARDAA (possible match)";
  return place.name
    .replace(/ — guide branch unspecified$/, "")
    .replace(/ — branch unspecified$/, "")
    .replace(/ — identity unresolved$/, "")
    .replace(/ — hotel attribution unresolved$/, "")
    .replace(/ — Changle branch unresolved$/, "")
    .replace(/ — unresolved$/, "")
    .replace(/ candidate — guide digit unresolved$/, "")
    .replace(/ candidate$/, "")
    .replace(/ \(([^)]*) candidate\)$/, " ($1)");
}

function visitorStatus(place) {
  if (place.status === "confirmed operating") return "Previously confirmed open";
  if (place.status === "closed") return "Closed";
  if (place.status === "temporarily closed") return "Temporarily closed";
  if (place.status === "relocated") return "Moved";
  if (place.status === "not applicable") return "Area or street";
  return "Current status not confirmed";
}

function visitorFlag(label) {
  return ({ candidate: "Possible match", approximate: "Approximate", "area-only": "Area only", unresolved: "Location unknown", historical: "Historical" })[label] || label;
}

function visitorAddress(value) {
  return value.replace(/^Historical candidate:\s*/i, "Previously listed (unconfirmed): ")
    .replace(/^Candidate stockist:\s*/i, "Possible stockist: ")
    .replace(/^Candidate branch:\s*/i, "Possible branch: ")
    .replace(/^Candidate:\s*/i, "Possible address: ");
}

function matchesQuery(place, query) {
  if (!query) return true;
  const haystack = [
    place.name,
    place.original_name,
    place.category,
    place.neighborhood,
    place.address,
    place.chinese_address,
    place.notes,
    place.phone,
    place.hours,
    place.area_reference,
    place.personal_note,
    place.id,
    ...(place.labels || []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function visiblePlaces() {
  const rank = (place) => (place.pin ? 0 : place.labels.includes("unresolved") ? 2 : 1);
  return state.places
    .filter((place) => {
      if (!state.showHidden && place.hidden_by_default) return false;
      if (state.category !== "All" && place.category !== state.category) return false;
      if (!matchesQuery(place, state.query)) return false;
      if (state.favoritesOnly && !isFavorite(place)) return false;
      return true;
    })
    .sort((a, b) => rank(a) - rank(b));
}

function updateLede() {
  const pinned = state.places.filter((place) => place.pin).length;
  const unpinned = state.places.length - pinned;
  el.lede.textContent = `${pinned} mapped places · ${unpinned} listed without a pin. Closed and historical stays hidden until you ask.`;
}

function renderChips() {
  const present = new Set(state.places.map((place) => place.category));
  const cats = ["All", ...CATEGORY_ORDER.filter((name) => present.has(name))];
  el.chips.innerHTML = cats
    .map((name) => {
      const color = name === "All" ? "#6eb6ff" : colorFor(name);
      const pressed = name === state.category;
      return `<button class="chip" type="button" data-cat="${escapeHtml(name)}" aria-pressed="${pressed}" style="--chip:${color}">${escapeHtml(name)}</button>`;
    })
    .join("");
  const pinnedCategories = new Set(state.places.filter((place) => place.pin).map((place) => place.category));
  const categories = [...CATEGORY_ORDER, "Other"].filter((name) => pinnedCategories.has(name));
  document.getElementById("legend-categories").innerHTML = categories.map((name) => `<span><i style="--c:${colorFor(name)}" aria-hidden="true"></i>${escapeHtml(name)}</span>`).join("");
}

function pinStatusLabel(place) {
  if (!place.pin) return "Not pinned";
  if (place.hidden_by_default) return "Pin hidden";
  if (place.labels.includes("approximate")) return "Approximate location";
  if (place.precision === "building/complex") return "Building or complex";
  return "On the map";
}

function renderFavorites() {
  const picks = FAVORITE_IDS.map((id) => state.byId.get(id)).filter(Boolean);
  el.favoritesList.innerHTML = picks
    .map((place) => {
      const extra = [place.category, visitorStatus(place), pinStatusLabel(place)].filter(Boolean).join(" · ");
      const note = place.personal_note
        ? `<span class="place-note">${escapeHtml(place.personal_note)}</span>`
        : "";
      const flags = [
        ...(place.hidden_by_default || place.status === "closed" || place.status === "temporarily closed"
          ? [`<span class="flag historical">${escapeHtml(place.status)}</span>`]
          : []),
        ...(!place.pin && place.labels.includes("unresolved") ? ['<span class="flag unresolved">Location unknown</span>'] : []),
        ...(!place.pin && place.labels.includes("area-only") ? ['<span class="flag area-only">Area only</span>'] : []),
      ].join("");
      return `
        <button class="place" type="button" role="listitem" data-id="${place.id}" aria-selected="${place.id === state.selectedId}">
          <span class="swatch ${place.pin ? "" : "unpinned"}" style="--c:${colorFor(place.category)}"></span>
          <span>
            <span class="place-name">${escapeHtml(visitorName(place))}</span>
            <span class="place-meta">${escapeHtml(extra)}</span>
            ${note}
          </span>
          <span class="flags">${flags}</span>
        </button>`;
    })
    .join("");
}

function renderList() {
  const places = visiblePlaces();
  const pinned = places.filter((place) => place.pin).length;
  el.listMeta.textContent = `${places.length} shown · ${pinned} on the map`;
  el.clearFilters.hidden = !(state.query || state.category !== "All" || state.showHidden || state.favoritesOnly);
  if (!places.length) {
    el.list.innerHTML = `<div class="empty">No matches. Try another search, clear the favorites filter, or show closed and historical places.</div>`;
    return;
  }
  el.list.innerHTML = places
    .map((place) => {
      const flags = [
        ...(isFavorite(place) ? ['<span class="flag favorite">favorite</span>'] : []),
        ...place.labels
          .filter((label) => label !== "unconfirmed" && !(label === "approximate" && place.pin))
          .map((label) => `<span class="flag ${escapeHtml(label)}">${escapeHtml(visitorFlag(label))}</span>`),
      ].join("");
      const extra = [
        place.category,
        pinStatusLabel(place),
        place.neighborhood,
      ]
        .filter(Boolean)
        .join(" · ");
      return `
        <button class="place" type="button" role="option" data-id="${place.id}" aria-selected="${place.id === state.selectedId}">
          <span class="swatch ${place.pin ? "" : "unpinned"}" style="--c:${colorFor(place.category)}"></span>
          <span>
            <span class="place-name">${escapeHtml(visitorName(place))}</span>
            <span class="place-meta">${escapeHtml(extra)}</span>
          </span>
          <span class="flags">${flags}</span>
        </button>`;
    })
    .join("");
}

function displayValue(value) {
  const text = (value || "").trim();
  return text ? escapeHtml(text) : "(unconfirmed)";
}

function displayHours(value, lines = []) {
  if (lines.length) return `<div class="hours-list">${lines.map((line) => `<div class="hours-row"><span>${escapeHtml(line)}</span></div>`).join("")}</div>`;
  const text = (value || "").trim();
  if (!text || text === "(unconfirmed)") return '<span class="meta-value">Hours not confirmed</span>';
  const parts = text.split(";").map((part) => part.trim());
  const rows = parts.map((part) => part.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(.+)$/i));
  if (rows.length > 1 && rows.every(Boolean)) {
    return `<div class="hours-list">${rows.map((row) => `<div class="hours-row"><span>${escapeHtml(row[1])}</span><span>${escapeHtml(row[2])}</span></div>`).join("")}</div>`;
  }
  if (parts.length > 1) return `<div class="hours-list">${parts.filter(Boolean).map((part) => `<div class="hours-row"><span>${escapeHtml(part)}</span></div>`).join("")}</div>`;
  return `<span class="meta-value">${displayValue(text)}</span>`;
}

function renderGallery(photos) {
  const hero = photos[0];
  return `<section class="gallery" aria-label="Photos">
    <button class="gallery-hero" type="button" data-photo-index="0" aria-label="Open photo 1 of ${photos.length}: ${escapeHtml(hero.alt)}">
      <img src="${escapeHtml(hero.image)}" alt="${escapeHtml(hero.alt)}">
      <span class="gallery-prompt">Tap to open${photos.length > 1 ? " · Swipe to explore" : ""}</span>
    </button>
    ${photos.length > 1 ? `<div class="gallery-thumbnails" aria-label="More photos">${photos.slice(1).map((photo, index) => `<button type="button" data-photo-index="${index + 1}" aria-label="Open photo ${index + 2} of ${photos.length}: ${escapeHtml(photo.alt)}"><img src="${escapeHtml(photo.image)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
  </section>`;
}

function setupGallery(photos) {
  const viewer = document.getElementById("photo-viewer");
  let index = 0;
  let startX = null;
  let returnFocus = null;
  function showPhoto() {
    const photo = photos[index];
    viewer.querySelector("img").src = photo.image;
    viewer.querySelector("img").alt = photo.alt;
    viewer.querySelector(".viewer-caption").textContent = `${photo.caption} · ${index + 1} / ${photos.length}`;
  }
  function move(step) {
    index = (index + step + photos.length) % photos.length;
    showPhoto();
  }
  viewer.innerHTML = `<div class="viewer-content"><button class="viewer-close" type="button" aria-label="Close photo viewer">×</button><div class="viewer-stage">${photos.length > 1 ? '<button class="viewer-arrow" type="button" data-step="-1" aria-label="Previous photo">‹</button>' : ""}<img alt="">${photos.length > 1 ? '<button class="viewer-arrow" type="button" data-step="1" aria-label="Next photo">›</button>' : ""}</div><p class="viewer-caption" aria-live="polite"></p>${photos.length > 1 ? '<p class="viewer-hint">Swipe or use the arrows to browse</p>' : ""}</div>`;
  el.card.querySelectorAll("[data-photo-index]").forEach((button) => button.addEventListener("click", () => {
    index = Number(button.dataset.photoIndex);
    returnFocus = button;
    showPhoto();
    viewer.showModal();
    viewer.querySelector(".viewer-close").focus();
  }));
  viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
  viewer.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => move(Number(button.dataset.step))));
  viewer.oncancel = (event) => { event.stopPropagation(); };
  viewer.onclose = () => { if (returnFocus?.isConnected) returnFocus.focus(); };
  viewer.onkeydown = (event) => {
    if (event.key === "Escape") event.stopPropagation();
    if (photos.length > 1 && event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (photos.length > 1 && event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  };
  viewer.ontouchstart = (event) => { startX = event.touches[0]?.clientX ?? null; };
  viewer.ontouchend = (event) => {
    if (startX === null || photos.length < 2) return;
    const delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1);
    startX = null;
  };
}

function renderCredits(photos, sources) {
  const photoCredits = photos.map((photo) => `<li>${escapeHtml(photo.caption)}: <a href="${escapeHtml(photo.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.creator)} / ${escapeHtml(photo.sourceName || "Wikimedia Commons")}</a> · ${photo.license ? `<a href="${escapeHtml(photo.license)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.licenseName)}</a>` : escapeHtml(photo.licenseName)} · display cropped</li>`).join("");
  return `<details class="credits"><summary>Licensing and Image Removal Request</summary>
    <p>If you would like an image or information removed or corrected, please email <a href="mailto:michael.l.hauge@gmail.com">michael.l.hauge@gmail.com</a> with the place and details.</p>
    ${photoCredits ? `<p>Image credits</p><ul>${photoCredits}</ul>` : ""}
    ${sources ? `<p>Location sources: ${sources}.</p>` : ""}
  </details>`;
}

function renderMichaelsTake(place) {
  const note = (place.personal_note || "").trim();
  const order = (place.what_to_order || "").trim();
  const when = (place.when_to_go || "").trim();
  return `<section class="michaels-take" aria-label="Michael’s Take">
    <h3>Michael’s Take</h3>
    ${note ? `<p class="take-note">${escapeHtml(note)}</p>` : ""}
    ${order ? `<p class="take-tip"><strong>What to order</strong> ${escapeHtml(order)}</p>` : ""}
    ${when ? `<p class="take-tip"><strong>When to go</strong> ${escapeHtml(when)}</p>` : ""}
    ${!note && !order && !when ? '<p class="take-empty">Michael’s notes are coming soon.</p>' : ""}
  </section>`;
}

const REVIEW_LINKS = {
  SH149: { rating: "Time Out salon profile", url: "https://www.timeoutshanghai.com/venue/Health-Beauty_Salons/42335/Flower-Fingers%2C-Changle-Lu.html", sourceName: "Time Out", note: "Historical Changle Road listing; the intended branch remains unresolved." },
  SH153: { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d12268192-Reviews-Yu_Massage_Xinle_Road-Shanghai.html", sourceName: "Tripadvisor", note: "For the 218 Xinle Road candidate; the original guide branch is unconfirmed." },
  SH126: { rating: "Grazia store profile", url: "https://www.chinagrazia.com/article/160011.html", sourceName: "Grazia", note: "2021 profile of the Anfu Road store; Mike’s intended branch is unconfirmed." },
  SH129: { rating: "Jing Daily store profile", url: "https://jingdaily.com/intels/2026-10/14/samuel-gui-yang-opens-1st-flagship-in-shanghai", sourceName: "Jing Daily", note: "For the new Julu Road flagship, a candidate for the original guide entry." },
  SH135: { rating: "superfuture store profile", url: "https://superfuture.com/2022/03/new-shops/shanghai-avenue-son-store-opening/", sourceName: "superfuture", note: "2022 profile of the Taikoo Li Qiantan candidate; current branch match is unconfirmed." },
  SH137: { rating: "Time Out shopping guide", url: "https://www.timeoutshanghai.cn/features/7035.html", sourceName: "Time Out", note: "Features GOODBAI at 92 Yanqing Road; original guide branch is unconfirmed." },
  SH139: { rating: "Time Out Julu Road guide", url: "https://www.10100.com/article/148141399", sourceName: "Time Out", note: "Describes two Lady Fafa shops; the intended branch is unresolved." },
  SH140: { rating: "City News Service neighborhood guide", url: "https://www.citynewsservice.cn/articles/cns/lifestyle/my-hood/a-neighborhood-of-heritage-villas-caf%C3%A9s-and-hidden-jazz-clubs-5nq5v58n", sourceName: "City News Service", note: "2026 local recommendation of the Wukang Road shop." },
  SH142: { rating: "City News Service shopping guide", url: "https://www.citynewsservice.cn/articles/cns/shanghai-living/a-mix-of-super-local-and-international-vibes-in-xuhui-district-3k0ed50n", sourceName: "City News Service", note: "Describes Eu Noia on Wuyuan Road, a candidate for the original entry." },
  SH144: { rating: "Time Out shopping guide", url: "https://www.timeoutshanghai.com/features/Restaurants-Restaurants/105484/7-caf%C3%A9s-offering-more-than-coffee-From-candles-to-clean-laundry.html", sourceName: "Time Out", note: "Profiles the Yuyuan Road café and select shop; guide branch remains unconfirmed." },
  SH145: { rating: "Rurubu shopping guide", url: "https://plus.rurubu.jp/article/099669522", sourceName: "Rurubu", note: "Features the Wulumuqi Road store; original guide branch is unconfirmed." },
  SH109: { rating: "Time Out bookstore profile", url: "https://www.timeoutshanghai.com/features/Blog-Shopping/88269/Japans-biggest-bookstore-chain-has-opened-its-first-Shanghai-outpost.html", sourceName: "Time Out", note: "2020 profile of the Columbia Circle bookstore." },
  SH113: { rating: "CNA Lifestyle shopping guide", url: "https://cnalifestyle.channelnewsasia.com/style-beauty/shopping-shanghai-menswear-582131", sourceName: "CNA", note: "Features the Huaihai Road flagship, a candidate for Mike’s unspecified branch." },
  SH114: { rating: "Vogue Singapore shopping guide", url: "https://vogue.sg/fashion-insider-shopping-guide-shanghai/", sourceName: "Vogue Singapore", note: "Features Labelhood at 184 Fumin Road; original guide branch remains unconfirmed." },
  SH115: { rating: "Shanghai government store profile", url: "https://english.shanghai.gov.cn/en-FirstStores/20241024/54129fd59249474fb143f6eb07cec2da.html", sourceName: "Shanghai government", note: "A 2024 profile of the WYSH store; Mike’s intended branch remains unconfirmed." },
  SH118: { rating: "CNA Lifestyle shopping guide", url: "https://cnalifestyle.channelnewsasia.com/style-beauty/shopping-shanghai-menswear-582131", sourceName: "CNA", note: "Features Monday Sleeping Club on Yanqing Road; confirm the current location before visiting." },
  SH119: { rating: "RADII retrospective", url: "https://radii.co/article/the-avocado-lady-shanghai", sourceName: "RADII", note: "Historical account of the Wulumuqi Road grocery, reported closed in January 2026." },
  SH124: { rating: "SmartShanghai record store guide", url: "https://www.10100.com/article/151702600", sourceName: "SmartShanghai", note: "2026 guide identifies the record store at 617 Changle Road; the clothing shop is separate." },
  SH125: { rating: "SmartShanghai record store guide", url: "https://www.10100.com/article/151702600", sourceName: "SmartShanghai", note: "2026 guide to the Yongjia Road record shop; opening hours can vary." },
  SH087: { rating: "AFAR bar review", url: "https://www.afar.com/places/keep-it-quiet-shanghai", sourceName: "AFAR", note: "Review of Keep It Quiet in the Yongfoo Elite garden; publication may be old." },
  SH091: { rating: "SmartShanghai club guide", url: "https://www.smartshanghai.com/articles/nightlife/the-shanghai-clubbing-guide-june-2026", sourceName: "SmartShanghai", note: "Mentions the second Shanghai iteration at The English Corner; exact address unconfirmed." },
  SH092: { rating: "SmartShanghai venue profile", url: "https://www.smartshanghai.com/venue/28727/smshwxmpqr.jpeg?share=true", sourceName: "SmartShanghai", note: "For the INS complex at 109 Yandang Road; individual venues differ." },
  SH093: { rating: "Instituto Cervantes Shanghai guide", url: "https://cvc.cervantes.es/sitio/libros/cultura/2024_guia-de-shanghai_shanghai.pdf", sourceName: "Instituto Cervantes", note: "Describes the Dapuqiao branch; Mike’s intended branch remains unconfirmed." },
  SH096: { rating: "Trip.com visitor reviews", url: "https://www.trip.com/travel-guide/attraction/shanghai/museum-of-art-pudong-124908212", sourceName: "Trip.com", note: "For the Museum of Art Pudong at 2777 Binjiang Avenue." },
  SH098: { rating: "Trip.com visitor reviews", url: "https://my.trip.com/travel-guide/attraction/shanghai/fotografiska-shanghai-141963004", sourceName: "Trip.com", note: "For Fotografiska Shanghai at 127 Guangfu Road." },
  SH099: { rating: "Shanghai government shopping guide", url: "https://english.shanghai.gov.cn/en-TrendyStores/20260525/8fc944e699224a4e9e9a609ad33fa0c0.html", sourceName: "Shanghai government", note: "Features a store inside TX Huaihai; hours vary by tenant." },
  SH101: { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d10103851-Reviews-Iapm_Shopping_Mall-Shanghai.html", sourceName: "Tripadvisor", note: "For IAPM at 999 Huaihai Middle Road." },
  SH105: { rating: "Shanghai government neighborhood guide", url: "https://english.shanghai.gov.cn/en-PlanANightOut/20231217/2215770d32a145e09b6e31fb3c7fdeef.html", sourceName: "Shanghai government", note: "A guide to the Rockbund area; individual venues have their own hours." },
  SH071: { rating: "Peninsula rooftop guide", url: "https://www.peninsula.com.cn/en/shanghai/our-city/pencities/bars-with-a-view-in-shanghai", sourceName: "The Peninsula", note: "Features Sir Elly’s Terrace; whether this is the Sir Elly’s Mike intended remains unconfirmed." },
  SH075: { rating: "5.0 / 5 · 2 Trip.com reviews", url: "https://us.trip.com/restaurant/china/shanghai/detail/sober-company-143175059/", sourceName: "Trip.com", note: "For the Yandang Road venue; a small number of reviews." },
  SH077: { rating: "Time Out Shanghai drinking guide", url: "https://www.timeoutshanghai.com/features/Bars_/104984/5-stylish-roadside-drinking-spots-you-should-stop-by-in-Shanghai.html", sourceName: "Time Out", note: "2022 guide featuring Lucky Mart on Fumin Road." },
  SH078: { rating: "Nomfluence bar profile", url: "https://rachelgouk.com/listings/paal/", sourceName: "Nomfluence", note: "For Paal at 94 Nanchang Road." },
  SH079: { rating: "Nomfluence bar profile", url: "https://rachelgouk.com/listings/root-down/", sourceName: "Nomfluence", note: "For Root Down on Nanchang Road." },
  SH080: { rating: "City News Service guide", url: "https://www.citynewsservice.cn/articles/cns/hai-lights/hai-lights/my-shanghai-48-hours-in-shanghai-by-a-10-year-foodie-veteran-3n70zr6m", sourceName: "City News Service", note: "A local guide includes Bar Blanc on Julu Road." },
  SH081: { rating: "Nomfluence bar profile", url: "https://rachelgouk.com/listings/soif/", sourceName: "Nomfluence", note: "Historical profile of the closed Wuding Road venue." },
  SH083: { rating: "Nomfluence drinking guide", url: "https://rachelgouk.com/3-super-cheap-places-drink-draft-beer-in-shanghai/", sourceName: "Nomfluence", note: "Historical guide to the Xiangyang North Road venue; current operation is unconfirmed." },
  SH084: { rating: "4.7 / 5 · 96 Trip.com reviews", url: "https://sg.trip.com/restaurant/china/shanghai/detail/the-cannery-31113119/", sourceName: "Trip.com", note: "Historical reviews of the closed Yuyuan Road venue." },
  SH086: { rating: "Peninsula live music guide", url: "https://www.peninsula.com/en/shanghai/our-city/pencities/live-music-bars-in-shanghai", sourceName: "The Peninsula", note: "A 2023 guide to the Tai’an Road jazz bar." },
  SH016: { rating: "4.6 / 5 · 572 Trip.com reviews", url: "https://us.trip.com/travel-guide/attraction/shanghai/fuxing-park-78448/", sourceName: "Trip.com" },
  SH017: { rating: "4.5 / 5 · 1,268 Google reviews", url: "https://www.google.com/maps/search/Jing%27an%2BTemple%2C%2BShanghai%2C%2BChina", note: "Google search result, last indexed approximately four months before this check; the rating and review count may have changed." },
  SH018: { rating: "4.5 / 5 · 343 Trip.com reviews", url: "https://sg.trip.com/travel-guide/attraction/shanghai/columbia-circle-51438166", sourceName: "Trip.com" },
  SH019: { rating: "4.0 / 5 · 19 Trip.com reviews", url: "https://www.trip.com/travel-guide/attraction/shanghai/chinese-printed-blue-nankeen-exhibition-hall-10533402/", sourceName: "Trip.com" },
  SH021: { rating: "5.0 / 5 · 8,527 Tripadvisor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d2178971-Reviews-Peace_Museum_Fairmont_Peace_Hotel-Shanghai.html", sourceName: "Tripadvisor", note: "The listing includes museum and hotel heritage tour reviews." },
  SH025: { rating: "2.5 / 5 · 17 Trip.com reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/shandongshougong-dumpling-house-409353/", sourceName: "Trip.com", note: "The 14 Yanqing Road listing matches the recorded address; current operation is unconfirmed." },
  SH027: { rating: "Nomfluence restaurant review", url: "https://rachelgouk.com/listings/fuxing-project-bakery-brunch-bistro/", sourceName: "Nomfluence", note: "Editorial review of the INS Fuxing Park location." },
  SH028: { rating: "Michelin Guide restaurant review", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/polux", sourceName: "Michelin", note: "An editorial review of the Xintiandi branch." },
  SH034: { rating: "Frommer’s restaurant review", url: "https://www.frommers.com/destinations/shanghai/restaurants/fu-1088/", sourceName: "Frommer’s", note: "For Fu 1088 at 375 Zhenning Road." },
  SH035: { rating: "Michelin Guide restaurant review", url: "https://guide.michelin.com/us/en/shanghai-municipality/shanghai/restaurant/fu-1039", sourceName: "Michelin", note: "For Fu 1039, a candidate match; the original recommendation’s number is unresolved." },
  SH036: { rating: "4.5 / 5 · 222 Trip.com reviews", url: "https://sg.trip.com/restaurant/china/shanghai/detail/qiao-ai-lai-lai-xiao-long-15768041/", sourceName: "Trip.com", note: "For the 506 Tianjin Road listing, a candidate branch whose match to the original recommendation is unconfirmed." },
  SH038: { rating: "Time Out restaurant review", url: "https://www.timeoutshanghai.com/venue/Restaurants-Asian-Asian/105511/BASTARD.html", sourceName: "Time Out", note: "Review published January 2024." },
  SH040: { rating: "City News Service restaurant review", url: "https://www.citynewsservice.cn/articles/cns/fb/shanghai-secrets-a-hidden-hunan-resto-worth-trying-yuan-you-tao-env066pm", sourceName: "City News Service", note: "For Yuan You Tao at 167 Xinle Road, a candidate match." },
  SH041: { rating: "3.8 / 5 · 4 Tripadvisor reviews", url: "https://www.tripadvisor.co.uk/Restaurant_Review-g308272-d25423967-Reviews-Yaya_s_Pasta_Bar-Shanghai.html", sourceName: "Tripadvisor", note: "For Yaya’s at 329 Tongren Road." },
  SH044: { rating: "Nomfluence restaurant review", url: "https://rachelgouk.com/listings/cometa/", sourceName: "Nomfluence", note: "For Cometa on South Suzhou Road." },
  SH046: { rating: "Tatler Asia restaurant review", url: "https://www.tatlerasia.com/dining/food/a-food-lovers-guide-to-shanghai", sourceName: "Tatler Asia", note: "For Forage at 141 Maoming South Road." },
  SH047: { rating: "5.0 / 5 · 3 Trip.com reviews", url: "https://th.trip.com/restaurant/china/shanghai/detail/blaz-107422118/", sourceName: "Trip.com", note: "A small number of reviews for the 20 Donghu Road restaurant." },
  SH048: { rating: "4.3 / 5 · 3 Tripadvisor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d33310400-Reviews-Babar-Shanghai.html", sourceName: "Tripadvisor", note: "A small number of reviews for Babar at 7 Donghu Road." },
  SH049: { rating: "Nomfluence restaurant review", url: "https://rachelgouk.com/listings/juke/", sourceName: "Nomfluence", note: "For the Dongping Road venue." },
  SH054: { rating: "Nomfluence restaurant review", url: "https://rachelgouk.com/listings/san-bai-bei/", sourceName: "Nomfluence", note: "For San Bai Bei at 56 Maoming South Road." },
  SH056: { rating: "Shanghai tourism restaurant profile", url: "https://www.meet-in-shanghai.net/en/food/restaurant-fu-he-hu-351447/", sourceName: "Shanghai tourism", note: "For Fu He Hui at 1037 Yuyuan Road." },
  SH057: { rating: "Michelin Guide restaurant review", url: "https://guide.michelin.com/sg/zh_CN/shanghai-municipality/shanghai/restaurant/obscura", sourceName: "Michelin", note: "For Obscura on Xikang Road, a candidate whose match to the original recommendation is unconfirmed." },
  SH059: { rating: "Michelin Guide restaurant review", url: "https://guide.michelin.com/ca/en/shanghai-municipality/shanghai/restaurant/canton-table", sourceName: "Michelin", note: "For Canton Table on the fifth floor of Three on the Bund." },
  SH060: { rating: "4.6 / 5 · 16 Trip.com reviews", url: "https://uk.trip.com/restaurant/china/shanghai/detail/ops-cafe-36960781/", sourceName: "Trip.com", note: "For O.P.S. Cafe at Lane 177 Taiyuan Road." },
  SH061: { rating: "Shanghai tourism neighborhood guide", url: "https://www.meet-in-shanghai.net/en/news/a-creatives-guide-to-shanghais-neighborhood-gems-587622/", sourceName: "Shanghai tourism", note: "A local’s recommendation of Manual at 15 Yanqing Road." },
  SH062: { rating: "Time Out Shanghai coffee profile", url: "https://www.timeoutshanghai.cn/features/7194.html", sourceName: "Time Out", note: "For the Fumin Road candidate; the original guide’s branch is unspecified." },
  SH067: { rating: "Time Out coffee review", url: "https://www.timeoutshanghai.com/venue/Restaurants-Cafes/58610/Seesaw-Coffee.html", sourceName: "Time Out", note: "A 2018 review of the Columbia Circle branch." },
  SH068: { rating: "Shanghai Roastery visitor guide", url: "https://tablejourney.com/china/shanghai/coffee-roasters/arabica-shanghai-roastery-rockbund/", sourceName: "TableJourney", note: "For the Rockbund candidate at 169 Yuanmingyuan Road; original branch not independently confirmed." },
  SH167: { rating: "4.5 / 5 · 21 Google reviews", id: "ChIJRzN4O6F6sjURAaghLMXhMjA" },
  SH168: { rating: "4.5 / 5 · 32 Google reviews", id: "ChIJEdyYLKR6sjURXNYGAXztNd0" },
  SH169: { rating: "4.5 / 5 · 11 Google reviews", id: "ChIJ6aP3JbJ6sjUR35OmYFRVy0U" },
  SH170: { rating: "4.3 / 5 · 17 Google reviews", id: "ChIJ_9huFLN6sjURaHWiO0AgLHU" },
  SH171: { rating: "4.6 / 5 · 15 Google reviews", id: "ChIJrYl_5q16sjURwT9F8aTEUhQ", note: "The Dongping Road branch was reported closed in 2018; a reopening is unconfirmed, so these reviews may be historical." },
  SH172: { rating: "4.0 / 5 · 42 Google reviews", id: "ChIJQcpJA616sjURtYxtd4GrxCw" },
  SH173: { rating: "4.6 / 5 · 46 Google reviews", id: "ChIJ_XQ_D6t6sjURa2fAWKcwUGg" },
  SH174: { rating: "4.5 / 5 · 4 Google reviews", id: "ChIJW9MSH1VlsjURSj_uAn8nxNo" },
  SH175: { rating: "5.0 / 5 · 8 Google reviews", id: "ChIJO4epH_1vsjURhLBxWqAu4Qo" },
  SH176: { rating: "4.6 / 5 · 81 Google reviews", id: "ChIJYWce1_xvsjURbyfaJk8NGCo" },
  SH177: { rating: "4.7 / 5 · 36 Google reviews", id: "ChIJEzFC3BNwsjURtvQdSRsbGNE" },
  SH178: { rating: "3.9 / 5 · 477 Google reviews", id: "ChIJmWFp6RJwsjURlbvCmVMOKuo" },
  SH179: { rating: "4.5 / 5 · 120 Google reviews", id: "ChIJvyekmVhwsjURATsh25Jn61Y" },
  SH180: { rating: "4.3 / 5 · 135 Google reviews", id: "ChIJn-lk91hwsjURreTvBNwcXjo", note: "Reviews are for the former Fuzhou Road location; the venue moved to Jiujiang Road in 2026." },
  SH023: { rating: "4.5 / 5 · 54 Google reviews", id: "ChIJQX9YU45xsjURj9A_IPJ9Tds" },
  SH055: { rating: "4.7 / 5 · 42 Google reviews", id: "ChIJv12y_0tlsjURP3DVeaa8hh4" },
  SH158: { rating: "4.4 / 5 · 301 Google reviews", id: "ChIJCaa69FlwsjURGEAlMiWAkfI" },
  SH015: { rating: "4.6 / 5 · 27 Google reviews", id: "ChIJX2td_QdwsjURxE5_ybgnxfc", note: "This rating is for Xiangyang Park’s south gate." },
  SH094: { rating: "4.4 / 5 · 216 Google reviews", url: "https://maps.google.com/?cid=182372908384194705", note: "Reported by Shanghai City Break; its Google data may be delayed." },
  SH160: { rating: "4.4 / 5 · 315 Google reviews", url: "https://www.google.com/maps/place/@31.231413,121.475403,17z/data=!4m10!3m9!1s0x35b27069e1259ae7:0x56b8b312dab79fa4!5m2!4m1!1i2!8m2!3d31.231413!4d121.475403!9m1!1b1", note: "Reported by Wanderlog; its Google data may be delayed." },
  SH162: { rating: "4.3 / 5 · 14 Google reviews", id: "ChIJWfmkeKtxsjURYvdes5SOi-o" },
  SH024: { rating: "4.5 / 5 · 116 Google reviews", id: "ChIJ1Q89TSxlsjUR3GB7e5Vp9Ao", note: "For RAC at 322 Anfu Road, a candidate branch of this recommendation." },
  SH159: { rating: "4.1 / 5 · 161 Google reviews", id: "ChIJE-I-loRwsjURCc0o6_knUc0" },
  SH026: { rating: "4.5 / 5 · 18 Google reviews", id: "ChIJUf1PPlJlsjURbO_AUIcKFfo", note: "For the listing at 303 Wuyuan Road; current restaurant identity and vegetarian menu remain uncertain." },
  SH052: { rating: "4.8 / 5 · 5 Google reviews", id: "ChIJd57jfEJlsjUR6cwdrGkA3hs", note: "For a Yunnan restaurant at 1112 Dingxi Road, a possible Lotus Eatery match; branch identity remains unconfirmed." },
  SH031: { rating: "3.6 / 5 · 88 Google reviews", url: "https://www.google.com/maps/place/@31.203015,121.437953,17z/data=!4m10!3m9!1s0x35b26559d4908127:0xfbb144ca32c7f7b2!5m2!4m1!1i2!8m2!3d31.203015!4d121.437953!9m1!1b1", note: "For Old Jesse at 41 Tianping Road, as reported by Wanderlog; its Google data may be delayed." },
  SH163: { rating: "4.4 / 5 · 241 Google reviews", id: "ChIJRSVOOU5lsjUR_QXbVkbBC3c" },
  SH164: { rating: "4.6 / 5 · 120 Google reviews", id: "ChIJH8ea7ap6sjURJBDEA-HKELQ" },
  SH165: { rating: "4.4 / 5 · 56 Google reviews", id: "ChIJfyu5IwFwsjURC7vOvsE7XhY" },
  SH166: { rating: "4.0 / 5 · 95 Google reviews", id: "ChIJN80qLqh6sjURO5cn86EUvZQ", note: "For the Donghu Road listing shared by Michael; current operation at this address is unconfirmed." },
};

function sectionCard(title, hint, content) {
  return `<details class="place-section-card"><summary><span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(hint)}</small></span><span class="section-chevron" aria-hidden="true">⌄</span></summary><div class="place-section-content">${content}</div></details>`;
}

const ADDITIONAL_REVIEWS = {
  SH005: [{ rating: "Neighborhood resident's guide", url: "https://www.meet-in-shanghai.net/en/news/variety-and-vitality-in-the-dynamic-neighborhood-of-julu-fumin-roads-530027/", sourceName: "Meet in Shanghai", note: "A 2023 resident interview covers the wider Julu–Fumin neighborhood; individual businesses may have changed." }, { rating: "Trip.com visitor reviews", url: "https://www.trip.com/travel-guide/attraction/shanghai/fumin-road-13630877/", sourceName: "Trip.com", note: "Visitor reviews of Fumin Road as a whole, not of a specific stop." }],
  SH006: [{ rating: "Trip.com visitor posts and reviews", url: "https://www.trip.com/travel-guide/attraction/shanghai/xinle-road-13628118", sourceName: "Trip.com", note: "Visitor impressions of Xinle Road as a whole, including walking and shopping suggestions." }],
  SH007: [{ rating: "Reddit visitor discussion", url: "https://www.reddit.com/r/shanghai/comments/1gj14ok", sourceName: "Reddit", note: "A 2024 discussion includes a reader's recommendation of Yanqing Road for cafés and boutiques." }, { rating: "Resident's neighborhood guide", url: "https://www.citynewsservice.cn/articles/cns/lifestyle/my-hood/pm9eq3jk", sourceName: "City News Service", note: "A Yanqing Road resident shares his favorite walks and nearby places in October 2025; check current business details." }],
  SH008: [{ rating: "Trip.com visitor walking guide", url: "https://us.trip.com/moments/detail/shanghai-2-154559021/", sourceName: "Trip.com", note: "A visitor's Changshu Road walking route and café suggestions; individual shops may change." }],
  SH009: [{ rating: "Neighborhood walking guide", url: "https://www.alizee-ccm.com/post/3-local-walks-in-shanghai", sourceName: "Alizée CCM", note: "A personal walking guide along Wuyuan Road and nearby streets; check individual shop details before visiting." }],
  SH010: [{ rating: "Reddit visitor recommendation", url: "https://www.reddit.com/r/travelchina/comments/1h1irnh", sourceName: "Reddit", note: "A 2024 visitor describes walking south on Wulumuqi Road and exploring nearby cafés and shops." }],
  SH011: [{ rating: "Trip.com visitor reviews and posts", url: "https://www.trip.com/travel-guide/attraction/shanghai/anfu-road-10520131/", sourceName: "Trip.com", note: "Reviews and visitor posts about Anfu Road as a whole, not a particular business." }],
  SH012: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d9778716-Reviews-Wukang_Road-Shanghai.html", sourceName: "Tripadvisor", note: "Visitor reviews of Wukang Road as a whole; the listing also contains an unrelated transport-service description." }],
  SH018: [{ rating: "Design Anthology architecture feature", url: "https://design-anthology.com/story/columbia-circle-shanghai", sourceName: "Design Anthology", note: "An architecture feature about the wider Columbia Circle development and its later expansion." }],
  SH019: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d8607121-Reviews-Chinese_Printed_Blue_Nankeen_Exhibition_Hall-Shanghai.html", sourceName: "Tripadvisor", note: "For the Blue Nankeen Exhibition Hall; Trip.com also displays Tripadvisor reviews, so the two counts are not independent." }],
  SH065: [{ rating: "Ctrip visitor reviews", url: "https://gs.ctrip.com/html5/you/foods/fooddetail/2/78194457.html", sourceName: "Ctrip", note: "Chinese-language reviews of one Manner location at Shanghai MixC, 1799 Wuzhong Road; the original entry does not specify a branch." }],
  SH070: [{ rating: "Trip.com visitor post", url: "https://hk.trip.com/moments/detail/shanghai-2-148115843", sourceName: "Trip.com", note: "A post naming BASAO at 28 Hong Kong Road, a candidate branch; the original entry does not identify a branch." }],
  SH074: [{ rating: "Asia Bars historical profile", url: "https://www.asia-bars.com/2010/09/long-bar-bar-pub-at-shanghai-centre-shanghai/", sourceName: "Asia Bars & Restaurants", note: "A 2010 profile of Long Bar at Shanghai Centre near the Portman; the original match and current status are unconfirmed." }],
  SH085: [{ rating: "Reddit visitor recommendation", url: "https://www.reddit.com/r/shanghai/comments/1vv731m/bar_bar_hopping_speakeasys/", sourceName: "Reddit", note: "A 2026 comment recommends Wugong Palace of Sound; its match to the original Wugong note and current status are unconfirmed." }],
  SH093: [{ rating: "Hypebeast city guide", url: "https://hypebeast.com/2025/9/camper-karst-2-tom-bray-shanghai-city-guides-video", sourceName: "Hypebeast", note: "A 2025 guide features the Chun K at 618 Xujiahui Road; the original entry does not identify a branch." }],
  SH104: [{ rating: "Trip.com visitor posts", url: "https://uk.trip.com/moments/poi-jing-an-kerry-centre-15297579", sourceName: "Trip.com", note: "Visitor posts for Jing An Kerry Centre at 1515 Nanjing West Road; the original entry does not specify a branch." }],
  SH108: [{ rating: "Avelo neighborhood photo guide", url: "https://www.avelotokyo.com/2026/06/hkri-taikoo-hui-louis-vuitton-louis-lv.html", sourceName: "Avelo", note: "A June 2026 Japanese-language photo guide mentions Snow Peak at Zhang Yuan; the original branch remains unconfirmed." }],
  SH110: [{ rating: "Hypebeast city guide", url: "https://hypebeast.com/2014/7/the-hypebeast-city-guide-to-shanghai", sourceName: "Hypebeast", note: "A 2014 recommendation of FLY at 704 Changle Road, a possible match for the original skate-shop note; the identity and current status are unconfirmed." }],
  SH116: [{ rating: "CNA independent shops guide", url: "https://cnaluxury.channelnewsasia.com/obsessions/shanghai-indie-boutiques-concept-stores-292921", sourceName: "CNA", note: "A 2026 guide discusses Feiyue at Culture Matters, 206 Wulumuqi Middle Road; the original entry does not identify a store." }],
  SH121: [{ rating: "Instituto Cervantes shopping guide", url: "https://shanghai.cervantes.es/imagenes/File/Guia_de_Shanghai_2025.pdf", sourceName: "Instituto Cervantes", note: "A 2025 Spanish-language guide to An Ko Rau, including Columbia Circle; the intended other branch remains unspecified." }],
  SH122: [{ rating: "Time Out store profile", url: "https://www.timeoutshanghai.com/venue/Shops__Services-Fashion/57140/Klee-Klee-.html", sourceName: "Time Out", note: "A historical 2018 guide to klee klee at 322 Anfu Road; the original entry has no confirmed branch and later stockist listings distinguish nearby shops." }],
  SH113: [{ rating: "Time Out Xinle Road guide", url: "https://www.10100.com/article/148141551", sourceName: "Time Out Shanghai", note: "A 2024 guide to Nice Rice at 158 Xinle Road, a different candidate branch from the Huaihai Road flagship; the original branch is unspecified." }, { rating: "Xinle Road store design", url: "https://southhousetale.com/nice-rice-xinle-road-concept-store-say-architects/", sourceName: "South House Tale", note: "A 2025 design profile of the renewed 158 Xinle Road store; the original branch is unspecified." }],
  SH114: [{ rating: "Time Out boutique review", url: "https://www.timeoutshanghai.com/venue/Shops__Services-Fashion/3807/Labelhood-Pillar.html", sourceName: "Time Out", note: "A historical review of the Fumin Road store; the original branch is unspecified." }, { rating: "Shanghai insider shopping guide", url: "https://somethingcurated.com/2025/12/02/cherry-xus-shanghai-an-insiders-guide-to-the-citys-best-galleries-food-nightlife-and-more/", sourceName: "Something Curated", note: "A 2025 local guide recommends Labelhood at 184 Fumin Road for contemporary Chinese designers; the original branch is unspecified." }],
  SH115: [{ rating: "Central Studios shopping guide", url: "https://centralstudios.cn/wp-content/uploads/2025/09/CS-CITY-GUIDE_250814.pdf", sourceName: "Central Studios", note: "A 2025 guide lists Maison Dongliang at 168 Wuyi Road; the original branch is unspecified." }],
  SH120: [{ rating: "Instituto Cervantes shopping guide", url: "https://shanghai.cervantes.es/imagenes/File/Guia_de_Shanghai_2025.pdf", sourceName: "Instituto Cervantes", note: "Spanish-language shopping guide mentioning An Ko Rau at Columbia Circle; confirm the current unit." }, { rating: "Local Columbia Circle guide", url: "https://note.com/h_l380/n/ne19c1fa95a5b?hl=en", sourceName: "Shanghai food guide", note: "A June 2026 local guide mentions an An Ko Rau shop and office in Columbia Circle Phase 2 at 222 Panyu Road; confirm the current unit before visiting." }],
  SH123: [{ rating: "SmartShanghai shopping review", url: "https://www.10100.com/article/152452449", sourceName: "SmartShanghai", note: "A 2026 guide reviews HARMAY at 55 Wukang Road; the original branch remains unconfirmed." }, { rating: "Trip.com visitor post", url: "https://www.trip.com/moments/detail/shanghai-2-133622764", sourceName: "Trip.com", note: "A visitor describes the Wukang Road store; the original branch remains unconfirmed." }],
  SH126: [{ rating: "Superfuture store profile", url: "https://superfuture.com/2021/06/new-shops/shanghai-short-sentence-store-opening/", sourceName: "Superfuture", note: "A historical 2021 profile of Short Sentence at 290 Anfu Road; the original branch is unspecified." }],
  SH127: [{ rating: "Wallpaper shopping design feature", url: "https://www.wallpaper.com/architecture/architects-transform-the-windows-of-xintiandi-shopping-centre-shanghai", sourceName: "Wallpaper", note: "A historical design feature mentions a JNBY and Croquis space at Xintiandi; the original branch and current shop are unconfirmed." }],
  SH128: [{ rating: "Instituto Cervantes shopping guide", url: "https://shanghai.cervantes.es/imagenes/File/Guia_de_Shanghai_2025.pdf", sourceName: "Instituto Cervantes", note: "A 2025 Spanish-language shopping guide mentions the ZUCZUG brand in Shanghai malls; the original branch remains unspecified." }],
  SH130: [{ rating: "Wallpaper store design profile", url: "https://www.wallpaper.com/fashion/comme-moi-launches-nerihu-designed-store-in-shanghai", sourceName: "Wallpaper", note: "Historical design profile of the Comme Moi flagship at 169 Xinle Road; the original branch is unspecified." }, { rating: "CNA independent shops guide", url: "https://cnaluxury.channelnewsasia.com/obsessions/shanghai-indie-boutiques-concept-stores-292921", sourceName: "CNA", note: "A 2026 guide describes the Xinle Road flagship's clothing and design; the original branch remains unspecified." }],
  SH131: [{ rating: "MR Magazine stockist guide", url: "https://mr-mag.com/labelhood-opens-first-menswear-store-in-china/", sourceName: "MR Magazine", note: "A 2022 article names Feng Chen Wang among brands carried at Labelhood's Julu Road menswear store; confirm current stock and the intended location." }],
  SH132: [{ rating: "City News Service shopping guide", url: "https://www.citynewsservice.cn/articles/cns/shanghai-living/general/hai-streets-huaihai-road-where-shopping-blends-art-culture-and-lifestyle-3k0ebqqn", sourceName: "City News Service", note: "A 2026 guide to Shang Xia Maison at 233 Middle Huaihai Road; the original branch is unspecified." }, { rating: "Shanghai shopping guide", url: "https://www.peninsula.com/en/shanghai/our-city/pencities/shopping-in-shanghai-during-golden-week", sourceName: "The Peninsula", note: "A 2026 guide describes the Huaihai Road Maison's architecture and design objects; the original branch is unspecified." }],
  SH133: [{ rating: "Shanghai retail report", url: "https://www.sohu.com/a/1004288905_141121", sourceName: "Sohu", note: "A 2026 Chinese-language report mentions MAIA ACTIVE on the third floor of Jing An Kerry Centre; the original branch is unspecified." }],
  SH134: [{ rating: "Sidewalk Hustle city guide", url: "https://sidewalkhustle.com/shanghai-city-guide/", sourceName: "Sidewalk Hustle", note: "A historical profile of DOE and its coffee shop at 78 Tongren Road; the original branch and current configuration are unconfirmed." }],
  SH136: [{ rating: "N.HOOLYWOOD stockist directory", url: "https://n-hoolywood.com/pages/shop", sourceName: "N.HOOLYWOOD", note: "The brand's stockist directory lists SOULGOODS at 502 Jiashan Road; the original branch is unspecified and stock should be checked." }],
  SH137: [{ rating: "RADII streetwear guide", url: "https://radii.co/article/4-chinese-streetwear-brands-to-check-out-in-shanghai", sourceName: "RADII", note: "A 2024 guide to GoodBai at 92 Yanqing Road and its café at No. 104; the original branch is unspecified." }, { rating: "Trip.com visitor post", url: "https://www.trip.com/moments/detail/shanghai-2-130925363/", sourceName: "Trip.com", note: "A 2025 visitor's experience at the Yanqing Road shop; the original branch is unspecified." }],
  SH143: [{ rating: "CNA independent shops guide", url: "https://cnaluxury.channelnewsasia.com/obsessions/shanghai-indie-boutiques-concept-stores-292921", sourceName: "CNA", note: "A 2026 guide to AENTOS's Jiaozhou Road flagship and Xintiandi presence; the original branch is unspecified." }, { rating: "Citylikeyou visitor recommendation", url: "https://www.citylikeyou.com/shanghai/people/lyla-lee/places/aentos", sourceName: "Citylikeyou", note: "A visitor describes the Jiaozhou Road shop; the Xintiandi store is a separate candidate." }],
  SH144: [{ rating: "Neighborhood walking guide", url: "https://www.alizee-ccm.com/post/3-local-walks-in-shanghai", sourceName: "Alizée CCM", note: "A personal guide recommends Common Rare in Lane 1088 Yuyuan Road; the original branch remains unconfirmed." }],
  SH145: [{ rating: "Time Out Wulumuqi Road guide", url: "https://www.timeoutshanghai.com/features/Things_to_Do-Shanghai_walks/105539/9-wonderful-spots-on-Wulumuqi-Road.html", sourceName: "Time Out", note: "A 2024 guide to the Tagi shop on Wulumuqi Middle Road; the original branch remains unconfirmed." }],
  SH097: [{ rating: "Trip.com visitor posts", url: "https://www.trip.com/travel-guide/attraction/shanghai/city-143193746/", sourceName: "Trip.com", note: "Visitor posts about Suhe Haus and its exhibitions; dates and admission arrangements vary by exhibition." }, { rating: "Mr & Mrs Smith art guide", url: "https://www.mrandmrssmith.com/editorial/culture/shanghai-art-guide", sourceName: "Mr & Mrs Smith", note: "A 2026 guide recommends exploring the galleries inside Suhe Haus." }],
  SH027: [{ rating: "INS complex design feature", url: "https://www.onewedesign.com/gouwuzhongxinkongjiansheji/57-3898.html", sourceName: "One We Design", note: "Profiles Fuxing Bakery at INS, 109 Yandang Road. This is a design feature, not a diner review." }, { rating: "Sourdough brunch feature", url: "https://tidezine.com/en/news/fuxing-project-sourdough-brunch-shanghai", sourceName: "TIDEZINE", note: "August 2026 menu feature on the INS location; it closely overlaps the Nomfluence coverage and should not be counted as an independent diner review." }],
  SH051: [{ rating: "Citylikeyou visitor recommendation", url: "https://www.citylikeyou.com/shanghai/people/lyla-lee/places/shardaa", sourceName: "Citylikeyou", note: "For Shardaa at Columbia Circle; its match to the original Shudao/Shark note is unconfirmed." }, { rating: "Time Out Tibetan culture guide", url: "https://www.timeoutshanghai.cn/features/7087.html", sourceName: "Time Out Shanghai", note: "A Chinese-language guide to Shardaa's drinks and cultural events at Columbia Circle; the match to the original entry is unconfirmed." }],
  SH100: [{ rating: "Trip.com visitor post", url: "https://us.trip.com/moments/detail/shanghai-2-155932037/", sourceName: "Trip.com", note: "For HAI550 at 550 Huaihai Middle Road, a possible match for the unnamed mall; the original identity remains unconfirmed." }],
  SH169: [{ rating: "BK Magazine bar guide", url: "https://www.bkmagazine.com/nightlife/best-bars-cocktails-shanghai/", sourceName: "BK Magazine", note: "Historical guide to The Roof at 570 Yongjia Road; current operation is unconfirmed." }],
  SH099: [{ rating: "Trip.com visitor reviews and posts", url: "https://www.trip.com/moments/poi-tx-79912245/", sourceName: "Trip.com", note: "For TX Huaihai at 523 Huaihai Middle Road; the page contains user posts as well as a review summary." }],
  SH171: [{ rating: "Tripadvisor visitor reviews", url: "https://cn.tripadvisor.com/Restaurant_Review-g308272-d4772218-Reviews-DiShuiDong_Xiang_CaiGuan_DongPing_Road-Shanghai.html", sourceName: "Tripadvisor", note: "For the former Dongping Road branch, reported closed in 2018; these are historical reviews." }],
  SH177: [{ rating: "Ctrip visitor reviews", url: "https://you.ctrip.com/food/shanghai2/17588016-dianping155947306.html", sourceName: "Ctrip", note: "For Laojishi at 288 Shimen First Road; this listing gives a different floor from the saved address, so check before visiting." }, { rating: "Amap visitor review", url: "https://www.amap.com/place/B0FFI9371V", sourceName: "Amap", note: "For the same shopping complex; the Amap floor differs from the saved address and its visible review is from 2022." }],
  SH155: [{ rating: "Reddit visitor recommendation", url: "https://www.reddit.com/r/shanghai/comments/1namvvm/", sourceName: "Reddit", note: "One 2025 commenter recommends Helen Nail Spa at 819 Julu Road; the original guide's intended salon remains unconfirmed." }, { rating: "Shanghaista visitor blog", url: "https://shanghaistacom.wordpress.com/category/wellness/", sourceName: "Shanghaista", note: "An undated personal account of the 819 Julu Road and 120 Nanchang Road salons; the original match and current operation are unconfirmed." }],
  SH156: [{ rating: "Tripadvisor hotel guest reviews", url: "https://www.tripadvisor.com/Hotel_Review-g308272-d301722-Reviews-Okura_Garden_Hotel_Shanghai-Shanghai.html", sourceName: "Tripadvisor", note: "For Okura Garden Hotel at 58 South Maoming Road; its match to the original entry is unconfirmed." }, { rating: "Trip.com hotel guest reviews", url: "https://sg.trip.com/hotels/shanghai-hotel-detail-369832/okura-garden-hotel-shanghai/review.html", sourceName: "Trip.com", note: "For the same candidate hotel; the original match remains unconfirmed." }],
  SH102: [{ rating: "Wanderlog visitor reviews", url: "https://wanderlog.com/place/details/126633/r%C3%A9el-mall", sourceName: "Wanderlog", note: "For Réel at 1601 Nanjing West Road; reviews on the page may be syndicated from Google." }, { rating: "Central Studios shopping guide", url: "https://centralstudios.cn/wp-content/uploads/2025/12/CS-CITY-GUIDE_v3.2.pdf", sourceName: "Central Studios", note: "A 2025 Shanghai shopping guide lists Réel at 1601 Nanjing West Road." }],
  SH105: [{ rating: "City News Service architecture guide", url: "https://www.citynewsservice.cn/articles/shanghaidaily/in-focus/unconventional-architecture-where-shanghai-slows-down-pm9edljk", sourceName: "City News Service", note: "A 2026 guide to the wider Rockbund district, not a particular entrance or tenant." }, { rating: "Architecture award profile", url: "https://www.riba.org/explore/awards/international-awards/international-awards-for-excellence/2026/rockbund-shanghai/", sourceName: "RIBA", note: "A 2026 architecture profile of the wider Rockbund restoration and its public spaces." }],
  SH107: [{ rating: "superfuture store profile", url: "https://superfuture.com/2021/08/new-shops/shanghai-in-the-park-store-opening-2/", sourceName: "superfuture", note: "Historical 2021 profile of an in the PARK store on Yanping Road; the original branch and current operation remain unconfirmed." }],
  SH106: [{ rating: "Shanghai city shopping guide", url: "https://english.shanghai.gov.cn/en-ShanghaiStyle/20261010/d22abb0294f4463b804f088f315b8037.html", sourceName: "Shanghai government", note: "October 2026 article about a shop opening at Xintiandi Style II, 245 Madang Road." }, { rating: "Wanderlog visitor reviews", url: "https://wanderlog.com/place/details/388638", sourceName: "Wanderlog", note: "Google-sourced reviews for the 245 Madang Road listing; some comments discuss the wider Xintiandi area." }],
  SH138: [{ rating: "Esquire Singapore fashion guide", url: "https://esquiresg.com/rise-of-asian-fashion/", sourceName: "Esquire Singapore", note: "A September 2026 guide mentions Randomevent among the streetwear shops on Yongyuan Road; the original entry does not specify a branch." }],
  SH139: [{ rating: "Instituto Cervantes city guide", url: "https://shanghai.cervantes.es/imagenes/File/biblioteca/Guia_de_Shanghai_2024.pdf", sourceName: "Instituto Cervantes", note: "Spanish-language guide to Lady Fafa, listing a Julu Road location; the original entry does not identify a branch." }, { rating: "Trip.com visitor walking guide", url: "https://by.trip.com/moments/poi-julu-road-10520118/", sourceName: "Trip.com", note: "A Russian-language visitor post includes the 550 Julu Road shop on a neighborhood walk; the intended branch remains unconfirmed." }],
  SH141: [{ rating: "SmartShanghai bicycle-shop guide", url: "https://www.smartshanghai.com/articles/sportrecreation/collection-nice-bike-shops", sourceName: "SmartShanghai", note: "Historical 2019 guide to the 536-2 Julu Road candidate; identity and current operation remain unconfirmed." }, { rating: "China Like a Local cycling guide", url: "https://chinalikealocal.com/blog/shanghai-road-bike-rental-top-shops-tips-scenic-routes", sourceName: "China Like a Local", note: "Lists a 2Wheels bike shop at 536 Julu Road; the match to the original entry and current services remain unconfirmed." }],
  SH142: [{ rating: "Neighborhood walking guide", url: "https://www.alizee-ccm.com/post/3-local-walks-in-shanghai", sourceName: "Alizée CCM", note: "For Eu Noia on Wuyuan Road; the spelling and match to the original entry remain unconfirmed." }, { rating: "Time Out independent brands guide", url: "https://www.timeoutshanghai.com/features/Shopping__Style-Shopping_features/74784/Shanghais-best-independent-and-local-brands.html", sourceName: "Time Out", note: "A historical profile of Eu Noia's Wuyuan Road aromatherapy boutique; the original match and current operation remain unconfirmed." }],
  SH064: [{ rating: "Local coffee and bar guide", url: "https://static.zhoudaosh.com/6DB8FE9CCE33851A60A701FE2D01E2ADFF0A42A82A250F41037D0681B1D65A1E", sourceName: "Zhoudaosh", note: "Historical 2021 guide to DUFOUR at 243-7 Wulumuqi Middle Road; current operation is unconfirmed." }, { rating: "Avenue & Son interview", url: "https://www.sohu.com/a/455258546_120044599", sourceName: "Sohu", note: "Historical 2021 interview describes the same music-focused bar; current operation is unconfirmed." }, { rating: "Suitcase Magazine coffee guide", url: "https://suitcasemag.com/shanghai-coffee-shops/", sourceName: "Suitcase Magazine", note: "A historical visit describes Dufour on Wulumuqi Road as a coffee, cocktail and music venue; current operation is unconfirmed." }],
  SH111: [{ rating: "Time Out Changle Road guide", url: "https://www.timeoutshanghai.com/features/Things_to_Do-Things_to_Do/65879/The-best-things-to-do-on-Changle-Lu.html", sourceName: "Time Out", note: "Historical 2019 guide to FLY at 704 Changle Road." }, { rating: "Hypebeast city guide", url: "https://hypebeast.com/2014/7/the-hypebeast-city-guide-to-shanghai", sourceName: "Hypebeast", note: "A 2014 local recommendation identifies FLY at 704 Changle Road; current operation is unconfirmed." }, { rating: "Shanghai skateboarding profile", url: "https://www.why.com.cn/wx/article/2024/07/29/17222163471226544619.html", sourceName: "Youth Daily", note: "A July 2024 report profiles FLY's skateboarding community and its move to 704 Changle Road; current operation remains unconfirmed." }],
  SH117: [{ rating: "Time Out Changle Road guide", url: "https://www.timeoutshanghai.com/features/Things_to_Do-Things_to_Do/65879/The-best-things-to-do-on-Changle-Lu.html", sourceName: "Time Out", note: "Historical 2019 guide to Culture Matters at 918 Changle Road; the original entry has no confirmed branch." }, { rating: "CNA independent shops guide", url: "https://cnaluxury.channelnewsasia.com/obsessions/shanghai-indie-boutiques-concept-stores-292921", sourceName: "CNA", note: "A 2026 guide to the 206 Wulumuqi Middle Road shop; the original entry does not identify a branch." }],
  SH118: [{ rating: "Shanghai city neighborhood guide", url: "https://english.shanghai.gov.cn/en-TrendyStores/20250624/9d2d5eeee2784a61ac9e9035aafcfc2b.html", sourceName: "Shanghai government", note: "For the 72 Yanqing Road listing, published 2025; the current location remains unconfirmed." }, { rating: "Korean fashion guide", url: "https://www.cosmopolitan.co.kr/article/1891181", sourceName: "Cosmopolitan Korea", note: "A November 2025 Shanghai shopping guide also lists Monday Sleeping Club at 72 Yanqing Road; confirm its current location." }],
  SH124: [{ rating: "CNA shopping guide", url: "https://cnaluxury.channelnewsasia.com/obsessions/shanghai-indie-boutiques-concept-stores-292921", sourceName: "CNA", note: "For the record shop at 617 Changle Road; distinct from a similarly named clothing shop." }],
  SH151: [{ rating: "Tripadvisor hotel guest reviews", url: "https://www.tripadvisor.com/Hotel_Review-g308272-d1200824-Reviews-The_PuLi_Shanghai-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews cover The PuLi Hotel and Spa as a whole, not exclusively spa treatments." }, { rating: "Trip.com hotel guest reviews", url: "https://us.trip.com/hotels/shanghai-hotel-detail-416228/the-puli-shanghai/review.html", sourceName: "Trip.com", note: "Hotel-wide guest reviews; some mention the pool or spa, but the rating is not spa-specific." }, { rating: "Spafinder spa feature", url: "https://www.spafinder.com/blog/spa-travel/spas-shanghai-minute/", sourceName: "Spafinder", note: "Historical feature on Anantara Spa at The PuLi; treatments and facilities may have changed." }],
  SH152: [{ rating: "Tripadvisor hotel spa reviews", url: "https://www.tripadvisor.com/Hotel_Feature-g308272-d14108499-zft9169-Upper_House_Shanghai.html", sourceName: "Tripadvisor", note: "Guest reviews of the spa at the former Middle House, now Upper House Shanghai; some refer to the earlier hotel name." }, { rating: "SmartShanghai spa guide", url: "https://www.smartshanghai.com/articles/health-and-wellbeing/7-hotel-spas-for-escaping-the-city", sourceName: "SmartShanghai", note: "Historical 2020 guide to Mi Xun at the former Middle House; treatments and access may have changed." }],
  SH153: [{ rating: "Time Out spa profile", url: "https://www.timeoutshanghai.com/features/Competitions/37022/Closed-Win-a-400RMB-voucher-for-Yu-Massages-new-Xuhui-spa.html", sourceName: "Time Out", note: "Historical 2016 profile of the 218 Xinle Road candidate; the original guide branch remains unconfirmed." }],
  SH154: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d4089701-Reviews-Dragonfly_Therapeutic_Retreat_Shanghai_Xinle_Road-Shanghai.html", sourceName: "Tripadvisor", note: "For Dragonfly at 206 Xinle Road; its match to the original guide entry remains a candidate." }, { rating: "Wanderlog visitor reviews", url: "https://wanderlog.com/place/details/1847517/dragonfly-spa", sourceName: "Wanderlog", note: "Google-sourced reviews for the 206 Xinle Road candidate; experiences are mixed and the original branch is unconfirmed." }, { rating: "Beauty Gazette spa review", url: "https://beauty-gazette.com/2015/07/10/spa-in-shanghai-dragonfly-therapeutic-retreat-xinle/", sourceName: "The Beauty Gazette", note: "Historical 2015 review of the Xinle Road branch; services may have changed." }],
  SH095: [{ rating: "Trip.com visitor reviews", url: "https://us.trip.com/travel-guide/attraction/shanghai/long-museum-13335192/", sourceName: "Trip.com", note: "For the West Bund museum at 3398 Longteng Avenue; the original note does not specify a Long Museum branch." }],
  SH026: [{ rating: "Washington Post neighborhood guide", url: "https://www.washingtonpost.com/travel/china/shanghai-local-guide/", sourceName: "Washington Post", note: "Historical recommendation of Godly at 303 Wuyuan Road; the current venue and vegetarian menu are uncertain." }],
  SH163: [{ rating: "Condé Nast Traveler restaurant review", url: "https://www.cntraveler.com/restaurants/shanghai/lost-heaven", sourceName: "Condé Nast Traveler", note: "For the Gaoyou Road branch; publication date and current operation are not confirmed." }],
  SH024: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.co.uk/Restaurant_Review-g308272-d13236001-Reviews-RAC_Coffee-Shanghai.html", sourceName: "Tripadvisor", note: "For RAC at 322 Anfu Road, a candidate branch; listings differ on the building number and the original note does not identify a branch." }, { rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/rac-bar-57285498/", sourceName: "Trip.com", note: "For RAC Bar at 322 Anfu Road; listings differ on the building number and the original branch is unconfirmed." }],
  SH109: [{ rating: "Shanghai city bookstore guide", url: "https://english.shanghai.gov.cn/en-BookstoresLibraries/20250228/4868fd517ee54eebacc60a2f1edc4b78.html", sourceName: "Shanghai government", note: "For the Columbia Circle bookstore at 1262 West Yan’an Road; published 2025." }],
  SH180: [{ rating: "China Like a Local venue listing", url: "https://chinalikealocal.com/places/place_b1039933b939564890a1", sourceName: "China Like a Local", note: "Lists the new address at 600 Jiujiang Road and links to Dianping. The displayed reviews may include the venue’s previous location." }],
  SH001: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d1143615-Reviews-Former_French_Concession-Shanghai.html", sourceName: "Tripadvisor", note: "Visitor reviews of the wider former French Concession, not a specific street or walk." }, { rating: "Trip.com neighborhood guide", url: "https://www.trip.com/guide/attraction/french-concession-shanghai.html", sourceName: "Trip.com", note: "A guide to the wider historic area, with visitor impressions; it has no single fixed modern boundary." }],
  SH002: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d311595-Reviews-The_Bund_Wai_Tan-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews of the Bund waterfront as a whole." }, { rating: "Trip.com visitor reviews and posts", url: "https://www.trip.com/travel-guide/attraction/shanghai/the-bund-75611", sourceName: "Trip.com", note: "Visitor impressions of the Bund waterfront; not reviews of a particular stop." }],
  SH004: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d612138-Reviews-Changle_Road-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews of Changle Road as a whole; individual businesses may have moved or closed." }, { rating: "Trip.com visitor posts", url: "https://www.trip.com/moments/poi-changle-road-99841/", sourceName: "Trip.com", note: "Visitor posts and reviews about Changle Road; individual businesses may have changed." }],
  SH013: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d1018223-Reviews-Huaihai_Road_Commercial_Street-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews of the Huaihai Road commercial area, not a particular storefront." }, { rating: "Trip.com visitor posts", url: "https://us.trip.com/travel-guide/attraction/shanghai/huaihai-road-10524066/", sourceName: "Trip.com", note: "Visitor posts about Huaihai Road; the page also displays Tripadvisor reviews, so those counts overlap." }],
  SH014: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d324169-Reviews-Xintiandi-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews of the Xintiandi district as a whole." }, { rating: "Trip.com visitor reviews", url: "https://www.trip.com/travel-guide/attraction/shanghai/xintiandi-10524092/", sourceName: "Trip.com", note: "Reviews and posts about Xintiandi as an area; individual tenants may change." }],
  SH125: [{ rating: "Time Out record-store guide", url: "https://www.timeoutshanghai.com/features/Music-Music/105194/5-super-chill-venues-to-listen-to-vinyl-records-in-Shanghai.html", sourceName: "Time Out", note: "For The Melting Pot at 673 Yongjia Road; historical 2022 guide." }, { rating: "Reddit record-shop recommendation", url: "https://www.reddit.com/r/shanghai/comments/1k7l063/", sourceName: "Reddit", note: "A 2025 commenter recommends The Melting Pot at 673 Yongjia Road in a discussion about record shops." }],
  SH003: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.in/Attraction_Review-g308272-d1979457-Reviews-Suzhou_River-Shanghai.html", sourceName: "Tripadvisor", note: "For Suzhou Creek as a whole, not a specific section of the walk." }, { rating: "Trip.com visitor reviews", url: "https://us.trip.com/travel-guide/attraction/shanghai/suzhou-creek-10559160/", sourceName: "Trip.com", note: "Visitor reviews of Suzhou Creek generally, rather than a specific cruise." }],
  SH073: [{ rating: "Trip.com visitor reviews", url: "https://hk.trip.com/restaurant/china/shanghai/detail/100-century-avenue-bar-16953598/", sourceName: "Trip.com", note: "For 100 Century Avenue Bar at Park Hyatt Shanghai, a candidate; the original note does not identify which hotel bar." }, { rating: "Wanderlog review aggregator", url: "https://wanderlog.com/place/details/2612852/100-century-avenue-bar", sourceName: "Wanderlog", note: "For the same candidate bar; the page aggregates Google and Tripadvisor reviews. The intended bar is unconfirmed." }],
  SH092: [{ rating: "Trip.com visitor reviews and posts", url: "https://www.trip.com/moments/poi-ins-new-paradise-143174242/", sourceName: "Trip.com", note: "For the INS Land complex at 109 Yandang Road; reviews and posts cover the complex and its individual venues." }],
  SH069: [{ rating: "City News Service local recommendation", url: "https://www.citynewsservice.cn/articles/cns/lifestyle/a-brazilians-lifestyle-near-suzhou-creek-3k0qb3xn", sourceName: "City News Service", note: "For % Arabica at 1000 Trees, 600 Moganshan Road; the match to the original Suzhou Creek note is unconfirmed." }, { rating: "Trip.com visitor post", url: "https://www.trip.com/moments/theme/poi-tian-an-1000trees-84433135-restaurant-993134/", sourceName: "Trip.com", note: "A visitor post on the 1000 Trees page describes its % Arabica branch; the original match remains unconfirmed." }],
  SH017: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d311585-Reviews-Jing_an_Temple-Shanghai.html", sourceName: "Tripadvisor", note: "For Jing’an Temple at 1686 Nanjing West Road. Its opening-day listing conflicts with other sources; check before visiting." }],
  SH020: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d311583-Reviews-Fairmont_Peace_Hotel-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews cover the hotel as a whole, including its lobby and tours; lobby access for non-guests is not confirmed." }, { rating: "Condé Nast Traveler hotel review", url: "https://www.cntraveler.com/hotels/china/shanghai/fairmont-peace-hotel-shanghai", sourceName: "Condé Nast Traveler", note: "A hotel review describing the lobby and public spaces; ask staff about visitor access." }],
  SH103: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d1404100-Reviews-Hanglung_Plaza-Shanghai.html", sourceName: "Tripadvisor", note: "For Hanglung Plaza / Plaza 66 at 1266 Nanjing West Road." }],
  SH101: [{ rating: "Reddit shopping discussion", url: "https://www.reddit.com/r/shanghai/comments/1nebbeu/", sourceName: "Reddit", note: "A 2025 commenter recommends IAPM in a discussion of Shanghai malls; this is one person's opinion, not an aggregate rating." }],
  SH061: [{ rating: "Qunar neighborhood guide", url: "https://travelnews.qunar.com/ugc/shanghai-jufuchang-citywalk-shops", sourceName: "Qunar", note: "For Manual Espresso Bar at 15 Yanqing Road; describes drinks and window seating." }, { rating: "Architecture studio profile", url: "https://www.gooood.cn/manual-espresso-bar-shanghai-by-office-coastline.htm", sourceName: "gooood", note: "A 2021 design feature identifies the Yanqing Road café and its compact space; it is not a diner review." }],
  SH068: [{ rating: "Wanderlog visitor reviews", url: "https://wanderlog.com/place/details/6635659/arabica-shanghai-roastery", sourceName: "Wanderlog", note: "For the Rockbund roastery at 169 Yuanmingyuan Road; reviews are sourced from Google and the original branch remains unconfirmed." }, { rating: "Parts Unknown city guide", url: "https://explorepartsunknown.com/shanghai/the-perfect-day-in-shanghai/", sourceName: "Parts Unknown", note: "A historical guide to the same Rockbund roastery; the original branch remains unconfirmed." }],
  SH087: [{ rating: "SmartShanghai bar first impressions", url: "https://www.smartshanghai.com/articles/dining/on-the-wet-bar-poker-house-keep-it-quiet", sourceName: "SmartShanghai", note: "For Keep It Quiet in the Yongfoo Elite garden; historical 2017 first impressions." }, { rating: "Instituto Cervantes city guide", url: "https://shanghai.cervantes.es/imagenes/File/Guia_de_Shanghai_2025.pdf", sourceName: "Instituto Cervantes", note: "Spanish-language guide to Keep It Quiet at 200 Yongfu Road; check current access." }],
  SH077: [{ rating: "Peddlers bar guide", url: "https://www.peddlersgin.com/shanghai-bars", sourceName: "Peddlers Gin", note: "For Lucky Mart at 185 Fumin Road. Peddlers is a drinks producer, so its guide may reflect commercial relationships." }, { rating: "Resident's neighborhood guide", url: "https://www.citynewsservice.cn/articles/cns/city-news/variety-and-vitality-in-the-dynamic-neighborhood-of-julu-fumin-roads-dmjp80me", sourceName: "City News Service", note: "A 2023 neighborhood resident recommends Lucky Mart at 185 Fumin Road for a highball or beer after dinner." }],
  SH079: [{ rating: "Observer travel guide", url: "https://observer.com/list/shanghai-china-travel-guide-first-time-visitors/", sourceName: "Observer", note: "For Root Down at 145 Nanchang Road; published 2026." }, { rating: "The Vinyl Map listening-bar guide", url: "https://thevinylmap.com/record-stores/china/shanghai/root-down/", sourceName: "The Vinyl Map", note: "For Root Down at 145 Nanchang Road; the guide cites other publications and the bar's account." }],
  SH080: [{ rating: "Peddlers bar guide", url: "https://www.peddlersgin.com/shanghai-bars", sourceName: "Peddlers Gin", note: "For Bar Blanc at 542 Julu Road. Peddlers is a drinks producer, so its guide may reflect commercial relationships." }, { rating: "Local neighborhood recommendation", url: "https://www.meet-in-shanghai.net/en/guide/authentic-eateries-to-check-out-around-xinle-road-989492/", sourceName: "Meet in Shanghai", note: "A 2023 interview with Camden Hauge recommends Bar Blanc at 542 Julu Road." }],
  SH049: [{ rating: "SmartShanghai dining guide", url: "https://www.smartshanghai.com/articles/dining/the-list-where-hipsters-eat-and-drink", sourceName: "SmartShanghai", note: "For Juke on Dongping Road; historical April 2024 guide." }, { rating: "Sophie Serves Up restaurant review", url: "https://www.sophieservesup.com/articles/juke-the-neo-bistro-wine-bar-blissfully-tricking-your-senses/", sourceName: "Sophie Serves Up", note: "A 2022 review of Juke at 11 Dongping Road; the menu may have changed." }],
  SH172: [{ rating: "Condé Nast Traveler venue review", url: "https://www.cntraveler.com/bars/shanghai/cotton-club", sourceName: "Condé Nast Traveler", note: "Historical review of the club at 1416 Huaihai Middle Road; current operation is unconfirmed." }],
  SH015: [{ rating: "Trip.com visitor reviews", url: "https://ae.trip.com/travel-guide/attraction/shanghai/xiangyang-park-92126/", sourceName: "Trip.com", note: "For Xiangyang Park on Huaihai Middle Road." }, { rating: "Lonely Planet park profile", url: "https://www.lonelyplanet.com/points-of-interest/xiangyang-park/1570603", sourceName: "Lonely Planet", note: "For the park at 1008 Huaihai Middle Road." }],
  SH048: [{ rating: "Sophie Serves Up restaurant review", url: "https://www.sophieservesup.com/articles/babar-french-wine-bistro-ice-cream-on-donghu-lu/", sourceName: "Sophie Serves Up", note: "For Babar at 7 Donghu Road; historical 2024 review." }, { rating: "Time Out Donghu Road guide", url: "https://www.10100.com/article/148140898", sourceName: "Time Out Shanghai", note: "A historical guide to Babar at 7 Donghu Road; check current menu and hours." }, { rating: "French dining guide", url: "https://lepetitjournal.com/shanghai/a-voir-a-faire/manger-francais-shanghai-connaissez-vous-les-bonnes-adresses-397864", sourceName: "Le Petit Journal", note: "A French-language 2024 guide describes the Donghu Road bistro's wines by the glass and French-Chinese dishes." }],
  SH075: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d12656987-Reviews-Sober_Company-Shanghai.html", sourceName: "Tripadvisor", note: "Historical reviews of the former 99 Yandang Road location; the venue has since moved to 109 Yandang Road." }, { rating: "Shanghai city bar guide", url: "https://english.shanghai.gov.cn/en-BarsandPubs/20231229/829d0969bbc2464f9d8b252c9ea35a2d.html", sourceName: "Shanghai government", note: "A 2023 guide to Sober Company's spaces at 109 Yandang Road; check current offerings." }],
  SH041: [{ rating: "Trip.com visitor review", url: "https://www.trip.com/restaurant/china/shanghai/detail/yaya-s-pasta-bar-134166701/", sourceName: "Trip.com", note: "For Yaya’s Pasta Bar; one review was visible when checked in November 2026." }, { rating: "CNA restaurant guide", url: "https://cnaluxury.channelnewsasia.com/experiences/where-eat-drink-shanghai-2025-restaurant-bar-guide-260731", sourceName: "CNA", note: "For the pasta bar at 329 Tongren Road; published 2025." }],
  SH159: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d4052561-Reviews-VUE_Bar-Shanghai.html", sourceName: "Tripadvisor", note: "For VUE Bar at Hyatt on the Bund, 199 Huangpu Road." }],
  SH031: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d10835953-Reviews-Old_Jesse_Tianping_Road-Shanghai.html", sourceName: "Tripadvisor", note: "For Old Jesse at 41 Tianping Road; checked November 2026." }],
  SH174: [{ rating: "Michelin Guide restaurant profile", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/mercado-505", sourceName: "Michelin Guide", note: "For Mercado 505 at 505 Wulumuqi North Road, not Mercato on the Bund." }, { rating: "Time Out restaurant guide", url: "https://www.timeoutshanghai.com/features/Restaurants-Restaurants/89081/Shanghais-best-al-fresco-restaurants.html", sourceName: "Time Out", note: "Historical 2021 guide to Mercado 505; menu may have changed." }],
  SH162: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d8607064-Reviews-The_Pearl-Shanghai.html", sourceName: "Tripadvisor", note: "For The Pearl at 471 Zhapu Road; the reviews shown when checked were largely historical." }],
  SH165: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d11845033-Reviews-Coconut_Paradise_Fumin_Road-Shanghai.html", sourceName: "Tripadvisor", note: "For the former Fumin Road restaurant; reviews are historical and do not establish that it is open." }, { rating: "DiningCity venue listing", url: "https://www.diningcity.cn/zh-HK/shanghai/restaurant_coconut_paradise/map", sourceName: "DiningCity", note: "Lists the Fumin Road restaurant as closed; check current status before visiting." }],
  SH166: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d2630756-Reviews-Sichuan_Citizen-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews span the former Donghu Road restaurant and its later Wukang Road location; check the review date and address." }],
  SH175: [{ rating: "Time Out restaurant profile", url: "https://www.timeoutshanghai.com/venue/Restaurants-European-European/47750/Pierogi-Ladies.html", sourceName: "Time Out", note: "Historical 2017 review of the Jiaozhou Road restaurant; current status is uncertain." }],
  SH066: [{ rating: "Trip.com visitor reviews", url: "https://us.trip.com/restaurant/china/shanghai/detail/restaurant-131112402/", sourceName: "Trip.com", note: "For the Hong Kong Plaza candidate; the original branch is unspecified." }, { rating: "M Stand store design profile", url: "https://coconut-puma-aw4n.squarespace.com/portfolio-2-1/project-one-8wy69-lb3cl", sourceName: "Mu Shi", note: "A 2020–2021 design profile of M Stand at Hong Kong Plaza, 283 Middle Huaihai Road; the original branch is unspecified." }],
  SH063: [{ rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/restaurant-144548892/", sourceName: "Trip.com", note: "For Gathering at 263 Wuyuan Road; the coffee-and-records clue remains unconfirmed." }, { rating: "Le Petit Journal café guide", url: "https://lepetitjournal.com/shanghai/des-endroits-sympa-pour-travailler-shanghai-415679", sourceName: "Le Petit Journal", note: "French-language 2025 guide to the 263 Wuyuan Road candidate; the records clue remains unconfirmed." }],
  SH082: [{ rating: "Trip.com visitor reviews", url: "https://hk.trip.com/restaurant/china/shanghai/detail/restaurant-145748285/", sourceName: "Trip.com", note: "For the 421 Changle Road candidate; Michael’s intended branch is not confirmed." }, { rating: "Amap visitor review", url: "https://www.amap.com/place/B0IKPAUQX5", sourceName: "Amap", note: "For the same 421 Changle Road listing; the original branch remains uncertain." }],
  SH062: [{ rating: "Vogue Hong Kong coffee guide", url: "https://www.voguehk.com/en/article/art-lifestyle/city-guide-shanghai/", sourceName: "Vogue Hong Kong", note: "For the Fumin Road candidate; the original branch remains unconfirmed." }, { rating: "Reddit coffee discussion", url: "https://www.reddit.com/r/shanghai/comments/1cdpui9/specialty_coffee_places/", sourceName: "Reddit", note: "One 2024 commenter recommends the Fumin Road café's coffee but cautions about weekend crowds. The original branch remains unconfirmed." }],
  SH157: [{ rating: "Trip.com guest reviews", url: "https://www.trip.com/hotels/shanghai-hotel-detail-427622/howard-johnson-huaihai-hotel-shanghai/review.html", sourceName: "Trip.com", note: "For the candidate hotel at 1 Fenyang Road; its match to the original note is unconfirmed." }, { rating: "Expedia guest reviews", url: "https://www.expedia.com/Shanghai-Hotels-Howard-Johnson-Huaihai-Hotel-Shanghai.h1823677.Hotel-Information", sourceName: "Expedia", note: "For the same candidate hotel." }],
  SH052: [{ rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/lotus-eatery-33328862/", sourceName: "Trip.com", note: "For Lotus Eatery at 1112 Dingxi Road; its match to the original recommendation is unconfirmed." }, { rating: "Time Out restaurant review", url: "https://www.timeoutshanghai.com/venue/Restaurants__Cafes-Chinese-Yunnan/11912/Lotus-Eatery%2C-Dingxi-Lu.html", sourceName: "Time Out", note: "For the Dingxi Road candidate; historical 2013 review." }],
  SH016: [{ rating: "Trip.com visitor reviews", url: "https://www.trip.com/travel-guide/attraction/shanghai/fuxing-park-78448", sourceName: "Trip.com", note: "For Fuxing Park at 105 Yandang Road." }],
  SH086: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.co.uk/Attraction_Review-g308272-d7624688-Reviews-Heyday_VIntage_Jazz_Lounge-Shanghai.html", sourceName: "Tripadvisor", note: "For the jazz lounge at 50 Tai’an Road." }, { rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/heyday-jazz-bar-20538263/", sourceName: "Trip.com", note: "For 50 Tai’an Road; older reviews were hidden when checked." }, { rating: "Time Out jazz lounge review", url: "https://www.timeoutshanghai.com/venue/Bars_-Cocktail_bars-_Music-Live_Music_Venues/24650/Heyday.html", sourceName: "Time Out", note: "A historical review of Heyday at 50 Tai’an Road; check current performance schedules." }, { rating: "Resident's neighborhood guide", url: "https://www1.citynewsservice.cn/articles/cns/lifestyle/my-hood/a-neighborhood-of-heritage-villas-caf%C3%A9s-and-hidden-jazz-clubs-5nq5v58n", sourceName: "City News Service", note: "A September 2026 resident's recommendation describes the Tai’an Road jazz bar; check the current performance schedule." }],
  SH083: [{ rating: "Untappd visitor check-ins", url: "https://untappd.com/v/tap-that/10141266", sourceName: "Untappd", note: "The user-maintained listing gives 77 Xiangyang North Road and includes 2026 check-ins; a 2021 guide places Tap That near a different bar at No. 77, so confirm the exact address." }],
  SH035: [{ rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/fu-1039-11144643/", sourceName: "Trip.com", note: "For Fu 1039; confirm that it is the intended Fu restaurant." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d15556078-Reviews-Fu_1039-Shanghai.html", sourceName: "Tripadvisor", note: "For Fu 1039 at 1039 Yuyuan Road; the original guide digit remains unresolved." }],
  SH040: [{ rating: "Sophie Serves Up restaurant review", url: "https://www.sophieservesup.com/articles/yuan-you-tao-nostalgic-yet-contemporary-hunanese/", sourceName: "Sophie Serves Up", note: "For Yuan You Tao at 167 Xinle Road; 2023 review. The original name is unresolved." }],
  SH053: [{ rating: "Trip.com visitor reviews", url: "https://us.trip.com/restaurant/china/shanghai/detail/restaurant-24335113/", sourceName: "Trip.com", note: "For the 379 Xikang Road candidate; the match to the original recommendation is unconfirmed." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d3450529-Reviews-DongFang_YaKe_Xi-Shanghai.html", sourceName: "Tripadvisor", note: "For the same 379 Xikang Road candidate; only six reviews were listed when checked." }],
  SH054: [{ rating: "Nomfluence restaurant review", url: "https://rachelgouk.com/san-bai-bei-brings-shanghai-closer-to-ningbo/", sourceName: "Nomfluence", note: "For 56 Maoming South Road; the review is from 2023." }, { rating: "Food for Thought restaurant guide", url: "https://foodforthought.com.my/shanghai-city-guide-an-insiders-guide-to-chinas-most-cosmopolitan-city/", sourceName: "Food for Thought", note: "For the Maoming South Road restaurant." }],
  SH060: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.co.nz/Restaurant_Review-g308272-d14112691-Reviews-Ops_Cafe-Shanghai.html", sourceName: "Tripadvisor", note: "For No. 1, Lane 177 Taiyuan Road; only three reviews when checked in November 2026." }, { rating: "Coffee guide", url: "https://www.filternotes.com/shanghai/ops-cafe", sourceName: "Filter Notes", note: "An August 2026 guide to the Taiyuan Road café describes creative seasonal drinks and possible weekend queues; some quoted visitor reviews come from other platforms." }],
  SH067: [{ rating: "SmartShanghai Columbia Circle guide", url: "https://www.smartshanghai.com/articles/dining/this-is-whats-soft-open-down-at-columbia-circle", sourceName: "SmartShanghai", note: "For the Columbia Circle café; historical 2018 opening guide." }, { rating: "Visitor café profile", url: "https://teavanilla.com/49648.html", sourceName: "TeaVanilla", note: "Chinese-language visitor account of Seesaw at Columbia Circle; the article is historical, so check current details." }],
  SH022: [{ rating: "Tripadvisor restaurant listing", url: "https://www.tripadvisor.com.au/Restaurant_Review-g308272-d3631305-Reviews-The_Jazz_Bar-Shanghai.html", sourceName: "Tripadvisor · restaurant listing", note: "A separate Tripadvisor restaurant listing for The Jazz Bar at the Fairmont Peace Hotel; it may overlap with the attraction listing." }, { rating: "Difford’s Guide bar review", url: "https://www.diffordsguide.com/bars/O93LJ5/jazz-bar", sourceName: "Difford’s Guide", note: "For the Peace Hotel Jazz Bar; performance and drink details may have changed." }],
  SH025: [{ rating: "City News Service local recommendation", url: "https://www.citynewsservice.cn/articles/cns/shanghai-living/renowned-foodie-andrew-moo-tours-xuhui-restaurants-4m3x8z3m", sourceName: "City News Service", note: "Andrew Moo recommends the dumpling shop at 14 Yanqing Road; published 2023." }],
  SH055: [{ rating: "Shanghai food writer’s review", url: "https://note.com/h_l380/n/n53af00e34442?hl=en", sourceName: "Shanghai food guide", note: "For 1791 Huaihai Middle Road; published June 2024." }],
  SH096: [{ rating: "Central Studios art guide", url: "https://centralstudios.cn/wp-content/uploads/2025/12/CS-CITY-GUIDE_v3.2.pdf", sourceName: "Central Studios", note: "A 2025 Shanghai city guide features Museum of Art Pudong at 2777 Binjiang Avenue." }],
  SH098: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.co.uk/Attraction_Review-g308272-d33220059-Reviews-Fotografiska_Museum_Shanghai-Shanghai.html", sourceName: "Tripadvisor", note: "For Fotografiska at 127 Guangfu Road." }],
  SH160: [{ rating: "Trip.com visitor reviews", url: "https://my.trip.com/travel-guide/attraction/shanghai/shanghai-urban-planning-exhibition-hall-80555", sourceName: "Trip.com", note: "For the Shanghai Urban Planning Exhibition Hall at People's Square; verify current admission arrangements." }],
  SH028: [{ rating: "Trip.com visitor reviews", url: "https://us.trip.com/restaurant/china/shanghai/detail/polux-by-paul-pairet-57710339/", sourceName: "Trip.com", note: "For Polux at No. 5, Lane 181 Taicang Road." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d17306919-Reviews-Polux_by_Paul_Pairet-Shanghai.html", sourceName: "Tripadvisor", note: "For No. 5, Lane 181 Taicang Road; checked November 2026." }, { rating: "Time Out restaurant review", url: "https://www.timeoutshanghai.com/venue/Restaurants-Cafes/67517/Polux.html", sourceName: "Time Out", note: "A historical review of the Xintiandi bistro; menu items may have changed." }],
  SH034: [{ rating: "Michelin Guide restaurant profile", url: "https://guide.michelin.com/gb/en/shanghai-municipality/shanghai/restaurant/fu-1088", sourceName: "Michelin Guide", note: "For Fu 1088 at 375 Zhenning Road." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d969336-Reviews-Fu_1088-Shanghai.html", sourceName: "Tripadvisor", note: "For Fu 1088 at 375 Zhenning Road." }, { rating: "AFAR restaurant review", url: "https://www.afar.com/places/fu-1088-shanghai", sourceName: "AFAR", note: "For 375 Zhenning Road; the publication date and current menu are unconfirmed." }],
  SH038: [{ rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/bastard-135447973/", sourceName: "Trip.com", note: "For the Jiaozhou Road restaurant; checked November 2026." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d25426999-Reviews-Bastard-Shanghai.html", sourceName: "Tripadvisor", note: "For Room 102, Lane 319 Jiaozhou Road." }, { rating: "Jiaozhou Road dining guide", url: "https://www.citynewsservice.cn/articles/cns/shanghai-living/hai-guide/hangouts-the-now-fully-fleshed-out-alleys-of-jiaozhou-road-znxedbjm", sourceName: "City News Service", note: "A September 2026 neighborhood guide recommends Bastard for dinner. It describes an entrance at Lane 273, while the restaurant listing uses Lane 319; confirm directions." }],
  SH046: [{ rating: "Time Out wine-bar review", url: "https://www.timeoutshanghai.com/venue/Bars_-Wine_Bars/89964/Forage.html", sourceName: "Time Out", note: "For 141 Maoming South Road; historical 2021 review." }, { rating: "SmartShanghai dining guide", url: "https://www.smartshanghai.com/articles/dining/this-is-where-we-re-eating-and-drinking-for-september-2021-and-you-should-to", sourceName: "SmartShanghai", note: "A 2021 visit describes the Maoming South Road wine bar and seasonal dishes; the menu may have changed." }, { rating: "Ctrip restaurant listing", url: "https://gs.ctrip.com/html5/you/foods/Shanghai2/130148887.html", sourceName: "Ctrip", note: "Chinese-language listing and diner content for 141 Maoming South Road; check current details directly." }],
  SH047: [{ rating: "Time Out restaurant review", url: "https://www.timeoutshanghai.com/venue/Restaurants-European-French/88323/Blaz.html", sourceName: "Time Out", note: "For 20 Donghu Road; historical 2021 review." }, { rating: "SmartShanghai first impressions", url: "https://www.smartshanghai.com/articles/dining/on-the-radar-blaz-bistro", sourceName: "SmartShanghai", note: "A historical 2021 first look at the 20 Donghu Road bistro; menu and hours may have changed." }],
  SH056: [{ rating: "Michelin Guide restaurant profile", url: "https://guide.michelin.com/jp/en/shanghai-municipality/shanghai/restaurant/fu-he-hui", sourceName: "Michelin Guide", note: "For Fu He Hui at 1037 Yuyuan Road." }, { rating: "HappyCow visitor reviews", url: "https://www.happycow.net/reviews/fu-he-hui-shanghai-395995", sourceName: "HappyCow", note: "For 1037 Yuyuan Road; checked November 2026." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.co.uk/Restaurant_Review-g308272-d10232557-Reviews-Fu_He_Hui-Shanghai.html", sourceName: "Tripadvisor", note: "For 1037 Yuyuan Road; some reviews were collected in partnership with the restaurant." }, { rating: "Trip.com visitor reviews", url: "https://om.trip.com/restaurant/china/shanghai/detail/fu-he-hui-11190234/", sourceName: "Trip.com", note: "For Fu He Hui at 1037 Yuyuan Road." }],
  SH179: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d3393807-Reviews-Mercato_by_Jean_Georges-Shanghai.html", sourceName: "Tripadvisor", note: "For Mercato at Three on the Bund, not Mercado on Wulumuqi Road." }, { rating: "Time Out restaurant review", url: "https://www.timeoutshanghai.com/venue/Restaurants-European-Italian/7482/Mercato.html", sourceName: "Time Out", note: "For the Three on the Bund restaurant; historical 2012 review." }, { rating: "Michelin Guide restaurant profile", url: "https://guide.michelin.com/us/en/shanghai-municipality/shanghai/restaurant/mercato-506693", sourceName: "Michelin Guide", note: "For Mercato on the sixth floor of Three on the Bund; not Mercado 505." }],
  SH023: [{ rating: "Time Out café review", url: "https://www.timeoutshanghai.com/venue/Restaurants__Cafes-Cafes/28176/Egg.html", sourceName: "Time Out", note: "For 12 Xiangyang North Road; the review is historical (2015)." }, { rating: "HappyCow visitor reviews", url: "https://www.happycow.net/reviews/egg-shanghai-146880", sourceName: "HappyCow", note: "For the Xiangyang North Road café; check current dietary options directly." }],
  SH044: [{ rating: "SmartShanghai venue profile", url: "https://www.smartshanghai.com/venue/26194/cometa", sourceName: "SmartShanghai", note: "For 1405 South Suzhou Road." }, { rating: "Japanese-language diner review", url: "https://note.com/h_l380/n/nbaee547e5ee3", sourceName: "Shanghai dining notes", note: "A 2024 review of COMETA at 1405 South Suzhou Road; the menu may have changed." }],
  SH078: [{ rating: "The 50 Discovery bar profile", url: "https://www.the50.com/discovery/Establishments/China/Shanghai/Paal.html", sourceName: "The 50 Discovery", note: "For Paal at 94 Nanchang Road; current hours should be checked." }, { rating: "Trip.com visitor reviews", url: "https://hk.trip.com/restaurant/china/shanghai/detail/paal-136011640/", sourceName: "Trip.com", note: "For 94 Nanchang Road; only two reviews were shown when checked in November 2026." }, { rating: "Cocktail bar review", url: "https://www.sophieservesup.com/articles/cantonese-cuisine-inspired-cocktails-at-nanchang-lu-bar-paal/", sourceName: "Sophie Serves Up", note: "A 2023 review of Paal's Cantonese-inspired cocktails at 94 Nanchang Road; the drinks rotate." }],
  SH170: [{ rating: "SmartShanghai restaurant review", url: "https://www.smartshanghai.com/articles/dining/on-the-all-colca-duo", sourceName: "SmartShanghai", note: "Historical 2017 review of the Hengshan Road branch." }, { rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/colca-31482359/", sourceName: "Trip.com", note: "For Colca at 199 Hengshan Road." }, { rating: "Time Out restaurant review", url: "https://www.timeoutshanghai.com/venue/Restaurants-South_American-Peruvian/43206/Colca.html", sourceName: "Time Out", note: "Historical review of the Hengshan Road restaurant; menu items may have changed." }],
  SH164: [{ rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d2367319-Reviews-Xibo-Shanghai.html", sourceName: "Tripadvisor", note: "For Xibo at 83 Changshu Road; checked November 2026." }],
  SH176: [{ rating: "Trip.com visitor reviews", url: "https://us.trip.com/restaurant/china/shanghai/detail/alimentari-and-degusteria-57282252/", sourceName: "Trip.com", note: "For 343 Jiaozhou Road; checked November 2026." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.it/Restaurant_Review-g308272-d15220847-Reviews-Alimentari_Degusteria-Shanghai.html", sourceName: "Tripadvisor", note: "For 343 Jiaozhou Road; linked page is in Italian." }, { rating: "Shanghai food guide", url: "https://www.sophieservesup.com/articles/what-to-eat-and-drink-in-shanghai-the-ultimate-foodie-guide/", sourceName: "Sophie Serves Up", note: "A 2026-updated guide describes Alimentari's deli, café and wine-bar concept and lists the Jiaozhou Road branch." }],
  SH178: [{ rating: "Trip.com visitor reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/masala-art-488226/", sourceName: "Trip.com", note: "For the Dagu Road restaurant; the listing shows older reviews." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.co.uk/Restaurant_Review-g308272-d2190323-Reviews-Masala_Art-Shanghai.html", sourceName: "Tripadvisor", note: "For Masala Art at 397 Dagu Road; some reviews were collected in partnership with the restaurant." }],
  SH032: [{ rating: "4.5 / 5 · 67 Ctrip reviews", url: "https://gs.ctrip.com/html5/you/foods/Shanghai2/15301946.html", sourceName: "Ctrip", note: "For the 686 Xizang South Road location; checked November 10, 2026." }, { rating: "Korean noodle guide", url: "https://v.daum.net/v/20240106030142559", sourceName: "Daum", note: "Korean-language 2024 guide describes Yiguihe at 686 Xizang South Road; current details may differ." }],
  SH033: [{ rating: "Dingxi Road noodle-shop guide", url: "https://unlistedchina.com/shanghai/spot/huxi-old-longtang-noodles", sourceName: "Unlisted China", note: "For the 685 Dingxi Road candidate; its match to Michael’s original recommendation is unconfirmed." }, { rating: "Trip.com visitor post", url: "https://www.trip.com/moments/detail/shanghai-2-124183866/", sourceName: "Trip.com", note: "The 2024 post names 685 Dingxi Road but is grouped under a different branch; the original recommendation remains unconfirmed." }, { rating: "Local noodle-shop review", url: "https://myshanghaiguide.com/huxi-old-alley-noodles-shanghai/", sourceName: "My Shanghai Guide", note: "The writer visited the Dingxi Road location, though the article's photos are from another branch. Your original branch remains unconfirmed." }, { rating: "Google-sourced visitor reviews", url: "https://wanderlog.com/place/details/5949922/lao-long-tang", sourceName: "Wanderlog", note: "Google reviews shown by Wanderlog for 685 Dingxi Road; the original recommendation's branch remains unconfirmed." }],
  SH057: [{ rating: "Tabelog diner reviews", url: "https://tabelog.com/china/A5102/A510211/51004297/dtlrvwlst/", sourceName: "Tabelog", note: "Japanese-language diner reviews for Obscura at 538 Xikang Road; the original recommendation’s identity remains unresolved." }],
  SH071: [{ rating: "Michelin Guide restaurant profile", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/sir-elly-s", sourceName: "Michelin Guide", note: "This covers the restaurant; Michael’s intended bar or terrace is unconfirmed." }, { rating: "Rooftop bar guide", url: "https://www.therooftopguide.com/rooftop-bars-in-shanghai/sir-ellys-restaurant-at-the-peninsula.html", sourceName: "The Rooftop Guide", note: "A September 2026 guide to the 14th-floor terrace; the original note may refer to the restaurant instead." }],
  SH036: [{ rating: "Michelin Guide restaurant profile", url: "https://guide.michelin.com/us/en/shanghai-municipality/shanghai/restaurant/qiao-ai-lai-lai-xiao-long-huangpu", sourceName: "Michelin Guide", note: "For the 506 Tianjin Road candidate; its match to the original recommendation is unconfirmed." }],
  SH173: [{ rating: "4.6 / 5 · 189 Trip.com reviews", url: "https://www.trip.com/restaurant/china/shanghai/detail/boomboombagels-22782036/", sourceName: "Trip.com", note: "For 39 Anfu Road; most visible reviews are older, so current hours and operation remain unconfirmed. Checked November 10, 2026." }, { rating: "Sugared & Spiced diner review", url: "https://www.sugarednspiced.com/shanghai-boom-boom-bagels-sumerian-cafe/", sourceName: "Sugared & Spiced", note: "A historical 2016 visit to 39 Anfu Road; current operation and menu are unconfirmed." }],
  SH168: [{ rating: "4.8 / 5 · 9 Trip.com reviews", url: "https://us.trip.com/restaurant/china/shanghai/detail/o-mills-sourdough-bakeryandbistro-52336183/", sourceName: "Trip.com", note: "For the 110 Yongjia Road branch; visible reviews are older. Checked November 10, 2026." }, { rating: "Tripadvisor visitor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d15757824-Reviews-O_mills_Sourdough_Bakery_bistro-Shanghai.html", sourceName: "Tripadvisor", note: "For 110 Yongjia Road; checked November 2026." }, { rating: "Shanghai food guide", url: "https://www.sophieservesup.com/articles/what-to-eat-and-drink-in-shanghai-the-ultimate-foodie-guide/", sourceName: "Sophie Serves Up", note: "An independent guide describes the Yongjia Road O’Mills and its sourdough and brunch focus." }],
  SH059: [{ rating: "4.0 / 5 · 41 Tripadvisor reviews", url: "https://www.tripadvisor.com/Restaurant_Review-g308272-d13214166-Reviews-Canton_Table-Shanghai.html", sourceName: "Tripadvisor", note: "For Canton Table at Three on the Bund." }],
  SH094: [{ rating: "4.2 / 5 · 142 Tripadvisor reviews", url: "https://www.tripadvisor.com/Attraction_Review-g308272-d3610717-Reviews-Power_Station_of_Art-Shanghai.html", sourceName: "Tripadvisor", note: "The indexed count may be out of date." }],
  SH158: [{ rating: "4.8 / 5 · 1,237 Tripadvisor reviews", url: "https://www.tripadvisor.com/Hotel_Review-g308272-d14140998-Reviews-The_Shanghai_EDITION-Shanghai.html", sourceName: "Tripadvisor", note: "Reviews of the hotel at 199 Nanjing Road East." }],
};

// Editorial suggestions are separate from Michael's own notes. Menus and practical details can change.
const GUIDE_TIPS = {
  SH085: { know: [{ text: 'A Reddit commenter recommended Wugong Palace of Sound in August 2026, describing vinyl and cocktails inspired by Asian street food. The match to your “Wugong” note and the venue’s current status still need confirmation.', source: 'Reddit · Shanghai discussion, August 2026', url: 'https://www.reddit.com/r/shanghai/comments/1vv731m/bar_bar_hopping_speakeasys/' }] },
  SH100: { know: [{ text: 'HAI550 is a possible match for the unnamed mall opposite TX Huaihai: a 2024 report describes the two as facing neighbors. The original note does not give a name, so this remains a candidate rather than a confirmed identification.', source: 'Sina Finance · August 2024', url: 'https://finance.sina.com.cn/cj/2024-08-22/doc-incknxxc8473256.shtml' }] },
  SH127: { know: [{ text: 'JNBY’s store finder lists several locations, including a store at Jinqiao International in Pudong. Your note does not specify a branch, so use the finder to choose one and confirm its details before visiting.', source: 'JNBY · official store finder', url: 'https://cn.jnby.com/s/store/2' }] },
  SH121: { know: [{ text: 'Looking for another An Ko Rau? A September 2025 Xujiahui shopping district post announced a store on level 5 of Grand Gateway 66. Your note does not identify which other branch you meant, so check its current status before going.', source: 'Xujiahui shopping district · September 2025', url: 'https://www.weibo.com/2747640384/Q5L9g56YO?mod=weibotime' }] },
  SH133: { know: [{ text: 'MAIA ACTIVE announced a renewed Jing’an Kerry Centre store in September 2025. Your note does not specify a branch, so confirm whether this is the one you meant and check its current hours.', source: 'MAIA ACTIVE · September 2025', url: 'https://www.weibo.com/5881658973/Q4cPffUJG' }] },
  SH110: { know: [{ text: 'FLY is one possible match for the “OG skate shop” note: a 2024 skate event was held at its 704 Changle Road shop. The name in your note is not confirmed, and its current location and opening status need checking.', source: 'KickerClub · September 2024', url: 'https://www.kickerclub.com/2024/09/sep-28th-adidas-three-stripe-skate-hype-shanghai/' }] },
  SH065: { know: [{ text: 'Bring a reusable cup: Manner says it gives customers ¥5 off coffee when they bring a non-disposable cup. Confirm the current offer at the branch; your original note does not specify a location.', source: 'Manner Coffee · official site', url: 'https://www.wearemanner.com/' }] },
  SH066: { know: [{ text: 'One possible branch is M Stand at Hong Kong Plaza, where Trip.com visitors mention bright windows and outdoor seating. Your original note does not specify a branch.', source: 'Trip.com · Hong Kong Plaza reviews', url: 'https://us.trip.com/restaurant/china/shanghai/detail/restaurant-131112402/' }] },
  SH063: { try: [{ text: 'If Gathering is the café you meant, a 2024 local feature describes its coffee and Chinese-inspired design at 263 Wuyuan Road.', source: 'Xuhui district · 2024', url: 'https://m.thepaper.cn/newsDetail_forward_27192327' }], know: [{ text: 'Gathering is a plausible Wuyuan Road match, but the original note mentions records and that detail has not been verified. Check before making a special trip.', source: 'Trip.com · Wuyuan Road listing', url: 'https://www.trip.com/restaurant/china/shanghai/detail/restaurant-144548892/' }] },
  SH074: { know: [{ text: 'A 2010 guide places a Long Bar in front of the Portman Ritz-Carlton at Shanghai Centre. This may explain your note, but its current status and whether it is the bar you meant are unconfirmed. The Waldorf Astoria’s Long Bar is a separate venue.', source: 'Asia Bars & Restaurants · 2010', url: 'https://www.asia-bars.com/2010/09/long-bar-bar-pub-at-shanghai-centre-shanghai/' }] },
  SH082: { try: [{ text: 'At the 421 Changle Road candidate, Trip.com visitors mention craft beer and mixed drinks. Ask the staff for a recommendation.', source: 'Trip.com · visitor reviews', url: 'https://hk.trip.com/restaurant/china/shanghai/detail/restaurant-145748285/' }], know: [{ text: 'The original note does not identify a street number. There is a listing at 421 Changle Road, but it is not confirmed as your intended branch; the former 624 Changle storefront had a separate history.', source: 'Jiefang Daily · 2024', url: 'https://www.jfdaily.com/wx/detail.do?id=775101' }] },
  SH108: { know: [{ text: 'Jing’an district included Snow Peak at Zhang Yuan in a January 2026 promotion. Your original note does not identify the branch, so this is another candidate to check, not a confirmed match.', source: 'Jing’an district · January 2026', url: 'https://english.jingan.gov.cn/xw/002001/20260128/6052815d-f874-4092-b7e3-0b5394c25ccc.html' }] },
  SH051: { try: [{ text: 'If Shardaa is the place you meant, Time Out highlights Tibetan milk tea and handmade goods at Columbia Circle.', source: 'Time Out Shanghai · 2024', url: 'https://www.10100.com/article/148140883' }], know: [{ text: 'Shardaa is a possible match for the original “Shudao/Shark” note, not a confirmed identification. Sources differ on its unit, so check before going.', source: 'Design Anthology · Columbia Circle', url: 'https://design-anthology.com/story/columbia-circle-shanghai' }] },
  SH070: { know: [{ text: 'A 2026 visitor listing places a BASAO tea space at 28 Hong Kong Road in Rockbund. Your entry does not specify a branch; confirm whether this is the one you meant.', source: 'Trip.com · visitor post', url: 'https://hk.trip.com/moments/detail/shanghai-2-148115843' }] },
  SH138: { know: [{ text: 'The brand’s May 2026 event post places its Yongyuan Road shop at Room 106, Building B, No. 9, Lane 2. Your original branch is unspecified, so confirm it is the one you intended.', source: 'Randomevent · May 2026', url: 'https://www.sina.cn/news/detail/5298550737211754.html' }] },
  SH139: { try: [{ text: 'Time Out recommends the mahjong-tile earrings as a playful gift; check availability before making a special trip.', source: 'Time Out Shanghai · 2024', url: 'https://www.10100.com/article/148141399' }], know: [{ text: 'A 2024 local guide describes two Lady Fafa shops near Julu Road, including one at No. 550. Your original entry does not specify which; check current locations.', source: 'Time Out Shanghai · 2024', url: 'https://www.10100.com/article/148141399' }] },
  SH141: { know: [{ text: 'SmartShanghai’s 2019 bike-shop guide describes 2Wheels at 536-2 Julu Road offering custom bikes and repairs. This is a historical candidate; check that it is still operating.', source: 'SmartShanghai · 2019', url: 'https://www.smartshanghai.com/articles/sportrecreation/collection-nice-bike-shops' }] },
  SH149: { know: [{ text: 'Time Out listed multiple Flower Fingers salons, including 930 Changle Road. Your note does not specify a branch, and this listing is from 2017; confirm before booking.', source: 'Time Out · March 2017', url: 'https://www.timeoutshanghai.com/venue/Health-Beauty_Salons/42335/Flower-Fingers%2C-Changle-Lu.html' }] },
  SH155: { know: [{ text: 'A 2018 directory listed Helen Nail Spa at No. 6, Lane 819 Julu Road. Treat this as a historical candidate and verify current operation before booking.', source: 'That’s Shanghai · June 2018 directory', url: 'https://www.thatsmags.com/uploads/pdf/1806sh.pdf' }] },
  SH116: { know: [{ text: 'Time Out’s 2017 guide listed Feiyue sneakers at Culture Matters, 206 Wulumuqi Middle Road. Your original branch is unspecified and current stock is unconfirmed.', source: 'Time Out · August 2017', url: 'https://www.timeoutshanghai.com/venue/Shops__Services-Shoes/47022/Culture-Matters%2C-Wulumuqi-Lu.html' }] },
  SH117: { know: [{ text: 'An older Time Out listing describes Culture Matters at 206 Wulumuqi Middle Road selling Feiyue and Warrior sneakers. Confirm that this is your intended shop and that it is still open.', source: 'Time Out · August 2017', url: 'https://www.timeoutshanghai.com/venue/Shops__Services-Shoes/47022/Culture-Matters%2C-Wulumuqi-Lu.html' }] },
  SH126: { know: [{ text: 'A historical Grazia feature places Short Sentence at 290 Anfu Road. Your original entry did not specify a branch, so confirm the location and hours before visiting.', source: 'Grazia China · store opening feature', url: 'https://www.chinagrazia.com/article/160011.html' }] },
  SH120: { know: [{ text: 'Monocle’s 2026 guide lists An Ko Rau among the shops at Columbia Circle. Check the current unit and opening hours before going.', source: 'Monocle · April 2026', url: 'https://monocle.com/fashion/where-to-shop-in-shanghai-15-retailers-for-fashion-furniture-and-more/' }] },
  SH177: { try: [{ text: 'A 2024 visitor photographed braised pork belly at Laojishi and listed this Shimen Road address. Check the current menu and operation before visiting.', source: 'Jackie’s Life · November 2024', url: 'https://www.jackieslife.com/travel/2024/11/trip-to-shanghai-and-hong-kong-november-2024' }] },
  SH166: { try: [{ text: 'An older guide recommends gong bao chicken at Sichuan Citizen on Donghu Road. The branch’s current operation is unconfirmed, so check before visiting.', source: 'eChinacities · historical listing', url: 'https://listings.echinacities.com/shanghai/detail/13754-Sichuan-Citizen' }] },
  SH122: { know: [{ text: 'A stockist lists klee klee at 308 Anfu Road and other Shanghai locations. Your original entry does not name a branch; check the one you intended.', source: 'naze naze · stockists', url: 'https://nazenaze.cn/pages/naze-nazes-stocklis' }] },
  SH128: { know: [{ text: 'A stockist lists ZUCZUG locations at Jing’an Kerry Centre and Taikoo Li Qiantan. Your original entry has no confirmed branch; check which one you intended.', source: 'naze naze · stockists', url: 'https://nazenaze.cn/pages/naze-nazes-stocklis' }] },
  SH130: { know: [{ text: 'Comme Moi lists multiple Shanghai boutiques, including its Donghu flagship at 169 Xinle Road. Your original entry does not specify a branch.', source: 'Comme Moi · store directory', url: 'https://commemoi.com/zh/pages/store' }] },
  SH131: { know: [{ text: 'The designer’s stockist list includes Shanghai retailers such as Labelhood. Your entry does not identify a particular shop, so confirm current stock before going.', source: 'Feng Chen Wang · stockists', url: 'https://fengchenwang.com/en-us/pages/stockist' }] },
  SH134: { know: [{ text: 'A city guide lists Doe Coffee at 78 Tongren Road, but your entry does not specify a DOE branch. Confirm whether this is the location you meant.', source: 'Shanghai government · April 2026', url: 'https://english.shanghai.gov.cn/en-CityTour/20260422/96ab8f6a0b514094896a188143f4ab77.html' }] },
  SH064: { know: [{ text: 'A local chef recommends Dufour at 243-7 Wulumuqi Middle Road for a coffee and street-side people-watching; check current hours.', source: 'City News Service · 2023', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/brazilian-chef-recommends-regular-hang-out-venues-pk8rq3jm' }] },
  SH107: { know: [{ text: 'A 2021 design guide described an in the PARK shop at 98 Yanping Road with clothing, books and records. This is a historical candidate; confirm the shop and exact unit before going.', source: 'Superfuture · August 2021', url: 'https://superfuture.com/2021/08/new-shops/shanghai-in-the-park-store-opening-2/' }] },
  SH069: { try: [{ text: 'A local recommended a double espresso at the % Arabica in 1000 Trees. This is the candidate for your Suzhou Creek entry; confirm your intended branch.', source: 'Meet in Shanghai · neighborhood guide', url: 'https://www.meet-in-shanghai.net/en/guide/a-brazilians-lifestyle-near-suzhou-creek-477602/' }] },
  SH093: { try: [{ text: 'A 2025 Hypebeast guide suggests ordering a bowl of ramen while singing at the SML Center branch. Check the current menu and confirm this is the branch you meant.', source: 'Hypebeast · September 2025', url: 'https://hypebeast.com/2025/9/camper-karst-2-tom-bray-shanghai-city-guides-video' }], know: [{ text: 'The city’s 2026 nightlife guide lists Chun K at 3/F, Sun Moon Light Center, 618 Xujiahui Road. This branch is a candidate; check availability and room options.', source: 'Shanghai government · August 2026', url: 'https://english.shanghai.gov.cn/en-PlanANightOut/20260812/58604fc6e69e482785151ee6cb203e83.html' }] },
  SH156: { know: [{ text: 'Okura says its hotel incorporates the former French Club and a large garden. This is a candidate for your original hotel note; confirm it is the one you meant.', source: 'Okura · hotel profile', url: 'https://okura.com/china/shanghai/okura-garden-hotel-shanghai/' }] },
  SH102: { know: [{ text: 'A 2026 local guide describes Réel as a designer-shopping stop and points out Salvador Dalí’s melting-clock sculpture at the entrance.', source: 'The Paper · 2026', url: 'https://www.thepaper.cn/newsDetail_forward_32965426' }] },
  SH104: { know: [{ text: 'Jing’an Kerry Centre at 1515 West Nanjing Road is a candidate for your original Kerry Centre entry. It combines shopping, dining and an outdoor plaza near Jing’an Temple.', source: 'Landezine · project profile', url: 'https://landezine-award.com/jing-an-kerry-center/' }] },
  SH129: { know: [{ text: 'Jing Daily reports a Samuel Guì Yang flagship opened at 508 Julu Road in October 2026. Your original entry did not specify a branch, so confirm this is the one you meant.', source: 'Jing Daily · October 2026', url: 'https://jingdaily.com/intels/2026-10/14/samuel-gui-yang-opens-1st-flagship-in-shanghai' }] },
  SH143: { know: [{ text: 'AENTOS lists a shop in Xintiandi Style II at 245 Madang Road. This is a candidate for your entry; confirm the intended branch.', source: 'AENTOS · store directory', url: 'https://www.aentoshome.com/pages/our-retail-stores' }] },
  SH144: { try: [{ text: 'At the Yuyuan Road candidate, Time Out suggested a pourover coffee with Oreo cheese pound cake in 2023; check whether the café and menu are current.', source: 'Time Out · 2023', url: 'https://www.timeoutshanghai.com/features/Restaurants-Restaurants/105484/7-caf%C3%A9s-offering-more-than-coffee-From-candles-to-clean-laundry.html' }], know: [{ text: 'Time Out described a café and gift shop at Lane 1088 Yuyuan Road, with pourover coffee and curated home goods. This is an older candidate listing; check current operation.', source: 'Time Out · 2023', url: 'https://www.timeoutshanghai.com/features/Restaurants-Restaurants/105484/7-caf%C3%A9s-offering-more-than-coffee-From-candles-to-clean-laundry.html' }] },
  SH062: { try: [{ text: 'For the Fumin Road candidate, Vogue highlights Italian-style coffees and beans to take home.', source: 'Vogue Hong Kong · 2025', url: 'https://www.voguehk.com/en/article/art-lifestyle/city-guide-shanghai/' }], know: [{ text: 'SLAB TOWN has multiple Shanghai locations; No. 1, Lane 210 Fumin Road is a candidate for your original entry.', source: 'FindKizashi · October 2026', url: 'https://findkizashi.com/go/slab-town-coffee/' }] },
  SH153: { know: [{ text: 'A historical listing places Yu Massage at 2/F, 218 Xinle Road. This is a candidate match; check current operation and the intended branch before booking.', source: '247 Tickets · venue listing', url: 'https://www.247tickets.com/t/aroma-oil-massage-yu-massage-xinle-rd' }, { text: 'A visitor suggests booking ahead for weekends; another mentions booking through the WeChat mini program or by phone. These are individual experiences, so confirm availability directly.', source: 'Tripadvisor · 2024–2025 visitor reviews', url: 'https://www.tripadvisor.com/Attraction_Review-g308272-d12268192-Reviews-Yu_Massage_Xinle_Road-Shanghai.html' }] },
  SH154: { know: [{ text: 'Dragonfly lists massage, nail and facial services at its Xinle Road retreat. Confirm current appointments and that this is the branch you intended.', source: 'Dragonfly · Xinle Retreat', url: 'https://dragonfly.net.cn/en/relaxing-dragonfly-retreats/relax-in-shanghai/item/xinle-retreat' }] },
  SH157: { know: [{ text: 'Howard Johnson at 1 Fenyang Road is a candidate for your original hotel note. Recent Trip.com guests mention its location near Huaihai Road and iapm; confirm the hotel match before booking.', source: 'Trip.com · guest reviews', url: 'https://www.trip.com/hotels/shanghai-hotel-detail-427622/howard-johnson-huaihai-hotel-shanghai/review.html' }] },
  SH132: { know: [{ text: 'SHANG XIA lists its Maison at 233 Middle Huaihai Road; this is a candidate because your original entry did not name a branch.', source: 'SHANG XIA · store directory', url: 'https://www.shangxia.com/en/pages/store' }] },
  SH142: { try: [{ text: 'If this is the shop you meant, a local recommends its candles and hand cream as gifts; check availability before visiting.', source: 'Shanghai travel guide · neighborhood interview', url: 'https://www.meet-in-shanghai.net/en/guide/a-neighborhood-of-unique-eateries-and-coffee-shops-within-easy-walking-distance-300878/' }], know: [{ text: 'A neighborhood guide recommends Eu Noia as a gift and lifestyle shop at No. 3, Lane 212 Wuyuan Road. Confirm that this is your intended shop.', source: 'City News Service · 2023', url: 'https://www.citynewsservice.cn/articles/cns/shanghai-living/a-mix-of-super-local-and-international-vibes-in-xuhui-district-3k0ed50n' }] },
  SH145: { try: [{ text: 'For small gifts, a shopping guide highlights Tagi’s bag charms, pouches and everyday home accessories; check availability at the Wulumuqi Road candidate.', source: 'trisAino · shopping guide', url: 'https://trisaino.com/guide/shopping-gifts' }], know: [{ text: 'Tagi lists a store at 247-5 Wulumuqi Middle Road. This is the candidate for your original entry; check the branch and current opening details.', source: 'Tagi · store page', url: 'https://tagiofficial.com/pages/tagi' }] },
  SH071: { know: [{ text: 'The Peninsula lists Sir Elly’s Terrace at 32 Zhongshan Dong Yi Road. Your original note may refer to the restaurant or terrace, so check which is open and book the intended space.', source: 'The Peninsula Shanghai · terrace', url: 'https://www.peninsula.com/en/shanghai/hotel-fine-dining/sir-ellys-terrace-rooftop-bar' }, { text: 'For the terrace bar, the hotel suggests smart casual dress and says minors are not admitted. Confirm the policy when booking.', source: 'The Peninsula Shanghai · terrace bar', url: 'https://www.peninsula.com.cn/en/shanghai/hotel-fine-dining/sir-ellys-terrace' }] },
  SH073: { know: [{ text: 'Park Hyatt lists the 100 Century Avenue Bar on level 91, with cocktails and city views. Check which hotel bar you intended and its current access.', source: 'Park Hyatt Shanghai · dining', url: 'https://www.hyatt.com/park-hyatt/en-US/shaph-park-hyatt-shanghai/dining' }] },
  SH092: { know: [{ text: 'INS is a multi-floor nightlife complex at Fuxing Park, with bars, clubs, karaoke and restaurants. Check the lineup and entry arrangements for the specific venue.', source: 'SmartShanghai · May 2026', url: 'https://www.smartshanghai.com/venue/28727/smshwxmpqr.jpeg?share=true' }] },
  SH095: { know: [{ text: 'The West Bund museum at 3398 Longteng Avenue is a candidate because your original Long Museum branch is unspecified. Look for the preserved industrial coal-hopper structure.', source: 'West Bund · museum profile', url: 'https://www.westbund.com/en/index/KEY-PROJECTS/detail_aa8Ec.html' }] },
  SH020: { know: [{ text: 'Look up at the Art Deco lobby’s domed rotunda. Visitor access can change, so check with hotel staff.', source: 'City News Service · hotel history', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/peace-hotels-unique-green-color-was-due-to-oxidation-7kr9xzdk' }] },
  SH026: { know: [{ text: 'A 2024 city guide listed Godly at 303 Wuyuan Road, but a 2026 visitor reported uncertainty about what now operates there. Confirm the venue and dietary options before going.', source: 'Shanghai government · May 2024', url: 'https://english.shanghai.gov.cn/en-TimeHonored-travelinshanghai/20240529/c72a8144738d43e2a9bc3aaf3f0352d4.html' }, { text: 'The later visitor report casts doubt on the current restaurant at this address.', source: 'Reddit · 2026 visitor report', url: 'https://www.reddit.com/r/travelchina/comments/1sgafgv/help_me_verify_these_vegan_restaurants_are_still/' }] },
  SH159: { know: [{ text: 'A 2026 guide reports that VUE reopened after the hotel closure, with skyline views from the terrace. Check current opening and any entry fee with the hotel.', source: 'Holiplo · checked November 2026', url: 'https://holiplo.com/en/shanghai/p/vue-bar' }] },
  SH033: { try: [{ text: 'The city’s food guide recommends scallion-oil noodles with dried shrimp at the 685 Dingxi Road candidate.', source: 'Shanghai government · April 2026', url: 'https://english.shanghai.gov.cn/en-GlobalTasteinShanghai2026-LocalFlavors/20260424/5996b2b3de77425f9166f59f2f30833c.html' }], know: [{ text: 'The Dingxi Road shop is a candidate match for your original recommendation; confirm the branch before making a special trip.', source: 'Shanghai government · April 2026', url: 'https://english.shanghai.gov.cn/en-GlobalTasteinShanghai2026-LocalFlavors/20260424/5996b2b3de77425f9166f59f2f30833c.html' }, { text: 'A local reviewer suggests stirring the noodles thoroughly to mix in the sauce at the bottom of the bowl.', source: 'My Shanghai Guide · 2026', url: 'https://myshanghaiguide.com/huxi-old-alley-noodles-shanghai/' }] },
  SH052: { try: [{ text: 'If the Dingxi Road Lotus Eatery is the one you meant, a local recommends pan-fried goat cheese, Yunnan mushrooms and crispy kidney beans.', source: 'City News Service · neighborhood guide', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/shanghais-columbia-circle-a-neighborhood-where-culture-meets-creativity-okwv6rln' }], know: [{ text: 'The restaurant at 1112 Dingxi Road is a candidate branch; the original recommendation does not specify a location.', source: 'Trip.com · Dingxi Road listing', url: 'https://www.trip.com/restaurant/china/shanghai/detail/lotus-eatery-33328862/' }] },
  SH178: { try: [{ text: 'A Shanghai dining guide recommends cheese naan and lamb curry at the 397 Dagu Road restaurant; menus can change.', source: 'Top China Travel · restaurant guide', url: 'https://www.topchinatravel.com/india-to-china/best-indian-restaurants-in-shanghai.htm' }] },
  SH001: { know: [{ text: 'Start around Wukang Mansion and Anfu Road for historic streets, cafés and local shops; Shanghai’s city-walk guide connects them on foot.', source: 'Shanghai city guide · 2025', url: 'https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20251124/9f1658ae899240d19c52784bddfed782.html' }] },
  SH002: { know: [{ text: 'Walk the riverside promenade for Pudong views, then turn around for the historic buildings on the Bund side.', source: 'Shanghai government · 2025', url: 'https://english.shanghai.gov.cn/en-ScenicSpots/20231205/584672cc6d044eabb5f7f6fc9049a19f.html' }] },
  SH003: { know: [{ text: 'Follow the creek past historic warehouses and the Sihang Warehouse Memorial; the city guide suggests a route through this stretch.', source: 'Shanghai city-walk guide · 2023', url: 'https://english.shanghai.gov.cn/en-Citywalk/20231210/c2f1f23dc67c4b47bb7ab9afff1a6ebe.html' }] },
  SH004: { know: [{ text: 'Explore Changle together with Fumin and Julu roads: the city’s guide highlights independent designers and vintage boutiques along this walking area.', source: 'Shanghai government · March 2024', url: 'https://english.shanghai.gov.cn/en-TrendyStores/20240313/95a2c50df38b4b148f0ddbb6ae16490f.html' }] },
  SH005: { try: [{ text: 'For an evening walk, a 2024 city guide highlights the cocktails at J. Boroski and Papaya Bar on Fumin Road. Check current opening details first.', source: 'Shanghai government · May 2024', url: 'https://english.shanghai.gov.cn/en-Nightlife/20240529/0f25993ed4ad4648a95d8398c884a6a5.html' }], know: [{ text: 'Fumin is part of the Ju-Fu-Chang shopping triangle with Julu and Changle roads, a good area to explore on foot.', source: 'Jing’an district government · 2023', url: 'https://www.jingan.gov.cn/rmtzx/003008/003008004/20230424/151bb41b-585c-431d-894c-9508c945d6e9.html' }] },
  SH006: { try: [{ text: 'For a pastry stop, a local resident recommended the morning pastries at Crave, 208 Xinle Road, in 2025. Check current opening details first.', source: 'City News Service · October 2025', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/my-hood/pm9eq3jk' }], know: [{ text: 'Shanghai’s official walking route links Xinle Road with Donghu Road, Huaihai Road and Changshu Road.', source: 'Shanghai government · city-walk routes', url: 'https://english.shanghai.gov.cn/en-240-hourtransfer-stayinShanghai/20240104/d25575598d6444e49dc75f7a23b985d2.html' }] },
  SH007: { try: [{ text: 'For coffee, a local resident recommended Manual at 15 Yanqing Road in 2025. Check current opening details before going.', source: 'City News Service · October 2025', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/my-hood/pm9eq3jk' }], know: [{ text: 'Look for the green apartment building at No. 2, featured in the film B for Busy, and explore the little street on foot.', source: 'Shanghai government · June 2025', url: 'https://english.shanghai.gov.cn/en-TrendyStores/20250624/9d2d5eeee2784a61ac9e9035aafcfc2b.html' }] },
  SH008: { try: [{ text: 'Near Yanqing Road, a local resident recommended Cheers Burger at 185 Changshu Road in 2025, including its vegetarian options. Check current opening details first.', source: 'City News Service · October 2025', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/my-hood/pm9eq3jk' }], know: [{ text: 'For a longer wander, Shanghai’s official route links Changshu Road with Huaihai Road and Wukang Road.', source: 'Shanghai government · city-walk routes', url: 'https://english.shanghai.gov.cn/en-240-hourtransfer-stayinShanghai/20240104/d25575598d6444e49dc75f7a23b985d2.html' }] },
  SH009: { know: [{ text: 'Wuyuan Road is part of a historic residential block between Anfu Road and Fuxing West Road; keep an eye out for older houses as you walk.', source: 'University of Strathclyde · historic-district research', url: 'https://strathprints.strath.ac.uk/80444/1/Li_ISUF_2021_Sharing_historical_districts_under_limitation_an_acupuncture_renewal.pdf' }] },
  SH010: { know: [{ text: 'The middle section connects with Wuyuan, Anfu and Changle roads and is known for its mix of older housing, small restaurants and shops.', source: 'Ohio State University · Wulumuqi Road guide', url: 'https://u.osu.edu/mclc/2022/12/09/wulumuqi-road/' }] },
  SH011: { know: [{ text: 'Combine Anfu Road with the Wukang Building and the tree-lined neighborhood; Shanghai’s guide suggests a walk linking the two.', source: 'Shanghai city guide · 2025', url: 'https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20251124/9f1658ae899240d19c52784bddfed782.html' }] },
  SH012: { know: [{ text: 'Look for Wukang Mansion and the historic houses along the road; many are residential, so enjoy them from the pavement unless public access is indicated.', source: 'Meet in Shanghai · Wukang walk', url: 'https://www.meet-in-shanghai.net/en/guide/roaming-and-savoring-the-leisurely-atmosphere-of-wukang-road-city-walk-974379/' }] },
  SH013: { know: [{ text: 'The stretch around South Shaanxi Road makes an easy shopping walk; a city guide highlights its mix of fashion, lifestyle shops and art.', source: 'Shanghai city guide · 2025', url: 'https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20251124/9f1658ae899240d19c52784bddfed782.html' }] },
  SH014: { know: [{ text: 'Explore the restored shikumen lanes around Taicang Road; the city guide describes their mix of historic architecture, shops and restaurants.', source: 'Shanghai government · Xintiandi guide', url: 'https://english.shanghai.gov.cn/en-SpecialtyShoppingAreas/20231207/521159f5af35430ab1641004f5c68d03.html' }] },
  SH015: { know: [{ text: 'Lonely Planet describes flowerbeds and shaded paths: a quieter break just off busy Huaihai Road.', source: 'Lonely Planet · checked November 2026', url: 'https://www.lonelyplanet.com/points-of-interest/xiangyang-park/1570603' }] },
  SH016: { know: [{ text: 'For a lively morning wander, a visitor guide mentions tai chi, dancing, choirs and chess in the park.', source: 'Petit Futé · Fuxing Park guide', url: 'https://www.petitfute.co.uk/v44012-shanghai/c1173-visites-points-d-interet/c971-parc-jardin/247039-parc-fuxing.html' }] },
  SH017: { know: [{ text: 'This is an active Buddhist temple. A visitor guide suggests checking festival arrangements and following the instructions posted at the entrance.', source: 'ChinaGoTrip · checked November 2026', url: 'https://chinagotrip.com/destinations/shanghai/attractions/jing-an-temple' }] },
  SH019: { know: [{ text: 'Look for the indigo textiles hanging in the courtyard: Atlas Obscura describes this as a small gallery and shop tucked down a lane.', source: 'Atlas Obscura · checked November 2026', url: 'https://www.atlasobscura.com/places/chinese-printed-blue-nankeen-exhibition-hall' }] },
  SH022: { know: [{ text: 'The hotel describes live performances by its Old Jazz Band; check the current lineup and seating arrangements before going.', source: 'Fairmont Peace Hotel · checked November 2026', url: 'https://www.fairmont.com/en/hotels/shanghai/fairmont-peace-hotel/dining/the-jazz-bar.bar.html' }] },
  SH024: { try: [{ text: 'A local interviewed by City News Service recommends the French crêpes with a glass of cider at the Anfu Road café.', source: 'City News Service · 2024', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/french-fashion-designers-go-to-spots-in-her-neighborhood-xm598rrn' }], know: [{ text: 'This is the candidate at 322 Anfu Road; confirm that it is the RAC you intended before making a special trip.', source: 'City News Service · 2024', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/french-fashion-designers-go-to-spots-in-her-neighborhood-xm598rrn' }] },
  SH025: { try: [{ text: 'The handmade dumplings at 14 Yanqing Road are recommended by Shanghai food writer Andrew Moo.', source: 'City News Service · 2023', url: 'https://www.citynewsservice.cn/articles/cns/shanghai-living/renowned-foodie-andrew-moo-tours-xuhui-restaurants-4m3x8z3m' }] },
  SH028: { try: [{ text: 'The Michelin Guide recommends the onion soup at Paul Pairet’s Xintiandi bistro.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/ca/en/shanghai-municipality/shanghai/restaurant/polux' }], know: [{ text: 'Michelin recommends reservations and lists a terrace; check availability directly.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/ca/en/shanghai-municipality/shanghai/restaurant/polux' }] },
  SH031: { try: [{ text: 'UnTour’s Shanghai guide recommends red-braised pork, scallion fish head, and crab-roe tofu at the Tianping Road restaurant.', source: 'UnTour Food Tours · 2020 guide', url: 'https://untourfoodtours.com/wp-content/uploads/2020/03/UnTour-Shanghai-Welcome-Guide-2020.pdf' }], know: [{ text: 'Sources disagree about reservations; call ahead to check the current policy and ask whether popular dishes need advance ordering.', source: 'That’s Shanghai · historical listing', url: 'https://fd.thatsmags.com/detail?id=6' }] },
  SH032: { try: [{ text: 'Nomfluence recommends the simple yangchun noodles and sesame-peanut cold noodles at this South Xizang Road shop.', source: 'Nomfluence · checked November 2026', url: 'https://rachelgouk.com/listings/yi-gui-he-noodle-shop/' }], know: [{ text: 'The guide also mentions uncooked noodles and dumplings to take home; check availability at the counter.', source: 'Nomfluence · checked November 2026', url: 'https://rachelgouk.com/listings/yi-gui-he-noodle-shop/' }] },
  SH035: { try: [{ text: 'If Fu 1039 is the intended restaurant, Michelin recommends river eel and oil-blanched river shrimp at the Yuyuan Road location.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/us/en/shanghai-municipality/shanghai/restaurant/fu-1039' }], know: [{ text: 'The original guide digit is unresolved, so Fu 1039 is a candidate rather than a confirmed match. Contact the restaurant before booking.', source: 'Michelin Guide · Fu 1039 listing', url: 'https://guide.michelin.com/us/en/shanghai-municipality/shanghai/restaurant/fu-1039' }] },
  SH036: { try: [{ text: 'For the Tianjin Road candidate, Michelin highlights pork soup dumplings and the crab-roe version.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/gb/en/shanghai-municipality/shanghai/restaurant/qiao-ai-lai-lai-xiao-long-huangpu' }], know: [{ text: 'This is a candidate match for the original recommendation; Michelin lists the shop at 506 Tianjin Road and says cash only. Confirm before visiting.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/gb/en/shanghai-municipality/shanghai/restaurant/qiao-ai-lai-lai-xiao-long-huangpu' }] },
  SH034: { try: [{ text: 'Michelin highlights made-to-order river shrimp, smoked mackerel belly, and cashew praline puff pastry.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/gb/en/shanghai-municipality/shanghai/restaurant/fu-1088' }], know: [{ text: 'The restaurant occupies a historic townhouse with private rooms; contact the restaurant to book.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/gb/en/shanghai-municipality/shanghai/restaurant/fu-1088' }] },
  SH038: { try: [{ text: 'Time Out’s 2024 review liked the yuzu calamari and pumpkin liquid cheesecake; menus change.', source: 'Time Out · January 2024', url: 'https://www.timeoutshanghai.com/venue/Restaurants-Asian-Asian/105511/BASTARD.html' }, { text: 'In September 2026, City News Service highlighted the mackerel spring rolls and shiro mapo tofu; check the current menu.', source: 'City News Service · September 2026', url: 'https://www.citynewsservice.cn/articles/cns/shanghai-living/hai-guide/hangouts-the-now-fully-fleshed-out-alleys-of-jiaozhou-road-znxedbjm' }], know: [{ text: 'Nomfluence describes a small restaurant at the end of a residential lane, with around 25 seats.', source: 'Nomfluence · checked November 2026', url: 'https://rachelgouk.com/listings/bastard/' }] },
  SH040: { try: [{ text: 'If Yuan You Tao is the intended place, Sophie Serves Up highlighted steamed turbot with fresh and fermented yellow chili in 2023.', source: 'Sophie Serves Up · 2023', url: 'https://www.sophieservesup.com/articles/yuan-you-tao-nostalgic-yet-contemporary-hunanese/' }], know: [{ text: 'The 167 Xinle Road restaurant is a candidate; the original name is unresolved. Check the match and current menu before going.', source: 'City News Service · restaurant review', url: 'https://www.citynewsservice.cn/articles/cns/fb/shanghai-secrets-a-hidden-hunan-resto-worth-trying-yuan-you-tao-env066pm' }] },
  SH046: { try: [{ text: 'Time Out highlighted chicken liver pâté with green plum jam in its 2021 review; the menu may have changed.', source: 'Time Out · June 2021', url: 'https://www.timeoutshanghai.com/venue/Bars_-Wine_Bars/89964/Forage.html' }], know: [{ text: 'A 2021 SmartShanghai visit describes choosing a wine by the glass or bottle with help from the staff; offerings and prices may have changed.', source: 'SmartShanghai · September 2021', url: 'https://www.smartshanghai.com/articles/dining/this-is-where-we-re-eating-and-drinking-for-september-2021-and-you-should-to' }] },
  SH047: { try: [{ text: 'Time Out highlighted foie gras mousse with duck breast and apricot chutney in 2021; check the current menu.', source: 'Time Out · January 2021', url: 'https://www.timeoutshanghai.com/venue/Restaurants-European-French/88323/Blaz.html' }] },
  SH054: { try: [{ text: 'Nomfluence liked the garlic-steamed razor clams and pork-belly-wrapped eel in its 2023 review.', source: 'Nomfluence · 2023', url: 'https://rachelgouk.com/san-bai-bei-brings-shanghai-closer-to-ningbo/' }], know: [{ text: 'The review says menus were handwritten in Chinese and seafood prices could change; a translation app may help.', source: 'Nomfluence · 2023', url: 'https://rachelgouk.com/san-bai-bei-brings-shanghai-closer-to-ningbo/' }] },
  SH055: { try: [{ text: 'A Shanghai-based food writer recommends guobaorou (sweet-and-sour crispy pork) and disanxian (potato and eggplant) at the Huaihai Road restaurant.', source: 'Shanghai food guide · June 2024', url: 'https://note.com/h_l380/n/n53af00e34442?hl=en' }], know: [{ text: 'The same writer describes generous dishes and a busy dinner service, and recommends booking for dinner; check the current arrangements.', source: 'Shanghai food guide · June 2024', url: 'https://note.com/h_l380/n/n53af00e34442?hl=en' }] },
  SH056: { try: [{ text: 'Michelin suggests exploring the tea menu alongside the vegetarian tasting menu.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/jp/en/shanghai-municipality/shanghai/restaurant/fu-he-hui' }], know: [{ text: 'The guide describes set menus that change seasonally; contact the restaurant to book and discuss dietary needs.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/jp/en/shanghai-municipality/shanghai/restaurant/fu-he-hui' }] },
  SH057: { know: [{ text: 'Obscura at 538 Xikang Road is a candidate match for the original recommendation. The 50 Discovery describes a seasonal tasting menu; confirm this is the intended venue before booking.', source: 'The 50 Discovery · checked November 2026', url: 'https://www.the50.com/discovery/Establishments/China/Shanghai/Obscura.html' }] },
  SH059: { try: [{ text: 'The Michelin Guide highlights Cantonese barbecue meats, dim sum and seasonal dishes at the Three on the Bund restaurant.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/gb/en/shanghai-municipality/shanghai/restaurant/canton-table' }] },
  SH060: { try: [{ text: 'Ask about the specialty coffees: Roaster Route describes drinks combining coffee with fruit or wine.', source: 'Roaster Route · checked October 2026', url: 'https://roasterroute.com/china/o-p-s/' }], know: [{ text: 'Trip.com lists the café inside Lane 177 Taiyuan Road and notes a terrace; check current access and hours.', source: 'Trip.com · checked November 2026', url: 'https://sg.trip.com/restaurant/china/shanghai/detail/ops-cafe-36960781/' }, { text: 'A 2026 coffee guide recommends checking ingredients because some seasonal drinks contain alcohol, and notes possible weekend queues.', source: 'Filter Notes · August 2026', url: 'https://www.filternotes.com/shanghai/ops-cafe' }] },
  SH061: { try: [{ text: 'Shanghai food writer Andrew Moo names Manual Espresso Bar among his local coffee stops.', source: 'City News Service · 2023', url: 'https://www.citynewsservice.cn/articles/cns/shanghai-living/renowned-foodie-andrew-moo-tours-xuhui-restaurants-4m3x8z3m' }], know: [{ text: 'A Yanqing Road resident described a friendly espresso bar with fold-up pavement stools in 2025; check the current setup before going.', source: 'City News Service · October 2025', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/my-hood/pm9eq3jk' }] },
  SH067: { try: [{ text: 'Time Out’s 2018 guide highlighted a double espresso with tonic and a tasting flight; ask what the Columbia Circle café serves now.', source: 'Time Out · September 2018', url: 'https://www.timeoutshanghai.com/venue/Restaurants-Cafes/58610/Seesaw-Coffee.html' }] },
  SH068: { know: [{ text: 'The candidate is the Shanghai Roastery inside the historic Associate Mission Building at 169 Yuanmingyuan Road. Confirm this is the Arabica you meant.', source: '% Arabica · store page', url: 'https://arabicacoffee.hk/locations/arabica-shanghai-rockbound' }] },
  SH077: { try: [{ text: 'Time Out highlights Lucky Mart’s highballs, alongside beer and snacks.', source: 'Time Out · 2022', url: 'https://www.timeoutshanghai.com/features/Bars_/104984/5-stylish-roadside-drinking-spots-you-should-stop-by-in-Shanghai.html' }], know: [{ text: 'The Fumin Road location is a convenience-store-inspired bar; Peddlers Gin describes it as a casual place for drinks and people-watching.', source: 'Peddlers Gin · Shanghai bar guide', url: 'https://www.peddlersgin.com/shanghai-bars' }] },
  SH079: { know: [{ text: 'Go for cocktails and a vinyl soundtrack: a local describes jazz and funk played on vintage speakers at 145 Nanchang Road.', source: 'Meet in Shanghai · neighborhood guide', url: 'https://www.meet-in-shanghai.net/en/guide/a-fascinating-neighborhood-to-capture-spontaneous-and-fleeting-moments-589075/' }] },
  SH083: { try: [{ text: 'Nomfluence described the Xiangyang North Road location as a tiny craft-beer bar with rotating taps; check today’s selection.', source: 'Nomfluence · 2021', url: 'https://rachelgouk.com/3-super-cheap-places-drink-draft-beer-in-shanghai/' }], know: [{ text: 'Untappd lists No. 77, but Nomfluence’s 2021 guide places Tap That a few metres from another bar at No. 77. Confirm the exact entrance before visiting.', source: 'Nomfluence · 2021', url: 'https://rachelgouk.com/3-super-cheap-places-drink-draft-beer-in-shanghai/' }] },
  SH086: { know: [{ text: 'A Shanghai government guide describes live jazz and a substantial whisky selection at 50 Tai’an Road. Check the schedule before going.', source: 'Shanghai government · February 2024', url: 'https://english.shanghai.gov.cn/en-BarsandPubs/20240227/108a90fddb4a46c59a94360f2f9180c9.html' }] },
  SH087: { know: [{ text: 'A 2021 guide describes this cocktail lounge in the garden of the historic Yongfoo Elite villa; confirm current access before going.', source: 'LUXE City Guides · November 2021', url: 'https://luxecityguides.com/3-cosy-cocktail-bars-shanghai/' }] },
  SH096: { know: [{ text: 'Check the museum’s exhibition calendar before visiting; its rooftop terrace also overlooks the Huangpu River and Bund.', source: 'Museum of Art Pudong · exhibition calendar', url: 'https://www.museumofartpd.org.cn/en/exhibition' }, { text: 'The Shanghai tourism office describes the rooftop views across the river.', source: 'Meet in Shanghai · museum guide', url: 'https://www.meet-in-shanghai.net/en/pudong-new-area/museum-of-art-pudong-339658/' }] },
  SH097: { know: [{ text: 'This former 1931 bank warehouse houses galleries along Suzhou Creek. Check individual exhibitions and opening times before going.', source: 'Shanghai government · April 2024 art walk', url: 'https://english.shanghai.gov.cn/en-CityTour/20240425/4ab0caf277a748dc8cccbe26e745a014.html' }, { text: 'For a gallery visit, ShanghART and ARARIO have both exhibited at Suhe Haus; check their current programs and opening days.', source: 'ARARIO Gallery · March 2025', url: 'https://www.arariogallery.com/usr/documents/exhibitions/press_release_url/356/web-arario-gallery-shanghai-fluid-in-forms-_19-mar-11-may-2025.pdf' }] },
  SH098: { know: [{ text: 'After the exhibitions, the rooftop lounge and terrace are available to museum visitors and members; confirm current access before going.', source: 'Fotografiska Shanghai · checked November 2026', url: 'https://shanghai.fotografiska.com.cn/en/restaurants/rooftop-lounge/' }] },
  SH099: { know: [{ text: 'A city guide describes changing pop-ups, streetwear and art across this Huaihai Road shopping space; check the current lineup before visiting.', source: 'City News Service · 2026', url: 'https://www.citynewsservice.cn/articles/cns/shanghai-living/general/hai-streets-huaihai-road-where-shopping-blends-art-culture-and-lifestyle-3k0ebqqn' }] },
  SH101: { know: [{ text: 'This mall is at 999 Middle Huaihai Road, near South Shaanxi Road station; it can be combined with a walk along Huaihai’s shops.', source: 'Shanghai Tourism Guide · checked November 2026', url: 'https://www.shanghaitourism.org/best-malls-shanghai/' }, { text: 'The mall operator says the complex connects to a metro station served by three lines.', source: 'Sun Hung Kai Properties · Shanghai ICC', url: 'https://www.shkp.com/en-US/our-business/mainland-and-other-properties/shanghai-icc' }] },
  SH103: { know: [{ text: 'Plaza 66 on West Nanjing Road is a luxury-shopping stop; the mall operator lists it at No. 1266.', source: 'Hang Lung · Plaza 66', url: 'https://www.hanglung.com/en-us/properties/mainland-properties/shanghai/plaza-66' }] },
  SH105: { know: [{ text: 'Wander the restored lanes around Yuanmingyuan Road and look for the Rockbund Art Museum among the historic buildings.', source: 'City News Service · 2026', url: 'https://www.citynewsservice.cn/articles/shanghaidaily/in-focus/unconventional-architecture-where-shanghai-slows-down-pm9edljk' }, { text: 'The Rockbund Art Museum occupies the former Royal Asiatic Society building; check its exhibition schedule before going inside.', source: 'RIBA · 2026', url: 'https://www.riba.org/explore/awards/international-awards/international-awards-for-excellence/2026/rockbund-shanghai/' }] },
  SH106: { know: [{ text: 'Uma Wang lists a shop in Xintiandi Style II at 245 Madang Road. The surrounding Xintiandi lanes are an easy addition to a shopping stop.', source: 'Uma Wang · store directory', url: 'https://www.umawang.com/stores/' }] },
  SH109: { know: [{ text: 'The Columbia Circle bookstore combines books, stationery, art and a café in a historic building; look out for exhibitions and events.', source: 'Tsutaya Books · store opening announcement', url: 'https://www.ccc.co.jp/en/news/press/20201224_003044.html' }] },
  SH111: { know: [{ text: 'Time Out’s Changle Road guide describes FLY as a skate shop carrying boards, parts and streetwear. The guide is older, so check the current shop before going.', source: 'Time Out · 2019 guide', url: 'https://www.timeoutshanghai.com/features/Things_to_Do-Things_to_Do/65879/The-best-things-to-do-on-Changle-Lu.html' }] },
  SH113: { know: [{ text: 'The Huaihai Road flagship is a candidate for your Nice Rice entry. CNA describes minimalist clothing and a café; confirm the branch you meant.', source: 'CNA Lifestyle · 2026', url: 'https://cnalifestyle.channelnewsasia.com/style-beauty/shopping-shanghai-menswear-582131' }] },
  SH114: { know: [{ text: 'The 184 Fumin Road flagship is a candidate for your Labelhood entry. Vogue highlights its selection of emerging Chinese designers and homeware.', source: 'Vogue Singapore · 2026', url: 'https://vogue.sg/fashion-insider-shopping-guide-shanghai/' }, { text: 'A 2024 city walk guide says to ring the doorbell to enter the Fumin Road store; check current access before going.', source: 'Shanghai government · March 2024', url: 'https://english.shanghai.gov.cn/en-TrendyStores/20240313/95a2c50df38b4b148f0ddbb6ae16490f.html' }] },
  SH115: { know: [{ text: 'CNA describes Maison Dongliang in a villa at 168 Wuyi Road, with Chinese designers and a tea-house corner. Confirm the villa and that this is your intended branch.', source: 'CNA Luxury · 2026', url: 'https://cnaluxury.channelnewsasia.com/obsessions/shanghai-indie-boutiques-concept-stores-292921' }] },
  SH118: { know: [{ text: 'A 2025 city guide describes the 72 Yanqing Road shop and its playful, relaxed streetwear; confirm its current address before going.', source: 'Shanghai government · June 2025', url: 'https://english.shanghai.gov.cn/en-TrendyStores/20250624/9d2d5eeee2784a61ac9e9035aafcfc2b.html' }] },
  SH123: { know: [{ text: 'The 55 Wukang Road beauty store is a candidate for your HARMAY entry; the brand also has other Shanghai branches.', source: 'HARMAY · store directory', url: 'https://www.harmay.com/en/stores' }, { text: 'A 2026 SmartShanghai review suggests looking for smaller sizes and comparing prices rather than assuming every product is discounted.', source: 'SmartShanghai · September 2026', url: 'https://www.10100.com/article/152452449' }] },
  SH124: { know: [{ text: 'CNA describes a selection spanning used records, electronic music and releases by local Chinese artists; it also mentions occasional intimate sessions.', source: 'CNA Luxury · 2026', url: 'https://cnaluxury.channelnewsasia.com/obsessions/shanghai-indie-boutiques-concept-stores-292921' }] },
  SH125: { know: [{ text: 'Time Out describes this small record shop as a place to browse local and international vinyl, zines and music magazines.', source: 'Time Out · 2022', url: 'https://www.timeoutshanghai.com/features/Music-Music/105194/5-super-chill-venues-to-listen-to-vinyl-records-in-Shanghai.html' }] },
  SH135: { know: [{ text: 'A skatewear shop at Taikoo Li Qiantan is a candidate for your Avenue + Sons entry. The design guide places it at 500 Dongyu Road; confirm your intended branch.', source: 'Superfuture · March 2022', url: 'https://superfuture.com/2022/03/new-shops/shanghai-avenue-son-store-opening/' }] },
  SH136: { know: [{ text: 'The brand lists a Shanghai store at 502 Jiashan Road. Your original branch is unspecified, so confirm it is the one you meant.', source: 'SOULGOODS · store directory', url: 'https://soulgoods.com/pages/location' }] },
  SH137: { know: [{ text: 'A 2025 shopping guide lists GoodBai at 92 Yanqing Road and a café at No. 104. Your original branch is unspecified; check the intended location.', source: 'Central Studios · 2025 city guide', url: 'https://centralstudios.cn/wp-content/uploads/2025/12/CS-CITY-GUIDE_v3.2.pdf' }] },
  SH140: { know: [{ text: 'A neighborhood guide highlights vintage clothes and accessories from the 1920s through the 1960s at the Wukang Road boutique.', source: 'City News Service · 2026', url: 'https://www1.citynewsservice.cn/articles/cns/lifestyle/my-hood/a-neighborhood-of-heritage-villas-caf%C3%A9s-and-hidden-jazz-clubs-5nq5v58n' }] },
  SH151: { know: [{ text: 'The hotel’s spa menu places the spa on the third floor, alongside the pool and wet areas. Ask about access and treatment bookings before visiting.', source: 'The PuLi · spa menu', url: 'https://thepuli.com/shanghai/file/webpage/shared/wellness/202601-the-puli-spa-menu.pdf' }] },
  SH152: { try: [{ text: 'The spa lists facial and massage options, including its Cha Ling Balancing Ritual. Ask the team about the current menu and suitability when booking.', source: 'Upper House Shanghai · Mi Xun Spa', url: 'https://www.upperhouse.com/en/shanghai/wellness/mi-xun-spa/' }], know: [{ text: 'The spa at Upper House Shanghai offers a treatment menu; ask about appointments and whether pool access is included.', source: 'Upper House Shanghai · Mi Xun Spa', url: 'https://www.upperhouse.com/en/shanghai/wellness/mi-xun-spa/' }] },
  SH158: { know: [{ text: 'The hotel lists Shanghai Tavern and the Punch Room; the Punch Room is reservation-only. Its Roof Garden is listed for events only, so check access before making rooftop plans.', source: 'The Shanghai EDITION · dining information', url: 'https://www.marriott.com/en-us/hotels/shaeb-the-shanghai-edition/dining/' }] },
  SH160: { know: [{ text: 'A September 2026 visitor guide reports that admission requires a timed, named booking through the center’s WeChat account and that passports are accepted. Confirm the current rules before visiting.', source: 'Shanghai Travel Atlas · September 2026', url: 'https://www.haoliday.com/en/explore/shanghai/p/urban-planning-hall' }] },
  SH171: { try: [{ text: 'AFAR recommended the cumin-rubbed ribs and chili-steamed fish head at the Dongping Road restaurant in 2014; check current operation and menu first.', source: 'AFAR · July 2014', url: 'https://www.afar.com/places/di-shui-dong-restaurant-shanghai?p=2' }] },
  SH169: { know: [{ text: 'A 2011 guide described a cocktail bar and outdoor terrace at 570 Yongjia Road. This is an older listing, so confirm the bar and floor before visiting.', source: 'eChinacities · 2011', url: 'https://cities.echinacities.com/Shanghai/city-guide/5-Best-New-Bars-in-Shanghai-Spring-2011-Edition' }] },
  SH172: { know: [{ text: 'Older guides describe a jazz and blues club at 1416 Huaihai Middle Road. Current operation is not confirmed; the jazz directory labels its listing dormant.', source: 'All About Jazz · venue directory', url: 'https://www.jazznearyou.com/shanghai/venue/cotton-club-shanghai' }] },
  SH180: { know: [{ text: 'The club announced its move to 5/F, 600 Jiujiang Road in 2026. Check the current live-music schedule and entry arrangements; older reviews refer to Fuzhou Road.', source: 'House of Blues & Jazz · September 2026 posts', url: 'https://www.findglocal.com/CN/Shanghai/880501958746407/House-of-Blues-%26-Jazz' }] },
  SH179: { try: [{ text: 'Time Out’s historical review highlights pizza and rigatoni with meatballs; the menu may have changed.', source: 'Time Out · August 2012', url: 'https://www.timeoutshanghai.com/venue/Restaurants-European-Italian/7482/Mercato.html' }, { text: 'Michelin highlights the wood-roasted whole halibut and porcini-crusted salmon; check the current menu.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/us/en/shanghai-municipality/shanghai/restaurant/mercato-506693' }], know: [{ text: 'This is Mercato at Three on the Bund, a different restaurant from Mercado on Wulumuqi Road.', source: 'Tripadvisor · checked November 2026', url: 'https://www.tripadvisor.com/Restaurant_Review-g308272-d3393807-Reviews-Mercato_by_Jean_Georges-Shanghai.html' }] },
  SH018: { know: [{ text: 'Look for the historic former Columbia Country Club and pool while exploring the complex.', source: 'Time Out · historical guide', url: 'https://www.timeoutshanghai.com/features/City_Life_/65213/Then-and-now-the-history-behind-buzzing-FB-hub-Columbia-Circle.html' }] },
  SH021: { know: [{ text: 'The hotel offers a short heritage tour for registered hotel guests; check the hotel’s current visitor arrangements.', source: 'Fairmont Peace Hotel · checked November 2026', url: 'https://www.fairmont.com/en/hotels/shanghai/fairmont-peace-hotel/experiences/peace-museum.html' }] },
  SH023: { try: [{ text: 'A Saturday doughnut: Table Journey reports changing weekend flavors.', source: 'Table Journey · checked September 2026', url: 'https://tablejourney.com/china/shanghai/brunch/egg-xiangyang-north-road/' }, { text: 'City News Service recommends the lemon thyme cake; check the pastry case for availability.', source: 'City News Service · 2026', url: 'https://www.citynewsservice.cn/articles/cns/fb/chic-savory/okwvxbyn' }], know: [{ text: 'Weekend mornings can mean a wait; the same guide describes it as walk-in only.', source: 'Table Journey · checked September 2026', url: 'https://tablejourney.com/china/shanghai/brunch/egg-xiangyang-north-road/' }] },
  SH027: { try: [{ text: 'Nomfluence singled out the fried monkfish bun and sourdough brunch in its April 2026 review.', source: 'Nomfluence · April 2026', url: 'https://rachelgouk.com/sourdough-brunch-at-fuxing-project-fuxing-park-terrace/' }], know: [{ text: 'The terrace faces Fuxing Park; Nomfluence says weekends can be busy.', source: 'Nomfluence · April 2026', url: 'https://rachelgouk.com/sourdough-brunch-at-fuxing-project-fuxing-park-terrace/' }] },
  SH041: { try: [{ text: 'Look for pasta with Chinese flavor accents; Sophie Serves Up highlights the restaurant’s fresh-pasta approach.', source: 'Sophie Serves Up · 2025', url: 'https://www.sophieservesup.com/articles/oodles-of-noodles-a-shanghai-pasta-a-z-list-2/' }] },
  SH044: { try: [{ text: 'Nomfluence highlights arancini and parmesan spring rolls on its Italian-influenced menu.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/cometa/' }], know: [{ text: 'The guide describes indoor seating as dog-friendly and lists outdoor seating.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/cometa/' }] },
  SH048: { try: [{ text: 'Time Out recommends the house-made ice cream, including salted caramel and lemon-basil sorbet in its 2024 guide; flavors may change.', source: 'Time Out Shanghai · 2024', url: 'https://www.10100.com/article/148140898' }], know: [{ text: 'A French wine bistro; its 2024 review highlights a broad selection of wines by the glass.', source: 'Sophie Serves Up · March 2024', url: 'https://www.sophieservesup.com/articles/babar-french-wine-bistro-ice-cream-on-donghu-lu/' }, { text: 'A 2024 Time Out guide said guests could request cellar wines by the glass from 6–8 pm; ask whether that offer still applies.', source: 'Time Out Shanghai · 2024', url: 'https://www.10100.com/article/148140898' }] },
  SH049: { try: [{ text: 'Nomfluence liked the calamari in a 2022 review; the menu changes, so check what is available.', source: 'Nomfluence · January 2022', url: 'https://rachelgouk.com/new-hot-juke-a-neighborhood-eatery-on-dongping-lu/' }], know: [{ text: 'The guide describes an intimate restaurant with around 18 seats and dishes designed for sharing.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/juke/' }] },
  SH053: { try: [{ text: 'Trip.com diners mention grilled lamb skewers and fried meat with naan at the 379 Xikang Road candidate.', source: 'Trip.com · visitor reviews', url: 'https://us.trip.com/restaurant/china/shanghai/detail/restaurant-24335113/' }], know: [{ text: 'The Xikang Road listing is a possible match; confirm it is the restaurant you intended before visiting.', source: 'Trip.com · checked November 2026', url: 'https://us.trip.com/restaurant/china/shanghai/detail/restaurant-24335113/' }] },
  SH075: { know: [{ text: 'The INS venue has distinct spaces for coffee and tea cocktails, izakaya-style food, and cocktails.', source: 'Sophie Serves Up · 2026 guide', url: 'https://www.sophieservesup.com/articles/48-hours-in-shanghai-what-to-do-eat-drink-and-explore/' }] },
  SH078: { try: [{ text: 'The 50 Discovery describes cocktails using southern Chinese ingredients such as longan, pandan, and tea.', source: 'The 50 Discovery · checked November 2026', url: 'https://www.the50.com/discovery/Establishments/China/Shanghai/Paal.html' }], know: [{ text: 'A small, cozy cocktail bar: a local quoted by City News Service describes it as having a living-room feel.', source: 'City News Service · 2024', url: 'https://www.citynewsservice.cn/articles/cns/lifestyle/there-are-hidden-gems-to-explore-around-nanchang-road-dmjwxryn' }] },
  SH080: { know: [{ text: 'Sophie Serves Up’s 2024 review described a frequently changing cocktail menu built around simple, classic-inspired drinks.', source: 'Sophie Serves Up · January 2024', url: 'https://www.sophieservesup.com/articles/bar-blanc-cocktail-rockstar-chase-whites-artistry-unleashed/' }] },
  SH094: { know: [{ text: 'Check the exhibition calendar and current opening arrangements before going; museum schedules can change for holidays.', source: 'Shanghai government · 2025 museum guide', url: 'https://english.shanghai.gov.cn/en-MuseumsGalleries/20250702/64d1d26886b3458b8dffb3a8533787b5.html' }, { text: 'Exhibition admission can vary: a 2026 art guide recommends checking the museum’s official WeChat account for tickets and booking.', source: 'The Shanghaier · October 2026', url: 'https://theshanghaier.com/field-notes/power-station-of-art-shanghai-museum-guide/' }] },
  SH162: { know: [{ text: 'Shows and ticket arrangements vary by night. Check The Pearl’s event calendar before choosing a date.', source: 'The Pearl · event calendar', url: 'https://thepearl.com.cn/?app=eventcalendar' }] },
  SH163: { know: [{ text: 'A 2026 visitor guide reports that the Gaoyou Road branch has closed, while another guide still lists it. Confirm before visiting; the Bund restaurant is a separate location.', source: 'My Shanghai Guide · October 2026', url: 'https://myshanghaiguide.com/lost-heaven-shanghai-review/' }] },
  SH164: { try: [{ text: 'OohMyGuide recommends Xinjiang lamb skewers and mentions big plate chicken.', source: 'OohMyGuide · checked November 2026', url: 'https://www.oohmyguide.com/shanghai/venues/63/xibo-xinjiang-cuisine-changshu-road' }, { text: 'One Tripadvisor diner also enjoyed the lamb-filled fried pie and flatbreads; check the current menu.', source: 'Tripadvisor · visitor review, April 2026', url: 'https://www.tripadvisor.com/Restaurant_Review-g308272-d2367319-Reviews-Xibo-Shanghai.html' }], know: [{ text: 'Sources agree on 83 Changshu Road but differ on the floor; check with the restaurant before visiting.', source: 'Amap · checked November 2026', url: 'https://www.amap.com/place/B00156GSF7' }] },
  SH165: { know: [{ text: 'A 2023 article reports that Coconut Paradise previously occupied this Fumin Road building, which later became Suzie’s Garden. Confirm this branch before visiting.', source: 'Sophie Serves Up · 2023', url: 'https://www.sophieservesup.com/articles/all-the-wine-the-largest-terrace-at-suzies-garden/' }] },
  SH167: { try: [{ text: 'Wanderlog describes the Yongjia Road bar as a place for classic cocktails and a large whisky selection.', source: 'Wanderlog · checked November 2026', url: 'https://wanderlog.com/place/details/8356032/bar-constellation' }], know: [{ text: 'A 2021 Time Out guide described the Yongjia Road branch as closed. Current listings conflict, so confirm before going.', source: 'Time Out · 2021', url: 'https://www.timeoutshanghai.com/features/Bars_/88911/The-best-Japanese-bars-in-Shanghai.html' }] },
  SH168: { try: [{ text: 'Nomfluence highlights sourdough loaves and brunch; it also lists sourdough pizzas.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/omills-sourdough-bakery-bistro-yongjia-road/' }], know: [{ text: 'The Yongjia Road guide says dogs are welcome on the ground floor and mentions some vegan dishes and plant-based milk.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/omills-sourdough-bakery-bistro-yongjia-road/' }] },
  SH170: { try: [{ text: 'Nomfluence recommends the flan and describes a menu of ceviche and seafood.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/colca/' }], know: [{ text: 'The guide describes the terrace as dog-friendly and mentions weekend brunch.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/colca/' }] },
  SH173: { try: [{ text: 'Time Out’s 2023 bagel roundup picked the classic Irish Reuben at the Anfu Road shop.', source: 'Time Out · 2023', url: 'https://www.timeoutshanghai.com/features/Feature/105435/5-shops-to-find-the-tastiest-bagels-in-Shanghai.html' }] },
  SH174: { try: [{ text: 'Nomfluence highlights seafood, garlic prawns, and Basque cheesecake at Mercado 505.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/mercado-505/' }, { text: 'Michelin highlights a Spanish seafood stew and says it must be pre-ordered; confirm availability when booking.', source: 'Michelin Guide · checked November 2026', url: 'https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/mercado-505' }], know: [{ text: 'The restaurant has outdoor seating; the guide notes that patio use depends on the weather.', source: 'Nomfluence · listing checked November 2026', url: 'https://rachelgouk.com/listings/mercado-505/' }] },
  SH175: { know: [{ text: 'Time Out reported that this Jiaozhou Road spot had changed its name to Jar Bar. Its current status is uncertain; check before visiting.', source: 'Time Out · 2022', url: 'https://www.timeoutshanghai.com/features/Restaurants-Best_food__drink/92001/3-hidden-gem-restaurants-in-Shanghai-side-streets-and-alleyways.html' }] },
  SH176: { try: [{ text: 'A Tripadvisor diner recommended the salmon Benedict and avocado toast at the Jiaozhou Road location in 2025.', source: 'Tripadvisor · August 2025', url: 'https://www.tripadvisor.it/Restaurant_Review-g308272-d15220847-Reviews-Alimentari_Degusteria-Shanghai.html' }], know: [{ text: 'Trip.com visitors describe a deli and brunch spot with window seats; one notes that weekends can get noisy.', source: 'Trip.com · visitor reviews', url: 'https://us.trip.com/restaurant/china/shanghai/detail/alimentari-and-degusteria-57282252/' }] },
};

function renderGuideTips(items) {
  return `<div class="guide-tips">${items.map((item) => `<div class="review-source"><p>${escapeHtml(item.text)}</p><p class="egg-small"><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.source)} ↗</a></p></div>`).join('')}</div>`;
}

function renderEggPanel(place, photos, credits) {
  const nearby = (place.pin && !place.hidden_by_default ? state.places : []).filter((candidate) => candidate.pin && candidate.id !== place.id && !candidate.hidden_by_default && !candidate.labels.some((label) => ["candidate", "unresolved", "approximate"].includes(label)))
    .map((candidate) => ({ place: candidate, distance: Math.hypot((candidate.lon - place.lon) * 95.1, (candidate.lat - place.lat) * 111.2) }))
    .filter((candidate) => candidate.distance < 0.6).sort((a, b) => a.distance - b.distance).slice(0, 3);
  const posts = XHS_POSTS[place.id] || [];
  const phone = (place.phone || "").match(/^\+?[\d\s-]+/);
  const hasPhone = phone && phone[0].replace(/\D/g, "").length >= 7;
  const hasAddress = place.address && place.address.trim() !== "(unconfirmed)";
  const hasChineseAddress = place.chinese_address && place.chinese_address.trim() !== "(unconfirmed)";
  const hasPin = place.pin && (!place.hidden_by_default || state.showHidden);
  const status = visitorStatus(place);
  const freshReviews = MONID_REVIEWS[place.id] || [];
  const guide = GUIDE_TIPS[place.id] || {};
  const locationCaution = [place.labels.some((label) => ["candidate", "unresolved"].includes(label)) ? "The exact place or branch is not confirmed." : "", place.labels.includes("approximate") && hasPin ? "The map pin is approximate." : ""].filter(Boolean).join(" ");
  const hasPersonalTake = [place.personal_note, place.what_to_order, place.when_to_go].some((value) => (value || "").trim());
  const reviews = [...freshReviews, REVIEW_LINKS[place.id], ...(ADDITIONAL_REVIEWS[place.id] || [])].filter((review) => review && (freshReviews.includes(review) || !freshReviews.some((fresh) => fresh.sourceName === (review.sourceName || "Google"))));
  const contactLinks = (place.external_links || []).map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ↗</a>`).join("");
  return `<div class="egg-header"><div><p class="egg-eyebrow">MICHAEL’S SHANGHAI${isFavorite(place) ? ' <span> / </span> A FAVORITE' : ""}</p><h2>${escapeHtml(visitorName(place))}</h2>${place.id === "SH023" ? '<p class="egg-intro">A little brunch spot on Xiangyang North Road.</p>' : ""}</div><button class="close" type="button" id="close-card" aria-label="Close">×</button></div>
    <div class="egg-tags"><span>${escapeHtml(place.category)}</span>${place.neighborhood ? `<span>${escapeHtml(place.neighborhood)}</span>` : ""}</div>
    ${place.original_name && place.original_name !== place.name ? `<p class="egg-small">Listed as ${escapeHtml(place.original_name)}</p>` : ""}
    <div class="visit-summary"><strong>${escapeHtml(status)}</strong>${!hasPin ? '<p>No confirmed map pin for this place yet.</p>' : ""}${locationCaution ? `<p>${escapeHtml(locationCaution)}</p>` : ""}${VISITOR_NOTES[place.id] ? `<p>${escapeHtml(VISITOR_NOTES[place.id])}</p>` : ""}</div>
    ${hasPersonalTake ? renderMichaelsTake(place) : ""}
    ${photos.length ? `${renderGallery(photos)}<div class="egg-gallery-caption">A look around <span>${photos.length} ${photos.length === 1 ? "photo" : "photos"}</span></div>` : ""}
    <div class="place-sections">
    ${guide.try?.length ? sectionCard("What to try", "Ideas from local guides", renderGuideTips(guide.try)) : ""}
    ${guide.know?.length ? sectionCard("Good to know", "Practical tips from local guides", renderGuideTips(guide.know)) : ""}
    ${sectionCard("Address and Hours", "Where to go and when", `
      ${place.id === "SH012" ? '<p class="egg-small">The highlighted line follows Wukang Road; it is not an official neighborhood boundary. Street geometry © OpenStreetMap contributors.</p>' : ""}
      <div class="egg-address"><span class="egg-icon" aria-hidden="true">↗</span><div><strong>${hasAddress ? displayValue(visitorAddress(place.address)) : "Address not confirmed"}</strong>${hasChineseAddress ? `<span>${displayValue(place.chinese_address)}</span>` : ""}</div></div>
      <div class="egg-actions">${hasPin ? `<a href="https://www.openstreetmap.org/?mlat=${encodeURIComponent(place.lat)}&mlon=${encodeURIComponent(place.lon)}#map=18/${encodeURIComponent(place.lat)}/${encodeURIComponent(place.lon)}" target="_blank" rel="noopener noreferrer">Open map ↗</a>` : place.scope === "user-linked location" && place.coordinate_sources?.[0] ? `<a href="${escapeHtml(place.coordinate_sources[0])}" target="_blank" rel="noopener noreferrer">Open Google Maps ↗</a>` : ""}</div>
      <div class="section-hours"><strong>Opening hours</strong>${displayHours(VISITOR_HOURS[place.id] || place.hours, VISITOR_HOURS[place.id] ? [] : place.hours_lines)}<p class="egg-small">Hours may change; check before visiting.</p></div>
      ${(place.location_note || place.notes) ? `<details class="research-notes"><summary>Location and research notes</summary>${place.location_note ? `<p>${escapeHtml(place.location_note)}</p>` : ""}${place.notes ? `<p>${escapeHtml(place.notes)}</p>` : ""}</details>` : ""}`)}
    ${hasPhone || contactLinks ? sectionCard("Contact", "Phone and useful links", `${hasPhone ? `<p>${displayValue(place.phone)}</p><div class="egg-actions"><a href="tel:${escapeHtml(phone[0].replace(/[\s-]/g, ""))}">Call ↗</a></div>` : ""}${contactLinks ? `<div class="egg-posts">${contactLinks}</div>` : ""}`) : ""}
    ${reviews.length ? sectionCard("Reviews & guides", "Reviews and useful reads", reviews.map((review) => `<div class="review-source"><p><strong>${escapeHtml(review.rating)}</strong></p>${review.checked ? `<p class="egg-small">Checked ${escapeHtml(review.checked)}.</p>` : ""}${/\d\s*\/\s*5/.test(review.rating || "") ? '<p class="egg-small">Ratings may have changed.</p>' : ""}<div class="egg-actions"><a href="${escapeHtml(review.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " Shanghai")}&query_place_id=${encodeURIComponent(review.id)}`)}" target="_blank" rel="noopener noreferrer">Open ${escapeHtml(review.sourceName || "Google")} ↗</a></div>${review.note ? `<details class="research-notes"><summary>About this source</summary><p>${escapeHtml(review.note)}</p></details>` : ""}</div>`).join("")) : ""}
    ${nearby.length || posts.length ? sectionCard("While You’re Here", "Nearby places and more to explore", `${nearby.length ? `<div class="egg-nearby">${nearby.map(({ place: p, distance }) => `<button type="button" data-nearby-id="${escapeHtml(p.id)}"><span><strong>${escapeHtml(visitorName(p))}</strong><small>${escapeHtml(p.category)} · ${Math.round(distance * 1000)} m away, straight line</small></span><span>↗</span></button>`).join("")}</div>` : ""}${posts.length ? `<h4>From Xiaohongshu</h4><p class="egg-small">Sign-in may be required.</p><div class="egg-posts">${posts.map((post) => `<a href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(post.title)} <span>↗</span></a>`).join("")}</div>` : ""}`) : ""}
    </div>
    ${credits}`;
}

function openCard(place) {
  setLegendOpen(false);
  el.mobilePlace.hidden = true;
  document.body.classList.remove("mobile-place-open");
  state.selectedId = place.id;
  const photos = [PHOTO_DEMO[place.id], ...(EXTRA_PHOTOS[place.id] || []), ...(MONID_PHOTOS[place.id] || [])].filter(Boolean);
  const sources = (place.coordinate_sources || [])
    .map((url) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(url.replace("https://", ""))}</a>`)
    .join(" · ");
  const credits = renderCredits(photos, sources);
  el.card.hidden = false;
  document.body.classList.add("card-open");
  el.card.classList.add("egg-demo");
  el.card.innerHTML = renderEggPanel(place, photos, credits);
  if (CITY_WALKS[place.id]) {
    el.card.insertAdjacentHTML("afterbegin", '<button class="walk-back" type="button" data-return-walk>← Back to the walk</button>');
    el.card.querySelector("[data-return-walk]").addEventListener("click", () => openCityWalk(place.id));
  }
  el.card.scrollTop = 0;
  document.getElementById("close-card").addEventListener("click", closeCard);
  el.card.querySelectorAll("[data-nearby-id]").forEach((button) => button.addEventListener("click", () => selectPlace(button.dataset.nearbyId)));
  if (photos.length) setupGallery(photos);
  renderFavorites();
  renderList();
  updateMarkers();
  if (isMobile()) setSidebarOpen(false);
  updatePadding();
}

function openCityWalk(id) {
  const walk = CITY_WALKS[id];
  const place = state.byId.get(walk?.parentId || id);
  if (!walk || !place) return;
  setLegendOpen(false);
  el.mobilePlace.hidden = true;
  document.body.classList.remove("mobile-place-open");
  state.selectedId = place.id;
  el.card.hidden = false;
  el.card.classList.add("egg-demo");
  document.body.classList.add("card-open");
  if (walk.parentId && CITY_WALKS[walk.parentId]?.mapCenter) {
    state.map.easeTo({ center: CITY_WALKS[walk.parentId].mapCenter, zoom: 14.2, duration: 1000 });
  }
  const firstStop = walk.stops[0];
  const startUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${firstStop.name}, ${firstStop.address}, Shanghai`)}`;
  el.card.innerHTML = `<div class="egg-header"><div><p class="egg-eyebrow">MICHAEL’S SHANGHAI / CITY WALKS</p><h2>${escapeHtml(walk.title)}</h2><p class="walk-intro">${escapeHtml(walk.subtitle)}</p></div><button class="close" type="button" id="close-card" aria-label="Close">×</button></div>
    <p class="walk-description">${escapeHtml(walk.introduction)}</p>
    <p class="walk-note">${walk.duration ? `${escapeHtml(walk.duration)} · ` : ""}${walk.stops.length} stops · ${escapeHtml(walk.guidance || "Follow the highlighted street · Tap a stop for details")}</p>
    <div class="egg-actions"><a href="${escapeHtml(startUrl)}" target="_blank" rel="noopener noreferrer">Find the starting point ↗</a></div>
    <div class="walk-stops">${walk.stops.map((stop, index) => {
      const query = encodeURIComponent(`${stop.name}, ${stop.address}, Shanghai`);
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}${stop.placeId ? `&query_place_id=${encodeURIComponent(stop.placeId)}` : ""}`;
      const photo = stop.photo;
      return `<details class="walk-stop"><summary><span class="walk-number">${index + 1}</span><span class="walk-stop-heading"><strong>${escapeHtml(stop.name)}</strong><small>${escapeHtml(stop.address)}</small></span>${photo ? `<img class="walk-thumb" src="${escapeHtml(photo.image)}" alt="" loading="lazy">` : ""}<span class="section-chevron" aria-hidden="true">⌄</span></summary><div class="walk-stop-content">${photo ? `<figure class="walk-photo"><a href="${escapeHtml(photo.image)}" target="_blank" rel="noopener noreferrer" aria-label="Open photo of ${escapeHtml(photo.title)}"><img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.title)}" loading="lazy"></a><figcaption>Photo: ${escapeHtml(photo.creator)} · <a href="${escapeHtml(photo.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.licenseUrl ? "Wikimedia Commons" : "Original source")}</a> · ${photo.licenseUrl ? `<a href="${escapeHtml(photo.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.license)}</a>` : escapeHtml(photo.license)} · display cropped</figcaption></figure>` : ""}<p>${escapeHtml(stop.description)}</p><p class="walk-access">${escapeHtml(stop.access)}</p>${stop.rating ? `<p><strong>${escapeHtml(stop.rating)}</strong><br><span class="walk-access">${escapeHtml(stop.ratingNote || "Checked November 9, 2026; ratings may change.")}</span></p>` : ""}<div class="egg-actions"><a href="${escapeHtml(mapUrl)}" target="_blank" rel="noopener noreferrer">${stop.rating ? "Map & Google reviews ↗" : "Find on Google Maps ↗"}</a><a href="${escapeHtml(stop.source)}" target="_blank" rel="noopener noreferrer">About this stop ↗</a></div></div></details>`;
    }).join("")}</div>
    ${walk.foodAndDrink?.length ? `<section class="walk-eats"><h3>Eat &amp; drink along the way</h3><p class="walk-note">${escapeHtml(walk.foodIntro || "Ideas for a break, from Shanghai’s 2025 local guide. Check current hours before you go.")}</p><div class="walk-eats-list">${walk.foodAndDrink.map((spot) => `<article class="walk-eat"><span class="walk-eat-near">${escapeHtml(spot.near)}</span><h4>${escapeHtml(spot.name)}</h4><p>${escapeHtml(spot.kind)} · ${escapeHtml(spot.address)}</p><p>${escapeHtml(spot.note)}</p><div class="egg-actions"><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ", " + spot.address + ", Shanghai")}" target="_blank" rel="noopener noreferrer">Find on map ↗</a><a href="${escapeHtml(spot.source)}" target="_blank" rel="noopener noreferrer">Source ↗</a></div></article>`).join("")}</div></section>` : ""}
    <p class="walk-note">Stops are listed in walking order. Check access before visiting and respect residents’ privacy.</p><button class="walk-back" type="button" data-street-details>Street details ↗</button>${renderCredits(walk.stops.filter((stop) => stop.photo).map((stop) => ({ caption: stop.photo.title, creator: stop.photo.creator, source: stop.photo.source, sourceName: stop.photo.licenseUrl ? "Wikimedia Commons" : "Original source", license: stop.photo.licenseUrl, licenseName: stop.photo.license })), "")}`;
  el.card.scrollTop = 0;
  document.getElementById("close-card").addEventListener("click", closeCard);
  el.card.querySelector("[data-street-details]").addEventListener("click", () => openCard(place));
  renderFavorites();
  renderList();
  updateMarkers();
  if (isMobile()) setSidebarOpen(false);
  updatePadding();
}

function closeCard() {
  const viewer = document.getElementById("photo-viewer");
  if (viewer.open) viewer.close();
  state.selectedId = null;
  el.card.hidden = true;
  document.body.classList.remove("card-open");
  el.card.innerHTML = "";
  el.mobilePlace.hidden = true;
  el.mobilePlace.innerHTML = "";
  document.body.classList.remove("mobile-place-open");
  if (state.popup) state.popup.remove();
  renderFavorites();
  renderList();
  updateMarkers();
  updatePadding();
}

function flyToPlace(place) {
  if (!state.map) return;
  if (CITY_WALKS[place.id]?.mapCenter) {
    state.map.easeTo({ center: CITY_WALKS[place.id].mapCenter, zoom: 14.8, duration: 1000 });
    return;
  }
  if (place.id === "SH012") {
    const bounds = new maplibregl.LngLatBounds();
    AREA_SHAPES.features.filter((feature) => feature.properties.id === place.id)
      .forEach((feature) => feature.geometry.coordinates.forEach((coordinate) => bounds.extend(coordinate)));
    state.map.easeTo({ center: bounds.getCenter(), zoom: 14.8, duration: 1000 });
    return;
  }
  if (!place.pin) return;
  const padding = isMobile()
    ? { top: 40, left: 20, right: 20, bottom: Math.min(260, Math.round(window.innerHeight * 0.32)) }
    : { top: 40, left: 430, right: el.card.hidden ? 40 : 430, bottom: 40 };
  state.map.flyTo({
    center: [place.lon, place.lat],
    zoom: Math.max(state.map.getZoom(), 16),
    pitch: 62,
    essential: true,
    duration: 1400,
    padding,
  });
}

function selectPlace(id, fly = true) {
  const place = state.byId.get(id);
  if (!place) return;
  if (state.popup) state.popup.remove();
  if (CITY_WALKS[id]) openCityWalk(id);
  else if (isMobile()) openMobilePlace(place);
  else openCard(place);
  if (fly) flyToPlace(place);
  const button = el.list.querySelector(`[data-id="${id}"]`);
  if (button && !isMobile()) button.scrollIntoView({ block: "nearest" });
}

function openMobilePlace(place) {
  el.card.hidden = true;
  document.body.classList.remove("card-open");
  state.selectedId = place.id;
  const location = place.pin ? pinStatusLabel(place) : "Not pinned";
  const caution = place.labels.includes("candidate") ? "Place or branch not confirmed" : place.labels.includes("approximate") ? "Approximate pin" : "";
  el.mobilePlace.innerHTML = `<div class="mobile-place-top"><div><span class="mobile-place-kicker">${escapeHtml(place.category)} · ${escapeHtml(location)}</span><h2>${escapeHtml(visitorName(place))}</h2><p>${escapeHtml(visitorStatus(place))}${caution ? ` · ${escapeHtml(caution)}` : ""}</p>${place.personal_note ? `<p class="mobile-personal-note"><span>Michael’s note</span> ${escapeHtml(place.personal_note)}</p>` : ""}</div><button type="button" class="mobile-place-close" aria-label="Close place">×</button></div><button type="button" class="mobile-place-more">View place details <span aria-hidden="true">↑</span></button>`;
  el.mobilePlace.hidden = false;
  document.body.classList.add("mobile-place-open");
  el.mobilePlace.querySelector(".mobile-place-close").addEventListener("click", closeCard);
  el.mobilePlace.querySelector(".mobile-place-more").addEventListener("click", () => {
    el.mobilePlace.hidden = true;
    document.body.classList.remove("mobile-place-open");
    openCard(place);
  });
  renderFavorites();
  renderList();
  updateMarkers();
}

function groupedPins(places) {
  const groups = new Map();
  for (const place of places) {
    if (!place.pin) continue;
    const key = pinKey(place);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(place);
  }
  return groups;
}

function clearMarkers() {
  for (const marker of state.markers) marker.remove();
  state.markers = [];
}

function updateMarkers() {
  if (!state.map) return;
  updateAreaHighlights();
  clearMarkers();
  const groups = groupedPins(visiblePlaces());
  for (const places of groups.values()) {
    const lead = places.find((place) => place.id === state.selectedId) || places[0];
    const root = document.createElement("div");
    root.className = "pin-marker";
    const node = document.createElement("button");
    node.type = "button";
    node.className = "pin";
    if (places.some((place) => place.hidden_by_default)) node.classList.add("is-historical");
    if (places.some((place) => place.id === state.selectedId)) node.classList.add("is-selected");
    if (places.some(isFavorite)) node.classList.add("is-favorite");
    if (places.every((place) => place.labels.includes("candidate") || place.labels.includes("approximate"))) node.classList.add("is-uncertain");
    node.style.setProperty("--c", colorFor(lead.category));
    node.setAttribute("aria-label", places.map(visitorName).join(", "));
    node.innerHTML = `
      <span class="pin-orb"></span>
      <span class="pin-stem"></span>
      ${places.some(isFavorite) ? '<span class="pin-star" aria-hidden="true">★</span>' : ""}
      ${places.length > 1 ? `<span class="pin-count">${places.length}</span>` : ""}
    `;
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      if (places.length === 1) {
        selectPlace(places[0].id);
        return;
      }
      openChooser(places, lead);
    });
    root.appendChild(node);
    const marker = new maplibregl.Marker({ element: root, anchor: "bottom", subpixelPositioning: true })
      .setLngLat([lead.lon, lead.lat])
      .addTo(state.map);
    state.markers.push(marker);
  }
}

function updateAreaHighlights() {
  const map = state.map;
  if (!map || !map.getLayer("area-highlights")) return;
  const visible = visiblePlaces().map((place) => place.id).filter((id) => id !== "SH001" || state.selectedId === "SH001");
  if (state.selectedId && CITY_WALKS[state.selectedId] && !visible.includes(state.selectedId)) visible.push(state.selectedId);
  map.setFilter("area-highlights", ["in", ["get", "id"], ["literal", visible]]);
  map.setPaintProperty("area-highlights", "line-color", ["case", ["==", ["get", "id"], state.selectedId || ""], "#fff0ab", "#edb96a"]);
}

function addAreaHighlights(map) {
  map.addSource("area-shapes", { type: "geojson", data: AREA_SHAPES, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>' });
  map.addLayer({ id: "area-highlights", type: "line", source: "area-shapes", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#edb96a", "line-opacity": 0.8, "line-width": ["interpolate", ["linear"], ["zoom"], 11, 5, 16, 15] } });
  updateAreaHighlights();
  map.on("mouseenter", "area-highlights", () => { map.getCanvas().style.cursor = "pointer"; });
  map.on("mouseleave", "area-highlights", () => { map.getCanvas().style.cursor = ""; });
}

function openChooser(places, lead) {
  if (state.popup) state.popup.remove();
  const wrap = document.createElement("div");
  for (const place of places) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chooser-btn";
    button.textContent = visitorName(place);
    button.addEventListener("click", () => selectPlace(place.id));
    wrap.appendChild(button);
  }
  state.popup = new maplibregl.Popup({
    closeButton: false,
    offset: 28,
    className: "pin-chooser",
    maxWidth: "240px",
  })
    .setLngLat([lead.lon, lead.lat])
    .setDOMContent(wrap)
    .addTo(state.map);
}

function applyFilters() {
  renderFavorites();
  renderList();
  updateMarkers();
}

function updatePadding() {
  if (!state.map || isMobile()) return;
  state.map.setPadding({
    top: 20,
    left: 420,
    right: el.card.hidden ? 20 : 420,
    bottom: 20,
  });
}

function resetView() {
  closeCard();
  el.locationStatus.hidden = true;
  state.map.easeTo({ ...DEFAULT_VIEW, duration: 1200, padding: { top: 20, left: isMobile() ? 20 : 420, right: 20, bottom: 20 } });
}

function showLocationStatus(message) {
  el.locationStatus.textContent = message;
  el.locationStatus.hidden = !message;
}

function locateUser() {
  setLegendOpen(false);
  if (!state.map) { showLocationStatus("The map is not ready yet. Try again shortly."); return; }
  if (!navigator.geolocation || !window.isSecureContext) {
    showLocationStatus("Location is unavailable. Open the secure preview in your browser.");
    return;
  }
  const map = state.map;
  el.locate.disabled = true;
  showLocationStatus("Finding your location…");
  if (state.locationMarker) { state.locationMarker.remove(); state.locationMarker = null; }
  navigator.geolocation.getCurrentPosition((position) => {
    el.locate.disabled = false;
    if (state.map !== map) { showLocationStatus("The map restarted. Please try again."); return; }
    const { longitude, latitude } = position.coords;
    const marker = document.createElement("div");
    marker.className = "user-location-marker";
    marker.setAttribute("aria-label", "Your approximate location");
    state.locationMarker = new maplibregl.Marker({ element: marker, anchor: "center" }).setLngLat([longitude, latitude]).addTo(map);
    map.setMaxBounds(null);
    closeCard();
    if (isMobile()) setMobileView("map");
    map.easeTo({ center: [longitude, latitude], zoom: Math.max(map.getZoom(), 14), pitch: 0, duration: 1000, padding: { top: 40, left: isMobile() ? 20 : 420, right: 20, bottom: isMobile() ? 200 : 20 } });
    showLocationStatus("Approximate location shown. Tap the target to update it.");
  }, (error) => {
    el.locate.disabled = false;
    const message = error.code === 1 ? "Location permission is off. Allow it in your browser settings to show your position." : error.code === 3 ? "Location timed out. Please try again." : "Your location is unavailable. Check your device settings and try again.";
    showLocationStatus(message);
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
}

function bindEvents() {
  document.querySelectorAll("[data-itinerary]").forEach((button) => button.addEventListener("click", () => openCityWalk(button.dataset.itinerary)));
  document.getElementById("open-wukang-walk").addEventListener("click", () => selectPlace("SH012"));
  document.getElementById("open-anfu-walk").addEventListener("click", () => selectPlace("SH011"));
  document.getElementById("open-wulumuqi-walk").addEventListener("click", () => selectPlace("SH010"));
  document.getElementById("open-yanqing-walk").addEventListener("click", () => selectPlace("SH007"));
  document.getElementById("open-wuyuan-walk").addEventListener("click", () => selectPlace("SH009"));
  document.getElementById("open-xinle-walk").addEventListener("click", () => selectPlace("SH006"));
  document.getElementById("open-changshu-walk").addEventListener("click", () => selectPlace("SH008"));
  document.getElementById("open-huaihai-walk").addEventListener("click", () => selectPlace("SH013"));
  document.getElementById("open-changle-walk").addEventListener("click", () => selectPlace("SH004"));
  document.getElementById("open-fumin-walk").addEventListener("click", () => selectPlace("SH005"));
  document.getElementById("open-bund-walk").addEventListener("click", () => selectPlace("SH002"));
  document.getElementById("open-creek-walk").addEventListener("click", () => selectPlace("SH003"));
  document.getElementById("open-xintiandi-walk").addEventListener("click", () => selectPlace("SH014"));
  document.getElementById("open-concession-walk").addEventListener("click", () => selectPlace("SH001"));
  el.search.addEventListener("input", () => {
    state.query = el.search.value.trim().toLowerCase();
    applyFilters();
  });
  el.chips.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cat]");
    if (!button) return;
    state.category = button.dataset.cat;
    renderChips();
    applyFilters();
  });
  el.hidden.addEventListener("change", () => {
    state.showHidden = el.hidden.checked;
    applyFilters();
  });
  el.favoritesFilter.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    el.favoritesFilter.setAttribute("aria-pressed", String(state.favoritesOnly));
    el.favoritesFilter.textContent = state.favoritesOnly ? "Showing only these" : "Show only these";
    applyFilters();
  });
  el.clearFilters.addEventListener("click", () => {
    state.query = "";
    state.category = "All";
    state.showHidden = false;
    state.favoritesOnly = false;
    el.search.value = "";
    el.hidden.checked = false;
    el.favoritesFilter.setAttribute("aria-pressed", "false");
    el.favoritesFilter.textContent = "Show only these";
    renderChips();
    applyFilters();
  });
  el.favoritesList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    selectPlace(button.dataset.id);
  });
  el.list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    selectPlace(button.dataset.id);
  });
  document.querySelectorAll(".mobile-bar [data-mobile-view]").forEach((button) => button.addEventListener("click", () => {
    closeCard();
    setMobileView(button.dataset.mobileView);
  }));
  let sheetDragged = false;
  el.sheetSize.addEventListener("click", () => {
    if (sheetDragged) { sheetDragged = false; return; }
    const next = el.sidebar.dataset.sheet === "peek" ? "half" : el.sidebar.dataset.sheet === "half" ? "full" : "peek";
    if (next !== "peek" && el.sidebar.dataset.mobileView === "map") setMobileView("places", next);
    else setSheetSize(next);
  });
  el.sheetCollapse.addEventListener("click", () => setSheetSize("peek"));
  el.search.addEventListener("focus", () => { if (isMobile()) setMobileView("places", "half"); });
  let sheetStartY = null;
  el.sheetSize.addEventListener("pointerdown", (event) => { sheetStartY = event.clientY; sheetDragged = false; el.sheetSize.setPointerCapture(event.pointerId); });
  el.sheetSize.addEventListener("pointerup", (event) => {
    if (sheetStartY === null || Math.abs(event.clientY - sheetStartY) < 35) return;
    const upward = event.clientY < sheetStartY;
    sheetDragged = true;
    sheetStartY = null;
    setMobileView(el.sidebar.dataset.mobileView === "map" && upward ? "places" : el.sidebar.dataset.mobileView, upward ? "full" : "peek");
  });
  el.sheetSize.addEventListener("pointercancel", () => { sheetStartY = null; sheetDragged = false; });
  el.reset.addEventListener("click", resetView);
  el.locate.addEventListener("click", locateUser);
  el.legendToggle.addEventListener("click", () => setLegendOpen(el.legend.hidden));
  document.getElementById("legend-close").addEventListener("click", () => { setLegendOpen(false); el.legendToggle.focus(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCard();
      setSidebarOpen(false);
    }
  });
}

function setLegendOpen(open) {
  if (open) el.locationStatus.hidden = true;
  el.legend.hidden = !open;
  el.legendToggle.setAttribute("aria-expanded", String(open));
}

function setSidebarOpen(open) {
  el.sidebar.classList.toggle("open", open);
}

function setSheetSize(size) {
  el.sidebar.dataset.sheet = size;
  el.sheetSize.setAttribute("aria-label", size === "full" ? "Collapse browsing panel" : "Expand browsing panel");
  el.sheetSize.innerHTML = size === "full" ? 'Collapse <span aria-hidden="true">⌄</span>' : 'Expand <span aria-hidden="true">⌃</span>';
}

function setMobileView(view, size = view === "map" ? "peek" : "half") {
  el.sidebar.dataset.mobileView = view;
  el.sidebar.scrollTop = 0;
  el.sheetTitle.textContent = { map: "Explore Shanghai", places: "Places", favorites: "Michael’s Favorites", walks: "City Walks" }[view];
  document.querySelectorAll(".mobile-bar [data-mobile-view]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mobileView === view)));
  document.querySelector(".walks-entry").open = view === "walks";
  el.favoritesList.closest("details").open = view === "favorites";
  setSheetSize(size);
}

function exposeDebug() {
  const wasReady = window.__HAUGE__?.ready === true;
  window.__HAUGE__ = {
    ready: wasReady,
    get map() {
      return state.map;
    },
    get selectedId() {
      return state.selectedId;
    },
    getVisible() {
      return visiblePlaces();
    },
    favoriteIds: [...FAVORITE_IDS],
    get favoritesOnly() {
      return state.favoritesOnly;
    },
    setFavoritesOnly(value) {
      state.favoritesOnly = Boolean(value);
      el.favoritesFilter.setAttribute("aria-pressed", String(state.favoritesOnly));
      el.favoritesFilter.textContent = state.favoritesOnly ? "Showing only these" : "Show only these";
      applyFilters();
    },
    selectPlace,
    search(query) {
      el.search.value = query;
      state.query = query.trim().toLowerCase();
      applyFilters();
      return visiblePlaces().map((place) => place.id);
    },
    showHidden(value) {
      el.hidden.checked = value;
      state.showHidden = value;
      applyFilters();
    },
    queryBuildings() {
      return state.map ? state.map.queryRenderedFeatures({ layers: ["building-3d"] }) : [];
    },
    get counts() {
      return state.meta?.counts;
    },
  };
}

function showMapStatus(status, title, detail, showRetry = false) {
  if (!el.mapStatus) return;
  el.mapStatus.dataset.state = status;
  el.mapStatus.hidden = status === "hidden";
  if (el.mapStatusTitle && title != null) el.mapStatusTitle.textContent = title;
  if (el.mapStatusDetail && detail != null) el.mapStatusDetail.textContent = detail;
  if (el.mapStatusRetry) el.mapStatusRetry.hidden = !showRetry;
}

function hideMapStatus() {
  showMapStatus("hidden", "", "", false);
}

function resizeMap() {
  if (!state.map) return;
  try {
    state.map.resize();
  } catch (error) {
    console.warn("map.resize failed", error);
  }
}

function bindViewport() {
  window.addEventListener("resize", resizeMap);
  window.addEventListener("orientationchange", () => {
    window.setTimeout(resizeMap, 200);
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", resizeMap);
  }
}

function baseMapOptions(overrides = {}) {
  return {
    container: "map",
    style: "./styles/shanghai-night.json",
    center: DEFAULT_VIEW.center,
    zoom: DEFAULT_VIEW.zoom,
    pitch: overrides.pitch ?? DEFAULT_VIEW.pitch,
    bearing: DEFAULT_VIEW.bearing,
    minZoom: 11,
    maxZoom: 18,
    maxBounds: [
      [121.3, 31.12],
      [121.62, 31.32],
    ],
    attributionControl: false,
    hash: false,
    cooperativeGestures: false,
    trackResize: true,
    ...overrides,
  };
}

function applyMapAtmosphere(map) {
  try {
    map.setLight({
      anchor: "viewport",
      color: "#b8d4ff",
      intensity: 0.38,
      position: [1.35, 210, 30],
    });
  } catch (error) {
    console.warn("setLight not applied", error);
  }
  try {
    if (typeof map.setSky === "function") {
      map.setSky({
        "sky-color": "#141018",
        "horizon-color": "#2a1c14",
        "fog-color": "#1a1410",
        "sky-horizon-blend": 0.7,
        "horizon-fog-blend": 0.5,
        "fog-ground-blend": 0.35,
      });
    }
  } catch (error) {
    console.warn("setSky not applied", error);
  }
}

function attachMapLifecycle(map, { allow2dFallback = true } = {}) {
  let sourceErrors = 0;
  let settled = false;

  const succeed = () => {
    if (settled) return;
    settled = true;
    if (window.__HAUGE__) {
      window.__HAUGE__.ready = true;
      window.__HAUGE__.buildingCount = window.__HAUGE__.queryBuildings().length;
    }
    document.body.dataset.mapReady = "true";
    hideMapStatus();
  };

  const fail = (title, detail) => {
    if (document.body.dataset.mapReady === "true") return;
    settled = true;
    showMapStatus("error", title, detail, true);
  };

  map.on("error", (event) => {
    sourceErrors += 1;
    console.error(event.error || event);
  });

  map.on("load", () => {
    applyMapAtmosphere(map);
    addAreaHighlights(map);
    resizeMap();
    requestAnimationFrame(resizeMap);
    updatePadding();
    updateMarkers();
    map.once("idle", () => {
      let rendered = [];
      try {
        rendered = map.queryRenderedFeatures();
      } catch (error) {
        console.warn("queryRenderedFeatures failed", error);
      }
      const buildings = window.__HAUGE__ ? window.__HAUGE__.queryBuildings().length : 0;
      if (rendered.length === 0 && sourceErrors > 0) {
        fail(
          "The map tiles couldn’t load",
          "Streets and buildings didn’t arrive. Check your connection and try again."
        );
        return;
      }
      if (window.__HAUGE__) window.__HAUGE__.buildingCount = buildings;
      succeed();
    });
  });

  map.on("click", (event) => {
    const areas = map.getLayer("area-highlights") ? map.queryRenderedFeatures(event.point, { layers: ["area-highlights"] }) : [];
    if (areas.length) {
      const selectedArea = areas.find((area) => area.properties.id === state.selectedId);
      selectPlace((selectedArea || areas[0]).properties.id, false);
      return;
    }
    closeCard();
  });

  const canvas = map.getCanvas?.();
  if (canvas) {
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      if (allow2dFallback) {
        showMapStatus("loading", "Switching to a simpler map…", "The 3D view couldn’t stay active on this device.");
        window.setTimeout(() => startMap({ pitch: 0, maxPitch: 0, pixelRatio: 1 }, { allow2dFallback: false }), 50);
      } else {
        fail("The map lost its graphics context", "Try again on this device, or reload the page.");
      }
    });
  }

  window.setTimeout(() => {
    if (!settled) {
      fail("The map is taking too long", "The streets still haven’t appeared. Try again.");
    }
  }, 20000);
}

function startMap(overrides = {}, lifecycle = { allow2dFallback: true }) {
  state.locationMarker = null;
  if (state.map) {
    try {
      state.map.remove();
    } catch (error) {
      console.warn("previous map remove failed", error);
    }
    state.map = null;
  }
  const map = new maplibregl.Map(baseMapOptions(overrides));
  state.map = map;
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true, showCompass: true }), "top-right");
  map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
  attachMapLifecycle(map, lifecycle);
  return map;
}

async function init() {
  showMapStatus("loading", "Loading the map…", "Fetching streets and buildings for Shanghai.");
  exposeDebug();
  bindViewport();
  if (el.mapStatusRetry) {
    el.mapStatusRetry.addEventListener("click", () => {
      window.location.reload();
    });
  }

  const dataPromise = fetch("./data/places.json").then((response) => {
    if (!response.ok) throw new Error("Could not load places.json");
    return response.json();
  });

  if (typeof maplibregl === "undefined") {
    showMapStatus("error", "The map library failed to load", "The mapping script never arrived. Try again.", true);
  } else {
    try {
      startMap();
    } catch (error) {
      console.error(error);
      try {
        showMapStatus("loading", "Trying a simpler map…", "3D isn’t available, so this view stays flat.");
        startMap({ pitch: 0, maxPitch: 0, pixelRatio: 1 }, { allow2dFallback: false });
      } catch (fallbackError) {
        console.error(fallbackError);
        showMapStatus("error", "The map couldn’t start", "This browser couldn’t create the map view. Try again.", true);
      }
    }
  }

  try {
    const data = await dataPromise;
    state.meta = data.meta;
    state.places = data.places;
    state.byId = new Map(state.places.map((place) => [place.id, place]));
    updateLede();
    renderChips();
    renderFavorites();
    renderList();
    bindEvents();
    exposeDebug();
    updateMarkers();
  } catch (error) {
    console.error(error);
    el.lede.textContent = "The map data failed to load.";
    showMapStatus("error", "Place data couldn’t load", "Recommendations didn’t arrive. Try again.", true);
  }
}

init().catch((error) => {
  console.error(error);
  el.lede.textContent = "The map data failed to load.";
  showMapStatus("error", "The map couldn’t start", "Something went wrong while opening Shanghai. Try again.", true);
});
