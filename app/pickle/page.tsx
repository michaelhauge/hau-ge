"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Question deck                                                       */
/* ------------------------------------------------------------------ */

const LIGHT_QUESTIONS = [
  "Ever ghosted a vendor or business contact and then randomly ran into them? What happened?",
  "Have you ever accidentally replied-all to an email you really shouldn't have? What did you do?",
  "Ever showed up to the completely wrong meeting, wrong location, or wrong day? Tell the story.",
  "Have you ever pretended to know someone's name when you had absolutely no idea who they were?",
  "Ever promised a client or customer something you had no idea how to deliver? How'd it go?",
  "Have you ever gone along with someone's terrible business idea just to avoid an awkward conversation?",
  "Ever hired someone because you liked them personally even though they weren't the most qualified? How'd that turn out?",
  "Have you ever borrowed someone's idea and passed it off as your own — even a little bit?",
  "Ever sent a message meant for your spouse or partner to a work colleague by accident?",
  "Have you ever completely winged a presentation or pitch with zero preparation? How'd it land?",
  "Ever said yes to a speaking gig, podcast, or event and then immediately regretted it?",
  "Have you ever used a sick day when you were completely fine? What were you actually doing?",
];

const MEDIUM_QUESTIONS = [
  "What's the worst hire you've ever made, and how long did it take you to admit the mistake?",
  "Have you ever had to fire a friend? What happened to the friendship?",
  "Tell us about a business decision that looked brilliant at the time and turned out to be a disaster.",
  "Have you ever exaggerated your company's traction or numbers in front of an investor or partner?",
  "When was the last time you were in a genuine cash flow crisis and didn't tell anyone?",
  "Have you ever stayed in a bad business partnership too long because you were afraid of the conflict?",
  "Tell us about a time you poached talent from a competitor — or had your talent poached.",
  "Have you ever had to choose between a lucrative deal and your values? What did you do?",
  "What's the most embarrassing pivot your business has ever made?",
  "Have you ever taken credit publicly for something your team actually did?",
  "Tell us about a time a key team member quit and it blindsided you completely.",
  "Have you ever ghosted a potential acquisition or partnership deal because you didn't know how to say no?",
];

const SPICY_QUESTIONS = [
  "Have you ever hidden a serious business problem from your board, investors, or co-founders? How did it resolve?",
  "What's the closest your business has ever come to completely failing — and who else knew?",
  "Have you ever made a decision that was good for the business but genuinely hurt someone you cared about?",
  "Tell us about a time your ego cost you money, a relationship, or an opportunity.",
  "Have you ever not told the full truth to your spouse or life partner about something business-related? Did it come back to bite you?",
  "What's something you know you should change in your business or leadership style but keep avoiding?",
  "Have you ever paid someone to go away — whether a bad employee, a partner, or a client — just to make a problem disappear?",
  "Tell us about a moment you genuinely wanted to quit — as an entrepreneur or as a leader. What kept you going?",
  "Have you ever taken money from the business during a tough time in a way you weren't totally comfortable with?",
  "What's the biggest lie you've told yourself about your business that you've since had to confront?",
  "Have you ever competed unfairly — against a competitor, a peer, or even a friend — and justified it to yourself?",
  "Tell us about a time you chose money over integrity. Would you make the same call today?",
];

type Tier = "light" | "medium" | "spicy";

const TIERS: Record<
  Tier,
  {
    emoji: string;
    label: string;
    vibe: string;
    questions: string[];
    accent: string;
    soft: string;
  }
> = {
  light: {
    emoji: "🟢",
    label: "Light Pickle",
    vibe: "Fun, low stakes",
    questions: LIGHT_QUESTIONS,
    accent: "#5B8C3E",
    soft: "#D4E8C2",
  },
  medium: {
    emoji: "🟡",
    label: "Medium Pickle",
    vibe: "Professional vulnerability",
    questions: MEDIUM_QUESTIONS,
    accent: "#C9A227",
    soft: "#F5EAC0",
  },
  spicy: {
    emoji: "🔴",
    label: "Spicy Pickle",
    vibe: "Real talk, deeper honesty",
    questions: SPICY_QUESTIONS,
    accent: "#C0392B",
    soft: "#F6D6D0",
  },
};

const WIN_TARGET = 6;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

type Team = 1 | 2;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Screen = "setup" | "main" | "tier" | "question" | "hof" | "endgame";

