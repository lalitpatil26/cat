/**
 * ============================================================
 *  ROMANTIC BIRTHDAY SURPRISE — CONFIGURATION
 * ============================================================
 *  Edit everything about your surprise from this one file.
 * ============================================================
 */


/** The password she must type to unlock the experience. */
export const PASSWORD = "2426";

/** A gentle hint shown under the password field (set to "" to hide). */
export const PASSWORD_HINT = "Hint: I know You can guess ";

/** Her name + your details. */
export const CONFIG = {
  herName: "Savi",
  yourName: "Labbu",
  birthday: "2026-06-04T12:18:00+05:30",
  music: {
    src: "/music/vite.config.mp3",
    title: "Our Song",
  },
};



export const PORTAL = {
  eyebrow: "Secret Portal",
  title: "A Special Universe Awaits Someone Very Precious...",
  subtitle: "Enter the password to begin a journey made only for you.",
  cta: "Unlock your surprise",
};

export const BEGINNING = {
  lines: [
    "Among billions of people,",
    "destiny introduced me to someone extraordinary...",
    "and nothing was ever the same again.",
  ],
};

// Automatically load all images from src/images/gallery
const galleryFiles = import.meta.glob('/src/images/gallery/*.{jpg,jpeg,png,webp,gif}', { eager: true, query: '?url', import: 'default' });

/**
 * ✏️  SET YOUR CUSTOM CAPTION FOR EACH IMAGE HERE
 * The key is the exact filename (including extension).
 * New images without an entry will show "A beautiful memory".
 */
const GALLERY_CAPTIONS: Record<string, string> = {

};

export const GALLERY = Object.entries(galleryFiles).map(([path, url]) => {
  const filename = path.split("/").pop() ?? "";
  return {
    src: url as string,
    caption: GALLERY_CAPTIONS[filename] ?? "A beautiful memory 💕",
  };
});

export const TIMELINE = [
  { date: "The First Glance", title: "When it all began", text: "18 June 2025", img: "/timeline/15.png" },
  { date: "Second Date", title: "Nervous & perfect", text: "7 July 2025", img: "/timeline/31.jpg" },
  { date: "First 'Movie Date'", title: "Amazing", text: "8 November 2025", img: "/timeline/mv.jpg" },
  { date: "First Traditional Day", title: "Together", text: "19 March 2026", img: "/timeline/trad.jpg" },
      { date: "MOMO Date", title: "Memorable", text: "6 May 2026", img: "/timeline/momo.jpg" },
  { date: "Today", title: "Still falling for you", text: "Every single day I choose you, again and again.", img: "/timeline/5.jpg" },


];

export const REASONS = [
  "Your smile lights up my darkest days",
  "The way you laugh at your own jokes",
  "How safe I feel in your arms",
  "pamper me like a baby",
  "you cute Angry face",
  "How you support me in every situation",
  "Your unstoppable dreams",
  "The way you say my name ",
  "Your warm, sleepy good-mornings",
  "How you make ordinary days magical",
  "Your courage when life gets hard",
  "The way you dance like no one's watching",
  "Your small small fights that always end in giggles",
  "How you believe in me always",
  "Your beautiful, curious mind",
  "The way you hold my hand",
  "Your silly faces that fix everything",
  "How you love with your whole heart",
  "Your hugs that feel like home",
  "Simply, everything about you ",
];

export const MAZE = [
  { label: "A Secret Door", emoji: "🚪", memory: "Remember our first rainy walk? I still remember i hold your hand first time." },
  { label: "A Hidden Star", emoji: "⭐", memory: "You said I LOVE YOU on call and its felt like yesss I Also but I did not accepted before that call but after that call i accepted and that call is blessing or happiness came to my phone" },
  { label: "A Locked Heart", emoji: "💝", memory: "Loving you is the only and lovely thing i do" },
  { label: "A Whispered Wish", emoji: "🕯️", memory: "I wished on every candle for more time with you. The universe keeps saying yes." },
];

export const STATS = [
  { label: "Happiness Generated", value: 100000, suffix: "%" },
  { label: "Smiles Caused", value: 99999, suffix: "+" },
  { label: "Cute Moments", value: 100000, suffix: "+" },
  { label: "Times I Fell For You", value: 100000, suffix: "x" },
];

