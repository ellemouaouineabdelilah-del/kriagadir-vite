// Centralized nav links definition
export const getNavLinks = (t, scrollTo, navigate) => [
  { label: t('home'), action: () => scrollTo('home'), icon: 'Home', description: 'Back to homepage' },
  { label: t('vehicles'), action: () => scrollTo('fleet'), icon: 'Car', description: 'View our vehicles' },
  { label: t('about.title'), action: () => navigate('/about'), icon: 'Info', description: 'Learn about us' },
  { label: t('reservation'), action: () => navigate('/reservation'), icon: 'Grid3x3', description: 'Reserve your car' },
  { label: t('contactSection'), action: () => scrollTo('contact'), icon: 'Phone', description: 'Get in touch' },
];