interface Nomination {
  id: number;
  question: string;
  tier: Tier;
  teamName: string;
}

interface DeckState {
  order: Record<Tier, string[]>;
  index: Record<Tier, number>;
}

function freshDecks(): DeckState {
  return {
    order: {
      light: shuffle(LIGHT_QUESTIONS),
      medium: shuffle(MEDIUM_QUESTIONS),
      spicy: shuffle(SPICY_QUESTIONS),
    },
    index: { light: 0, medium: 0, spicy: 0 },
  };
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function PicklePage() {
  const [screen, setScreen] = useState<Screen>("setup");

  // Setup / teams
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");

  // Score (sets won)
  const [scores, setScores] = useState<{ 1: number; 2: number }>({ 1: 0, 2: 0 });

  // Auto-bump tracking: consecutive Light picks per team
  const [lightStreak, setLightStreak] = useState<{ 1: number; 2: number }>({
    1: 0,
    2: 0,
  });

  // Pass-the-pickle usage for the whole game (one per team)
  const [passUsed, setPassUsed] = useState<{ 1: boolean; 2: boolean }>({
    1: false,
    2: false,
  });

  // Question deck (shuffled, no repeats until exhausted)
  const [decks, setDecks] = useState<DeckState>(freshDecks);

  // Active challenge
  const [losingTeam, setLosingTeam] = useState<Team>(1);
  const [forcedBump, setForcedBump] = useState(false);
  const [tier, setTier] = useState<Tier>("light");
  const [question, setQuestion] = useState("");
  const [answerer, setAnswerer] = useState<Team>(1); // who is currently on the hook
  const [passedOnce, setPassedOnce] = useState(false);
  const [doublePassed, setDoublePassed] = useState(false);
  const [nominatedThis, setNominatedThis] = useState(false);

  // Hall of Fame
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [championId, setChampionId] = useState<number | null>(null);
  const [hofReturn, setHofReturn] = useState<Screen>("main");

  const teamName = (t: Team) => (t === 1 ? team1Name : team2Name) || `Team ${t}`;
  const opponent = (t: Team): Team => (t === 1 ? 2 : 1);
  const winningTeam = opponent(losingTeam);

  /* -------------------- deck draw -------------------- */

  function drawQuestion(t: Tier): string {
    let order = decks.order[t];
    let idx = decks.index[t];
    if (idx >= order.length) {
      order = shuffle(order);
      idx = 0;
      setDecks((d) => ({
        order: { ...d.order, [t]: order },
        index: { ...d.index, [t]: 1 },
      }));
    } else {
      setDecks((d) => ({
        ...d,
        index: { ...d.index, [t]: idx + 1 },
      }));
    }
    return order[idx];
  }

  /* -------------------- flow handlers -------------------- */

  function startGame() {
    setScores({ 1: 0, 2: 0 });
    setLightStreak({ 1: 0, 2: 0 });
    setPassUsed({ 1: false, 2: false });
    setDecks(freshDecks());
    setNominations([]);
    setVotes({});
    setChampionId(null);
    setScreen("main");
  }

  function teamLost(t: Team) {
    setLosingTeam(t);
    setForcedBump(lightStreak[t] >= 2);
    setScreen("tier");
  }

  function chooseTier(t: Tier) {
    // Auto-bump: Light is blocked after two Lights in a row.
    if (t === "light" && forcedBump) return;

    setLightStreak((s) => ({
      ...s,
      [losingTeam]: t === "light" ? s[losingTeam] + 1 : 0,
    }));

    setTier(t);
    setQuestion(drawQuestion(t));
    setAnswerer(losingTeam);
    setPassedOnce(false);
    setDoublePassed(false);
    setNominatedThis(false);
    setScreen("question");
  }

  function passPickle() {
    if (passUsed[answerer] || doublePassed) return;

    setPassUsed((p) => ({ ...p, [answerer]: true }));

    if (!passedOnce) {
      // First pass: hand the same question to the opponent.
      setPassedOnce(true);
      setAnswerer(opponent(answerer));
    } else {
      // Second pass (opponent passes back): new question, original team
      // answers, no more passes.
      setDoublePassed(true);
      setAnswerer(losingTeam);
      setQuestion(drawQuestion(tier));
      setNominatedThis(false);
    }
  }

  function nominate() {
    if (nominatedThis) return;
    setNominations((n) => [
      ...n,
      { id: Date.now(), question, tier, teamName: teamName(answerer) },
    ]);
    setNominatedThis(true);
  }

  function awardPoint() {
    const next = { ...scores, [winningTeam]: scores[winningTeam] + 1 };
    setScores(next);
    if (next[winningTeam] >= WIN_TARGET) {
      setScreen("endgame");
    } else {
      setScreen("main");
    }
  }

  function openHallOfFame() {
    setHofReturn(screen);
    setScreen("hof");
  }

  function crownChampion() {
    if (nominations.length === 0) return;
    let bestId = nominations[0].id;
    let bestVotes = votes[bestId] ?? 0;
    for (const n of nominations) {
      const v = votes[n.id] ?? 0;
      if (v > bestVotes) {
        bestVotes = v;
        bestId = n.id;
      }
    }
    setChampionId(bestId);
  }

  /* -------------------- shared styles -------------------- */

  const primaryBtn =
    "w-full rounded-2xl bg-[#5B8C3E] px-6 py-5 text-xl font-extrabold text-white shadow-lg shadow-black/20 transition active:scale-95 disabled:opacity-40 disabled:active:scale-100";
  const ghostBtn =
    "w-full rounded-2xl border-2 border-white/70 px-6 py-4 text-lg font-bold text-white transition active:scale-95 disabled:opacity-40 disabled:active:scale-100";

  /* -------------------- screen render -------------------- */

  let content: React.ReactNode = null;

  if (screen === "setup") {
    content = (
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="text-center">
          <div className="text-7xl">🥒</div>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-white drop-shadow-md">
            I&rsquo;m In A Pickle
          </h1>
          <p className="mt-3 text-lg font-semibold text-[#D4E8C2]">
            Lose a set, spill the truth.
          </p>
        </div>

        <div className="w-full rounded-3xl bg-white/95 p-6 shadow-xl">
          <label className="block text-sm font-bold uppercase tracking-wide text-[#5B8C3E]">
            Team 1
          </label>
          <input
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
            placeholder="e.g. Dill With It"
            className="mt-2 w-full rounded-xl border-2 border-[#8DB86B] bg-[#F4F9EE] px-4 py-4 text-lg font-semibold text-[#2c3e1f] outline-none focus:border-[#5B8C3E]"
          />

          <label className="mt-5 block text-sm font-bold uppercase tracking-wide text-[#5B8C3E]">
            Team 2
          </label>
          <input
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
            placeholder="e.g. Big Dill Energy"
            className="mt-2 w-full rounded-xl border-2 border-[#8DB86B] bg-[#F4F9EE] px-4 py-4 text-lg font-semibold text-[#2c3e1f] outline-none focus:border-[#5B8C3E]"
          />
        </div>

        <button onClick={startGame} className={primaryBtn}>
          Start Game 🥒
        </button>
        <p className="text-center text-sm font-medium text-[#D4E8C2]">
          First to {WIN_TARGET} sets wins the match.
        </p>
      </div>
    );
  }

  if (screen === "main") {
    content = (
      <div className="flex w-full max-w-md flex-col gap-6">
        <Scoreboard
          team1Name={teamName(1)}
          team2Name={teamName(2)}
          s1={scores[1]}
          s2={scores[2]}
        />

        <p className="text-center text-lg font-semibold text-[#D4E8C2]">
          Who just lost a set?
        </p>

        <button
          onClick={() => teamLost(1)}
          className="w-full rounded-2xl bg-white px-6 py-7 text-2xl font-black text-[#5B8C3E] shadow-lg shadow-black/20 transition active:scale-95"
        >
          {teamName(1)} Lost a Set
        </button>
        <button
          onClick={() => teamLost(2)}
          className="w-full rounded-2xl bg-white px-6 py-7 text-2xl font-black text-[#5B8C3E] shadow-lg shadow-black/20 transition active:scale-95"
        >
          {teamName(2)} Lost a Set
        </button>

        <button
          onClick={() => setScreen("endgame")}
          className={ghostBtn + " mt-2"}
        >
          End Game
        </button>
      </div>
    );
  }

  if (screen === "tier") {
    content = (
      <div className="flex w-full max-w-md flex-col gap-5">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#D4E8C2]">
            {teamName(losingTeam)} is in a pickle
          </p>
          <h2 className="mt-1 text-3xl font-black text-white drop-shadow">
            Pick your spice level
          </h2>
        </div>

        {forcedBump && (
          <div className="rounded-2xl bg-[#C0392B] px-5 py-4 text-center text-lg font-extrabold text-white shadow-lg">
            Time to turn up the heat! 🌶️
            <div className="mt-1 text-sm font-semibold text-white/90">
              Two Lights in a row — Medium minimum this time.
            </div>
          </div>
        )}

        {(Object.keys(TIERS) as Tier[]).map((t) => {
          const info = TIERS[t];
          const blocked = t === "light" && forcedBump;
          return (
            <button
              key={t}
              onClick={() => chooseTier(t)}
              disabled={blocked}
              className="w-full rounded-2xl px-6 py-6 text-left shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
              style={{ backgroundColor: info.soft }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{info.emoji}</span>
                <div>
                  <div
                    className="text-2xl font-black"
                    style={{ color: info.accent }}
                  >
                    {info.label}
                  </div>
                  <div className="text-sm font-semibold text-[#3a4a2c]">
                    {blocked ? "Locked — turn up the heat" : info.vibe}
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        <button onClick={() => setScreen("main")} className={ghostBtn}>
          ← Back
        </button>
      </div>
    );
  }

  if (screen === "question") {
    const info = TIERS[tier];
    const passDisabled = passUsed[answerer] || doublePassed;
    content = (
      <div className="flex w-full max-w-md flex-col gap-5">
        <div className="text-center">
          <span
            className="inline-block rounded-full px-4 py-1 text-sm font-black"
            style={{ backgroundColor: info.soft, color: info.accent }}
          >
            {info.emoji} {info.label}
          </span>
        </div>

        <div className="rounded-3xl bg-white px-6 py-8 text-center shadow-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#8DB86B]">
            {teamName(answerer)} answers
          </p>
          <p className="mt-4 text-2xl font-extrabold leading-snug text-[#2c3e1f]">
            {question}
          </p>
        </div>

        {passedOnce && !doublePassed && (
          <p className="text-center text-sm font-bold text-[#D4E8C2]">
            🥒 Passed to {teamName(answerer)}!
          </p>
        )}
        {doublePassed && (
          <p className="text-center text-sm font-bold text-[#D4E8C2]">
            Double pass! Fresh question — no more dodging. 🥒
          </p>
        )}

        <button
          onClick={passPickle}
          disabled={passDisabled}
          className="w-full rounded-2xl bg-[#3f6b2a] px-6 py-4 text-lg font-extrabold text-white shadow-lg transition active:scale-95 disabled:opacity-40 disabled:active:scale-100"
        >
          {passDisabled
            ? "Pass Used 🥒"
            : `Pass the Pickle 🥒 (${teamName(opponent(answerer))})`}
        </button>

        <button
          onClick={nominate}
          disabled={nominatedThis}
          className="w-full rounded-2xl bg-[#E9C46A] px-6 py-4 text-lg font-extrabold text-[#5a4a1a] shadow-lg transition active:scale-95 disabled:opacity-60 disabled:active:scale-100"
        >
          {nominatedThis ? "🏆 Nominated!" : "🏆 Nominate This Answer"}
        </button>

        <button onClick={awardPoint} className={primaryBtn}>
          Done — Award {teamName(winningTeam)} the Point
        </button>
      </div>
    );
  }

  if (screen === "hof") {
    const sorted = [...nominations].sort(
      (a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0),
    );
    const champion = nominations.find((n) => n.id === championId) ?? null;
    content = (
      <div className="flex w-full max-w-md flex-col gap-5">
        <div className="text-center">
          <div className="text-6xl">🏆</div>
          <h2 className="mt-2 text-4xl font-black text-white drop-shadow">
            Hall of Fame
          </h2>
          <p className="mt-1 text-sm font-semibold text-[#D4E8C2]">
            Tap a moment to cast a vote. One vote per player.
          </p>
        </div>

        {champion && (
          <div className="pickle-pop rounded-3xl bg-gradient-to-br from-[#E9C46A] to-[#C9A227] px-6 py-7 text-center shadow-2xl">
            <div className="pickle-bounce text-5xl">🥒👑</div>
            <p className="mt-2 text-lg font-black text-[#5a4a1a]">
              Pickle Champion
            </p>
            <p className="mt-1 text-xl font-extrabold text-[#3a2f0d]">
              {champion.teamName}
            </p>
            <p className="mt-2 text-sm font-semibold italic text-[#5a4a1a]">
              &ldquo;{champion.question}&rdquo;
            </p>
            <p className="mt-2 text-sm font-bold text-[#5a4a1a]">
              {votes[champion.id] ?? 0} votes
            </p>
          </div>
        )}

        {nominations.length === 0 ? (
          <div className="rounded-3xl bg-white/95 px-6 py-10 text-center">
            <p className="text-lg font-bold text-[#5B8C3E]">
              No nominations yet 🥒
            </p>
            <p className="mt-1 text-sm font-medium text-[#3a4a2c]">
              Nominate great answers during the game.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((n) => {
              const info = TIERS[n.tier];
              return (
                <button
                  key={n.id}
                  onClick={() =>
                    setVotes((v) => ({ ...v, [n.id]: (v[n.id] ?? 0) + 1 }))
                  }
                  className="w-full rounded-2xl bg-white px-5 py-4 text-left shadow-lg transition active:scale-95"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-black"
                      style={{ backgroundColor: info.soft, color: info.accent }}
                    >
                      {info.emoji} {info.label}
                    </span>
                    <span className="rounded-full bg-[#5B8C3E] px-3 py-1 text-sm font-black text-white">
                      {votes[n.id] ?? 0} ▲
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#8DB86B]">
                    {n.teamName}
                  </p>
                  <p className="mt-1 text-base font-bold leading-snug text-[#2c3e1f]">
                    {n.question}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {nominations.length > 0 && (
          <button onClick={crownChampion} className={primaryBtn}>
            Crown the Pickle Champion 🥒👑
          </button>
        )}

        <button onClick={() => setScreen(hofReturn)} className={ghostBtn}>
          ← Back
        </button>
      </div>
    );
  }

  if (screen === "endgame") {
    const champ: Team | null =
      scores[1] === scores[2] ? null : scores[1] > scores[2] ? 1 : 2;
    content = (
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="pickle-pop text-center">
          <div className="pickle-bounce text-7xl">
            {champ ? "🥒🏆" : "🥒🤝"}
          </div>
          <h2 className="mt-3 text-4xl font-black text-white drop-shadow">
            {champ ? `${teamName(champ)} wins!` : "It’s a tie!"}
          </h2>
        </div>

        <Scoreboard
          team1Name={teamName(1)}
          team2Name={teamName(2)}
          s1={scores[1]}
          s2={scores[2]}
        />

        <button onClick={openHallOfFame} className={primaryBtn}>
          Go to Hall of Fame Voting 🏆
        </button>
        <button onClick={() => setScreen("setup")} className={ghostBtn}>
          Start New Game
        </button>
      </div>
    );
  }

  /* -------------------- shell -------------------- */

  const showTrophy = screen !== "setup" && screen !== "hof";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#6f9e4f] via-[#5B8C3E] to-[#3f6b2a]">
      {showTrophy && (
        <button
          onClick={openHallOfFame}
          aria-label="Open Hall of Fame"
          className="fixed right-4 top-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#E9C46A] text-2xl shadow-lg shadow-black/30 transition active:scale-90"
        >
          🏆
        </button>
      )}
      <div className="flex min-h-full items-center justify-center px-5 py-10">
        <div key={screen} className="pickle-screen w-full">
          <div className="flex justify-center">{content}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scoreboard                                                          */
/* ------------------------------------------------------------------ */

function Scoreboard({
  team1Name,
  team2Name,
  s1,
  s2,
}: {
  team1Name: string;
  team2Name: string;
  s1: number;
  s2: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <ScoreCard name={team1Name} score={s1} leading={s1 > s2} />
      <ScoreCard name={team2Name} score={s2} leading={s2 > s1} />
    </div>
  );
}

function ScoreCard({
  name,
  score,
  leading,
}: {
  name: string;
  score: number;
  leading: boolean;
}) {
  return (
    <div
      className={`rounded-2xl px-4 py-5 text-center shadow-lg ${
        leading ? "bg-white" : "bg-white/80"
      }`}
    >
      <div className="truncate text-sm font-bold uppercase tracking-wide text-[#5B8C3E]">
        {name}
      </div>
      <div className="mt-1 text-5xl font-black text-[#2c3e1f]">{score}</div>
      <div className="text-xs font-semibold text-[#8DB86B]">
        {score === 1 ? "set" : "sets"}
      </div>
    </div>
  );
}