export const MESSAGES = [
  "If I had a flower for every time I thought of you, I'd walk through my garden forever.",
  "You are my favorite notification, my best good morning, my softest good night.",
  "Loving you is the easiest thing I've ever done.",
  "You didn't just steal my heart — you gave it a home.",
  "No matter where life takes us, my answer will always be you.",
  "Thank you for being born. The world is brighter because you're in it.",
];

export const DREAMS = [
  { name: "Our Little Home", wish: "A cozy place that's truly ours, filled with laughter and fairy lights." },
  { name: "Travel the World", wish: "Watching every sunrise with you, in a hundred different cities." },
  { name: "Grow Old Together", wish: "Wrinkles, grey hair, and still dancing in the kitchen at 80." },
  { name: "Endless Adventures", wish: "Saying yes to every spontaneous, ridiculous, beautiful idea." },
  { name: "Forever & Always", wish: "A lifetime of choosing you — today, tomorrow, and always." },
];

export const VIDEOS = [
  { title: "Thamma", poster: "/videos/mve.jpg", src: "/videos/movie.mp4" },
  { title: "Meri Mahila", poster: "/videos/cute1.jpg", src: "/videos/cute.mp4" },
  { title: "Sangam", poster: "/videos/ganga1.jpg", src: "/videos/ganga.mp4" },
];

