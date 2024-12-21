function scrollProfiles(direction) {
    const profileSlider = document.querySelector('.profile-slider');
    const scrollAmount = 300;
  
    if (direction === 'right') {
      profileSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (direction === 'left') {
      profileSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
  