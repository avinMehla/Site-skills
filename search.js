// Simulating profiles for the search functionality
const profiles = [
    { name: "1", skill: "Web Developer", image: "https:/om/100" },
    { name: "2", skill: "UI/UX Designer", image: "https:/om/100" },
    { name: "3", skill: "Software Engineer", image: "https:/om/100" },
    { name: "4", skill: "Data Scientist", image: "https:/om/100" }
  ];
  
  function searchProfiles() {
    const query = document.getElementById("search").value.toLowerCase();
    const resultsSection = document.getElementById("profile-suggestions");
  
    // Clear previous results
    resultsSection.innerHTML = "";
  
    // Filter profiles based on the search query
    const filteredProfiles = profiles.filter(profile => 
      profile.name.toLowerCase().includes(query) || profile.skill.toLowerCase().includes(query)
    );
  
    // Display filtered profiles
    filteredProfiles.forEach(profile => {
      const profileElement = document.createElement("div");
      profileElement.classList.add("profile");
      profileElement.innerHTML = `
        <img src="${profile.image}" alt="${profile.name}">
        <h3>${profile.name}</h3>
        <p>${profile.skill}</p>
      `;
      resultsSection.appendChild(profileElement);
    });
  }
  