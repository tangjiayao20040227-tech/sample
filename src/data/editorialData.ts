export interface CommentItem {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  text: string;
  recommends: number;
  isEditorPick?: boolean;
}

export interface ArticleData {
  id: string;
  section: string;
  kicker: string;
  updated?: string;
  headline: string;
  summary: string;
  byline: string;
  readTime: string;
  image?: string;
  imageAlt?: string;
  imageLocation?: string;
  imageCaption?: string;
  gallery?: { src: string; alt: string; caption: string }[];
  takeaways?: string[];
  audioDuration?: string;
  audioTitle?: string;
  isOpinion?: boolean;
  commentCount?: number;
  pullQuote?: {
    quote: string;
    attribution: string;
  };
  body: string[];
  comments: CommentItem[];
}

export interface AudioTrack {
  id: string;
  show: string;
  title: string;
  summary: string;
  duration: string;
  durationSeconds: number;
  date: string;
  narrator: string;
  image: string;
  articleId?: string;
  transcript: string[];
}

export interface RecipeData {
  id: string;
  kicker: string;
  title: string;
  byline: string;
  time: string;
  yield: string;
  rating: number;
  ratingCount: number;
  description: string;
  image: string;
  imageAlt: string;
  ingredients: string[];
  steps: { title: string; instruction: string }[];
  notes: { author: string; text: string; timeAgo: string }[];
}

export const IMAGES = {
  profile:
    'https://lh3.googleusercontent.com/aida/AEtjO1UHrrwQD-_IRkQJ48SnH_-i5i2e2sUxH1uN9sxwMvZ-5-TxiUQXF1PjodCbAzaDZJDqjQjXxWJqlslhg8CvpigdWTrZNbiFRg9XY9CPiySM_1lbr8N_IpEm1xe-7vxYqiqi6Pf1eWchO_EX_ng7I5WH_frI_aY0SPQzJQjE0DwQePUCml3ZgbR6-DTNWAJEjHfZoWMMnJ1RiRWyK-Mnq2-jAl6Hm-HrTGyK5jdo1aHJe3negmHuVLN_AIIt',
  riyadhSummit:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA7THjCQnmq9MZjLvs5VKKnhK5IUwrvB_V5ix9GbraSK-7fN-KH1ZV_pK6_qqIf72ILR-zYGJUB5KRJ4FxJmgrSDtl9kTkBq_Aa9C4_APLzE9-W21HfTDrBQle9L1yZ7NTchG0csAMI7YFEVTynpJs_oP4XrPQq9rchyUcJaLpH5DTBdf_lMJSTonyxsMW3pgazuSINrJb5BgubTVrbf8qB8gdWAP8Cfw9iiruNAKuAasVbuDEEvR0giw',
  senateDebate:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCguuVLQ6ecQ0mBDWIwzHThbXSLcZ2kup4Ws33EtRrdqJhPXqgAAcqRqU_0veTRDB_Y-i1GeTFGC0Nn1nTlbf758PRAExUn3cJZEJ8J53mJSfbJHEVS8-wOIqNUl16Ef12R3uInh9eYxw-bSMUFXwxEKCFdapXlmYSsA5Z0Su5j5txv1aTU8V9QYgnXXC3YeLGUNTZJEuGZhBstTLo43Vo88uURUaAz0_wHkjy8vrkj1MIC8yuo0dYDww',
  sledDogs:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9-mfWbyXRjam-5zto4I23SvilyHan0AFkC5bADL5fky28CXSGUcnGsRjsm_OqIDelaYseV27AR8LME0F3rMZ6I5SQ6EsPdzKyNw_NWDMGKR8mASxNm4Ibp32saoNetQKMg0WZ62bPVp_87rBRTaYR10A1W_zi2K7XdDLgH3y83xtvgX6E4GPVBkUjIAlIzjGmn7VkaxGMCAIe811Y68z1ZRyRJ8jQhOWNgSPjnlvOf0xUgPP6KOMCRA',
  inuit1:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBUF7ND9EZO3o9e8XhrYuMf0tS_U01XNp0WQsxSPR34u0ivVax2waaj4ks5iO_txLaCYSM2753MdbtCje29p2bXcS5HtvkMo9zNns6EsRQWo1mXfbvv5UBz7I7wBCzsdskh5sfCi0LUBOHXdbY7hNxnQN0l35oXOUY9SIAUay6TBCm_gf3K5OT6ySKC3aLz895VLlh-bN4uRjsGt0CdccLOqtIV2RX5st39mFjl3s0FGTFq6majSzGI4w',
  inuit2:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDr4-Me2-xNmbVvjKHWtL8iAr2FcF8YcHa1nyYLDFPSjT8Kg8x5WZi_gFp4fT8kWbk8nPKG9Fn7D1DmeW5b0-fN3iD1nH0wsXRMwT_hafR31okWVR3FHSVKMHANuf7tkZNtP-HDZaupKEe5pSj5VCU8sHBILxOZO28KGXSlAZKwtapekialRWsLuv9eJxzhptEclX5DvwG8gcf8tx4scxj7dsJOkf8q2b-Iyt7dNzFsvX7WjtMMOVTYog',
  inuit3:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBAxPY7xxVLxXxAE3sG694b1vST1vmemQMfgw1ZTfMOTrbVhvGy9Zbq4qaCjpQUVhUhZgCk5fjeELP05PhqDXatkacaSOfxP7X4G3XsisN5pEJIvYO6XRvbFFjAaOYEUpbk-N--_docfxBZb6AbwP2U1T6R_C6BVOARv4XVqFJCANyRuTyM582eD-sbAdYfllCI3b9p5PwqxQsYAK2jcFrtNzSQF_fXlY4rvLrEFQV4vLnDw3_kn1Y66Q',
  rooster:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBacyP01H6YZGMqdcn8qQEWkPBpabHfiQbSxBWFPNvw99PEB0WFs5d-d_PKAqiflKFFsrDGzuSYnlDJHf1PFzEuhIi1tVLYj1FVEZsyDk8XEMcZhXdYTnW2qZksHZl3cxlf1odPGpJiWcY2SWjl6Zv7AqpRUGzQIwnDahUSU0K-9S7BLdNo-5_nNjtn8D2BPVXwAV1Pejqhi-gESY9p8zks2w4UEwBXV_wbq1uWA4lF7u9tGdWYwvRbdg',
  tiramisu:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDpGQORKf31HzlXa4S0Po5td2H38gLWqFf5hqkN--1TIOKjsvtGR42MfCvnVKvVr80atFk2imDy6B2lQWFLCRmgn-0-ZM7Us5UBtJpg-Ufx6ImbPQtkBfK7gEhuBwCjeRUIFKfFBkQmvigN1MT3cRR9CCPI_rTneXfWtyHN54KjbR9fBvpW7xIyxmTtw2PlVaztvGDfvj8wZOyI_ZS1wwmgZN5FXIHYso0fZnmlqeg2ARdd6MqmuECMIg',
  lions:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_Wj7ZFkH16-k1L7gKsIm_N3amD9ZMAPNIA2myY1i41g6l2PXhfZ3GD1_zjjUIxEYjmlvgM_sjBmV6Ou7tWkfD3OkdObVXOhuCBdt8PcO-vwMqEe82lSgL_4rO-l_d_WDHBQp_vGS3fjQPXS0mJn3Z3F_b60oSLEGy72XOIfw_yarOpOE0FsFIMuHGJwVIHUp7BDJwkGspFDS58FAjcUcBcmYpAf-sW3j6Qda27DPAtWTZeJplXysdtg',
};

