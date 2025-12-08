// YouTube Growth Tips & Channel Branding Generator
const channelNameInput = document.getElementById('channelName');
const nicheSelect = document.getElementById('niche');
const brandColorInput = document.getElementById('brandColor');
const generateBtn = document.getElementById('generateBtn');
const logoPreview = document.getElementById('logoPreview');
const logoCanvas = document.getElementById('logoCanvas');
const downloadLogoBtn = document.getElementById('downloadLogoBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const ctx = logoCanvas.getContext('2d');

// Niche-specific name suggestions
const nameSuggestions = {
  tech: ['Tech Today', 'Code Masters', 'Digital Daily', 'Innovation Hub', 'Future Tech'],
  gaming: ['Pro Gamer', 'Game Zone', 'Epic Plays', 'Gaming Lab', 'Level Up'],
  lifestyle: ['Daily Vibes', 'Life Journal', 'Moments Captured', 'Real Talk', 'Journey Log'],
  education: ['Learn Quest', 'Knowledge Base', 'Study Smart', 'Learning Lab', 'Tutorial Hub'],
  music: ['Beat Box', 'Music Vibes', 'Sound Studio', 'Rhythm Lab', 'Melody World'],
  beauty: ['Glow Up', 'Beauty Box', 'Style Guide', 'Glam Lab', 'Beauty Tips'],
  business: ['Hustle Hub', 'Business Daily', 'Startup Lab', 'Growth Hub', 'Empire Build']
};

function generateChannelLogo() {
  const name = channelNameInput.value || 'YourChannel';
  const niche = nicheSelect.value || 'tech';
  const color = brandColorInput.value;

  // Clear canvas
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, logoCanvas.width, logoCanvas.height);

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, logoCanvas.width, logoCanvas.height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -30));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, logoCanvas.width, logoCanvas.height);

  // Draw circle background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(100, 100, 70, 0, Math.PI * 2);
  ctx.fill();

  // Draw emoji or icon based on niche
  const emoji = {
    tech: '🚀',
    gaming: '🎮',
    lifestyle: '🌟',
    education: '📚',
    music: '🎵',
    beauty: '✨',
    business: '💼'
  };

  ctx.font = '60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji[niche] || '▶', 100, 100);

  // Draw text
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
  ctx.fillText(initials, 100, 170);

  // Show preview
  logoPreview.style.display = 'block';
}

function adjustColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

function suggestChannelName() {
  const niche = nicheSelect.value || 'tech';
  if (!niche) return;
  const suggestions = nameSuggestions[niche];
  const random = suggestions[Math.floor(Math.random() * suggestions.length)];
  channelNameInput.value = random;
}

generateBtn.addEventListener('click', generateChannelLogo);

nicheSelect.addEventListener('change', () => {
  if (channelNameInput.value === '') {
    suggestChannelName();
  }
});

downloadLogoBtn.addEventListener('click', () => {
  const data = logoCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = data;
  a.download = 'channel-logo.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// Search functionality (local tips search)
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') performSearch();
});

function performSearch() {
  const query = searchInput.value.toLowerCase();
  if (!query) return;

  const tips = [
    'Post consistently on a schedule',
    'Optimize your titles and thumbnails for clicks',
    'Use relevant keywords in descriptions',
    'Engage with your community early',
    'Create compelling intros (first 3 seconds count)',
    'Use end screens and cards effectively',
    'Collaborate with other creators',
    'Analyze your YouTube analytics dashboard',
    'Create playlists to boost watch time',
    'Use YouTube Shorts for viral growth'
  ];

  const results = tips.filter(tip => tip.toLowerCase().includes(query));

  if (results.length > 0) {
    alert(`Search Results for "${query}":\n\n${results.join('\n\n')}`);
  } else {
    alert(`No tips found for "${query}". Try searching for: growth, thumbnails, keywords, engagement, analytics, shorts, collaborations, etc.`);
  }
}

// Initialize with first niche suggestion
window.addEventListener('load', () => {
  nicheSelect.value = 'tech';
  suggestChannelName();
});
