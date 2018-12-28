// Global variables
const page = document.querySelector('.page');
const fullStudentList = document.querySelectorAll('.student-item');
const pageHeader = document.querySelector('.page-header');

const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const pageButtonsDiv = document.createElement('div');
const pageButtonsUl = document.createElement('ul');
const noResultsDiv = document.createElement('div');

let searchString = '';
let filteredStudentList = [];

// Append elements for search bar feature
searchDiv.className = 'student-search';
searchInput.placeholder = "Search for students...";
searchButton.textContent = "Search";
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
pageHeader.appendChild(searchDiv);

// Append elements for pagination buttons
pageButtonsDiv.className = 'pagination';
pageButtonsDiv.appendChild(pageButtonsUl);
page.appendChild(pageButtonsDiv);

// Append element to display if no students match search query
noResultsDiv.textContent = `🧐 Sorry, no students match your search query.`;
noResultsDiv.style.fontSize = '1.5rem';
noResultsDiv.style.margin = '4rem';
noResultsDiv.style.textAlign = 'center';
noResultsDiv.style.display = 'none';
page.appendChild(noResultsDiv);

// Hide all items in list except for the ten you want to show
const showPage = (list, button) => {
  // Reset page to hide all students
  for(let i = 0; i < fullStudentList.length; i++) {
    fullStudentList[i].style.display = 'none';
  }
  // If no results, display message
  if(list.length === 0) {
    noResultsDiv.style.display = 'block';
  }
  // Display students based on page button selection
  else {
    // Display index of student based on button selected
    let indexStart = ((button - 1) * 10);
    // Ensure nomore than ten students are displayed
    let indexEnd = (indexStart + 10);
    // Display the block of students requested
    for(let i = indexStart; i < indexEnd && i < list.length; i++) {
      list[i].style.display = 'block';
    }
    noResultsDiv.style.display = 'none';
  }
}

// Generate, append and add functionality to pagination buttons
const appendPageLinks = (studentList) => {
  let numPages = 0;
  let numStudents = studentList.length;
  let selectedButton = 1;
  pageButtonsUl.innerHTML = '';

  showPage(studentList, selectedButton);

  // Find total number of page buttons needed
  for(let i = 0; i < numStudents; i += 10) {
    numPages++;
  }

  // Create new button for each page
  for(let i = 0; i < numPages; i++) {
    let button = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = '#';
    // Make first button active
    if(i === 0) {
      anchor.className = 'active';
    }
    // Buttons text will start at 1 instead of 0
    anchor.textContent = i + 1;
    button.appendChild(anchor);
    pageButtonsUl.appendChild(button);
  }

  // Update page when new page button clicked
  pageButtonsUl.addEventListener('click', (e) => {
    let previousButton = document.querySelector('.active');
    previousButton.className = '';
    selectedButton = e.target.textContent;
    e.target.className = 'active';
    showPage(studentList, selectedButton);
  });
}

// Update filteredStudentList using search query and refresh page
const newQuery = () => {
  filteredStudentList = [];
  if(searchString.length === 0) {
    // Use fullStudentList if searchString is empty
    appendPageLinks(fullStudentList);
  } else {
    // For each item in the full student list
    for(let i = 0; i < fullStudentList.length; i++) {
      // Select the student's name as a string
      let name = fullStudentList[i].querySelector('h3').textContent;
      // If the student's name contains the search query substring
      if(name.includes(searchString)) {
        // Add student item HTML to filteredStudentList
        filteredStudentList.push(fullStudentList[i]);
      }
    }
    appendPageLinks(filteredStudentList);
  }
}

// Call search() function when input value changes
searchInput.addEventListener('input', (e) => {
  searchString = event.target.value;
  newQuery();
});

// Call search() function when search button is clicked
searchButton.addEventListener('click', () => {
  searchString = searchInput.value;
  newQuery();
});

// Call when file is initially loaded
appendPageLinks(fullStudentList);
