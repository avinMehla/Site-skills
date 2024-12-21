let invitationCount = 0;

function addSkill() {
  const skillName = document.getElementById("skill-name").value;
  const skillLevel = document.getElementById("skill-level").value;

  if (!skillName) {
    alert("Please enter a skill name!");
    return;
  }

  const skillTagsContainer = document.getElementById("skill-tags");

  const skillTag = document.createElement("div");
  skillTag.className = "skill-tag";
  skillTag.innerHTML = `
    ${skillName} <span>(Level: ${skillLevel})</span>
    <div class="delete-tag" onclick="removeSkill(this)">✖</div>
  `;

  skillTagsContainer.appendChild(skillTag);

  document.getElementById("skill-name").value = "";
  document.getElementById("skill-level").value = "5";

  incrementInvitationCount();
}

function removeSkill(element) {
  element.parentElement.remove();
}

function incrementInvitationCount() {
  invitationCount++;
  document.getElementById("invitation-count").textContent = invitationCount;
}

function updateWorkingSkill() {
  const workingSkillInput = document.getElementById("working-skill").value;

  if (!workingSkillInput) {
    alert("Please enter a working skill!");
    return;
  }

  const currentSkillContainer = document.getElementById("current-skill");
  currentSkillContainer.innerHTML = `<p>${workingSkillInput}</p>`;

  document.getElementById("working-skill").value = "";
}
