// Responsive Menu
const menuButton = document.getElementById("menu");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});



// Courses Array
const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseList = document.getElementById("courseList");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(list) {
  courseList.innerHTML = "";
  list.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    if (course.completed) div.classList.add("completed");
    div.innerHTML = `${course.subject} ${course.number} - ${course.title} <br> ${course.credits} credits`;
    courseList.appendChild(div);
  });

  const credits = list.reduce((sum, c) => sum + c.credits, 0);
  totalCredits.textContent = `Total Credits: ${credits}`;
}

// Filter Buttons
document.getElementById("allBtn").addEventListener("click", () => displayCourses(courses));
document.getElementById("cseBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));
document.getElementById("wddBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));

// Default Display
displayCourses(courses);