export const ARTICLES: Record<string, ArticleData> = {
  'saudi-yemeni-airports': {
    id: 'saudi-yemeni-airports',
    section: 'World',
    kicker: 'The World • Analysis',
    updated: 'Updated 14m ago',
    headline: 'Saudi and Yemeni Airports Are Hit in New Round of Strikes',
    summary:
      'At least one person was killed in the Saudi capital, Riyadh, kingdom authorities said. The Houthis said Saudi aircraft hit the Yemeni capital’s airport.',
    byline: 'Cynthia Silva & Zach Wasser',
    readTime: '3 min read',
    image: IMAGES.riyadhSummit,
    imageAlt:
      'Diplomatic assembly and high-level regional summit in Riyadh, Saudi Arabia, delegates in formal business suits and traditional thobes seated before grand illuminated conference screen',
    imageLocation: 'Riyadh, Saudi Arabia',
    imageCaption: 'Summit hall amid escalating regional aviation strikes',
    takeaways: [
      'Riyadh’s air defense systems intercepted multiple drones, but civilian terminals suffered structural damage.',
      'Sana’a international airport sustained direct runway strikes, halting humanitarian food transport.',
    ],
    audioDuration: '3:42',
    audioTitle: 'Listen to This Story',
    commentCount: 318,
    pullQuote: {
      quote:
        'Commercial aviation corridors across the Arabian Peninsula now sit at the fault line of a rapidly shifting deterrence Contest.',
      attribution: 'Dr.Tariq Al-Mousa, Gulf Security Institute',
    },
    body: [
      'RIYADH, Saudi Arabia — Long-range drone and missile exchanges struck major aviation hubs in both Saudi Arabia and Yemen early Monday, shattering months of tenuous calm along the Red Sea corridor and threatening commercial flight paths across the Arabian Peninsula.',
      'Saudi civil defense officials confirmed that at least one civilian died and seven others were wounded when falling debris from intercepted aerial drones pierced the outer concourse of King Khalid International Airport on the northern outskirts of Riyadh.',
      'Within hours, witnesses in Sana’a, the Houthi-controlled Yemeni capital, reported heavy aerial bombardments targeting the main runway and radar installations at Sana’a International Airport. United Nations relief coordinators warned that the cratered tarmac had forced an immediate suspension of humanitarian cargo flights.',
      'The strikes occurred just as regional finance ministers and infrastructure delegates convened in Riyadh to review flagship commercial aviation investments tied to Crown Prince Mohammed bin Salman’s Vision 2030 economic transformation program.',
      'Western diplomats in the region scrambled to open back-channel de-escalation lines through Muscat, warning that sustained attacks on civilian airfields could trigger an insurance freeze on commercial carriers operating over the Gulf.',
    ],
    comments: [
      {
        id: 'c1',
        author: 'Marcus Vance',
        location: 'Washington, D.C.',
        timeAgo: '18m ago',
        text: 'Targeting dual-use and civilian airport infrastructure immediately impacts humanitarian relief into Sana’a while raising insurance premiums for every international carrier flying the Europe-Asia route.',
        recommends: 84,
        isEditorPick: true,
      },
      {
        id: 'c2',
        author: 'Nadia Al-Harthi',
        location: 'London',
        timeAgo: '32m ago',
        text: 'The timing during the Riyadh regional cooperation summit is hardly coincidental. Economic flagship projects depend entirely on the perception of airspace security.',
        recommends: 59,
      },
    ],
  },
  'saudi-strategic-analysis': {
    id: 'saudi-strategic-analysis',
    section: 'World',
    kicker: 'Strategic Analysis',
    updated: 'Updated 42m ago',
    headline: 'Saudi Arabia Has Few Options as Houthis Aim at Heart of Its Ambitions',
    summary:
      'Vision 2030 projects and aviation corridors confront heightened geopolitical vulnerabilities after months of fragile detente.',
    byline: 'Vivian Nereim & Eric Schmitt',
    readTime: '6 min read',
    image: IMAGES.riyadhSummit,
    imageLocation: 'Riyadh, Saudi Arabia',
    imageCaption: 'Delegates gather at the Riyadh regional summit as air defense alerts sound across the capital.',
    commentCount: 194,
    pullQuote: {
      quote:
        'You cannot build a global tourism and logistics hub while air raid sirens interrupt boarding calls.',
      attribution: 'Senior Gulf Diplomatic Envoy',
    },
    body: [
      'For the past two years, Saudi Arabia’s leadership has pursued a deliberate strategy of regional de-escalation, seeking to extricate the kingdom from a costly war in Yemen so it could pour hundreds of billions of dollars into futuristic megaprojects, global airlines, and international summits.',
      'Monday’s exchanges exposed the central vulnerability of that pivot: the Houthis retain the capability to hold the kingdom’s economic centerpiece at risk with low-cost unmanned systems.',
      'If Riyadh responds with a sustained air campaign, it risks unravelling the diplomatic normalization tracks that have underpinned foreign investor confidence. Yet if it absorbs strikes on its flagship international airport without a decisive deterrent response, international airlines may reroute hubs to Dubai or Doha.',
      'Defense analysts note that while Patriot and short-range laser batteries intercepted the majority of incoming projectiles, even minor debris damage at an international terminal carries disproportionate strategic weight.',
    ],
    comments: [
      {
        id: 'c3',
        author: 'David K.',
        location: 'New York',
        timeAgo: '1h ago',
        text: 'The asymmetry in cost between a $20,000 long-range drone and a multi-million-dollar interceptor missile remains the defining strategic dilemma of modern air defense.',
        recommends: 112,
        isEditorPick: true,
      },
    ],
  },
  'texas-tiktok-talarico': {
    id: 'texas-tiktok-talarico',
    section: 'Politics',
    kicker: 'Texas Senate Spotlight',
    updated: 'Updated 1h ago',
    headline: 'On Texas TikTok, It’s All About Talarico',
    summary:
      'There is a lively social media debate about one of this year’s most-watched Senate races — and James Talarico in particular.',
    byline: 'Shane Goldmacher',
    readTime: '4 min read',
    commentCount: 276,
    pullQuote: {
      quote:
        'A 45-second vertical clip from a rural town hall now travels faster in Texas than a $5 million television ad buy in Dallas-Fort Worth.',
      attribution: 'Shane Goldmacher, National Political Correspondent',
    },
    body: [
      'AUSTIN, Tex. — Scroll through political TikTok in Texas this October and you will quickly encounter a familiar cadence: a former public school teacher and seminarian leaning against a pickup truck or holding a microphone in a crowded church basement, debating scripture, school vouchers, and Senate politics.',
      'James Talarico has turned short-form vertical video into the primary battleground of the 2026 midterm cycle in Texas, generating tens of millions of organic views across ideological lines and forcing both national parties to rethink how statewide campaigns allocate media budgets.',
      'While traditional television spending in the Houston and Dallas media markets still tops $40 million this month, campaign strategists say the real persuasion war is unfolding in algorithmically driven comment threads and duets.',
      'Younger voters and suburban independents surveyed in recent Times/Siena focus groups cited unscripted town-hall clips—rather than 30-second broadcast spots—as their main source of information on the candidates.',
    ],
    comments: [
      {
        id: 'c4',
        author: 'Elena Rodriguez',
        location: 'Austin, TX',
        timeAgo: '45m ago',
        text: 'Whether you agree with his platform or not, showing up unedited in hostile rooms and answering questions calmly resonates with Texans tired of scripted soundbites.',
        recommends: 165,
        isEditorPick: true,
      },
    ],
  },
  'sc-senate-debate': {
    id: 'sc-senate-debate',
    section: 'Politics',
    kicker: 'South Carolina',
    updated: 'Updated 2h ago',
    headline: '5 Takeaways From the Senate Debate',
    summary: 'Heated exchanges over rural health and infrastructure funding.',
    byline: 'maya King',
    readTime: '4 min read',
    image: IMAGES.senateDebate,
    imageAlt: 'Heated political debate stage with podiums and broadcast television cameras',
    imageLocation: 'Columbia, South Carolina',
    imageCaption: 'Candidates clashed for 90 minutes over hospital closures and manufacturing tariffs.',
    commentCount: 89,
    body: [
      'COLUMBIA, S.C. — In a fiery 90-minute televised debate on Sunday evening, South Carolina’s Senate contenders traded sharp barbs over rural hospital closures, semiconductor manufacturing subsidies, and agricultural trade tariffs.',
      '1. Rural health care took center stage: Both candidates acknowledged that the closure of three county medical centers since 2024 has left thousands of residents more than 45 minutes from emergency obstetric care.',
      '2. Infrastructure dollars remain politically complicated: While arguing for fiscal restraint in Washington, both podiums claimed credit for the interstate freight corridor expansion linking Charleston’s port to Upstate logistics hubs.',
      '3. National party labels vs. local pragmatism: Moderators pressed the candidates repeatedly on whether they would break with party leadership on debt ceiling negotiations next spring.',
    ],
    comments: [
      {
        id: 'c5',
        author: 'Thomas Pickens',
        location: 'Greenville, SC',
        timeAgo: '2h ago',
        text: 'Glad the moderators spent a full 20 minutes on rural hospital solvency. That is the number one issue in our county.',
        recommends: 41,
      },
    ],
  },
  'wilderness-adventure-dogs': {
    id: 'wilderness-adventure-dogs',
    section: 'The Great Read',
    kicker: 'The Great Read',
    headline: 'He Went Out on an Epic Wilderness Adventure. Only His Dogs Came Back.',
    summary:
      'For three years and 750 miles, Steffen Skjottelvik lived a life of adventure. Until the adventure took his life.',
    byline: 'Steffen Skjottelvik Archive',
    readTime: '14 min read',
    image: IMAGES.sledDogs,
    imageAlt: 'Expansive frozen subarctic Canadian wilderness with snowcapped taiga, lonely sled dogs standing vigil',
    imageLocation: 'Northern Manitoba & Nunavut Border',
    imageCaption: 'Skjottelvik’s team of Alaskan huskies along the subarctic treeline during his second winter.',
    audioDuration: '18:15',
    audioTitle: 'Listen to The Great Read',
    commentCount: 512,
    pullQuote: {
      quote:
        'Out here, the map is only a polite suggestion. The ice decides when you move, and the dogs decide how far.',
      attribution: 'From the field journals of Steffen Skjottelvik',
    },
    body: [
      'When the two huskies trotted out of the willow scrub near the trading post at Hudson Bay in late August, their harnesses were still clipped to a frayed gangline coated in river silt. Of the 29-year-old Norwegian outdoorsman who had led them across 750 miles of trackless subarctic tundra and boreal bog, there was no sign.',
      'For three years, Steffen Skjottelvik had documented an old-world expedition across the northernmost reaches of Scandinavia and North America, traveling by wooden sled in winter and pack-dog travois through the brief, mosquito-thick summers.',
      'Drawn from his recovered waterproof notebooks, satellite check-ins, and interviews with the trappers and Inuit hunters who hosted him along the way, this is the story of a modern romantic who sought total self-reliance in a warming, unpredictable North.',
      'During his final crossing of the swollen Hayes River watershed, unseasonable late-summer rains had transformed normally fordable gravel bars into churning glacial torrents. Yet his final journal entry, written by candlelight inside a canvas lavvu tent, radiated quiet contentment.',
    ],
    comments: [
      {
        id: 'c6',
        author: 'Kari Lindqvist',
        location: 'Oslo, Norway',
        timeAgo: '3h ago',
        text: 'An unforgettable piece of reporting. His reverence for his dogs and the elders who advised him along the trail shines through every page.',
        recommends: 342,
        isEditorPick: true,
      },
    ],
  },
  'inuit-culture-iqaluit': {
    id: 'inuit-culture-iqaluit',
    section: 'Arts',
    kicker: 'Arctic Canada • Culture',
    headline: 'What Does It Mean to Be Inuit Now?',
    summary:
      'In Iqaluit, the only city in Canada’s Arctic, a new generation of Inuit writers and artists is turning to questions of language, land and identity.',
    byline: 'Photos by Renaud Philippe',
    readTime: '6 min read',
    image: IMAGES.inuit1,
    imageLocation: 'Iqaluit, Nunavut',
    imageCaption: 'A soapstone carver works by natural fjord light in an Iqaluit studio.',
    gallery: [
      {
        src: IMAGES.inuit1,
        alt: 'Young Inuit artist carving soapstone sculpture inside warm creative studio in Iqaluit Nunavut',
        caption: 'Fig. 1 — Master carver Elisapee Kakee shaping serpentine stone in her Frobisher Bay studio.',
      },
      {
        src: IMAGES.inuit2,
        alt: 'Colorful Arctic homes along snowy tundra shoreline of Frobisher Bay in Iqaluit',
        caption: 'Fig. 2 — Twilight settles over the painted timber houses along the shoreline of Iqaluit.',
      },
      {
        src: IMAGES.inuit3,
        alt: 'Traditional Inuit parkas and handmade modern textile fashion displayed in northern community gathering center',
        caption: 'Fig. 3 — Contemporary sealskin and wool amauti parkas designed by young Nunavut couturiers.',
      },
    ],
    commentCount: 94,
    body: [
      'IQALUIT, Nunavut — Along the rocky shore of Frobisher Bay, where freighters unload a year’s worth of building supplies before the sea ice locks in each autumn, a cultural renaissance is reshaping Canada’s youngest territorial capital.',
      'Inside converted shipping containers, community printmaking co-ops, and independent publishing houses, artists in their 20s and 30s are blending Inuktitut oral traditions with contemporary cinema, textile couture, and monumental sculpture.',
      '“Our grandparents fought to ensure our language survived residential schools,” said Taqralik Partridge, a curator and poet in Iqaluit. “Our generation’s task is to build institutions that belong to us—on our own terms, in our own dialect.”',
    ],
    comments: [],
  },
  'opinion-europe-identity': {
    id: 'opinion-europe-identity',
    section: 'Opinion',
    kicker: 'Guest Essay',
    headline: '‘It’s the Identity, Stupid!’: 3 Writers on Europe’s Rising Far Right',
    summary:
      'Economic grievances alone don’t explain populist ascents across the continent. Deep-rooted cultural anxieties are reshaping the electorate.',
    byline: 'Broder, de Gruyter, Ferraresi & Schneider',
    readTime: '9 min read',
    isOpinion: true,
    commentCount: 142,
    pullQuote: {
      quote:
        'Voters are not merely asking how the welfare state is funded; they are asking who constitutes the “we” that shares it.',
      attribution: 'Caroline de Gruyter, European Affairs Columnist',
    },
    body: [
      'For over a decade, mainstream European social democrats and center-right technocrats shared a comforting assumption: if governments could stabilize energy bills, subsidize green industrial jobs, and cushion inflation, populist challengers on the nationalist right would naturally lose their appeal.',
      'Recent regional and parliamentary ballots from eastern Germany to France, Austria, and the Netherlands have demolished that thesis. Even in regions enjoying record-low unemployment and generous industrial subsidies, nationalist parties have surged.',
      'In this roundtable essay, our contributors examine how rapid demographic change, the erosion of local civic institutions—schools, parish halls, local newspapers—and anxiety over national sovereignty have eclipsed traditional pocketbook voting.',
    ],
    comments: [
      {
        id: 'c7',
        author: 'Henrik Lind',
        location: 'Copenhagen',
        timeAgo: '1h ago',
        text: 'When traditional parties refuse to discuss integration and civic cohesion openly, they cede the entire vocabulary of belonging to the extremes.',
        recommends: 128,
        isEditorPick: true,
      },
    ],
  },
  'opinion-grocery-bill': {
    id: 'opinion-grocery-bill',
    section: 'Opinion',
    kicker: 'Economic Commentary',
    headline: 'Why Your Grocery Bill Will Get Worse',
    summary:
      'Persistent supply chain friction, fertilizer constraints, and climate shocks mean food costs are decoupling from top-line inflation metrics.',
    byline: 'By Kathleen Kingsbury and Peter R. Orszag',
    readTime: '5 min read',
    isOpinion: true,
    commentCount: 201,
    pullQuote: {
      quote:
        'Core inflation may look tamed on a central bank terminal, but at the supermarket checkout counter, structural scarcity is the new baseline.',
      attribution: 'Kathleen Kingsbury & Peter R. Orszag',
    },
    body: [
      'Central bankers have spent much of 2026 celebrating the gradual return of headline inflation toward their 2 percent target. Yet ask almost any household about the weekly supermarket receipt and you will hear a starkly different economic reality.',
      'From olive oil and cocoa to citrus, beef, and nitrogen-dependent grains, global agricultural supply chains are experiencing repeated supply-side shocks driven by multi-year droughts, aquifer depletion, and fragmented maritime trade routes.',
      'Monetary policy is a blunt instrument designed to cool excess aggregate demand. It cannot make rain fall in Andalusia or replenish cattle herds in the American Plains.',
    ],
    comments: [
      {
        id: 'c8',
        author: 'Sarah Jenkins',
        location: 'Chicago, IL',
        timeAgo: '50m ago',
        text: 'Consolidation among the top four meatpackers and grocery distributors also plays a massive role in why wholesale price drops never reach the consumer.',
        recommends: 193,
        isEditorPick: true,
      },
    ],
  },
  'opinion-rooster-community': {
    id: 'opinion-rooster-community',
    section: 'Opinion',
    kicker: 'Community Dispatch',
    headline: 'The Rooster That Brought a Divided Community Together',
    summary:
      'When an escaped bantam rooster took up residence in a polarized Dutch town square, neighbors who hadn’t spoken in years had to negotiate his care.',
    byline: 'By Lotte Salomons',
    readTime: '4 min read',
    isOpinion: true,
    image: IMAGES.rooster,
    imageAlt: 'Vibrant proud rooster in a sun-dappled European village courtyard',
    imageLocation: 'Gelderland, The Netherlands',
    imageCaption: 'Karel the rooster on patrol near the village bakery.',
    commentCount: 78,
    body: [
      'Nobody knew where Karel came from when he first appeared atop the bicycle racks outside our village apothecary in early April, crowing indignantly at delivery vans at 5:15 in the morning.',
      'At first, the municipal WhatsApp group split along predictable lines: recent urban transplants demanded the bird be relocated to a sanctuary immediately, while lifelong villagers insisted a rooster was part of rural heritage.',
      'Then came the May frost—and an unexpected alliance between a retired carpenter and a software designer who built Karel an insulated cedar coop behind the library.',
    ],
    comments: [],
  },
  'athletic-lions-cardinals': {
    id: 'athletic-lions-cardinals',
    section: 'The Athletic',
    kicker: 'The Athletic • NFL Week 5',
    headline: 'Lions Dominate Cardinals: How Detroit’s Play-Action Attack shredded Arizona',
    summary:
      'Jared Goff completed 84 percent of his passes off play-action as Detroit controlled the line of scrimmage for all four quarters.',
    byline: 'Colton Pouncy & Ted Nguyen',
    readTime: '5 min read',
    image: IMAGES.lions,
    imageAlt: 'Detroit Lions players celebrating a decisive touchdown under bright stadium floodlights',
    imageLocation: 'Ford Field, Detroit',
    imageCaption: 'Detroit celebrates a third-quarter touchdown drive that sealed a decisive Week 5 victory.',
    commentCount: 164,
    body: [
      'DETROIT — By the middle of the third quarter at Ford Field, Detroit’s offensive line had tilted the field so decisively that offensive coordinator Ben Johnson didn’t even need to disguise his intentions.',
      'Behind 187 rushing yards from Jahmyr Gibbs and David Montgomery, the Lions forced Arizona’s safeties into the box on early downs, opening wide intermediate windows across the middle of the field.',
      'On defense, Aidan Hutchinson recorded three quarterback hits and a strip-sack, holding the Cardinals to just 2-of-11 on third down conversions.',
    ],
    comments: [],
  },
};

