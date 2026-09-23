// Memory Photos
import childhoodPic from '../../images/childhood pic.jpg';
import mem1 from '../../images/Memory1.jpg';
import mem2 from '../../images/Memory2.jpg';
import mem3 from '../../images/memory3.jpg';
import mem4 from '../../images/memory4.jpg';
import mem5 from '../../images/memory5.jpg';
import mem6 from '../../images/memory6.jpg';
import mem7 from '../../images/memory7.jpg';
import mem8 from '../../images/memory8.jpg';
import mem9 from '../../images/memory9.jpg';
import mem10 from '../../images/memory10.jpg';
import mem11 from '../../images/memory11.jpg';

// Video assets
import video1 from '../../Videos/Fun video 1.mp4';
import video2 from '../../Videos/Fun video 2.mp4';
import video3Thumb from '../../Videos/fun video 3.jpg';

export { mem10, mem11 };

export interface MemoryItem {
  id: string;
  number: string;
  title: string;
  caption: string;
  date: string;
  image: string;
  tag?: string;
  highlight?: boolean;
}

export interface VideoItem {
  id: string;
  number: string;
  title: string;
  caption: string;
  date: string;
  videoSrc?: string;
  thumbnail: string;
  duration: string;
}

export const MEMORIES: MemoryItem[] = [
  {
    id: 'mem-10',
    number: '#10',
    title: 'The Merchant Navy Cadet',
    caption: 'Standing proud at Commander Ali Maritime Academy. The moment dreams of commanding the high seas turned into reality.',
    date: 'Academy Milestone',
    image: mem10,
    tag: 'Officer',
    highlight: true,
  },
  {
    id: 'mem-11',
    number: '#11',
    title: 'Voyager of the High Seas',
    caption: 'On watch aboard the vessel, gazing across boundless waters. No matter how many oceans he crosses, our brotherhood remains his safe harbor.',
    date: 'Merchant Navy Voyage',
    image: mem11,
    tag: 'High Seas',
    highlight: true,
  },
  {
    id: 'mem-01',
    number: '#01',
    title: 'Before the Oceans: The Origins',
    caption: 'Where the brotherhood began. Long before charting nautical charts, there was just raw mischief and pure loyalty.',
    date: 'Day One',
    image: childhoodPic,
    tag: 'Origins',
    highlight: true,
  },
  {
    id: 'mem-02',
    number: '#02',
    title: 'Shore Leave Celebrations',
    caption: 'One of those unforgettable days back on land. Non-stop laughter over sea tales and old memories.',
    date: 'Shore Leave',
    image: mem1,
    tag: 'Brotherhood',
    highlight: true,
  },
  {
    id: 'mem-03',
    number: '#03',
    title: 'Midnight Port Talks',
    caption: 'Late night tea, grand ambitions, and discussing life across distant time zones.',
    date: 'Late Nights',
    image: mem2,
    tag: 'Conversations',
  },
  {
    id: 'mem-04',
    number: '#04',
    title: 'Shore Road Trips',
    caption: 'Every time Kalyan is back in town: "Trust me, I have a road trip planned." Pure spontaneity.',
    date: 'Roadtrip Era',
    image: mem3,
    tag: 'Adventure',
  },
  {
    id: 'mem-05',
    number: '#05',
    title: 'Reunion Smiles',
    caption: 'Zero rehearsal, zero filter. The genuine smile of brothers reunited after months out at sea.',
    date: 'Reunions',
    image: mem4,
    tag: 'Smiles',
    highlight: true,
  },
  {
    id: 'mem-06',
    number: '#06',
    title: 'Unfiltered Kalyan Energy',
    caption: 'The trademark grin right before dropping the funniest story from his voyage.',
    date: 'Crew Days',
    image: mem5,
    tag: 'Mood',
  },
  {
    id: 'mem-07',
    number: '#07',
    title: 'The Unshakable Anchor',
    caption: 'Through rough seas and calm waters alike, the rock of our friend group who never changes.',
    date: 'Squad Bond',
    image: mem6,
    tag: 'Crew',
  },
  {
    id: 'mem-08',
    number: '#08',
    title: 'Sunset on Land',
    caption: 'Watching golden sunsets from the shore, waiting for the brother to sign off and return home.',
    date: 'Golden Hours',
    image: mem7,
    tag: 'Vibes',
  },
  {
    id: 'mem-09',
    number: '#09',
    title: 'Living Every Second',
    caption: 'Time moves differently when your brother is only home for a few weeks. You cherish every second.',
    date: 'Cherished Times',
    image: mem8,
    tag: 'Moments',
  },
  {
    id: 'mem-12',
    number: '#12',
    title: 'Anchored Across Oceans',
    caption: 'Proof that real friendship defies continents, time zones, and maritime miles.',
    date: 'Timeless',
    image: mem9,
    tag: 'Legend',
  },
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'vid-01',
    number: '01',
    title: 'When Kalyan Signs Off Ship',
    caption: 'Unfiltered Kalyan energy back home. The type of laugh that echoes through the whole street.',
    date: 'Shore Reunion',
    videoSrc: video1,
    thumbnail: mem1,
    duration: '0:42',
  },
  {
    id: 'vid-02',
    number: '02',
    title: 'Behind the Scenes & Sea Tales',
    caption: 'Late night banter, raw jokes, and recounting wild adventures from across the world.',
    date: 'Raw Take',
    videoSrc: video2,
    thumbnail: mem5,
    duration: '0:18',
  },
  {
    id: 'vid-03',
    number: '03',
    title: 'The Vault Freeze Frame',
    caption: 'A captured snapshot that will live rent-free in our heads for decades.',
    date: 'Special Moment',
    videoSrc: undefined,
    thumbnail: video3Thumb,
    duration: 'Snapshot',
  },
];
