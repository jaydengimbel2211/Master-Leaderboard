import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Trophy,
  CloudSun,
  RefreshCw,
  Eye,
  Medal,
  Wind,
  Droplets,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Minus,
  Clock3,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CircleDollarSign,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RULES = [
  "Pick 6 golfers.",
  "You may only have 3 players selected from this Tier 1 list.",
  "You must enter a tiebreaker score.",
  "Tiebreaker = final score of the Masters champion.",
  "Golfers are scored by finishing position.",
  "The lowest average finishing position across all 6 players wins.",
  "If a player misses the cut, he is scored at the position where he finished when cut.",
];

const ENTRY_DATA = [
  { rank: 1, entryName: "Craig Svalen", averageFinish: null, tieBreaker: "-15", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Jon Rahm", "Justin Rose", "Brian Harman", "JJ Spaun", "Cameron Smith"], golferResults: [null, null, null, null, null, null] },
  { rank: 2, entryName: "Nick Nustad 1", averageFinish: null, tieBreaker: "-12", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Jon Rahm", "Bryson Dechambeau", "Min Woo Lee", "Si Woo Kim", "Russell Henley"], golferResults: [null, null, null, null, null, null] },
  { rank: 3, entryName: "Nick Nustad 2", averageFinish: null, tieBreaker: "-11", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Jon Rahm", "Rory McIlroy", "Min Woo Lee", "Si Woo Kim", "Akshay Bhatia"], golferResults: [null, null, null, null, null, null] },
  { rank: 4, entryName: "Dion Miller", averageFinish: null, tieBreaker: "-12", thru: "Pending", movement: 0, golfers: ["Bryson Dechambeau", "Robert MacIntyre", "Jon Rahm", "Akshay Bhatia", "Adam Scott", "Brian Harman"], golferResults: [null, null, null, null, null, null] },
  { rank: 5, entryName: "Dion Miller", averageFinish: null, tieBreaker: "-11", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Bryson Dechambeau", "Patrick Reed", "Sepp Straka", "Gary Woodland", "Akshay Bhatia"], golferResults: [null, null, null, null, null, null] },
  { rank: 6, entryName: "Darrel Hellman", averageFinish: null, tieBreaker: "-11", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Rory McIlroy", "Jon Rahm", "Gary Woodland", "Tom Hoge", "JJ Spaun"], golferResults: [null, null, null, null, null, null] },
  { rank: 7, entryName: "Braydin Jangula", averageFinish: null, tieBreaker: "-13", thru: "Pending", movement: 0, golfers: ["Scotttie Scheffler", "Bryson Dechambeau", "Tommy Fleetwood", "JJ Spaun", "Russell Henley", "Sepp Straka"], golferResults: [null, null, null, null, null, null] },
  { rank: 8, entryName: "Scott McPherson", averageFinish: null, tieBreaker: "-15", thru: "Pending", movement: 0, golfers: ["Scotttie Scheffler", "Collin Morikawa", "Cameron Young", "Jacob Bridgeman", "Min Woo Lee", "Akshay Bhatia"], golferResults: [null, null, null, null, null, null] },
  { rank: 9, entryName: "Blaney Gimbel", averageFinish: null, tieBreaker: "-14", thru: "Pending", movement: 0, golfers: ["Justin Rose", "Rory McIlroy", "Patrick Reed", "Harris English", "Akshay Bhatia", "Corey Conners"], golferResults: [null, null, null, null, null, null] },
  { rank: 10, entryName: "Troy Von Ruden", averageFinish: null, tieBreaker: "-12", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Ludvig Aberg", "Tommy Fleetwood", "Min Woo Lee", "Nicoli Hojgaard", "Max Greyserman"], golferResults: [null, null, null, null, null, null] },
  { rank: 11, entryName: "Josh Hagelstrom", averageFinish: null, tieBreaker: "-14", thru: "Pending", movement: 0, golfers: ["Matt Fitzpatrick", "Tommy Fleetwood", "Jordan Speith", "Corey Connors", "Harris English", "Sungjae Im"], golferResults: [null, null, null, null, null, null] },
  { rank: 12, entryName: "Lane Kaseman", averageFinish: null, tieBreaker: "-11", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Bryson Dechambeau", "Justin Rose", "Russell Henley", "Si Woo Kim", "Min Woo Lee"], golferResults: [null, null, null, null, null, null] },
  { rank: 13, entryName: "Brian Crosby", averageFinish: null, tieBreaker: "-15", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Cam Young", "Tommy Fleetwood", "Min Woo Lee", "Si Woo Kim", "Aaron Rai"], golferResults: [null, null, null, null, null, null] },
  { rank: 14, entryName: "Landon DeKrey", averageFinish: null, tieBreaker: "-16", thru: "Pending", movement: 0, golfers: ["Ludvig Aberg", "Scottie Sheffler", "Jon Rahm", "Cam Smith", "Sungjai Im", "Corey Conners"], golferResults: [null, null, null, null, null, null] },
  { rank: 15, entryName: "Joe Kramer", averageFinish: null, tieBreaker: "-13", thru: "Pending", movement: 0, golfers: ["Brooks Koepka", "Robert MacIntyre", "Tommy Fleetwood", "Daniel Berger", "Sam Burns", "Keegan Bradley"], golferResults: [null, null, null, null, null, null] },
  { rank: 16, entryName: "Joe Kramer 2", averageFinish: null, tieBreaker: "", thru: "Pending", movement: 0, golfers: ["Jon Rahm", "Ludvig Aberg", "Scottie Scheffler", "Sam Burns", "Daniel Berger", "Keegan Bradley"], golferResults: [null, null, null, null, null, null] },
  { rank: 17, entryName: "Justin Fleck", averageFinish: null, tieBreaker: "-13", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Rory McIlroy", "Bryson Dechambeau", "Min Woo Lee", "Russell Henley", "Akshay Bhatia"], golferResults: [null, null, null, null, null, null] },
  { rank: 18, entryName: "Chris Hellman", averageFinish: null, tieBreaker: "-11", thru: "Pending", movement: 0, golfers: ["Jon Rahm", "Ludvig Aberg", "Xander Schauffle", "Nicoli Hojgaard", "Si Woo Kim", "Jake Knapp"], golferResults: [null, null, null, null, null, null] },
  { rank: 19, entryName: "George Sarwinski", averageFinish: null, tieBreaker: "-15", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Rory McIlroy", "Xander Schauffle", "Akshay Bhatia", "Corey Conners", "Max Homa"], golferResults: [null, null, null, null, null, null] },
  { rank: 20, entryName: "Tammy Gimbel", averageFinish: null, tieBreaker: "-14", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Justin Rose", "Collin Morikawa", "Keegan Bradley", "Sungjai Im", "JJ Spaun"], golferResults: [null, null, null, null, null, null] },
  { rank: 21, entryName: "Scott Johnson", averageFinish: null, tieBreaker: "-13", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Xander Schauffle", "Rorry McIlroy", "JJ Spaun", "Russell Henley", "Sahith Theegala"], golferResults: [null, null, null, null, null, null] },
  { rank: 22, entryName: "Ryan Erhardt", averageFinish: null, tieBreaker: "-10", thru: "Pending", movement: 0, golfers: ["Bryson Dechambeau", "Jon Rahm", "Ludvig Aberg", "Russel Henley", "Adam Scott", "Akshay Bhatia"], golferResults: [null, null, null, null, null, null] },
  { rank: 23, entryName: "Riley Holwegner 1", averageFinish: null, tieBreaker: "-11", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Rory McIlroy", "Xander Schauffle", "Will Zalatoris", "Corey Conners", "Russell Henley"], golferResults: [null, null, null, null, null, null] },
  { rank: 24, entryName: "Riley Holwegner 2", averageFinish: null, tieBreaker: "-13", thru: "Pending", movement: 0, golfers: ["Jon Rahm", "Collin Morikawa", "Ludvig Aberg", "Sahith Theegala", "Min Woo Lee", "Sepp Straka"], golferResults: [null, null, null, null, null, null] },
  { rank: 25, entryName: "Roger Emineth", averageFinish: null, tieBreaker: "-13", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Jon Rahm", "Rory McIlroy", "Russel Henley", "Min Woo Lee", "Si Woo Kim"], golferResults: [null, null, null, null, null, null] },
  { rank: 26, entryName: "Chris Oen", averageFinish: null, tieBreaker: "-14", thru: "Pending", movement: 0, golfers: ["Bryson Dechambeau", "Ludvig Aberg", "Xander Schauffle", "Jacob Bridgeman", "Corey Conners", "Akshay Bhatia"], golferResults: [null, null, null, null, null, null] },
  { rank: 27, entryName: "Nick Goulet", averageFinish: null, tieBreaker: "-14", thru: "Pending", movement: 0, golfers: ["Bryson Dechambeau", "Tommy Fleetwood", "Cameron Young", "JJ Spaun", "Maverick McNealy", "Si Woo Kim"], golferResults: [null, null, null, null, null, null] },
  { rank: 28, entryName: "Jarrod Norquist", averageFinish: null, tieBreaker: "", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Ludvig Aberg", "Tommy Fleetwood", "Min Woo Lee", "Si Woo Kim", "Nicoli Hojgaard"], golferResults: [null, null, null, null, null, null] },
  { rank: 29, entryName: "Shane Hafner 1", averageFinish: null, tieBreaker: "-11", thru: "Pending", movement: 0, golfers: ["Ludvig Aberg", "Cameron Young", "Chris Gotterup", "JJ Spaun", "Si Woo Kim", "Min Woo Lee"], golferResults: [null, null, null, null, null, null] },
  { rank: 30, entryName: "Shane Hafner 2", averageFinish: null, tieBreaker: "-12", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Jon Rahm", "Bryson Dechambeau", "JJ Spaun", "Si Woo Kim", "Min Woo Lee"], golferResults: [null, null, null, null, null, null] },
  { rank: 31, entryName: "Sam Ingemanson", averageFinish: null, tieBreaker: "-13", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Matt Fitzpatrick", "Justin Rose", "Akshay Bhatia", "Sepp Straka", "Russell Henley"], golferResults: [null, null, null, null, null, null] },
  { rank: 32, entryName: "Cole Lawrence", averageFinish: null, tieBreaker: "-17", thru: "Pending", movement: 0, golfers: ["Scottie Scheffler", "Rory McIlroy", "Xander Schauffle", "Cam Smith", "Max Homa", "Min Woo Lee"], golferResults: [null, null, null, null, null, null] },
];

const DEFAULT_WEATHER = {
  current: {
    location: "Augusta National Golf Club, Georgia",
    tempF: 67,
    condition: "Mostly Sunny",
    humidity: 46,
    windMph: 9,
  },
  forecast: [
    { date: "Apr 9", high: 74, low: 50, condition: "Mostly Sunny" },
    { date: "Apr 10", high: 77, low: 54, condition: "Sunny" },
    { date: "Apr 11", high: 84, low: 58, condition: "Sunny" },
    { date: "Apr 12", high: 87, low: 59, condition: "Sunny" },
  ],
};

const LIVE_SOURCES = [
  { name: "masters.com", key: "masters" },
  { name: "pgatour.com", key: "pgatour" },
  { name: "source-3", key: "source3" },
];

const AUGUSTA_IMAGES = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hole%2012%20-%20Golden%20Bell%20%2817256384842%29.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Augusta%20National%20Golf%20Club%2C%20Hole%2010%20%28Camellia%29.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Augusta%20National%20Golf%20Club%20House%2C%20Augusta%2C%20Ga.%20%288343915624%29.jpg",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Hole%2013%20-%20Azalea%20%2817257609891%29.jpg",
];

const ENTRY_FEE = 25;

const PAYOUT_SPLITS = [
  { place: 1, percent: 0.6 },
  { place: 2, percent: 0.3 },
  { place: 3, percent: 0.1 },
];

const DEMO_PLAYERS = [
  { name: "Scottie Scheffler", score: "-8", thru: "14", pos: "1", hole: 14 },
  { name: "Rory McIlroy", score: "-7", thru: "15", pos: "2", hole: 15 },
  { name: "Jon Rahm", score: "-5", thru: "13", pos: "T3", hole: 13 },
  { name: "Collin Morikawa", score: "-4", thru: "12", pos: "T5", hole: 12 },
];

const DEMO_TEE_TIMES = {
  "johnny keefer": "7:40 AM / 10:51 AM",
  "haotong li": "7:40 AM / 10:51 AM",
  "naoyuki kataoka": "7:50 AM / 11:03 AM",
  "max homa": "7:50 AM / 11:03 AM",
  "carlos ortiz": "7:50 AM / 11:03 AM",
  "jose maria olazabal": "8:02 AM / 11:15 AM",
  "rasmus neergaard petersen": "8:02 AM / 11:15 AM",
  "aldrich potgieter": "8:02 AM / 11:15 AM",
  "angel cabrera": "8:14 AM / 11:27 AM",
  "sami valimaki": "8:14 AM / 11:27 AM",
  "jackson herrington": "8:14 AM / 11:27 AM",
  "charl schwartzel": "8:26 AM / 11:39 AM",
  "max greyserman": "8:26 AM / 11:39 AM",
  "ryan fox": "8:26 AM / 11:39 AM",
  "vijay singh": "8:38 AM / 11:51 AM",
  "matt mccarty": "8:38 AM / 11:51 AM",
  "rasmus hojgaard": "8:38 AM / 11:51 AM",
  "kurt kitayama": "8:50 AM / 12:03 PM",
  "kristoffer reitan": "8:50 AM / 12:03 PM",
  "casey jarvis": "8:50 AM / 12:03 PM",
  "bubba watson": "9:02 AM / 12:15 PM",
  "nico echavarria": "9:02 AM / 12:15 PM",
  "brandon holtz": "9:02 AM / 12:15 PM",
  "cameron smith": "9:19 AM / 12:32 PM",
  "cam smith": "9:19 AM / 12:32 PM",
  "sam burns": "9:19 AM / 12:32 PM",
  "jake knapp": "9:19 AM / 12:32 PM",
  "keegan bradley": "9:31 AM / 12:44 PM",
  "ryan gerard": "9:31 AM / 12:44 PM",
  "nick taylor": "9:31 AM / 12:44 PM",
  "dustin johnson": "9:43 AM / 12:56 PM",
  "shane lowry": "9:43 AM / 12:56 PM",
  "jason day": "9:43 AM / 12:56 PM",
  "patrick reed": "9:55 AM / 1:08 PM",
  "tommy fleetwood": "9:55 AM / 1:08 PM",
  "akshay bhatia": "9:55 AM / 1:08 PM",
  "bryson dechambeau": "10:07 AM / 1:20 PM",
  "matt fitzpatrick": "10:07 AM / 1:20 PM",
  "xander schauffele": "10:07 AM / 1:20 PM",
  "xander schauffle": "10:07 AM / 1:20 PM",
  "hideki matsuyama": "10:19 AM / 1:32 PM",
  "collin morikawa": "10:19 AM / 1:32 PM",
  "russell henley": "10:19 AM / 1:32 PM",
  "russel henley": "10:19 AM / 1:32 PM",
  "rory mcilroy": "10:31 AM / 1:44 PM",
  "rorry mcilroy": "10:31 AM / 1:44 PM",
  "cameron young": "10:31 AM / 1:44 PM",
  "cam young": "10:31 AM / 1:44 PM",
  "mason howell": "10:31 AM / 1:44 PM",
  "viktor hovland": "10:43 AM / 1:56 PM",
  "patrick cantlay": "10:43 AM / 1:56 PM",
  "alex noren": "10:43 AM / 1:56 PM",
  "samuel stevens": "11:03 AM / 7:40 AM",
  "sam stevens": "11:03 AM / 7:40 AM",
  "sungjae im": "11:03 AM / 7:40 AM",
  "sungjai im": "11:03 AM / 7:40 AM",
  "andrew novak": "11:15 AM / 7:50 AM",
  "tom mckibbin": "11:15 AM / 7:50 AM",
  "brian campbell": "11:15 AM / 7:50 AM",
  "mike weir": "11:27 AM / 8:02 AM",
  "wyndham clark": "11:27 AM / 8:02 AM",
  "mateo pulcini": "11:27 AM / 8:02 AM",
  "zach johnson": "11:39 AM / 8:14 AM",
  "michael kim": "11:39 AM / 8:14 AM",
  "nicolai hojgaard": "11:39 AM / 8:14 AM",
  "nicoli hojgaard": "11:39 AM / 8:14 AM",
  "danny willett": "11:51 AM / 8:26 AM",
  "davis riley": "11:51 AM / 8:26 AM",
  "ethan fang": "11:51 AM / 8:26 AM",
  "adam scott": "12:03 PM / 8:38 AM",
  "daniel berger": "12:03 PM / 8:38 AM",
  "brian harman": "12:03 PM / 8:38 AM",
  "fred couples": "12:15 PM / 8:50 AM",
  "min woo lee": "12:15 PM / 8:50 AM",
  "fifa laopakdee": "12:15 PM / 8:50 AM",
  "sergio garcia": "12:27 PM / 9:02 AM",
  "aaron rai": "12:27 PM / 9:02 AM",
  "jacob bridgeman": "12:27 PM / 9:02 AM",
  "harry hall": "12:44 PM / 9:19 AM",
  "corey conners": "12:44 PM / 9:19 AM",
  "corey connors": "12:44 PM / 9:19 AM",
  "michael brennan": "12:44 PM / 9:19 AM",
  "jj spaun": "12:56 PM / 9:31 AM",
  "maverick mcnealy": "12:56 PM / 9:31 AM",
  "tyrrell hatton": "12:56 PM / 9:31 AM",
  "jon rahm": "1:08 PM / 9:43 AM",
  "chris gotterup": "1:08 PM / 9:43 AM",
  "ludvig aberg": "1:08 PM / 9:43 AM",
  "jordan spieth": "1:20 PM / 9:55 AM",
  "jordan speith": "1:20 PM / 9:55 AM",
  "justin rose": "1:20 PM / 9:55 AM",
  "brooks koepka": "1:20 PM / 9:55 AM",
  "sepp straka": "1:32 PM / 10:07 AM",
  "ben griffin": "1:32 PM / 10:07 AM",
  "justin thomas": "1:32 PM / 10:07 AM",
  "scottie scheffler": "1:44 PM / 10:19 AM",
  "scottie sheffler": "1:44 PM / 10:19 AM",
  "scotttie scheffler": "1:44 PM / 10:19 AM",
  "robert macintyre": "1:44 PM / 10:19 AM",
  "gary woodland": "1:44 PM / 10:19 AM",
  "harris english": "1:56 PM / 10:31 AM",
  "marco penge": "1:56 PM / 10:31 AM",
  "si woo kim": "1:56 PM / 10:31 AM",
};

function getTeeTime(name) {
  return DEMO_TEE_TIMES[String(name || "").toLowerCase()] || "TBD";
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function currency(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

function getWeatherIcon(condition) {
  const c = String(condition || "").toLowerCase();
  if (c.includes("thunder")) return <CloudLightning className="h-5 w-5 text-yellow-300" />;
  if (c.includes("rain")) return <CloudRain className="h-5 w-5 text-blue-300" />;
  if (c.includes("cloud") || c.includes("overcast")) return <Cloud className="h-5 w-5 text-slate-300" />;
  return <Sun className="h-5 w-5 text-yellow-400" />;
}

function getMovementIcon(movement) {
  if (movement > 0) return <ArrowUp className="h-4 w-4 text-emerald-300" />;
  if (movement < 0) return <ArrowDown className="h-4 w-4 text-red-300" />;
  return <Minus className="h-4 w-4 text-white/40" />;
}

function getAverageDisplay(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "--";
  return Number(value).toFixed(1);
}

function Card({ children, className = "" }) {
  return <div className={classNames("overflow-hidden rounded-[22px] border border-[#274a31] bg-[#111814]/95 shadow-2xl", className)}>{children}</div>;
}

function CardHeader({ children, className = "" }) {
  return <div className={classNames("px-5 py-4", className)}>{children}</div>;
}

function CardTitle({ children, className = "" }) {
  return <h3 className={classNames("text-lg font-bold", className)}>{children}</h3>;
}

function CardContent({ children, className = "" }) {
  return <div className={classNames("px-5 pb-5", className)}>{children}</div>;
}

function Badge({ children, className = "" }) {
  return <span className={classNames("inline-flex min-h-[28px] items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none", className)}>{children}</span>;
}

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">
      <Icon className="h-4 w-4 text-[#d8b45b]" />
      <span className="text-white/70">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function PrizePoolCard({ rankedEntries, totalEntries }) {
  const total = totalEntries * ENTRY_FEE;
  const winners = PAYOUT_SPLITS.map((p) => ({
    ...p,
    amount: Math.round(total * p.percent),
    entry: rankedEntries[p.place - 1] || null,
  })).filter((x) => x.entry);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <CircleDollarSign className="h-5 w-5 text-[#d8b45b]" />
          Projected Winners & Payouts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/55">Total Prize Pool</div>
          <div className="mt-1 text-3xl font-black text-[#f6de9c]">{currency(total)}</div>
          <div className="mt-2 text-xs text-white/50">{totalEntries} entries × {currency(ENTRY_FEE)}</div>
        </div>
        {winners.map((row) => (
          <div key={row.place} className="flex items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-white/5 p-3.5">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">
                {row.place}
                {row.place === 1 ? "st" : row.place === 2 ? "nd" : row.place === 3 ? "rd" : "th"} Place
              </div>
              <div className="truncate text-xs text-white/50">{row.entry.entryName}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/35">{Math.round(row.percent * 100)}% of pool</div>
            </div>
            <div className="shrink-0 text-lg font-black text-[#d0f0c0]">{currency(row.amount)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function buildTickerItems(livePlayers, rankedEntries, activeSource) {
  const leader = livePlayers?.[0];
  const contestLeader = rankedEntries?.[0];
  const items = [];

  if (leader) items.push({ label: "Tournament Leader", value: `${leader.name} ${leader.score}`, meta: `Thru ${leader.thru}` });
  if (contestLeader) items.push({ label: "Contest Leader", value: contestLeader.entryName, meta: `Avg ${getAverageDisplay(contestLeader.averageFinish)}` });
  items.push({ label: "Source", value: activeSource.name, meta: "rotating live feed" });
  if (livePlayers?.[1]) items.push({ label: "Chasing", value: `${livePlayers[1].name} ${livePlayers[1].score}`, meta: `Thru ${livePlayers[1].thru}` });

  return items;
}

function runLocalSanityChecks(entries, images) {
  return {
    hasEntries: Array.isArray(entries) && entries.length > 0,
    hasImages: Array.isArray(images) && images.length > 0,
    allGolfersArrays: Array.isArray(entries) && entries.every((entry) => Array.isArray(entry.golfers) && entry.golfers.length === 6),
  };
}

export default function MastersLeaderboardPage() {
  const [entries] = useState(ENTRY_DATA);
  const [search, setSearch] = useState("");
  const [pageViews, setPageViews] = useState(1842);
  const [refreshCountdown, setRefreshCountdown] = useState(420);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [headerIndex, setHeaderIndex] = useState(0);
  const [livePlayers] = useState(DEMO_PLAYERS);

  const activeSource = LIVE_SOURCES[sourceIndex % LIVE_SOURCES.length];

  const sortedEntries = useMemo(() => {
    const list = [...entries].sort((a, b) => {
      const aVal = a.averageFinish ?? Number.POSITIVE_INFINITY;
      const bVal = b.averageFinish ?? Number.POSITIVE_INFINITY;
      if (aVal !== bVal) return aVal - bVal;

      const aTie = a.tieBreaker === "" ? Number.POSITIVE_INFINITY : Number(a.tieBreaker);
      const bTie = b.tieBreaker === "" ? Number.POSITIVE_INFINITY : Number(b.tieBreaker);
      if (aTie !== bTie) return aTie - bTie;

      return a.rank - b.rank;
    });

    return list.map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedEntries;
    return sortedEntries.filter((entry) => entry.entryName.toLowerCase().includes(q));
  }, [sortedEntries, search]);

  const topFive = useMemo(() => sortedEntries.slice(0, 5), [sortedEntries]);
  const tickerItems = useMemo(() => buildTickerItems(livePlayers, sortedEntries, activeSource), [livePlayers, sortedEntries, activeSource]);
  const sanity = useMemo(() => runLocalSanityChecks(entries, AUGUSTA_IMAGES), [entries]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 420 : prev - 1));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderIndex((prev) => (prev + 1) % AUGUSTA_IMAGES.length);
      setSourceIndex((prev) => (prev + 1) % LIVE_SOURCES.length);
      setLastUpdated(new Date());
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 600);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPageViews((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f0c] text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#144d2b]/30 blur-3xl" />
        <div className="absolute top-28 right-1/4 h-72 w-72 rounded-full bg-[#8b6b2e]/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-[#10351e]/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 py-6 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative mb-6 overflow-hidden rounded-[22px] border border-[#274a31] shadow-2xl"
        >
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center transition-all duration-[6000ms]"
            style={{ backgroundImage: `url(${AUGUSTA_IMAGES[headerIndex]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,77,43,0.38),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(216,180,91,0.18),transparent_45%)]" />

          <div className="relative px-5 py-5 md:px-7">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge className="border-[#d8b45b]/30 bg-[#d8b45b]/10 text-[#f1d48a]">PUBLIC LEADERBOARD</Badge>
                  <Badge className="border-white/10 bg-white/5 text-white/80">Refreshes every 5–10 min</Badge>
                  <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">Source in rotation: {activeSource.name}</Badge>
                  <Badge className="border-white/10 bg-black/20 text-white/80">
                    <Activity className={classNames("mr-2 inline h-3.5 w-3.5", isRefreshing && "animate-pulse")} />
                    {isRefreshing ? "Refreshing live data" : "Live engine active"}
                  </Badge>
                </div>

                <h1 className="text-2xl font-black uppercase tracking-tight text-white md:text-4xl">Masters 2026 Pick 6 Challenge Leaderboard</h1>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 md:text-base">
                  Live contest standings, rotating source refreshes, payouts, tee times, and tournament rules.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <StatPill icon={Eye} label="Views" value={pageViews.toLocaleString()} />
                  <StatPill icon={RefreshCw} label="Next refresh" value={`${Math.floor(refreshCountdown / 60)}:${String(refreshCountdown % 60).padStart(2, "0")}`} />
                  <StatPill icon={Clock3} label="Last updated" value={formatDateTime(lastUpdated)} />
                </div>

                <div className="mt-5 rounded-[16px] border border-white/10 bg-black/30 backdrop-blur-md p-3">
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#f6de9c] font-bold">Top 5</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                    {topFive.map((entry) => (
                      <div key={`header-top-${entry.entryName}-${entry.rank}`} className="flex items-center justify-between rounded-[12px] border border-white/10 bg-white/5 px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#f6de9c]">#{entry.rank}</span>
                          <span className="text-[11px] font-semibold text-white truncate max-w-[110px]">{entry.entryName}</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#d0f0c0]">{getAverageDisplay(entry.averageFinish)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="w-full max-w-xl border-white/10 bg-black/30 backdrop-blur-md xl:w-[500px]">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base text-white md:text-lg">
                    <CloudSun className="h-5 w-5 text-[#d8b45b]" />
                    Augusta Weather
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 pt-0 md:grid-cols-[1.2fr_1fr]">
                  <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-white/45">Current</div>
                        <div className="mt-2 text-4xl font-black text-white">{DEFAULT_WEATHER.current.tempF}°</div>
                        <div className="mt-2 flex items-center gap-2 text-white/85">
                          {getWeatherIcon(DEFAULT_WEATHER.current.condition)}
                          <span>{DEFAULT_WEATHER.current.condition}</span>
                        </div>
                        <div className="mt-2 text-sm text-white/55">{DEFAULT_WEATHER.current.location}</div>
                      </div>
                      <div className="text-right text-sm text-white/65">
                        <div className="flex items-center justify-end gap-2">
                          <Droplets className="h-4 w-4 text-[#d8b45b]" />
                          {DEFAULT_WEATHER.current.humidity}%
                        </div>
                        <div className="mt-2 flex items-center justify-end gap-2">
                          <Wind className="h-4 w-4 text-[#d8b45b]" />
                          {DEFAULT_WEATHER.current.windMph} mph
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {DEFAULT_WEATHER.forecast.map((day) => (
                      <div key={day.date} className="flex items-center justify-between rounded-[16px] border border-white/10 bg-white/5 px-3 py-2.5 text-sm">
                        <div className="flex items-center gap-2 text-white/85">
                          {getWeatherIcon(day.condition)}
                          <span>{day.date}</span>
                        </div>
                        <div className="font-semibold text-white">{day.high}° / {day.low}°</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        <div className="mb-6 grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="h-5 w-5 text-[#d8b45b]" />
                  Contest Leaderboard
                </CardTitle>
                <div className="relative w-full md:max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search entries..."
                    className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white outline-none placeholder:text-white/35"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="overflow-hidden rounded-[18px] border border-white/10">
                <div className="grid grid-cols-[88px_minmax(220px,1fr)_120px_100px_80px] gap-4 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                  <div>Rank</div>
                  <div>Entry</div>
                  <div>Average</div>
                  <div>Tiebreaker</div>
                  <div></div>
                </div>

                {filteredEntries.map((entry) => {
                  const isOpen = expandedRow === entry.rank;

                  return (
                    <div key={`${entry.entryName}-${entry.rank}-${entry.tieBreaker || "na"}`} className="border-t border-white/10 bg-black/10">
                      <button
                        onClick={() => setExpandedRow(isOpen ? null : entry.rank)}
                        className="grid w-full grid-cols-[88px_minmax(220px,1fr)_120px_100px_80px] gap-4 px-5 py-4 text-left transition hover:bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white text-xs font-bold text-black">#{entry.rank}</div>
                          <div className="flex items-center gap-1 text-sm font-semibold">
                            {getMovementIcon(entry.movement)}
                            <span>{entry.movement > 0 ? `+${entry.movement}` : entry.movement}</span>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-base font-semibold text-white">{entry.entryName}</div>
                          
                        </div>

                        <div className="flex items-center text-lg font-black text-[#f6de9c]">{getAverageDisplay(entry.averageFinish)}</div>
                        <div className="flex items-center text-white/80">{entry.tieBreaker || "—"}</div>
                        <div className="flex items-center justify-end text-white/50">
                          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-white/10 bg-white/[0.03]"
                          >
                            <div className="p-4">
                              <div className="mb-4 flex items-center justify-between">
                                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#f6de9c]">Golfers</div>
                                <div className="ml-4 h-px flex-1 bg-gradient-to-r from-[#d8b45b]/40 to-transparent" />
                              </div>

                              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {entry.golfers.map((golfer, idx) => (
                                  <div key={`${entry.rank}-${golfer}-${idx}`} className="rounded-[16px] border border-white/10 bg-black/20 p-3">
                                    <div className="text-sm font-semibold text-white">{golfer}</div>
                                    <div className="mt-1 text-xs text-[#f1d48a]">Tee: {getTeeTime(golfer)}</div>
                                    <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">Result</div>
                                    <div className="mt-1 text-lg font-bold text-[#d0f0c0]">{entry.golferResults[idx] ?? "—"}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            

            <PrizePoolCard rankedEntries={sortedEntries} totalEntries={entries.length} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock3 className="h-5 w-5 text-[#d8b45b]" />
                  Start Times & Players
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {(() => {
                  const excludedAliases = new Set([
                    "cam smith",
                    "cam young",
                    "rorry mcilroy",
                    "russel henley",
                    "sungjai im",
                    "nicoli hojgaard",
                    "scottie sheffler",
                    "scotttie scheffler",
                    "jordan speith",
                    "xander schauffle",
                    "corey connors",
                  ]);

                  const parseFirstTime = (str) => {
                    const first = str.split("/")[0].trim();
                    const [time, period] = first.split(" ");
                    let [hours, minutes] = time.split(":").map(Number);
                    if (period === "PM" && hours !== 12) hours += 12;
                    if (period === "AM" && hours === 12) hours = 0;
                    return hours * 60 + minutes;
                  };

                  const titleCase = (name) =>
                    name
                      .split(" ")
                      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                      .join(" ");

                  const grouped = Object.entries(DEMO_TEE_TIMES)
                    .filter(([name]) => !excludedAliases.has(name))
                    .reduce((acc, [name, teeTime]) => {
                      const first = teeTime.split("/")[0].trim();
                      if (!acc[first]) acc[first] = { teeTime, players: [] };
                      acc[first].players.push(titleCase(name));
                      return acc;
                    }, {});

                  const orderedGroups = Object.entries(grouped).sort((a, b) => parseFirstTime(a[1].teeTime) - parseFirstTime(b[1].teeTime));

                  return (
                    <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                      {orderedGroups.map(([firstTime, group]) => (
                        <div key={firstTime} className="rounded-[16px] border border-white/10 bg-white/5 p-3">
                          <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
                            <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#f6de9c]">{group.teeTime}</div>
                            <div className="text-[11px] uppercase tracking-[0.16em] text-white/40">{group.players.length} players</div>
                          </div>
                          <div className="space-y-2">
                            {group.players.map((player) => (
                              <div key={`${firstTime}-${player}`} className="rounded-[12px] border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-white">
                                {player}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Medal className="h-5 w-5 text-[#d8b45b]" />
                  Contest Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {RULES.map((rule) => (
                    <div key={rule} className="rounded-[14px] border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                      {rule}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
