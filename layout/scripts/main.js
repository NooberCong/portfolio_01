$(".toast").toast();
configureSocialButtons();
configureScrollListeners();
configureImageViewer();
configureSubmitAction();

var skills_progress_animated = false;
var about_section_animated = false;

function configureScrollListeners() {
  window.onscroll = () => {
    update_active_navlink();
    animate_about_section();
    animate_skills_section();
  };
}

function configureSocialButtons() {
  for (let btn of document.getElementsByClassName("social-btn")) {
    let icon = btn.getElementsByTagName("i")[0];
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "none";
      icon.style.transform = "translateX(10px)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.transform = "translateX(20px)";
      icon.style.transform = "none";
    });
  }
}

function animate_skills_section() {
  if (skills_progress_animated) {
    return;
  }
  const skills_section = document.getElementById("skills");
  if (window.scrollY + 250 >= skills_section.offsetTop) {
    for (let box of skills_section.getElementsByClassName("box")) {
      const circle = box.getElementsByTagName("circle")[1];
      const percentage = parseInt(
        box.getElementsByTagName("h2")[0].textContent.substring(0, 2)
      );
      circle.style.strokeDashoffset = 630 - (630 / 100) * percentage;
    }
    skills_progress_animated = true;
  }
}

function animate_about_section() {
  if (about_section_animated) {
    return;
  }
  const about_section = document.getElementById("about");
  if (window.scrollY + 250 >= about_section.offsetTop) {
    about_section_animated = true;
    const balls = about_section.getElementsByClassName("ball");
    for (let ball of balls) {
      ball.style.transform = "scale(3)";
    }
  }
}

function update_active(index) {
  const navitems = document.getElementsByClassName("nav-item");
  for (let item of navitems) {
    item.classList.remove("active");
  }
  navitems[index].classList.add("active");
}

function update_active_navlink() {
  const scroll = window.scrollY;
  if (scroll >= document.getElementById("contact").offsetTop - 150) {
    update_active(4);
  } else if (scroll >= document.getElementById("projects").offsetTop - 10) {
    update_active(3);
  } else if (scroll >= document.getElementById("skills").offsetTop - 10) {
    update_active(2);
  } else if (scroll >= document.getElementById("about").offsetTop - 10) {
    update_active(1);
  } else if (scroll === 0) {
    update_active(0);
  }
}

function configureImageViewer() {
  for (let img of document.getElementsByClassName("img-thumbnail")) {
    img.addEventListener("click", () => {
      new Viewer(img, {
        navbar: false,
        toolbar: false,
        keyboard: false,
        loop: false,
        movable: false,
        rotatable: false,
        tooltip: false,
      });
    });
  }
}

function configureSubmitAction() {
  document.forms[0].onsubmit = (e) => {
    e.preventDefault();
    const submitbtn = document.getElementById("submit-btn");
    const loadingbtn = document.getElementById("loading-btn");
    const sentbtn = document.getElementById("sent-btn");
    submitbtn.style.display = "none";
    loadingbtn.style.display = "inline-block";
    setTimeout(() => {
      loadingbtn.style.display = "none";
      sentbtn.style.display = "inline-block";
    }, 750);
  };
}
