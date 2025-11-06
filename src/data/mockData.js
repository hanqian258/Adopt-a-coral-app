// Mock data for the app
// In a real app, this would come from an API/database

export const adoptions = [
  {
    id: '1',
    name: 'Coral Reef #1',
    location: 'Great Barrier Reef, Australia',
    adoptedDate: '2024-01-15',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1616279962624-7a3baea7b6b4?w=400',
    nextPayment: '2024-02-15',
    donationAmount: 50,
    donationFrequency: 'monthly'
  },
  {
    id: '2',
    name: 'Coral Reef #2',
    location: 'Red Sea, Egypt',
    adoptedDate: '2024-01-20',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400',
    nextPayment: '2024-02-20',
    donationAmount: 75,
    donationFrequency: 'monthly'
  },
  {
    id: '3',
    name: 'Coral Reef #3',
    location: 'Caribbean Sea',
    adoptedDate: '2023-12-10',
    status: 'cancelled',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    nextPayment: null,
    donationAmount: 100,
    donationFrequency: 'monthly'
  }
]

export const coralUpdates = {
  '1': [
    {
      id: 'u1',
      date: '2024-01-25',
      description: 'Coral is showing excellent growth! The polyps are healthy and the reef structure is expanding. Recent monitoring shows increased biodiversity around this coral.',
      photos: ['https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600']
    },
    {
      id: 'u2',
      date: '2024-01-15',
      description: 'Initial adoption completed. Coral has been tagged and monitored. Starting baseline measurements.',
      photos: ['https://images.unsplash.com/photo-1616279962624-7a3baea7b6b4?w=600']
    }
  ],
  '2': [
    {
      id: 'u3',
      date: '2024-01-28',
      description: 'Great news! The coral colony has grown 15% since last month. Water quality in the area remains excellent.',
      photos: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600']
    }
  ],
  '3': [
    {
      id: 'u4',
      date: '2023-12-20',
      description: 'Final update before cancellation. Coral was in good health at last check.',
      photos: ['https://images.unsplash.com/photo-1616279962624-7a3baea7b6b4?w=600']
    }
  ]
}

export const learnArticles = [
  {
    id: 'learn1',
    title: 'Responsible Tourism and Coral Reefs',
    content: `Coral reefs are among the most diverse and valuable ecosystems on Earth. When visiting these fragile environments, it's crucial to practice responsible tourism.

**Key Practices:**
- Never touch or stand on corals
- Use reef-safe sunscreen (mineral-based, free of oxybenzone and octinoxate)
- Don't feed marine life
- Maintain a safe distance from marine animals
- Choose eco-friendly tour operators
- Never take souvenirs from the reef

**Why It Matters:**
Coral reefs support 25% of all marine life, despite covering less than 1% of the ocean floor. Tourism can have both positive and negative impacts. By following responsible practices, we can help protect these ecosystems for future generations.`,
    date: '2024-01-10'
  },
  {
    id: 'learn2',
    title: 'The Science Behind Reef-Safe Sunscreen',
    content: `Traditional sunscreens contain chemicals that can harm coral reefs, even in small concentrations.

**Harmful Chemicals to Avoid:**
- Oxybenzone (benzophenone-3)
- Octinoxate (octyl methoxycinnamate)
- Octocrylene
- Homosalate
- 4-methylbenzylidene camphor

**Safe Alternatives:**
Look for mineral-based sunscreens containing:
- Zinc oxide
- Titanium dioxide

These physical blockers sit on the skin's surface and reflect UV rays, rather than being absorbed. They're effective, safe for marine life, and better for your skin too.

**Impact:**
Studies show that even tiny amounts of harmful sunscreen chemicals can cause coral bleaching, damage coral DNA, and disrupt coral reproduction. An estimated 14,000 tons of sunscreen enter coral reefs annually.`,
    date: '2024-01-05'
  }
]

// Storage utility functions
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

// Initialize storage with mock data if not exists
if (!storage.get('adoptions')) {
  storage.set('adoptions', adoptions)
}
if (!storage.get('coralUpdates')) {
  storage.set('coralUpdates', coralUpdates)
}

