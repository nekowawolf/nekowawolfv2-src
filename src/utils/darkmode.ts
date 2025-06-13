export function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('darkmode');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');

  if (isDark) {
    localStorage.setItem('darkmode', 'active');
    moonIcon?.classList.add('hidden');
    sunIcon?.classList.remove('hidden'); 
  } else {
    localStorage.removeItem('darkmode');
    moonIcon?.classList.remove('hidden'); 
    sunIcon?.classList.add('hidden'); 
  }
}