export const MIDTERM_TABS = {
  'Early Vote Tracker': {
    kicker: 'Texas Senate Spotlight',
    headline: 'On Texas TikTok, It’s All About Talarico',
    summary:
      'There is a lively social media debate about one of this year’s most-watched Senate races — and James Talarico in particular.',
    byline: 'By Shane Goldmacher',
    readTime: '4 min read',
    articleId: 'texas-tiktok-talarico',
    statHighlight: '4.8M early ballots cast nationwide (+14% vs. 2022 pace)',
  },
  'Race for Congress': {
    kicker: 'House Battleground Tracker',
    headline: 'Suburban New York and California Districts Hold the Key to the House',
    summary:
      'Eighteen split-ticket districts won by fewer than three percentage points are seeing record field-office spending this week.',
    byline: 'By Annie Karni & Luke Broadwater',
    readTime: '5 min read',
    articleId: 'texas-tiktok-talarico',
    statHighlight: '218 seats needed for majority • 22 pure tossups remaining',
  },
  'State Deadlines': {
    kicker: '2026 Voter Guide',
    headline: 'Key Registration and Mail-In Ballot Deadlines Across 12 Swing States',
    summary:
      'In-person early voting opens this week in Georgia, North Carolina, and Nevada. Check postmark rules for absentee ballots.',
    byline: 'By The New York Times Election Desk',
    readTime: '3 min read',
    articleId: 'sc-senate-debate',
    statHighlight: 'Oct. 19: Next major voter registration cutoff in 9 states',
  },
  'Latest Polls': {
    kicker: 'Times / Siena Poll',
    headline: 'Independent Voters Break Late on Economy and Health Care Costs',
    summary:
      'New Times/Siena surveys in four battleground Senate states show ticket-splitting voters weighing local incumbents against national mood.',
    byline: 'By Nate Cohn',
    readTime: '6 min read',
    articleId: 'sc-senate-debate',
    statHighlight: 'Times/Siena Generic Ballot: Democrats +2.4% (MoE ±2.8%)',
  },
} as const;

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'audio-saudi-airports',
    show: 'The Times Audio • World Dispatch',
    title: 'Listen to This Story: Saudi and Yemeni Airports Are Hit in New Round of Strikes',
    summary: 'Narrated by Cynthia Silva. How long-range drone and air strikes shattered the Red Sea aviation truce.',
    duration: '3:42',
    durationSeconds: 222,
    date: 'Oct. 12, 2026',
    narrator: 'Narrated by The Times Audio',
    image: IMAGES.riyadhSummit,
    articleId: 'saudi-yemeni-airports',
    transcript: [
      '00:00 — From The New York Times, this is an audio edition of our lead world report for Monday, October 12, 2026.',
      '00:24 — By Cynthia Silva and Zach Wasser: "Saudi and Yemeni Airports Are Hit in New Round of Strikes."',
      '00:48 — Long-range drone and missile exchanges struck major aviation hubs in both Saudi Arabia and Yemen early Monday, shattering months of tenuous calm along the Red Sea corridor.',
      '01:45 — In Riyadh, falling debris from intercepted drones damaged a civilian concourse, while in Sana’a, airstrikes cratered the main international runway used by United Nations relief flights.',
      '02:50 — Diplomats in Muscat are working urgently to prevent a wider freeze on commercial air corridors over the Arabian Peninsula.',
    ],
  },
  {
    id: 'audio-the-daily',
    show: 'The Daily',
    title: 'The Algorithm Election: Inside the Texas Senate Race on TikTok',
    summary: 'Shane Goldmacher explains how unscripted town-hall clips overtook traditional broadcast television ads in the 2026 midterms.',
    duration: '26:14',
    durationSeconds: 1574,
    date: 'Oct. 12, 2026',
    narrator: 'Hosted by Michael Barbaro & Sabrina Tavernise',
    image: IMAGES.senateDebate,
    articleId: 'texas-tiktok-talarico',
    transcript: [
      '00:00 — From The New York Times, I’m Sabrina Tavernise. This is The Daily.',
      '00:35 — Today: In Texas, one of the most closely watched Senate races in the country is being fought not on evening local news, but in 45-second vertical videos.',
      '02:10 — My colleague Shane Goldmacher traveled across Texas to see how digital persuasion is changing who turns out in midterm elections.',
    ],
  },
  {
    id: 'audio-great-read',
    show: 'The Great Read Audio',
    title: 'He Went Out on an Epic Wilderness Adventure. Only His Dogs Came Back.',
    summary: 'For three years and 750 miles, Steffen Skjottelvik lived a life of adventure in the subarctic wilderness.',
    duration: '18:15',
    durationSeconds: 1095,
    date: 'Oct. 12, 2026',
    narrator: 'Narrated by Edoardo Ballerini',
    image: IMAGES.sledDogs,
    articleId: 'wilderness-adventure-dogs',
    transcript: [
      '00:00 — Welcome to The Great Read from The New York Times.',
      '00:30 — When the two huskies trotted out of the willow scrub near the trading post at Hudson Bay in late August, their harnesses were still clipped to a frayed gangline.',
      '03:15 — Over three winters, Steffen Skjottelvik kept meticulous waterproof field diaries of life on the subarctic trail.',
    ],
  },
  {
    id: 'audio-inuit-culture',
    show: 'Culture Desk Audio',
    title: 'What Does It Mean to Be Inuit Now?',
    summary: 'An audio postcard from Iqaluit, Nunavut, featuring conversations with carvers, poets, and designers.',
    duration: '8:40',
    durationSeconds: 520,
    date: 'Oct. 11, 2026',
    narrator: 'Narrated by The Times Audio',
    image: IMAGES.inuit1,
    articleId: 'inuit-culture-iqaluit',
    transcript: [
      '00:00 — Recorded on location in Iqaluit, along the shore of Frobisher Bay in Canada’s Arctic.',
      '01:20 — Listen to the sound of chisel against serpentine stone inside a sunlit studio overlooking the bay.',
    ],
  },
];

