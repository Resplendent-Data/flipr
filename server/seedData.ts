// Demo seed data. Edit here to change what ships in the committed database.

/**
 * The current user's stated tastes, used to rank the deck by Affinity.
 * Server-internal: never sent to the client.
 */
export interface Preferences {
  preferredTraits: string[]
  preferredPodStyle: string
  ageMin: number
  ageMax: number
}

/** Avatar colors are drawn from the Resplendent Data brand palette. */
export const currentUser = {
  name: 'Nara',
  avatarColor: '#3366ff',
  // Chosen so the seeded deck ranks with a clear top (Marina Deep), a spread of
  // mid-tier matches, and a couple of zero-overlap narwhals at the bottom.
  preferences: {
    preferredTraits: ['Thoughtful', 'Calm', 'Loyal', 'Curious'],
    preferredPodStyle: 'Duo — just us two',
    ageMin: 5,
    ageMax: 10,
  } satisfies Preferences,
}

export interface SeedProfile {
  name: string
  age: number
  location: string
  bio: string
  traits: string[]
  interests: string[]
  lookingFor: string
  favoriteIce: string
  podStyle: string
  avatarColor: string
}

/** 12 narwhals, served in this order. */
export const profiles: SeedProfile[] = [
  {
    name: 'Sir Tuskington',
    age: 7,
    location: 'Baffin Bay',
    bio: 'Distinguished gentlenarwhal. My tusk is longer than my list of red flags.',
    traits: ['Chivalrous', 'Punctual', 'Deep diver'],
    interests: ['Jousting', 'Kelp tea', 'Sonar poetry'],
    lookingFor: 'A partner in ice-cracking crime',
    favoriteIce: 'Aged glacial',
    podStyle: 'Small tight-knit pod',
    avatarColor: '#3366ff',
  },
  {
    name: 'Bubbles',
    age: 4,
    location: 'Hudson Strait',
    bio: 'I make bubble rings and questionable life choices. Both are art.',
    traits: ['Playful', 'Spontaneous', 'Loud'],
    interests: ['Bubble art', 'Racing', 'Krill karaoke'],
    lookingFor: 'Someone to chase seals with (respectfully)',
    favoriteIce: 'Fresh slushy pack ice',
    podStyle: 'Big loud party pod',
    avatarColor: '#fac951',
  },
  {
    name: 'Marina Deep',
    age: 9,
    location: 'Lancaster Sound',
    bio: 'Marine biologist by trade, romantic by moonlight. I study the deep and feel it too.',
    traits: ['Thoughtful', 'Curious', 'Calm'],
    interests: ['Deep-sea research', 'Stargazing', 'Whale song'],
    lookingFor: 'A meaningful long-current relationship',
    favoriteIce: 'Clear blue iceberg',
    podStyle: 'Duo — just us two',
    avatarColor: '#00d68f',
  },
  {
    name: 'Captain Floe',
    age: 11,
    location: 'Nares Strait',
    bio: 'Been to the North Pole and back. Twice. Ask me about the current.',
    traits: ['Adventurous', 'Confident', 'Storyteller'],
    interests: ['Long migrations', 'Navigation', 'Cartography'],
    lookingFor: 'A co-explorer for the far north',
    favoriteIce: 'Ancient multiyear ice',
    podStyle: 'Nomadic wanderer',
    avatarColor: '#4c3851',
  },
  {
    name: 'Pearl',
    age: 5,
    location: 'Foxe Basin',
    bio: 'Soft-spoken but my tusk speaks volumes. Looking for gentle vibes only.',
    traits: ['Gentle', 'Artistic', 'Shy'],
    interests: ['Painting with silt', 'Slow swims', 'Collecting shells'],
    lookingFor: 'A calm and kind companion',
    favoriteIce: 'Powdery snow ice',
    podStyle: 'Small tight-knit pod',
    avatarColor: '#bf8abd',
  },
  {
    name: 'Ziggy Spearheart',
    age: 6,
    location: 'Davis Strait',
    bio: 'Rockstar narwhal. My tusk is basically a guitar. Groupies welcome.',
    traits: ['Charismatic', 'Bold', 'Night owl'],
    interests: ['Music', 'Performing', 'Late-night swims'],
    lookingFor: 'Someone who can keep up with the tour',
    favoriteIce: 'Neon-lit shelf ice',
    podStyle: 'Big loud party pod',
    avatarColor: '#ff3d71',
  },
  {
    name: 'Professor Krill',
    age: 13,
    location: 'Baffin Bay',
    bio: 'Tenured in oceanography. I will explain thermohaline circulation on the first date.',
    traits: ['Intellectual', 'Patient', 'Witty'],
    interests: ['Reading', 'Chess', 'Documentaries'],
    lookingFor: 'A fellow lifelong learner',
    favoriteIce: 'Aged glacial',
    podStyle: 'Duo — just us two',
    avatarColor: '#3366ff',
  },
  {
    name: 'Coral',
    age: 5,
    location: 'Hudson Bay',
    bio: 'Yoga instructor. I find my center at 200 meters. Namaste, or should I say narw-stay.',
    traits: ['Zen', 'Flexible', 'Positive'],
    interests: ['Yoga', 'Meditation', 'Cold plunges'],
    lookingFor: 'Good energy and better puns',
    favoriteIce: 'Fresh slushy pack ice',
    podStyle: 'Small tight-knit pod',
    avatarColor: '#00d68f',
  },
  {
    name: 'Baron von Blubber',
    age: 10,
    location: 'Greenland Sea',
    bio: 'I contain multitudes and also a lot of blubber. Both keep me warm.',
    traits: ['Warm', 'Generous', 'Foodie'],
    interests: ['Feasting', 'Hosting', 'Deep dives'],
    lookingFor: 'A dinner-and-a-dive kind of partner',
    favoriteIce: 'Ancient multiyear ice',
    podStyle: 'Big loud party pod',
    avatarColor: '#fac951',
  },
  {
    name: 'Luna Tide',
    age: 8,
    location: 'Beaufort Sea',
    bio: 'I swim by the moon and trust my instincts. Currently manifesting a soulmate.',
    traits: ['Intuitive', 'Free-spirited', 'Dreamy'],
    interests: ['Astrology', 'Night swims', 'Journaling'],
    lookingFor: 'A cosmic connection',
    favoriteIce: 'Clear blue iceberg',
    podStyle: 'Nomadic wanderer',
    avatarColor: '#bf8abd',
  },
  {
    name: 'Rex Spiral',
    age: 7,
    location: 'Chukchi Sea',
    bio: 'Competitive tusk-fencer, three-time regional champ. I like winning and I like you.',
    traits: ['Competitive', 'Driven', 'Loyal'],
    interests: ['Tusk-fencing', 'Training', 'Racing'],
    lookingFor: 'A teammate for life',
    favoriteIce: 'Fresh slushy pack ice',
    podStyle: 'Small tight-knit pod',
    avatarColor: '#4c3851',
  },
  {
    name: 'Misty',
    age: 6,
    location: 'Kara Sea',
    bio: 'Introvert with a big inner world. I will remember your favorite ice.',
    traits: ['Observant', 'Loyal', 'Soft-spoken'],
    interests: ['Cozy caves', 'Puzzles', 'Slow mornings'],
    lookingFor: 'A quiet kind of forever',
    favoriteIce: 'Powdery snow ice',
    podStyle: 'Duo — just us two',
    avatarColor: '#8f9bb3',
  },
]
