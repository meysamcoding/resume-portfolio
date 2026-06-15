(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

fetch("./data/resume.json")
  .then((response) => response.json())
  .then((data) => {
    renderPersonal(data.personal);
    renderExperience(data.experience);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderSkills(data.skills);
    renderAbout(data.interests);
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

function renderPersonal(personal) {
  document.getElementById("personal-name").innerHTML =
    `Meysam <span class="text-primary">Najafitavani</span>`;

  document.getElementById("personal-location").textContent =
    personal.location;

  document.getElementById("personal-phone").textContent =
    personal.phone;

  document.getElementById("personal-email").textContent =
    personal.email;

  document.getElementById("personal-email").href =
    `mailto:${personal.email}`;

  document.getElementById("personal-github").href =
    personal.github;

  document.getElementById("personal-linkedin").href =
  personal.linkedin;

  document.getElementById("personal-title").textContent =
    personal.title;

  document.getElementById("personal-summary").textContent =
    personal.summary;
}

function renderExperience(experiences) {
  const container = document.getElementById("experience-container");

  container.innerHTML = experiences
    .map(
      (exp) => `
      <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
        
        <div class="resume-content">
          <h3 class="mb-0">${exp.company}</h3>

          <div class="subheading mb-2">
            ${exp.role}
          </div>

          <div class="tech-stack">
            ${exp.technologies ? exp.technologies.join(" • ") : ""}
          </div>

          <p>${exp.description}</p>

          <ul>
            ${exp.responsibilities
          ? exp.responsibilities
            .map((item) => `<li>${item}</li>`)
            .join("")
          : ""
        }
          </ul>
        </div>

        <div class="resume-date text-md-right">
          <span class="text-primary">${exp.period}</span>
        </div>

      </div>
    `
    )
    .join("");
}



function renderProjects(projects) {
  const container = document.getElementById("projects-container");

  container.innerHTML = projects
    .map(
      (project) => `
      <div class="project-card">
        <div class="project-title">${project.title}</div>

        <div class="project-tech">
          ${project.technologies ? project.technologies.join(" • ") : ""}
        </div>

        <p>${project.description}</p>

        <div class="project-links">
          ${project.live
          ? `<a href="${project.live}" target="_blank">Live Demo</a>`
          : ""
        }

          <a href="${project.github}" target="_blank">GitHub</a>
        </div>
      </div>
    `
    )
    .join("");
};


function renderEducation(education) {
  const container = document.getElementById("education-container");

  container.innerHTML = education
    .map(
      (item) => ` <div class="education-card">
    <div class="education-school">
      ${item.school}
    </div>

    <div class="education-degree">
      ${item.degree}
    </div>

    <div class="education-location">
      ${item.location}
    </div>

    <p>${item.description}</p>

    <span class="text-primary">
      ${item.year}
    </span>

  </div>
  `
    )
    .join("");

}

function renderSkills(skills) {
  const container = document.getElementById("skills-container");

  container.innerHTML = `
    <h4>Frontend</h4>
    <div class="skill-group">
      ${skills.frontend.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
    </div>

    <h4>Architecture</h4>
    <div class="skill-group">
      ${skills.architecture.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
    </div>

    <h4>Tools</h4>
    <div class="skill-group">
      ${skills.tools.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
    </div>

    <h4>Testing</h4>
    <div class="skill-group">
      ${skills.testing.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
    </div>
  `;
}

function renderAbout( interests) {
  const title = document.getElementById("about-title");
  const summary = document.getElementById("about-summary");

  title.textContent = about.title;

  summary.innerHTML = `
    ${interests.paragraph1}
    <br><br>
    ${interests.paragraph2}
  `;
}