export const RECIPES: RecipeData[] = [
  {
    id: 'pumpkin-date-tiramisu',
    kicker: 'NYT Cooking • Autumn Baking',
    title: 'Pumpkin Date Tiramisù',
    byline: 'By Yossy Arefi',
    time: '45 minutes, plus 6 hours’ chilling',
    yield: '8 to 10 servings',
    rating: 5,
    ratingCount: 842,
    description:
      'Spiced pumpkin purée, Medjool date syrup, and mascarpone cream transform classic Italian tiramisù into a velvety, make-ahead autumn showstopper dusted with dark cocoa and cinnamon.',
    image: IMAGES.tiramisu,
    imageAlt:
      'Freshly baked spiced pumpkin date tiramisù in a shallow ceramic dish, dusted with dark cocoa powder and cinnamon curls',
    ingredients: [
      '1 ½ cups (360ml) strong brewed espresso or dark roast coffee, cooled',
      '¼ cup (60ml) date syrup (silan) or dark rum',
      '4 large egg yolks, at room temperature',
      '½ cup (100g) packed dark brown sugar',
      '1 cup (225g) pure pumpkin purée (not pumpkin pie filling)',
      '1 ½ teaspoons ground cinnamon, plus more for dusting',
      '½ teaspoon freshly grated nutmeg',
      '½ teaspoon ground ginger',
      '½ teaspoon kosher salt',
      '16 ounces (450g) cold mascarpone cheese',
      '1 ¼ cups (300ml) heavy cream, cold',
      '28 to 32 crisp savoiardi (Italian ladyfingers)',
      '3 tablespoons Dutch-process cocoa powder, for dusting',
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Espresso-Date Soak',
        instruction:
          'In a wide shallow bowl, whisk together the cooled espresso and date syrup (or dark rum) until smooth. Set aside while preparing the spiced pumpkin mascarpone.',
      },
      {
        title: 'Step 2: Whip the Spiced Sabayon Base',
        instruction:
          'In a heatproof bowl set over a saucepan of barely simmering water, whisk the egg yolks, dark brown sugar, and salt constantly for 4 to 5 minutes until pale, thickened, and warm to the touch (160°F). Remove from heat and whisk in the pumpkin purée, cinnamon, nutmeg, and ginger. Cool for 10 minutes.',
      },
      {
        title: 'Step 3: Fold in Mascarpone & Cream',
        instruction:
          'In a chilled bowl, whip the mascarpone and cold heavy cream to medium-stiff peaks. Gently fold the cooled spiced pumpkin mixture into the whipped mascarpone until no streaks remain.',
      },
      {
        title: 'Step 4: Layer & Chill Overnight',
        instruction:
          'Briefly dip each ladyfinger into the espresso-date mixture (1 second per side) and arrange a single layer in a 9-by-13-inch ceramic dish. Spread half the pumpkin mascarpone cream evenly on top. Repeat with a second layer of dipped ladyfingers and remaining cream. Cover and refrigerate for at least 6 hours or overnight. Dust generously with cocoa powder and shaved cinnamon just before serving.',
      },
    ],
    notes: [
      {
        author: 'Clara M.',
        timeAgo: '2 days ago',
        text: 'Made this for an October dinner party using Medjool date syrup in the espresso soak—unbelievably silky and not overly sweet. Better after 12 hours in the fridge!',
      },
      {
        author: 'Julian R.',
        timeAgo: '5 days ago',
        text: 'Added a pinch of cardamom to the pumpkin sabayon and topped with toasted pecans alongside the cocoa dusting. Instant fall classic.',
      },
    ],
  },
];
