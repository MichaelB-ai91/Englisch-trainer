/* ielts-data.js — Übungsinhalte für den TEST-Bereich (IELTS-Vorbereitung).
   Eigenständig verfasstes Übungsmaterial im Stil des IELTS-Tests — KEINE echten
   Cambridge-Prüfungsfragen (diese sind urheberrechtlich geschützt).

   Fragetypen je Passage/Skript (einheitliches Schema, siehe ielts-engine.js):
   - "mc"       : Multiple Choice, 4 Optionen, correctIndex
   - "tfng"     : True / False / Not Given, correctAnswer: "true"|"false"|"not_given"
   - "matching" : Passende Überschrift wählen, 4 Optionen, correctIndex
   - "gap"      : Lückentext, freie Texteingabe, answer (+ optional altAnswers) */

const IELTS_LEVELS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "upper", label: "Upper-Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "ielts", label: "IELTS Preparation" },
];

const IELTS_READING = [
  {
    id: "reading-beginner-1",
    level: "beginner",
    title: "A Day at the Market",
    timeLimitSec: 240,
    text: `Every Saturday morning, Maria goes to the local market with her mother. The market opens at seven o'clock and closes at one o'clock in the afternoon. It is a busy place with many small stalls selling fruit, vegetables, cheese, and fresh bread. Maria likes to help her mother choose the best tomatoes and apples. Her favourite stall sells homemade jam in small glass jars. The seller, an old man named Peter, always gives Maria a free sample to try.

After shopping, Maria and her mother usually stop at a small café near the market square. They order two cups of hot chocolate and share a slice of cake. Maria says that Saturday mornings at the market are her favourite part of the week because everyone is friendly and the food smells wonderful.`,
    questions: [
      { type: "mc", prompt: "What time does the market open?", options: ["Six o'clock", "Seven o'clock", "Eight o'clock", "Nine o'clock"], correctIndex: 1 },
      { type: "mc", prompt: "What does Maria's favourite stall sell?", options: ["Fresh bread", "Cheese", "Homemade jam", "Fresh fish"], correctIndex: 2 },
      { type: "tfng", prompt: "Maria goes to the market alone.", correctAnswer: "false" },
      { type: "tfng", prompt: "The market closes in the afternoon.", correctAnswer: "true" },
      { type: "tfng", prompt: "Peter has worked at the market for ten years.", correctAnswer: "not_given" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["The market's opening hours", "A treat after shopping", "How to grow tomatoes", "The history of the market"], correctIndex: 1 },
      { type: "gap", prompt: "Maria and her mother usually order two cups of ___.", answer: "hot chocolate" },
      { type: "mc", prompt: "Where do Maria and her mother go after shopping?", options: ["Home", "A café", "A restaurant", "A bakery"], correctIndex: 1 },
    ],
  },
  {
    id: "reading-beginner-2",
    level: "beginner",
    title: "My Favourite Hobby: Cycling",
    timeLimitSec: 240,
    text: `Tom discovered cycling three years ago when his uncle gave him an old bicycle for his birthday. At first, he only rode short distances around his neighbourhood, but he soon fell in love with the feeling of freedom it gave him. Every Saturday and Sunday morning, Tom now rides along the river path near his home, sometimes for more than two hours. Last month, he saved enough money to buy a brand new bicycle with better gears, which makes climbing hills much easier.

Tom has decided to join a local cycling club next year. He has heard that the club organises long trips into the countryside every month, and he would love to try one of these trips himself. His goal for this summer is to cycle fifty kilometres in a single day, something he has never done before. He also hopes that his younger sister, who is a little afraid of busy roads, will eventually join him on some of his shorter rides.`,
    questions: [
      { type: "mc", prompt: "Who gave Tom his first bicycle?", options: ["His father", "His uncle", "His sister", "A friend"], correctIndex: 1 },
      { type: "mc", prompt: "How often does Tom go cycling?", options: ["Only on Saturdays", "Every weekend", "Every day", "Once a month"], correctIndex: 1 },
      { type: "tfng", prompt: "Tom's new bicycle makes climbing hills easier.", correctAnswer: "true" },
      { type: "tfng", prompt: "Tom has already joined a cycling club.", correctAnswer: "false" },
      { type: "tfng", prompt: "Tom's uncle also enjoys cycling.", correctAnswer: "not_given" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["Buying a new bicycle", "Plans for the future", "The history of cycling", "A dangerous road accident"], correctIndex: 1 },
      { type: "gap", prompt: "Tom's goal this summer is to cycle ___ kilometres in one day.", answer: "fifty", altAnswers: ["50"] },
      { type: "mc", prompt: "Where does Tom usually ride his bicycle?", options: ["Around the city centre", "Along the river path", "Up a mountain", "On the motorway"], correctIndex: 1 },
    ],
  },
  {
    id: "reading-intermediate-1",
    level: "intermediate",
    title: "The Rise of Remote Work",
    timeLimitSec: 300,
    text: `Over the past decade, and especially since 2020, remote work has changed from a rare privilege into a common way of life for millions of employees around the world. Advances in video conferencing, cloud storage, and instant messaging have made it possible for many office tasks to be completed just as easily from a home office as from a traditional workplace. Companies that once insisted on employees being present five days a week have gradually introduced hybrid models, allowing staff to split their time between home and office.

However, remote work brings both benefits and challenges. On one hand, employees often report saving several hours a week that would otherwise be spent commuting, and many say they feel more productive without the constant interruptions of an open-plan office. On the other hand, some workers struggle to separate their professional and personal lives when their kitchen table doubles as a desk. Managers, too, have had to learn new skills, since building trust and team spirit is more difficult when colleagues rarely meet face to face. As a result, many organisations are now experimenting with occasional in-person meetups to keep remote teams connected.`,
    questions: [
      { type: "mc", prompt: "According to the passage, what has enabled remote work to grow?", options: ["Cheaper flights", "Advances in technology", "Shorter working weeks", "Government subsidies"], correctIndex: 1 },
      { type: "mc", prompt: "What do many employees say they save by working remotely?", options: ["Money on rent", "Time on commuting", "Time on meetings", "Money on food"], correctIndex: 1 },
      { type: "tfng", prompt: "All companies now require employees to work from home full-time.", correctAnswer: "false" },
      { type: "tfng", prompt: "Some employees find it hard to separate work and personal life at home.", correctAnswer: "true" },
      { type: "tfng", prompt: "Remote work became popular before the year 2000.", correctAnswer: "not_given" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["The history of the office", "Benefits and challenges of remote work", "How to build a home office", "The cost of commuting"], correctIndex: 1 },
      { type: "gap", prompt: "Many organisations are now experimenting with occasional ___ to keep remote teams connected.", answer: "in-person meetups", altAnswers: ["meetups", "in person meetups"] },
      { type: "tfng", prompt: "Managers find it easy to build team spirit remotely.", correctAnswer: "false" },
    ],
  },
  {
    id: "reading-intermediate-2",
    level: "intermediate",
    title: "How Plants Grow",
    timeLimitSec: 300,
    text: `Every plant begins its life as a tiny seed, which contains everything the future plant needs to start growing. When a seed is placed in soil with enough water and warmth, it absorbs moisture and begins a process called germination. During germination, the seed's outer shell softens and splits open, allowing a small root to push downward into the soil while a shoot grows upward, searching for light. Within a few days, the first tiny leaves appear above the ground.

Once the young plant has leaves, it can begin producing its own food through a process called photosynthesis. Using sunlight, water, and carbon dioxide from the air, the leaves convert these simple ingredients into sugars that fuel the plant's growth. As the plant matures, its roots spread further to absorb more nutrients, and its stem grows thicker and stronger to support new branches and leaves. Eventually, many plants produce flowers, which attract insects for pollination, allowing the plant to create seeds of its own and begin the cycle again.`,
    questions: [
      { type: "mc", prompt: "What does a seed need to begin germination?", options: ["Only sunlight", "Water and warmth", "Only soil", "Cold temperatures"], correctIndex: 1 },
      { type: "mc", prompt: "What is photosynthesis used for?", options: ["Absorbing water only", "Producing food using sunlight", "Attracting insects", "Splitting the seed shell"], correctIndex: 1 },
      { type: "tfng", prompt: "The root grows upward and the shoot grows downward.", correctAnswer: "false" },
      { type: "tfng", prompt: "Flowers can attract insects for pollination.", correctAnswer: "true" },
      { type: "tfng", prompt: "All plants produce flowers within one week of germination.", correctAnswer: "not_given" },
      { type: "matching", prompt: "Which heading best fits the first paragraph?", options: ["How photosynthesis works", "From seed to seedling", "Why flowers are colourful", "The chemistry of soil"], correctIndex: 1 },
      { type: "gap", prompt: "Leaves convert sunlight, water and carbon dioxide into ___.", answer: "sugars", altAnswers: ["sugar"] },
      { type: "mc", prompt: "What happens to the stem as the plant matures?", options: ["It becomes thinner", "It disappears", "It grows thicker and stronger", "It turns into a root"], correctIndex: 2 },
    ],
  },
  {
    id: "reading-upper-1",
    level: "upper",
    title: "The Impact of Social Media on Communication",
    timeLimitSec: 360,
    text: `Social media platforms have fundamentally reshaped the way people communicate, offering instant connection with friends, family, and even strangers across the globe. Where a letter once took days to arrive, a message today can be read within seconds, and a photograph can be shared with hundreds of people simultaneously. This constant connectivity has undoubtedly brought communities closer together, enabling people to maintain relationships despite geographical distance and to organise social movements with remarkable speed.

Nevertheless, researchers have raised concerns about the quality, rather than the quantity, of communication that social media encourages. Critics argue that brief messages and quick reactions, such as likes and emojis, can replace deeper, more meaningful conversations. Furthermore, the curated nature of most profiles, where users tend to share only positive moments, can create unrealistic comparisons and contribute to feelings of inadequacy among younger users in particular. Some psychologists suggest that face-to-face interaction remains essential for developing empathy, a skill that may be harder to cultivate through a screen. As a result, many schools have begun teaching digital literacy alongside traditional communication skills, hoping to help students balance the benefits of connectivity with the value of genuine, in-person conversation.`,
    questions: [
      { type: "mc", prompt: "According to the passage, what has social media enabled communities to do?", options: ["Avoid travel entirely", "Stay connected despite distance", "Write longer letters", "Reduce internet use"], correctIndex: 1 },
      { type: "mc", prompt: "What do critics say brief messages and emojis might replace?", options: ["Photographs", "Deeper conversations", "Social movements", "Digital literacy classes"], correctIndex: 1 },
      { type: "tfng", prompt: "Researchers are only concerned about how much people communicate, not how well.", correctAnswer: "false" },
      { type: "tfng", prompt: "Curated profiles can lead to unrealistic comparisons.", correctAnswer: "true" },
      { type: "tfng", prompt: "All schools have removed traditional communication classes.", correctAnswer: "not_given" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["The speed of modern letters", "Concerns about communication quality", "How to organise a social movement", "The history of emojis"], correctIndex: 1 },
      { type: "gap", prompt: "Some psychologists suggest that ___ interaction remains essential for developing empathy.", answer: "face-to-face", altAnswers: ["face to face"] },
      { type: "tfng", prompt: "A message today can be read within seconds.", correctAnswer: "true" },
    ],
  },
  {
    id: "reading-upper-2",
    level: "upper",
    title: "Renewable Energy Sources",
    timeLimitSec: 360,
    text: `As concerns about climate change intensify, countries around the world are accelerating their shift toward renewable energy sources such as solar, wind, and hydroelectric power. Unlike fossil fuels, which release significant amounts of carbon dioxide when burned, renewable sources generate electricity with little to no direct emissions, making them a central part of most national plans to reduce greenhouse gases. Solar power, in particular, has seen remarkable growth over the last decade, driven largely by falling costs of photovoltaic panels and improved storage technology.

Despite this progress, renewable energy still faces significant challenges before it can fully replace traditional power generation. Wind and solar power are inherently intermittent, meaning that electricity is only produced when the wind blows or the sun shines, which creates difficulties for grid operators who must balance supply and demand at all times. Battery technology is improving rapidly, but large-scale storage solutions remain expensive, and existing power grids in many countries were not originally designed to handle energy from thousands of small, distributed sources. Governments and private companies are therefore investing heavily in both storage research and grid modernisation, recognising that a fully renewable energy system will require far more than simply building additional solar panels and wind turbines.`,
    questions: [
      { type: "mc", prompt: "What has driven the growth of solar power, according to the passage?", options: ["Rising oil prices", "Falling panel costs and better storage", "New international laws only", "A decrease in electricity demand"], correctIndex: 1 },
      { type: "mc", prompt: "What problem do wind and solar power share?", options: ["They are too expensive to install", "They produce carbon dioxide", "They are intermittent", "They cannot be exported"], correctIndex: 2 },
      { type: "tfng", prompt: "Fossil fuels release little carbon dioxide when burned.", correctAnswer: "false" },
      { type: "tfng", prompt: "Existing power grids were originally designed for thousands of small energy sources.", correctAnswer: "false" },
      { type: "tfng", prompt: "Battery storage technology is currently cheap and widely available.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["The history of solar panels", "Remaining challenges for renewable energy", "How wind turbines are built", "The cost of fossil fuels"], correctIndex: 1 },
      { type: "gap", prompt: "Governments and private companies are investing heavily in storage research and ___.", answer: "grid modernisation", altAnswers: ["grid modernization"] },
      { type: "mc", prompt: "What does the passage say about a fully renewable energy system?", options: ["It only requires more solar panels", "It requires far more than just panels and turbines", "It is already complete", "It is impossible to achieve"], correctIndex: 1 },
    ],
  },
  {
    id: "reading-advanced-1",
    level: "advanced",
    title: "The Psychology of Decision-Making",
    timeLimitSec: 420,
    text: `For much of the twentieth century, economists assumed that human beings made decisions in a broadly rational manner, carefully weighing costs and benefits before arriving at the choice that maximised their overall wellbeing. This assumption, while mathematically convenient, has been substantially undermined by decades of research in behavioural psychology, which reveals that human judgement is frequently shaped by cognitive biases rather than pure logic. One particularly influential finding is loss aversion, the tendency for people to feel the pain of a loss roughly twice as intensely as the pleasure of an equivalent gain, which can lead individuals to make overly cautious choices even when the potential upside clearly outweighs the risk.

Another well-documented bias is anchoring, whereby an initial piece of information, even an arbitrary one, disproportionately influences subsequent judgements. Retailers exploit this tendency by displaying a high original price alongside a discounted one, causing shoppers to perceive the sale price as more attractive than they otherwise would. Researchers argue that recognising these biases does not eliminate them entirely, since much of this processing occurs below the level of conscious awareness, but that structured decision-making frameworks, such as deliberately considering the opposite of one's initial instinct, can meaningfully reduce their influence. Consequently, fields ranging from public policy to personal finance have begun incorporating insights from behavioural psychology into the design of forms, defaults, and choice architecture, aiming to guide people toward better outcomes without restricting their freedom to choose.`,
    questions: [
      { type: "mc", prompt: "What did twentieth-century economists traditionally assume about human decisions?", options: ["They were random", "They were broadly rational", "They were always biased", "They ignored costs entirely"], correctIndex: 1 },
      { type: "mc", prompt: "What is loss aversion?", options: ["Preferring gains over losses equally", "Feeling losses more intensely than equivalent gains", "Avoiding all financial risk", "Ignoring potential losses"], correctIndex: 1 },
      { type: "tfng", prompt: "Anchoring means an initial piece of information can influence later judgements.", correctAnswer: "true" },
      { type: "tfng", prompt: "Retailers never use original prices to influence shoppers.", correctAnswer: "false" },
      { type: "tfng", prompt: "Cognitive biases occur only when people are consciously aware of them.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["The history of economics", "Anchoring and how to reduce its influence", "Why shops close early", "The definition of loss aversion"], correctIndex: 1 },
      { type: "gap", prompt: "One technique to reduce bias is deliberately considering the ___ of one's initial instinct.", answer: "opposite" },
      { type: "mc", prompt: "Which fields have begun using behavioural psychology insights, according to the passage?", options: ["Only medicine", "Public policy and personal finance", "Only advertising", "Only sports science"], correctIndex: 1 },
    ],
  },
  {
    id: "reading-advanced-2",
    level: "advanced",
    title: "Climate Change and Global Agriculture",
    timeLimitSec: 420,
    text: `Global agriculture stands at the intersection of two profound challenges: it must feed a growing world population while simultaneously adapting to an increasingly unpredictable climate. Rising average temperatures, shifting rainfall patterns, and a greater frequency of extreme weather events, including droughts and floods, are already affecting crop yields in many regions, particularly in areas that were previously considered agriculturally stable. Wheat, maize, and rice, which together supply a substantial proportion of the calories consumed worldwide, are all sensitive to prolonged heat stress during critical growth stages, meaning that even a modest rise in average temperature can translate into a measurable reduction in harvest size.

In response, agricultural scientists are pursuing several strategies simultaneously. Plant breeders are developing crop varieties with greater drought tolerance and heat resistance, often drawing on genetic diversity found in wild relatives of modern crops. Meanwhile, farmers in vulnerable regions are being encouraged to diversify what they grow, since relying on a single crop leaves entire communities exposed if that crop fails in a particularly difficult season. Precision agriculture, which uses sensors and data analysis to apply water and fertiliser only where and when they are needed, is also gaining traction as a way to use increasingly scarce resources more efficiently. Nonetheless, many experts caution that technological solutions alone will not be sufficient, and that reducing greenhouse gas emissions remains the only way to prevent the underlying problem from continuing to worsen.`,
    questions: [
      { type: "mc", prompt: "According to the passage, what must global agriculture do simultaneously?", options: ["Reduce population growth and lower prices", "Feed a growing population and adapt to climate change", "Stop growing wheat and rice", "Increase rainfall artificially"], correctIndex: 1 },
      { type: "mc", prompt: "What is precision agriculture used for, according to the passage?", options: ["Growing only one crop", "Applying water and fertiliser efficiently", "Increasing average temperatures", "Breeding wild plant relatives"], correctIndex: 1 },
      { type: "tfng", prompt: "Wheat, maize, and rice are resistant to heat stress.", correctAnswer: "false" },
      { type: "tfng", prompt: "Diversifying crops can reduce the risk to farming communities.", correctAnswer: "true" },
      { type: "tfng", prompt: "Most experts believe technology alone will fully solve the problem.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["Strategies to adapt agriculture to climate change", "The history of wheat farming", "Why rainfall patterns are changing", "How to reduce global population"], correctIndex: 0 },
      { type: "gap", prompt: "Plant breeders are developing crop varieties with greater ___ and heat resistance.", answer: "drought tolerance", altAnswers: ["drought resistance"] },
      { type: "tfng", prompt: "Reducing greenhouse gas emissions is described as the only way to prevent the underlying problem from worsening.", correctAnswer: "true" },
    ],
  },
  {
    id: "reading-ielts-1",
    level: "ielts",
    title: "The History and Future of Space Exploration",
    timeLimitSec: 480,
    text: `Human fascination with space exploration dates back centuries, but it was not until the mid-twentieth century that this curiosity translated into concrete technological achievement. The launch of Sputnik in 1957 marked the beginning of the space age, triggering a period of intense competition between the Soviet Union and the United States that culminated in the Apollo 11 moon landing of 1969. For several decades afterward, space exploration remained largely the domain of national governments, constrained by the enormous costs associated with rocket development and the considerable political capital required to sustain long-term programmes in the face of competing domestic priorities.

The landscape has shifted dramatically over the past two decades, as private companies have entered the field, dramatically reducing launch costs through innovations such as reusable rocket boosters. This commercialisation has enabled a broader range of activities, from satellite deployment to the tentative beginnings of space tourism, and has reinvigorated public and governmental interest in more ambitious goals, including crewed missions to Mars. Proponents argue that establishing a permanent human presence beyond Earth would provide a critical safeguard against planetary-scale catastrophes and drive innovation in fields as diverse as materials science and medicine. Critics, however, contend that the resources devoted to such endeavours could be more effectively directed toward pressing challenges here on Earth, such as poverty and climate change, and question whether the scientific returns genuinely justify the substantial financial investment required. Regardless of which view ultimately prevails, it seems increasingly likely that the coming decades will see humanity's presence in space expand well beyond what was achievable during the twentieth century.`,
    questions: [
      { type: "mc", prompt: "What event marked the beginning of the space age, according to the passage?", options: ["The Apollo 11 moon landing", "The launch of Sputnik in 1957", "The founding of a private space company", "The first satellite deployment by a private firm"], correctIndex: 1 },
      { type: "mc", prompt: "What has enabled private companies to reduce launch costs?", options: ["Government subsidies alone", "Reusable rocket boosters", "Reduced interest in space travel", "Cheaper rocket fuel only"], correctIndex: 1 },
      { type: "tfng", prompt: "For several decades after Apollo 11, space exploration was mainly led by national governments.", correctAnswer: "true" },
      { type: "tfng", prompt: "Critics of ambitious space goals argue resources could be better spent on Earth's problems.", correctAnswer: "true" },
      { type: "tfng", prompt: "All scientists agree that space exploration funding is fully justified.", correctAnswer: "not_given" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["The launch of Sputnik", "The commercialisation of space and its debates", "The cost of rocket fuel in the 1960s", "How satellites are built"], correctIndex: 1 },
      { type: "gap", prompt: "Proponents argue a permanent human presence beyond Earth would drive innovation in fields such as materials science and ___.", answer: "medicine" },
      { type: "mc", prompt: "According to the passage, what does the coming decades likely hold for space exploration?", options: ["A complete stop in activity", "Expansion well beyond twentieth-century achievements", "A return to government-only programmes", "No further crewed missions"], correctIndex: 1 },
    ],
  },
  {
    id: "reading-ielts-2",
    level: "ielts",
    title: "Urbanization and Its Effects on Biodiversity",
    timeLimitSec: 480,
    text: `Urbanization, the process by which an increasing proportion of a population comes to live in cities, has accelerated dramatically over the past century and shows no sign of slowing, with projections suggesting that nearly seventy percent of the world's population will reside in urban areas by 2050. While cities offer undeniable economic and social advantages, including greater access to employment, education, and healthcare, their expansion frequently comes at a considerable cost to the natural environments they replace. Wetlands are drained, forests are cleared, and grasslands are paved over, fragmenting habitats that many species depend upon for feeding, breeding, and migration.

The consequences for biodiversity are often severe, particularly for species with specialised habitat requirements or limited ranges, which struggle to adapt when their environment is suddenly transformed or divided into isolated patches by roads and buildings. Generalist species, by contrast, such as pigeons, rats, and certain insects, frequently thrive in urban conditions, leading to a homogenisation of urban wildlife across otherwise distinct regions of the world. In response, an increasing number of city planners are incorporating principles of green infrastructure into new developments, including wildlife corridors that connect fragmented habitats, rooftop gardens, and constructed wetlands that manage stormwater while simultaneously providing refuge for local species. Some researchers argue that such measures, while valuable, remain insufficient on their own and must be paired with broader efforts to limit urban sprawl and protect surrounding natural areas from further encroachment, if cities are to coexist sustainably with the ecosystems around them.`,
    questions: [
      { type: "mc", prompt: "What percentage of the world's population is projected to live in urban areas by 2050?", options: ["Fifty percent", "Sixty percent", "Nearly seventy percent", "Ninety percent"], correctIndex: 2 },
      { type: "mc", prompt: "Which type of species often thrives in urban conditions, according to the passage?", options: ["Species with specialised habitat needs", "Generalist species such as pigeons and rats", "Species with limited ranges", "Migratory species only"], correctIndex: 1 },
      { type: "tfng", prompt: "Urbanization always benefits every species equally.", correctAnswer: "false" },
      { type: "tfng", prompt: "Wildlife corridors are mentioned as one form of green infrastructure.", correctAnswer: "true" },
      { type: "tfng", prompt: "Researchers agree that green infrastructure alone is sufficient to protect biodiversity.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the second paragraph?", options: ["The economic benefits of cities", "Effects on biodiversity and possible solutions", "The history of urban planning", "How wetlands are formed naturally"], correctIndex: 1 },
      { type: "gap", prompt: "City planners are incorporating green infrastructure such as wildlife corridors, rooftop gardens, and constructed ___.", answer: "wetlands" },
      { type: "tfng", prompt: "Cities offer greater access to employment, education, and healthcare.", correctAnswer: "true" },
    ],
  },
];

const IELTS_LISTENING = [
  {
    id: "listening-beginner-1",
    level: "beginner",
    title: "A Weather Report",
    timeLimitSec: 180,
    text: `Good morning, and welcome to your local weather update. Today will start cool and cloudy, with temperatures around twelve degrees in the early morning. By midday, the clouds should clear and we expect plenty of sunshine, with highs reaching twenty-two degrees in the afternoon. There is a small chance of a light shower around six in the evening, but it should not last very long. Tomorrow will be a little warmer, with clear skies for most of the day and a high of twenty-four degrees. However, the weekend looks less pleasant, as a band of rain is expected to move in from the west on Saturday afternoon and continue into Sunday morning. If you are planning any outdoor activities, today and tomorrow are definitely your best options this week. Wind will be light throughout, coming mostly from the south. That is all for this morning's weather. Have a wonderful day.`,
    questions: [
      { type: "mc", prompt: "What is the temperature in the early morning?", options: ["Twelve degrees", "Eighteen degrees", "Twenty-two degrees", "Twenty-four degrees"], correctIndex: 0 },
      { type: "mc", prompt: "When might there be a light shower today?", options: ["In the morning", "At midday", "Around six in the evening", "Late at night"], correctIndex: 2 },
      { type: "tfng", prompt: "Tomorrow will be warmer than today.", correctAnswer: "true" },
      { type: "tfng", prompt: "The weekend weather is expected to be sunny.", correctAnswer: "false" },
      { type: "tfng", prompt: "There will be strong winds throughout the week.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part starting with 'Tomorrow will be...'?", options: ["Today's temperature only", "The outlook for tomorrow and the weekend", "How to prepare for a storm", "Wind direction explained"], correctIndex: 1 },
      { type: "gap", prompt: "The wind will come mostly from the ___.", answer: "south" },
      { type: "mc", prompt: "According to the report, when is rain expected to arrive?", options: ["Friday morning", "Saturday afternoon", "Sunday evening", "Monday morning"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-beginner-2",
    level: "beginner",
    title: "A Daily Routine",
    timeLimitSec: 180,
    text: `Every weekday, Anna wakes up at six thirty in the morning. She likes to start her day with a short walk before breakfast, even if it is only ten minutes around the block. After her walk, she eats breakfast, usually toast with jam and a cup of tea. Anna leaves for work at eight o'clock and takes the bus, which normally takes about twenty-five minutes. She works at a small bookshop in the city centre, where she helps customers find books and organises the shelves. Her lunch break is at one o'clock, and she usually eats a sandwich in the small park behind the shop. Anna finishes work at five thirty and often meets a friend for coffee before heading home. In the evening, she likes to read for an hour before going to bed at around eleven o'clock. On weekends, her routine is quite different, since she wakes up later and spends more time relaxing at home.`,
    questions: [
      { type: "mc", prompt: "What does Anna do before breakfast?", options: ["She reads a book", "She takes a short walk", "She goes to work", "She calls a friend"], correctIndex: 1 },
      { type: "mc", prompt: "Where does Anna work?", options: ["In a café", "In a bookshop", "In a park", "At a bus station"], correctIndex: 1 },
      { type: "tfng", prompt: "Anna takes the bus to work.", correctAnswer: "true" },
      { type: "tfng", prompt: "Anna's bus journey takes about one hour.", correctAnswer: "false" },
      { type: "tfng", prompt: "Anna eats lunch at a restaurant.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part about her workday?", options: ["Anna's morning walk", "Anna's job and lunch break", "Anna's weekend plans", "Anna's bedtime routine"], correctIndex: 1 },
      { type: "gap", prompt: "Anna goes to bed at around ___ o'clock.", answer: "eleven", altAnswers: ["11"] },
      { type: "tfng", prompt: "Anna's weekend routine is exactly the same as her weekday routine.", correctAnswer: "false" },
    ],
  },
  {
    id: "listening-intermediate-1",
    level: "intermediate",
    title: "Applying for a Library Card",
    timeLimitSec: 210,
    text: `Thank you for calling the Riverside Public Library information line. To apply for a library card, you will need to bring a valid form of identification, such as a passport or driving licence, along with proof of your current address, for example a recent utility bill or bank statement. New members can register at the main desk on the ground floor, which is open from nine in the morning until eight in the evening on weekdays, and from ten until four on Saturdays. The library is closed on Sundays and public holidays. Once your application has been processed, which usually takes only a few minutes, you will be able to borrow up to eight items at a time, including books, magazines, and audiobooks. Items may be kept for three weeks and can be renewed twice online, provided no one else has reserved them. Please note that there is a small daily fine for items returned late. If you have any further questions, you are welcome to speak to a member of staff during opening hours.`,
    questions: [
      { type: "mc", prompt: "What must you bring to apply for a library card?", options: ["Only a passport", "Identification and proof of address", "A university degree", "A letter from your employer"], correctIndex: 1 },
      { type: "mc", prompt: "How many items can a new member borrow at once?", options: ["Three", "Five", "Eight", "Twelve"], correctIndex: 2 },
      { type: "tfng", prompt: "The library is open on Sundays.", correctAnswer: "false" },
      { type: "tfng", prompt: "Items can be renewed twice online if no one has reserved them.", correctAnswer: "true" },
      { type: "tfng", prompt: "There is no fine for returning items late.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part about opening hours?", options: ["How to renew items online", "Registration hours and location", "The history of the library", "The list of available audiobooks"], correctIndex: 1 },
      { type: "gap", prompt: "Items may be kept for ___ weeks.", answer: "three" },
      { type: "mc", prompt: "What proof of address is suggested in the message?", options: ["A birth certificate", "A recent utility bill or bank statement", "A school report", "A passport photo"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-intermediate-2",
    level: "intermediate",
    title: "A Restaurant Recommendation",
    timeLimitSec: 210,
    text: `If you are looking for a great place to eat this weekend, I would strongly recommend trying the new Italian restaurant that opened last month on Baker Street, called Trattoria Bella. I went there on Friday evening with a couple of friends, and honestly, it exceeded all of our expectations. The restaurant has a warm, cosy atmosphere, with soft lighting and friendly staff who were happy to explain every dish on the menu in detail. We started with a shared plate of garlic bread and bruschetta, which was absolutely delicious, and then moved on to the main courses. I ordered the mushroom risotto, which was creamy and full of flavour, while my friend chose the seafood pasta, which she said was one of the best she has ever had. Prices are reasonable for the quality, with most main courses costing between fifteen and twenty pounds. My only small complaint is that the restaurant does not accept reservations, so we had to wait about fifteen minutes for a table on a busy Friday night. Overall, though, I would definitely go back, and I think it is worth the short wait.`,
    questions: [
      { type: "mc", prompt: "What type of restaurant is Trattoria Bella?", options: ["Japanese", "Italian", "Mexican", "French"], correctIndex: 1 },
      { type: "mc", prompt: "What did the speaker order as a main course?", options: ["Seafood pasta", "Garlic bread", "Mushroom risotto", "Bruschetta"], correctIndex: 2 },
      { type: "tfng", prompt: "The restaurant has a cold, formal atmosphere.", correctAnswer: "false" },
      { type: "tfng", prompt: "Main courses typically cost between fifteen and twenty pounds.", correctAnswer: "true" },
      { type: "tfng", prompt: "The restaurant accepts table reservations.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part describing the food they ordered?", options: ["The restaurant's location", "What they ate and how it tasted", "The history of Italian cuisine", "How to make a reservation"], correctIndex: 1 },
      { type: "gap", prompt: "The speaker's only complaint is that the restaurant does not accept ___.", answer: "reservations" },
      { type: "mc", prompt: "How long did they wait for a table?", options: ["Five minutes", "Fifteen minutes", "Thirty minutes", "One hour"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-upper-1",
    level: "upper",
    title: "A University Orientation Talk",
    timeLimitSec: 240,
    text: `Good morning, everyone, and welcome to the university. Over the next few minutes, I will give you a brief overview of the services available to you as new students. Firstly, the Student Support Centre, located on the second floor of the main building, offers free academic advice, counselling services, and help with financial planning throughout your studies. I would strongly encourage you to visit them at least once during your first term, even if you do not feel you need assistance right now, simply so that you know where to find them later. Secondly, the university library is open twenty-four hours a day during term time, and in addition to physical books, you have access to an extensive collection of digital journals and databases, which will be essential for your research assignments. Thirdly, each academic department has designated office hours during which lecturers are available to answer questions in person, and I recommend checking your department's website for the exact schedule. Finally, do take some time this week to explore the numerous student societies and clubs, which range from academic and cultural groups to sports teams, as joining one is often the easiest way to make new friends outside your course. I hope you have a fantastic first year.`,
    questions: [
      { type: "mc", prompt: "Where is the Student Support Centre located?", options: ["First floor", "Second floor of the main building", "Library building", "Student union"], correctIndex: 1 },
      { type: "mc", prompt: "What is available in the library besides physical books?", options: ["A cafeteria", "Digital journals and databases", "Sports equipment", "Free printing only"], correctIndex: 1 },
      { type: "tfng", prompt: "The library is open twenty-four hours a day during term time.", correctAnswer: "true" },
      { type: "tfng", prompt: "Lecturers have no set office hours.", correctAnswer: "false" },
      { type: "tfng", prompt: "Joining a student society is described as an easy way to make friends.", correctAnswer: "true" },
      { type: "matching", prompt: "Which heading best fits the part about the Student Support Centre?", options: ["Library opening hours", "Support services for new students", "Department office hours", "How to join a sports team"], correctIndex: 1 },
      { type: "gap", prompt: "Students should check their department's website for the exact ___.", answer: "schedule" },
      { type: "mc", prompt: "What does the speaker recommend doing during the first week?", options: ["Avoiding all clubs", "Exploring student societies and clubs", "Only focusing on lectures", "Visiting the Support Centre every day"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-upper-2",
    level: "upper",
    title: "Planning a Trip Abroad",
    timeLimitSec: 240,
    text: `So, we are finally planning our trip to Japan for next spring, and there is quite a lot to organise before we go. First of all, we need to check whether our passports are still valid for at least six months after our planned return date, since some countries will refuse entry otherwise. I have already looked into flights, and it seems that booking around four months in advance tends to give the best prices, particularly if we are flexible about which airport we depart from. Accommodation is the next big decision. We are considering staying in a mix of traditional guesthouses and modern hotels, partly to save money and partly for the experience. For getting around once we are there, a rail pass seems like the most cost-effective option if we plan to visit several cities, since domestic train tickets can otherwise be quite expensive when bought individually. We should also look into travel insurance sooner rather than later, in case flight prices increase closer to the date, and it is worth checking whether our bank charges extra fees for withdrawing cash abroad. Lastly, I think we should start learning a few basic phrases, since it will make everyday interactions much easier, even though many people in the cities we plan to visit speak some English.`,
    questions: [
      { type: "mc", prompt: "How far in advance does the speaker suggest booking flights?", options: ["One month", "Four months", "One year", "Two weeks"], correctIndex: 1 },
      { type: "mc", prompt: "What type of accommodation are they considering?", options: ["Only hotels", "A mix of guesthouses and hotels", "Only guesthouses", "Camping"], correctIndex: 1 },
      { type: "tfng", prompt: "A rail pass is suggested as cost-effective for visiting several cities.", correctAnswer: "true" },
      { type: "tfng", prompt: "The speaker says travel insurance should be arranged at the last minute.", correctAnswer: "false" },
      { type: "tfng", prompt: "Most people in the cities they plan to visit speak no English at all.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part about passports and flights?", options: ["Choosing accommodation", "Passport validity and flight booking", "Learning basic phrases", "Withdrawing cash abroad"], correctIndex: 1 },
      { type: "gap", prompt: "It is worth checking whether the bank charges extra fees for withdrawing ___ abroad.", answer: "cash" },
      { type: "mc", prompt: "Why does the speaker want to learn basic phrases?", options: ["To get a better flight price", "To make everyday interactions easier", "To avoid using a rail pass", "To qualify for travel insurance"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-advanced-1",
    level: "advanced",
    title: "A Lecture on Marine Biology",
    timeLimitSec: 270,
    text: `Today, I want to focus on one of the most remarkable examples of adaptation in the marine world: the deep-sea anglerfish. Living at depths where sunlight cannot penetrate, these fish have evolved a bioluminescent lure, a small growth extending from their head that produces its own light through a symbiotic relationship with light-emitting bacteria. This glowing lure attracts smaller prey close enough for the anglerfish, which has a relatively slow metabolism suited to an environment where food is scarce, to capture them with a sudden strike. What makes the species particularly fascinating, however, is the extreme sexual dimorphism between males and females. Female anglerfish can grow to over a metre in length, while males in many species are dramatically smaller, sometimes only a few centimetres long. In several species, the male has evolved an extraordinary reproductive strategy: upon finding a female in the vast darkness of the deep ocean, he bites onto her body and gradually fuses with her permanently, eventually losing his own digestive organs and becoming entirely dependent on her bloodstream for nutrients, existing essentially as a permanent source of sperm. While this might sound unusual, researchers argue it represents an efficient evolutionary solution to an environment where encountering a potential mate is exceedingly rare, making it worthwhile to ensure that a single successful encounter results in permanent reproductive access.`,
    questions: [
      { type: "mc", prompt: "What produces the light in the anglerfish's lure?", options: ["Chemical reaction in the fish's brain", "Symbiotic light-emitting bacteria", "Reflected sunlight", "Electrical organs"], correctIndex: 1 },
      { type: "mc", prompt: "What is the lure primarily used for?", options: ["Communicating with other anglerfish", "Attracting prey", "Warning off predators", "Regulating body temperature"], correctIndex: 1 },
      { type: "tfng", prompt: "Female anglerfish are generally larger than males.", correctAnswer: "true" },
      { type: "tfng", prompt: "The male anglerfish, once fused, retains his full digestive system.", correctAnswer: "false" },
      { type: "tfng", prompt: "Anglerfish live in shallow, sunlit waters.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part about male-female differences?", options: ["The bioluminescent lure explained", "Sexual dimorphism and the male's reproductive strategy", "How anglerfish hunt for food", "The depth at which anglerfish live"], correctIndex: 1 },
      { type: "gap", prompt: "Researchers argue the male's strategy is an efficient evolutionary solution to a rare chance of encountering a ___.", answer: "mate" },
      { type: "mc", prompt: "Why is the anglerfish's metabolism described as slow?", options: ["Because it lives in warm water", "Because food is scarce in its environment", "Because it has no digestive organs", "Because it does not need to hunt"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-advanced-2",
    level: "advanced",
    title: "A Radio Segment on Remote Team Management",
    timeLimitSec: 270,
    text: `Welcome back to the programme. In this segment, we are discussing how managers can effectively lead teams that are spread across different time zones and rarely, if ever, meet in person. Our guest today has spent the last five years researching distributed teams, and she points out that one of the most common mistakes managers make is simply replicating in-office habits online, such as scheduling excessive meetings that eat into everyone's focused working time. Instead, she recommends establishing clear, written expectations about response times and availability, so that team members are not left wondering whether an urgent message will be seen within the hour or the following day. Another key theme is the importance of deliberately creating opportunities for informal interaction, since the casual conversations that naturally occur in a physical office, often described as watercooler chats, do not happen automatically online and must be intentionally recreated through virtual coffee breaks or dedicated non-work chat channels. Trust, she argues, is the foundation upon which distributed teams succeed or fail; managers who focus on measuring hours worked rather than outcomes achieved tend to create anxious, disengaged employees, whereas those who clearly define goals and then grant genuine autonomy over how those goals are met tend to see significantly higher levels of both productivity and job satisfaction.`,
    questions: [
      { type: "mc", prompt: "What common mistake do managers make, according to the guest?", options: ["Not scheduling any meetings", "Replicating in-office habits online", "Giving employees too much autonomy", "Ignoring written communication"], correctIndex: 1 },
      { type: "mc", prompt: "What does the guest recommend to reduce uncertainty about response times?", options: ["Hiring more staff", "Establishing clear written expectations", "Removing all deadlines", "Increasing meeting frequency"], correctIndex: 1 },
      { type: "tfng", prompt: "Informal interactions happen automatically in online teams without effort.", correctAnswer: "false" },
      { type: "tfng", prompt: "The guest believes trust is important for distributed teams to succeed.", correctAnswer: "true" },
      { type: "tfng", prompt: "Managers who measure hours worked tend to create highly engaged employees, according to the guest.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part about creating informal interaction opportunities?", options: ["Recreating casual conversation online", "The history of remote work", "How to schedule more meetings", "Measuring hours worked accurately"], correctIndex: 0 },
      { type: "gap", prompt: "The guest says trust is the ___ upon which distributed teams succeed or fail.", answer: "foundation" },
      { type: "mc", prompt: "What tends to result from giving employees genuine autonomy over goals?", options: ["Lower productivity", "Higher productivity and job satisfaction", "More meetings", "Less trust"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-ielts-1",
    level: "ielts",
    title: "A Talk on Renewable Energy Policy",
    timeLimitSec: 300,
    text: `Good afternoon. Today I would like to outline some of the key policy mechanisms that governments are using to accelerate the transition toward renewable energy, and to consider some of the debates surrounding their effectiveness. One of the most widely adopted tools is the feed-in tariff, a policy under which energy producers, including individual households with solar panels, are guaranteed a fixed price for any electricity they generate and feed back into the national grid. This mechanism reduces the financial risk associated with investing in renewable infrastructure and has been credited with driving substantial growth in solar and wind capacity in several European countries during the early two thousands. A related but distinct approach is the renewable portfolio standard, which instead requires energy suppliers to source a minimum percentage of their electricity from renewable sources, leaving the specific technology and pricing arrangements largely up to market competition. Critics of feed-in tariffs argue that fixed prices, if set too generously, can place an excessive financial burden on taxpayers or other electricity consumers, whereas proponents of renewable portfolio standards suggest that market-based competition tends to drive costs down more efficiently over time. In practice, many governments now combine elements of both approaches, alongside carbon pricing mechanisms such as emissions trading schemes, recognising that no single policy tool is likely to be sufficient on its own to achieve ambitious decarbonisation targets within the necessary timeframe.`,
    questions: [
      { type: "mc", prompt: "What does a feed-in tariff guarantee to energy producers?", options: ["Free installation of solar panels", "A fixed price for electricity fed into the grid", "Unlimited government loans", "Tax exemption for ten years"], correctIndex: 1 },
      { type: "mc", prompt: "What does a renewable portfolio standard require?", options: ["A fixed electricity price", "Suppliers to source a minimum percentage from renewables", "Households to install solar panels", "A ban on fossil fuels"], correctIndex: 1 },
      { type: "tfng", prompt: "Feed-in tariffs have been credited with growth in solar and wind capacity in parts of Europe.", correctAnswer: "true" },
      { type: "tfng", prompt: "Critics argue feed-in tariffs can place a financial burden on consumers if prices are set too high.", correctAnswer: "true" },
      { type: "tfng", prompt: "Most governments rely exclusively on a single policy tool.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the part comparing feed-in tariffs and renewable portfolio standards?", options: ["The definition of a feed-in tariff", "Comparing two renewable energy policy tools", "The history of solar panels in Europe", "How emissions trading schemes work"], correctIndex: 1 },
      { type: "gap", prompt: "Many governments now combine both approaches alongside carbon pricing mechanisms such as ___ schemes.", answer: "emissions trading" },
      { type: "mc", prompt: "What do proponents of renewable portfolio standards suggest?", options: ["That fixed prices are always better", "That market-based competition can drive costs down", "That taxpayers should cover all costs", "That renewable energy is too expensive to pursue"], correctIndex: 1 },
    ],
  },
  {
    id: "listening-ielts-2",
    level: "ielts",
    title: "An Interview About Career Development",
    timeLimitSec: 300,
    text: `You have spent over fifteen years advising professionals on career development. The most common misconception encountered is the belief that career progression should follow a straight, upward line, one promotion after another within a single organisation or even a single industry. In reality, many of the most successful careers involve lateral moves, periods of retraining, or even temporary steps that appear, from the outside, to be a step backward. Consider one example: a client left a well-paid management position to take a much more junior role in a completely different sector, specifically to acquire skills that simply were not available to her in her previous role. Within three years, she had risen to a more senior position than the one she had originally left, precisely because she now possessed a combination of skills that very few of her competitors had. For someone feeling stuck in their current role, the advice is to think less about titles and salary in the short term, and instead ask what skills or experiences their desired future role actually requires, and then to seek out opportunities, even imperfect ones, that move them closer to acquiring those specific things.`,
    questions: [
      { type: "mc", prompt: "What common misconception is identified?", options: ["That careers should involve frequent job changes", "That career progression should be a straight upward line", "That retraining is always necessary", "That salary is the most important factor"], correctIndex: 1 },
      { type: "mc", prompt: "Why did the client take a more junior role?", options: ["She was forced to due to redundancy", "To acquire skills unavailable in her previous role", "Because she wanted a higher salary immediately", "Because her old company closed"], correctIndex: 1 },
      { type: "tfng", prompt: "The client's move immediately resulted in a promotion.", correctAnswer: "false" },
      { type: "tfng", prompt: "Within three years, the client reached a more senior position than before.", correctAnswer: "true" },
      { type: "tfng", prompt: "The advice given is to focus mainly on salary in the short term.", correctAnswer: "false" },
      { type: "matching", prompt: "Which heading best fits the example about the client?", options: ["The definition of career progression", "A real example of an unconventional career move", "How to negotiate a higher salary", "The history of career coaching"], correctIndex: 1 },
      { type: "gap", prompt: "People are advised to think about what skills or experiences their desired future role actually ___.", answer: "requires" },
      { type: "mc", prompt: "What is suggested to seek out, even if imperfect?", options: ["Higher salaries only", "Opportunities that build relevant skills", "Promotions within the same company", "Longer working hours"], correctIndex: 1 },
    ],
  },
];
