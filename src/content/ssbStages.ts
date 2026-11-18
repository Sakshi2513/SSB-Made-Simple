export type SSBStage = {
  slug: string;
  title: string;
  short: string;
  day: string;
  summary: string;
  facts: { label: string; value: string }[];
  what: string[];
  tips: string[];
  mistakes: string[];
  olqs: string[];
};

export const ssbStages: SSBStage[] = [
  {
    slug: "oir",
    title: "OIR: Officer Intelligence Rating Test",
    short: "OIR",
    day: "Day 1",
    summary:
      "A written test of verbal and non-verbal reasoning, taken on Day 1 as part of Stage I screening. It checks basic intellect and mental agility under time pressure.",
    facts: [
      { label: "When", value: "Day 1 (Stage I screening)" },
      { label: "Format", value: "Written, verbal and non-verbal reasoning" },
      { label: "Marked by", value: "Board psychologists" },
      { label: "Note", value: "Paper length and timing vary by board" },
    ],
    what: [
      "Verbal reasoning: analogies, coding and decoding, series, ranking and logical deductions.",
      "Non-verbal reasoning: figure series, matrices, odd-one-out and pattern completion.",
      "Your OIR performance is considered together with the PPDT when deciding who is screened in.",
    ],
    tips: [
      "Practise timed sets daily and track accuracy as well as speed.",
      "Learn the common question patterns so you recognise them quickly.",
      "Attempt the questions you are sure of first and come back to the rest.",
      "Sleep well before Day 1. Mental sharpness matters more than last-minute revision.",
    ],
    mistakes: [
      "Spending too long on one difficult question.",
      "Guessing randomly instead of reasoning.",
      "Slowing down or losing focus in the last few minutes.",
    ],
    olqs: ["Effective Intelligence", "Reasoning Ability"],
  },
  {
    slug: "ppdt",
    title: "PPDT: Picture Perception & Discussion Test",
    short: "PPDT",
    day: "Day 1",
    summary:
      "A hazy picture is shown for 30 seconds. You note what you see, write a short story, then narrate and discuss it with a group of candidates to reach a common story.",
    facts: [
      { label: "When", value: "Day 1 (Stage I screening)" },
      { label: "Picture shown", value: "30 seconds" },
      { label: "Observation notes", value: "1 minute" },
      { label: "Story writing", value: "4 minutes" },
      { label: "Group discussion", value: "About 30 minutes, groups of 15–20" },
    ],
    what: [
      "The picture is shown for 30 seconds. You then get 1 minute to note the number of characters, their age, sex and mood, and the core action or theme.",
      "You write a short story in 4 minutes, covering what led to the situation, what is happening, and how it ends.",
      "In your group, each candidate narrates their story. The group then discusses and tries to agree on one common story.",
      "Assessors watch perception, imagination, communication and how you behave in a group.",
    ],
    tips: [
      "Read the picture quickly: who, how many, what mood, what is the action.",
      "Write a realistic, positive and action-oriented story with a constructive ending.",
      "Narrate clearly and confidently in your own words.",
      "In the discussion, listen first, make your point calmly, and be ready to agree on a common story.",
    ],
    mistakes: [
      "Describing the picture instead of telling a story.",
      "Writing negative or unrealistic stories.",
      "Dominating the discussion or staying silent.",
      "Arguing for your story instead of working towards a common one.",
    ],
    olqs: ["Effective Intelligence", "Power of Expression", "Social Adaptability", "Cooperation"],
  },
  {
    slug: "tat",
    title: "TAT: Thematic Apperception Test",
    short: "TAT",
    day: "Day 2",
    summary:
      "You see 12 picture slides, one at a time, and write a story for each. The stories reveal how you naturally think, feel and act.",
    facts: [
      { label: "When", value: "Day 2 (Stage II, psychological tests)" },
      { label: "Slides", value: "12 (11 pictures and 1 blank)" },
      { label: "Viewing time", value: "30 seconds each" },
      { label: "Writing time", value: "4 minutes per story" },
    ],
    what: [
      "Eleven picture slides are shown one after another for 30 seconds each, with 4 minutes to write a story for each.",
      "The 12th slide is blank. You imagine a situation of your own choice and write a story about it.",
      "A good story shows what led to the situation, what is happening, what the hero does, and the outcome.",
      "Psychologists look for the themes and attitudes that repeat across all your stories.",
    ],
    tips: [
      "Use a simple structure: situation, action, outcome.",
      "Make the hero a positive, resourceful person who takes initiative and solves the problem.",
      "Keep the stories realistic and consistent with your real personality.",
      "For the blank slide, write about a situation you could genuinely imagine yourself in.",
    ],
    mistakes: [
      "Memorised or copied stories.",
      "Endings with failure, confusion or no result.",
      "Too many characters or an over-complicated plot.",
      "Not finishing a story in the time given.",
    ],
    olqs: ["Initiative", "Determination", "Sense of Responsibility", "Courage"],
  },
  {
    slug: "wat",
    title: "WAT: Word Association Test",
    short: "WAT",
    day: "Day 2",
    summary:
      "60 words are shown one after another. For each word you write the first meaningful sentence that comes to mind, within 15 seconds.",
    facts: [
      { label: "When", value: "Day 2 (Stage II, psychological tests)" },
      { label: "Words", value: "60" },
      { label: "Time per word", value: "15 seconds" },
      { label: "Answer", value: "One sentence per word" },
    ],
    what: [
      "Each word stays on the screen for 15 seconds. You write the first sentence or thought that comes to mind.",
      "Words cover everyday life, emotions, relationships, duty and challenges.",
      "Your sentences show your habitual thinking, attitude and value system.",
    ],
    tips: [
      "Write short, positive sentences about action and effort.",
      "Do not write single words or definitions. Always write a complete sentence.",
      "Practise with a timer so the response becomes natural and quick.",
      "Stay consistent with the personality you show in the other tests.",
    ],
    mistakes: [
      "Negative or pessimistic sentences.",
      "Leaving words blank.",
      "Repeating the same sentence pattern for every word.",
      "Overthinking and running out of time.",
    ],
    olqs: ["Effective Intelligence", "Speed of Decision", "Liveliness"],
  },
  {
    slug: "srt",
    title: "SRT: Situation Reaction Test",
    short: "SRT",
    day: "Day 2",
    summary:
      "A booklet gives you 60 everyday and difficult situations. You write how you would react to each, within 30 minutes in total.",
    facts: [
      { label: "When", value: "Day 2 (Stage II, psychological tests)" },
      { label: "Situations", value: "60" },
      { label: "Total time", value: "30 minutes" },
      { label: "Answer", value: "Your action in each situation" },
    ],
    what: [
      "The booklet contains 60 real-life or crisis situations, such as helping someone in trouble, a team problem or an emergency.",
      "You have 30 minutes in total, which is about 30 seconds per situation.",
      "Your reactions show decision-making, courage, responsibility and resourcefulness.",
    ],
    tips: [
      "Write what you would actually do, in a specific and practical way.",
      "Think of the person who needs help and of your responsibility.",
      "Keep each answer brief so that you can attempt every situation.",
      "A structure such as situation, action, result keeps answers clear.",
    ],
    mistakes: [
      "Unrealistic heroics.",
      "Passing the problem on to someone else.",
      "Leaving situations unanswered.",
      "Vague answers such as 'I will try to help'.",
    ],
    olqs: ["Speed of Decision", "Sense of Responsibility", "Initiative", "Organizing Ability"],
  },
  {
    slug: "sdt",
    title: "SDT: Self Description Test",
    short: "SDT",
    day: "Day 2",
    summary:
      "You write five short paragraphs describing yourself: how your parents, teachers and friends see you, how you see yourself, and the kind of person you want to become.",
    facts: [
      { label: "When", value: "Day 2 (Stage II, psychological tests)" },
      { label: "Paragraphs", value: "5" },
      { label: "Total time", value: "15 minutes" },
    ],
    what: [
      "Five paragraphs: what your parents think of you, what your teachers think, what your friends think, your own view of your strengths and weaknesses, and the qualities you want to improve.",
      "The psychologist reads it alongside everything else you wrote and checks that it is consistent.",
    ],
    tips: [
      "Be honest and balanced. Do not exaggerate your strengths.",
      "Mention weaknesses together with what you are doing to improve.",
      "Keep your goals realistic and specific.",
      "Make sure it matches the personality shown in your TAT, WAT and SRT.",
    ],
    mistakes: [
      "Contradicting your other tests.",
      "Describing a perfect person with no weaknesses.",
      "Generic statements that could describe anyone.",
    ],
    olqs: ["Self-Confidence", "Social Adaptability", "Determination"],
  },
  {
    slug: "gto",
    title: "GTO: Group Testing Officer Tasks",
    short: "GTO",
    day: "Day 3-4",
    summary:
      "A series of outdoor and indoor group tasks over Days 3 and 4. They assess leadership, cooperation, physical stamina and how you behave in a group.",
    facts: [
      { label: "When", value: "Days 3–4" },
      { label: "Assessor", value: "Group Testing Officer (GTO)" },
      { label: "Tasks", value: "9, from discussions to obstacle tasks" },
      { label: "Individual Obstacles", value: "10 obstacles in 3 minutes" },
    ],
    what: [
      "Group Discussion (GD): two discussions on general, social or current-affairs topics.",
      "Group Planning Exercise (GPE): plan a solution for a map-based crisis, first individually, then as a group.",
      "Progressive Group Task (PGT): a series of four obstacles where the group moves a load and helping materials under strict rules.",
      "Half Group Task (HGT): like PGT, with the group split in half so individual leadership shows more clearly.",
      "Lecturette: pick a slip with four topics, prepare for 3 minutes, and speak for 3 minutes.",
      "Individual Obstacles (IO): 10 obstacles to be completed within 3 minutes.",
      "Command Task: you act as the commander of a tactical obstacle and choose a few subordinates to help.",
      "Snake Race: groups race through obstacles carrying a rolled-up tent-pole.",
      "Final Group Task (FGT): one last obstacle that shows the whole group's teamwork.",
    ],
    tips: [
      "Contribute ideas early, support teammates and respect others' views.",
      "Stay physically fit and practise basic obstacle techniques.",
      "Prepare a variety of lecturette topics and practise speaking for three minutes.",
      "In the Command Task, delegate clearly and keep the group moving.",
    ],
    mistakes: [
      "Dominating the group or talking over others.",
      "Staying silent and not taking initiative.",
      "Ignoring teammates' suggestions.",
      "Giving up when a task seems impossible.",
    ],
    olqs: ["Cooperation", "Ability to Influence Group", "Organizing Ability", "Initiative", "Courage", "Stamina"],
  },
  {
    slug: "personal-interview",
    title: "PI: Personal Interview",
    short: "PI",
    day: "Day 3-4",
    summary:
      "A one-on-one conversation with the Interviewing Officer about you. It can take place on any of Days 2, 3 or 4, and is based on your PIQ form.",
    facts: [
      { label: "When", value: "Any of Days 2, 3 or 4" },
      { label: "Format", value: "One-on-one with the Interviewing Officer" },
      { label: "Based on", value: "Your PIQ form" },
    ],
    what: [
      "Questions on your family background, education, hobbies, routine, achievements and general awareness.",
      "Why you want to join the Armed Forces and what you know about the service you are applying for.",
      "The officer checks that your answers match the picture from your other tests.",
    ],
    tips: [
      "Know every line of your PIQ form, because anything on it can become a question.",
      "Be honest, calm and speak clearly in your own words.",
      "Follow current affairs and know your hobbies in depth.",
      "Prepare real examples from your life, not scripted answers.",
    ],
    mistakes: [
      "Memorised, rehearsed answers.",
      "Bluffing about things you do not know.",
      "Little knowledge of your own PIQ form.",
    ],
    olqs: ["Power of Expression", "Self-Confidence", "Sense of Responsibility", "Social Adaptability"],
  },
];

export const getStage = (slug: string) => ssbStages.find((s) => s.slug === slug);
