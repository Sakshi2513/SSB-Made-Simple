export type GTOTask = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  facts: { label: string; value: string }[];
  steps: string[];
  rules: string[];
  lookFor: string[];
  tips: string[];
  mistakes: string[];
  olqs: string[];
};

// Timings and layouts can vary slightly between selection boards. Always follow your board's instructions.
export const gtoTasks: GTOTask[] = [
  {
    slug: "group-discussion",
    name: "Group Discussion",
    short: "GD",
    intro:
      "The whole group sits together and discusses a topic given by the GTO. There is no appointed leader. The GTO watches how you communicate, listen and influence the group.",
    facts: [
      { label: "Part of", value: "GTO tasks, Days 3–4" },
      { label: "Sessions", value: "Two group discussions" },
      { label: "Time", value: "Roughly 20 minutes each (varies)" },
      { label: "Topics", value: "General, social or current affairs" },
    ],
    steps: [
      "The group is seated and the GTO announces the topic.",
      "Candidates discuss freely. There is no fixed speaking order and no leader.",
      "The GTO observes quietly and may bring the discussion to a close after the time is up.",
    ],
    rules: [
      "Speak only when you have something relevant to add. Do not shout over others.",
      "Address the group, not just one person.",
      "Support your points with facts or short examples.",
    ],
    lookFor: [
      "Clarity and logic in how you put your points.",
      "Whether you listen and build on other people's ideas.",
      "Whether you stay calm, polite and confident when you disagree.",
    ],
    tips: [
      "Follow current affairs and form your own balanced opinions beforehand.",
      "Enter the discussion early with a clear, relevant point.",
      "Bring quieter members into the conversation. It shows leadership.",
      "Summarise the group's view if the discussion drifts.",
    ],
    mistakes: [
      "Dominating or interrupting.",
      "Staying silent for most of the discussion.",
      "Arguing emotionally or making personal remarks.",
      "Repeating points that have already been made.",
    ],
    olqs: ["Power of Expression", "Social Adaptability", "Ability to Influence Group", "Cooperation"],
  },
  {
    slug: "group-planning-exercise",
    name: "Group Planning Exercise",
    short: "GPE",
    intro:
      "A map-based planning problem. The group is shown a model of an area with several problems happening at once. Each candidate plans individually first, then the group agrees on one plan.",
    facts: [
      { label: "Part of", value: "GTO tasks, Day 3" },
      { label: "Reading time", value: "About 5 minutes" },
      { label: "Individual plan", value: "About 10–15 minutes, in writing" },
      { label: "Group discussion", value: "About 10–15 minutes" },
    ],
    steps: [
      "The GTO explains the model, including its scale, directions and landmarks.",
      "You read the problem card. It lists the problems, the resources you have, and the rules.",
      "You write your own solution without talking to anyone.",
      "The group discusses and agrees on a common plan.",
      "One candidate presents the final plan to the GTO using the model.",
    ],
    rules: [
      "No discussion is allowed while you write your individual plan.",
      "Use the resources given. Do not assume extra ones.",
      "Follow the stated distances, speeds and timings.",
    ],
    lookFor: [
      "Whether your plan is practical, prioritised and well organised.",
      "How you put your plan forward and how you respond to others' plans.",
      "Whether the group reaches a clear, workable decision.",
    ],
    tips: [
      "Read the problems carefully and decide which are most urgent.",
      "Plan the order of actions and use every resource sensibly.",
      "Keep your plan short, clear and easy to explain.",
      "In the discussion, be ready to adopt a better idea from someone else.",
    ],
    mistakes: [
      "Missing a problem or ignoring a rule.",
      "Unrealistic assumptions about time, distance or resources.",
      "Refusing to compromise in the group discussion.",
      "A long plan with no clear priorities.",
    ],
    olqs: ["Organizing Ability", "Reasoning Ability", "Effective Intelligence", "Speed of Decision"],
  },
  {
    slug: "progressive-group-task",
    name: "Progressive Group Task",
    short: "PGT",
    intro:
      "The first outdoor obstacle task. The whole group crosses a series of four obstacles of increasing difficulty, moving a load and using helping materials, while following strict rules.",
    facts: [
      { label: "Part of", value: "GTO tasks, Day 3" },
      { label: "Obstacles", value: "Four, each harder than the last" },
      { label: "Helping materials", value: "Plank, pole (balli) and rope" },
      { label: "Team", value: "The whole group" },
    ],
    steps: [
      "The GTO explains the rules. The group gets a short time to plan.",
      "The group moves from the start line to the finish line, crossing each obstacle in order.",
      "At every obstacle, the whole group and the load must cross using only the helping materials.",
      "If a rule is broken, the group is sent back and tries again.",
    ],
    rules: [
      "Out-of-bounds areas, such as the ground between obstacles, must not be touched.",
      "Group rule: the group stays together and crosses together.",
      "Distance rule: the helping materials must not be used to jump or cover banned distances.",
      "The load must not touch the ground, and helping materials must not touch out-of-bounds areas.",
    ],
    lookFor: [
      "Who comes up with workable ideas and shares them clearly.",
      "Who stays safe, follows the rules and helps others.",
      "Who keeps the team motivated when an attempt fails.",
    ],
    tips: [
      "Listen to the instructions fully. Rules are the most important part.",
      "Observe the obstacle first, then suggest a simple, safe plan.",
      "Encourage teammates by name and share the physical work.",
      "If the plan fails, quickly adjust instead of blaming anyone.",
    ],
    mistakes: [
      "Rushing without understanding the rules.",
      "Dominating or ignoring the weaker teammates.",
      "Breaking rules repeatedly and getting frustrated.",
      "Giving up when an obstacle looks too hard.",
    ],
    olqs: ["Cooperation", "Initiative", "Organizing Ability", "Ability to Influence Group", "Stamina"],
  },
  {
    slug: "half-group-task",
    name: "Half Group Task",
    short: "HGT",
    intro:
      "The same type of obstacle task as the PGT, but the group is split into two smaller halves. With fewer people, each candidate's leadership and effort are easier to observe.",
    facts: [
      { label: "Part of", value: "GTO tasks, Day 3 or 4" },
      { label: "Team", value: "Half of the group" },
      { label: "Rules", value: "Same as PGT, applied to the half group" },
      { label: "Helping materials", value: "Plank, pole (balli) and rope" },
    ],
    steps: [
      "The group is divided into two halves, and one half attempts the task at a time.",
      "The GTO explains the obstacle and the rules.",
      "Your half group plans, crosses the obstacle with the load, and finishes within the time.",
    ],
    rules: [
      "PGT rules apply. The group rule now applies to your half group.",
      "Do not touch out-of-bounds areas and do not let the load touch the ground.",
      "Use only the helping materials provided.",
    ],
    lookFor: [
      "Individual initiative and clear ideas.",
      "How you coordinate with a smaller team.",
      "Your physical effort and how you handle pressure.",
    ],
    tips: [
      "Speak up early. A smaller group gives you more chances to contribute.",
      "Divide tasks so that nobody is idle.",
      "Stay positive even if the other half did better.",
    ],
    mistakes: [
      "Staying passive because the group is small.",
      "Taking over completely and not listening.",
      "Losing time arguing about the plan.",
    ],
    olqs: ["Initiative", "Cooperation", "Ability to Influence Group", "Stamina", "Courage"],
  },
  {
    slug: "lecturette",
    name: "Lecturette",
    short: "Lecturette",
    intro:
      "A short individual speech. You choose one topic from four given on a slip, prepare briefly, and speak for about three minutes in front of the group and the GTO.",
    facts: [
      { label: "Part of", value: "GTO tasks, Days 3–4" },
      { label: "Topics", value: "Four on a slip, you choose one" },
      { label: "Speaking time", value: "About 3 minutes" },
      { label: "Audience", value: "The group and the GTO" },
    ],
    steps: [
      "Each candidate picks a slip with four topics and chooses the one they know best.",
      "You get a short time to prepare your points.",
      "You stand and speak for about three minutes without reading.",
    ],
    rules: [
      "Speak in a clear, steady voice and face the audience.",
      "Stay within the time. A bell may be rung to show time.",
      "Do not read from notes unless they are allowed.",
    ],
    lookFor: [
      "Confidence, voice, clarity and body language.",
      "Whether you have a clear structure and relevant knowledge.",
      "How you handle nervousness.",
    ],
    tips: [
      "Use a simple structure: introduction, two or three main points, conclusion.",
      "Pick the topic you know best, not the one that sounds impressive.",
      "Practise speaking for three minutes on random topics each day.",
      "Use a real example to make your points memorable.",
    ],
    mistakes: [
      "Speaking too fast or too softly.",
      "Memorised speeches that sound lifeless.",
      "Running out of points halfway.",
      "Wandering away from the topic.",
    ],
    olqs: ["Power of Expression", "Self-Confidence", "Effective Intelligence", "Liveliness"],
  },
  {
    slug: "individual-obstacles",
    name: "Individual Obstacles",
    short: "IO",
    intro:
      "Each candidate runs a course of ten obstacles on their own within about three minutes. Every obstacle carries points that increase as the obstacles get harder.",
    facts: [
      { label: "Part of", value: "GTO tasks, Day 4" },
      { label: "Obstacles", value: "10, numbered by points" },
      { label: "Time", value: "About 3 minutes" },
      { label: "Format", value: "One candidate at a time" },
    ],
    steps: [
      "The GTO explains each obstacle, such as the high wall, the monkey crawl and the commando walk.",
      "You attempt the obstacles one by one within the time limit.",
      "Points are earned for the obstacles you cross. If time remains, you may continue.",
    ],
    rules: [
      "Attempt the obstacles in the order shown.",
      "Follow the method shown for each obstacle.",
      "Safety matters. Do not attempt anything you were not told to.",
    ],
    lookFor: [
      "Courage and willingness to attempt every obstacle.",
      "Stamina, physical fitness and energy.",
      "Determination when an obstacle is difficult.",
    ],
    tips: [
      "Stay physically fit with running, strength and agility work.",
      "Listen carefully to the technique for each obstacle.",
      "Do not stop at the difficult ones. Try and keep moving.",
      "Pace yourself so that you finish more obstacles within the time.",
    ],
    mistakes: [
      "Giving up an obstacle without attempting it.",
      "Wasting time deciding how to begin.",
      "Starting too fast and tiring out early.",
    ],
    olqs: ["Courage", "Stamina", "Determination", "Self-Confidence"],
  },
  {
    slug: "command-task",
    name: "Command Task",
    short: "Command Task",
    intro:
      "Each candidate is given a turn as commander. You are briefed on an obstacle, choose subordinates from the group, plan, and lead them through the task.",
    facts: [
      { label: "Part of", value: "GTO tasks, Day 4" },
      { label: "Role", value: "You are the commander" },
      { label: "Team", value: "Subordinates you select" },
      { label: "Time", value: "Around 10–15 minutes (varies)" },
    ],
    steps: [
      "The group waits away from the obstacle while the GTO briefs you.",
      "You choose your subordinates, and you may ask the GTO questions.",
      "You explain the plan, delegate the work and lead the task.",
      "The GTO observes how you command, and how your team responds.",
    ],
    rules: [
      "Stay within the rules and the limits set by the GTO.",
      "Subordinates act on your instructions. Brief them clearly.",
      "Do not leave the commander's role. Keep giving orders as needed.",
    ],
    lookFor: [
      "Whether you make a clear plan and explain it.",
      "How you delegate, motivate and keep control.",
      "How you react when the plan does not work.",
    ],
    tips: [
      "Understand the task fully before choosing your team.",
      "Choose subordinates with different strengths.",
      "Give short, clear instructions and keep everyone involved.",
      "Stay calm and change the plan quickly if you need to.",
    ],
    mistakes: [
      "Doing the work yourself instead of delegating.",
      "Unclear instructions or no plan.",
      "Shouting or losing control.",
      "Ignoring your subordinates' suggestions.",
    ],
    olqs: ["Ability to Influence Group", "Organizing Ability", "Speed of Decision", "Sense of Responsibility", "Initiative"],
  },
  {
    slug: "snake-race",
    name: "Snake Race",
    short: "Snake Race",
    intro:
      "Also called the Group Obstacle Race. Competing groups race through a series of obstacles carrying a long, rolled-up tent, known as the snake. It tests teamwork, endurance and team spirit.",
    facts: [
      { label: "Part of", value: "GTO tasks, Day 3 or 4" },
      { label: "Teams", value: "Several groups race each other" },
      { label: "Group size", value: "About 8–10 candidates" },
      { label: "Carry", value: "A rolled-up tent, the snake" },
    ],
    steps: [
      "The group lines up and lifts the snake together.",
      "On the whistle, all groups race through the obstacle course.",
      "The group crosses each obstacle without dropping or dragging the snake.",
    ],
    rules: [
      "The snake must not touch the ground during the race.",
      "At least three people must hold the snake at any time.",
      "No one may run alone. The group moves together.",
    ],
    lookFor: [
      "Team spirit, encouragement and cooperation.",
      "Stamina and physical effort.",
      "Whether you help teammates who are struggling.",
    ],
    tips: [
      "Keep the group together and cheer your teammates on.",
      "Spread the load evenly so that no one tires early.",
      "Follow the rules. Breaking them can cost the race.",
      "Give full effort whether you are winning or not.",
    ],
    mistakes: [
      "Running ahead of the group.",
      "Letting the snake touch the ground.",
      "Giving up when the group falls behind.",
    ],
    olqs: ["Cooperation", "Stamina", "Determination", "Liveliness"],
  },
  {
    slug: "final-group-task",
    name: "Final Group Task",
    short: "FGT",
    intro:
      "The last obstacle task of the GTO series. The whole group works together once more, giving the GTO a final comparison of how each candidate contributes to the team.",
    facts: [
      { label: "Part of", value: "GTO tasks, Day 4" },
      { label: "Team", value: "The whole group" },
      { label: "Helping materials", value: "As given, similar to earlier tasks" },
      { label: "Importance", value: "Last chance to show your best" },
    ],
    steps: [
      "The GTO explains the obstacle and the rules.",
      "The group plans and crosses the obstacle with the load.",
      "The task ends the group testing, and the GTO notes any final observations.",
    ],
    rules: [
      "The same rules as the earlier group tasks apply.",
      "Use only the helping materials provided.",
      "The group works and finishes together.",
    ],
    lookFor: [
      "Consistency with how you behaved in earlier tasks.",
      "Cooperation, initiative and positive energy to the very end.",
      "Whether you help the team even when you are tired.",
    ],
    tips: [
      "Treat it like the first task. Energy matters until the end.",
      "Stay consistent. Be yourself and contribute honestly.",
      "Encourage tired teammates and keep the plan simple.",
    ],
    mistakes: [
      "Relaxing because the tasks are almost over.",
      "Behaving very differently from the earlier tasks.",
      "Blaming teammates if something goes wrong.",
    ],
    olqs: ["Cooperation", "Initiative", "Stamina", "Ability to Influence Group"],
  },
];

export const getGTOTask = (slug: string) => gtoTasks.find((t) => t.slug === slug);
