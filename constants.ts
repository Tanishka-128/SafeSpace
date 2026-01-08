
export const HELPLINES = [
  { name: 'National Suicide Prevention Lifeline', number: '988' },
  { name: 'Crisis Text Line', number: '741741' },
  { name: 'Mental Health America', number: '1-800-273-8255' },
];

export const MOTIVATIONAL_QUOTES = [
  "You are stronger than you think.",
  "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.",
  "It's okay not to be okay as long as you are not giving up.",
  "Self-care is how you take your power back.",
  "Healing takes time, and asking for help is a courageous step."
];

export const MOCK_COUNSELLORS = [
  {
    id: 'c1',
    fullName: 'Dr. Sarah Jenkins',
    gender: 'female',
    rating: 4.9,
    expertise: ['Anxiety', 'Depression', 'Self-Esteem'],
    experience: 12,
    availability: 'Mon-Fri',
    price: 1500,
    bio: 'Specializing in CBT for young adults.'
  },
  {
    id: 'c2',
    fullName: 'Dr. Michael Chen',
    gender: 'male',
    rating: 4.7,
    expertise: ['Trauma', 'Grief', 'Relationships'],
    experience: 8,
    availability: 'Weekends',
    price: 1200,
    bio: 'Compassionate care focusing on holistic healing.'
  },
  {
    id: 'c3',
    fullName: 'Dr. Priya Sharma',
    gender: 'female',
    rating: 4.8,
    expertise: ['ADHD', 'Career Stress', 'Mindfulness'],
    experience: 10,
    availability: 'Daily',
    price: 1800,
    bio: 'Experienced therapist helping students navigate life transitions.'
  }
];

export const RESOURCE_ARTICLES = [
  {
    id: 'a1',
    title: 'Understanding Anxiety',
    summary: 'A brief guide on identifying symptoms and finding coping mechanisms.',
    thumbnail: 'https://picsum.photos/seed/anxiety/400/250',
    link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders'
  },
  {
    id: 'a2',
    title: 'Power of Mindfulness',
    summary: 'How daily meditation can change your brain and reduce stress.',
    thumbnail: 'https://picsum.photos/seed/mindful/400/250',
    link: 'https://www.mindful.org/what-is-mindfulness/'
  }
];

export const RESOURCE_VIDEOS = [
  {
    id: 'v1',
    title: '5-Minute Guided Meditation',
    thumbnail: 'https://picsum.photos/seed/meditate/400/250',
    link: 'https://www.youtube.com/watch?v=inpok4MKVLM'
  },
  {
    id: 'v2',
    title: 'Breathing Exercises for Sleep',
    thumbnail: 'https://picsum.photos/seed/sleep/400/250',
    link: 'https://www.youtube.com/watch?v=17XGf-yL98c'
  }
];

export const SOUND_TRACKS = [
  { id: 'white', name: 'White Noise', color: 'bg-slate-100', icon: '🔊' },
  { id: 'brown', name: 'Brown Noise', color: 'bg-amber-100', icon: '🌊' },
  { id: 'pink', name: 'Pink Noise', color: 'bg-pink-100', icon: '🌬️' },
  { id: 'rain', name: 'Rainfall', color: 'bg-blue-100', icon: '🌧️' },
  { id: 'forest', name: 'Deep Forest', color: 'bg-emerald-100', icon: '🌲' },
];