export const FINALE = {
  message: "Happy Birthday My Savi ❤️",
  letter: `My Savi ❤️,

The life that I had before meeting you was good, but the life after meeting you is just incredible. 🥹✨ I don't know how I can tell you this, but it's just awesome. 💖

And I am really happy, Savi, hume 1 saal ho gaya ❤️🥳, 1 varsh zala b Savi. And kahi pn aso, ha 1 varsh mazya life cha best year asel. 🫶✨ And you know the reason behind that. 😌❤️

Arey, itna kya soch rahi ho, my gubu gubu Savi? 🤭💕 It's only you... the reason of my happiness. ❤️ The way you support me in my bad phases and motivate me, it's something only you can do. 🥹💖

You know, I really thanks to God 🙏❤️ that He added you to my life as my everything. And that one call from you... I think it was God's plan. ✨💫

Vaise toh kitne saare humare ache aur cute moments hain 🥰, but mai woh sab batane jaunga toh meri website overload ho jayegi 🤣😂, isliye thode hi bataunga.

Pehla toh woh moment jab bohot tufaan tha 🌧️🌪️, aur maine khud se tumhara hand pakda tha. 🤝❤️ Halaki tum jab khud se mera hand pakadti thi tab bohot acha lagta tha 🥹💕, but us baar maine pehli baar khud se pakda tha. ❤️

Uske baad woh call 📞❤️, uske baad hum relationship mein aaye. 💑✨ Aur 18 ko hum start hue aur 26 ko aapka birthday tha. 🎂🎉 Toh as a birthday gift, humari meet hui thi 2 July ko. ❤️🥹

Hum dono bhagte hue hug kiye 🤗💕, fir maine forehead kiss kiya 😘❤️. It was just wow. ✨🥰 Aur mai kitna nervous tha tumhe pata hai 😭❤️, but jaise hi hum comfortable hue, it went like a roller coaster. 🎢💖

I remember tumne around 10–15 ko mujhe first kiss kiya tha side of my lips par. 😘💕 I was shy and nervous at the same time 🥹👉👈, but after that I also became comfortable. ❤️

Aur mujhe woh tree wali baarish mein kiss bhi yaad hai. 🌳🌧️❤️ It was just beautiful. 🥰✨

Fir humne saath mein bohot time spend kiya ❤️, and your Maggie... wow! 🍜🤤 Like MasterChef. 👩🍳✨

Mera jaane ka mann nahi tha 😭💔, but jaana pada us din. 😔

But 7 ko hum fir mile 🥹❤️ aur bohot saara time spend kiya. Us din toh maine stay hi kar liya. 😂💕🏡

Aur tumne mera birthday itna special bana diya. 🎂❤️ Humari woh Mehrun wali date 🌹✨, tumhara gift 🎁💕, and your birthday wish 🥹❤️... I was really emotional at that time. 😭💖

Fir beech mein bhi bohot kuch hua ❤️, par abhi mai New Year ki baat batata hu. 🎆✨ Usme tum Gujarat gayi thi 🏞️❤️ aur hum online kitni saari baate karte the. 📱💕 Aur tumne jo New Year wish kiya tha 🥹❤️, tabhi mera New Year hua, warna mai toh 2025 mein hi rehta. 🤣😂

Vaise is pure year mein bohot ups and downs aaye 📈📉❤️, but we are together till now 🤝💕 and hamesha rahenge. ♾️❤️

Maine bohot saari galtiyan bhi ki, Savi 😔💔, but tum samjha kar mujhe hamesha support karti ho, my gubu gubu Savi. 🥹❤️🫂

Jaise hamara ye 1 saal gaya ❤️✨, vaise hi humara aane wala har saal bhi saath hi jaye. 🫶💖♾️

And last mein one thing I want to say, jo tum already jaanti ho ❤️🥹, but still I am going to tell...

❤️ I LOVE YOU MY GUBU GUBU SAVI ❤️🥹🫶💍✨`, 
  birthdayLetter: `My Gubu Gubu Savi ❤️🎂,
Sarvat pahile, Happy Birthday Bacha! 🎂🥳❤️
Aaj tujha birthday aahe ani kharach sangaycha tar mala kalat nahi ki kutun start karu. 🥹❤️ Karan tujhya baddal bolayla gelo ki words kami padtat ani feelings jast hotat. 💖
Aajcha divas fakt tujha aahe, pan kharach tar aajcha divas majhyasathi pn special aahe. ❤️ Karan ya divshi ti mulgi janmala aali ji pudhe jaun majhya life madhli sarvat important person bannar hoti. 🥹✨
Savi, tu majhya life madhye aali ani saglach halka vatayla lagla. ❤️ Jithe mi ektach sagla handle karaycha prayatna karat hoto, tithe tu sobat rahili ani mala kalala ki "apla" mhanje kay asta. 🫂💕
Tujha hasan 😊, tujha rag 😤❤️, tujha possessive honan 🤭, tujha care karan 🥹 ani kadhikadhi majhyavar chidnan pn 😅... saglach mala khup avadta. Karan te sagla "majhi Savi" aahe. ❤️
Kadhi kadhi mala vatta ki devane kharach extra time gheun tula banavla asel. 😌✨ Karan ekach vyaktit itki sweetness 🍫, care 💕, madness 😂 ani love ❤️ kasa kay asu shakta?
Aaj mi tujhyasathi motha gift deu shakto ki nahi mahit nahi 🎁, pan ek goshta nakki deu shakto... ki jithe jithe majhi garaj asel tithe tithe mi tujhyasobat asen. 🤝❤️
Tujha pratyek smile majhyasathi achievement aahe 😊🏆 ani tujha pratyek ashru mala harvalyasarkha vatato. 🥺❤️ Mhanun nehemi hasta raha, karan tu hasta tevha jag khup sundar vatata. 🌸✨
Mala mahit aahe ki aapan perfect nahi. Kadhikadhi bhandto, misunderstandings hotat, rag yeto. 😅❤️ Pan ek goshta mala khup avadte ki divsacha shevat kuthla hi asla tari aapan ekmekanchech rahto. 🫂💖
Aaj tujha birthday aahe mhanun ek wish karto... 🌠❤️
Tujhya ayushyat je kahi changla aahe te ajun vadhat jao, ani je kahi tension aahe te majhyakade transfer hovo. 😂❤️ Tu fakt happy raha, healthy raha ani nehemi asich cute raha. 🥰✨
Ani ho, age kitihi vadhla tari majhyasathi tu nehemi majhi gubu gubu Savi ch rahnar ahes. 🤭💕🎀
Shevati fakt evdhach sangto...
Tujhyavar prem karan hi majhya ayushyatil sarvat sundar goshta aahe. ❤️🥹
Happy Birthday My Princess, My Best Friend, My Love,My Home, My Gubu Gubu Savi. 🎂👑❤️
I Love You Infinite Times. ❤️♾️🫂
– Tujha Labbu ❤️ 🥹✨💕`,
};

export const SECTIONS = [
  { id: "beginning", label: "The Beginning" },
  { id: "gallery", label: "Her Gallery" },
  { id: "timeline", label: "Memory Timeline" },
  { id: "reasons", label: "Why You're Special" },
  { id: "maze", label: "Memory Maze" },
  { id: "stats", label: "Love Statistics" },
  { id: "messages", label: "Hidden Messages" },
  { id: "finale", label: "The Final Surprise" },
  { id: "dreams", label: "Dream Universe" },
  { id: "videos", label: "Video Memories" },
  { id: "countdown", label: "Birthday Countdown" },
];