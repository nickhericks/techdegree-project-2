/* GLOBAL VARIABLES */
const page = document.querySelector('.page');
const fullStudentList = document.querySelectorAll('.student-item');
let searchString = '';
let filteredStudentList = [];


// Elements for search bar feature
const pageHeader = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
searchDiv.innerHTML = `
  <input placeholder="Search for students...">
  <button>Search</button>
`;

const input = searchDiv.firstElementChild;
const searchButton = input.nextElementSibling;

// Call search() when input value changes
input.addEventListener('input', (e) => {
  searchString = event.target.value;
  search();
});

// Call search() when search button clicked
searchButton.addEventListener('click', () => {
  searchString = input.value;
  search();
});

pageHeader.appendChild(searchDiv);


// Parent elements for pagination buttons
const linksDiv = document.createElement('div');
const linksUl = document.createElement('ul');
linksDiv.className = 'pagination';
linksDiv.appendChild(linksUl);

// Element to display if no students match search query
const noResultsDiv = document.createElement('div');
noResultsDiv.textContent = `🧐 Sorry, no students match your search query.`;
noResultsDiv.style.fontSize = '1.5rem';
noResultsDiv.style.margin = '4rem';
noResultsDiv.style.textAlign = 'center';
noResultsDiv.style.display = 'none';
page.appendChild(noResultsDiv);



/***
   showPage function
   Hide all items in array except for the ten you want to show
   INPUT:  HTMLCollection (array) of student list items
   OUTPUT: Changes CSS of student list items, returns nothing
***/
const showPage = (list, button) => {
  // Reset page to hide all students
  for(let i = 0; i < fullStudentList.length; i++) {
    fullStudentList[i].style.display = 'none';
  }
  // Reset page to hide all students
  // for(let i = 0; i < list.length; i++) {
  //   list[i].style.display = 'none';
  // }

  if(list.length === 0) {
    noResultsDiv.style.display = 'block';
  } else {
    noResultsDiv.style.display = 'none';

    let listStart = ((button - 1) * 10);
    let listEnd = (listStart + 10);
    // console.log(listStart);
    // console.log(listEnd);
    // console.log(list.length);

    // Display the block of students requested
    for(let i = listStart; i < listEnd && i < list.length; i++) {
      list[i].style.display = 'block';
    }
  }

}

/***
   appendPageLinks function
   Generate, append and add functionality to pagination buttons
   INPUT:
   OUTPUT: , returns nothing
***/
function appendPageLinks(studentList) {
  let selectedButton = 1;

  showPage(studentList, selectedButton);

  linksUl.innerHTML = '';



  let numPages = 0;                                // Reset numPages

  // Find total number of students
  let numStudents = studentList.length;
  // console.log(`numStudents: ${numStudents}`);


  for(let i = 0; i < numStudents; i += 10) {
    numPages++;
  }
  // console.log(`numPages: ${numPages}`);


  for(let i = 0; i < numPages; i++) {
    let button = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = '#';

    if(i === 0) {
      anchor.className = 'active';
    }

    anchor.textContent = i + 1;
    button.appendChild(anchor);
    linksUl.appendChild(button);
  }


  linksUl.addEventListener('click', (e) => {
    // console.log(selectedButton);
    let undoSelectedButton = document.querySelector('.active');
    // const buttons = linksUl.children;
    // for(let i = 0; i < buttons.length; i++) {
    undoSelectedButton.className = '';            // Clear 'active' class from all buttons
    // }

    selectedButton = e.target.textContent;  // Update selectedButton number
    console.log(selectedButton);
    e.target.className = 'active';
    showPage(studentList, selectedButton);
  });

  page.appendChild(linksDiv);
}
// Call when file is initially loaded
appendPageLinks(fullStudentList);




const search = () => {
  filteredStudentList = [];

  if(searchString.length === 0) {
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
        // console.log(filteredStudentList);
      }
    }
    appendPageLinks(filteredStudentList);
  }
}
