/* GLOBAL VARIABLES */
const page = document.querySelector('.page'); // used for appendPageLinks function
const fullStudentList = document.querySelectorAll('.student-item');
let searchString = '';
let filteredStudentList = [];


// Append search bar feature to the page
const pageHeader = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
searchDiv.innerHTML = `
  <input placeholder="Search for students...">
  <button>Search</button>
`;

searchDiv.addEventListener('input', (e) => {
  // console.log(event.target.value);

  searchString = event.target.value;
  search();
});

pageHeader.appendChild(searchDiv);


// Create elements for pagination buttons
const linksDiv = document.createElement('div');  // Create div element
const linksUl = document.createElement('ul');    // Create ul element
linksDiv.className = 'pagination';               // Give class to div
linksDiv.appendChild(linksUl);                   // Append ul to div

// Create elements to display if no students match search query
// TODO: When a search yields 0 results, a message is displayed on the page, informing the user that no results have been found.

const noResults = document.createElement('div');
noResults.textContent = `Sorry, no students match your search query.`;
noResults.style.display = 'none';
page.appendChild(noResults);



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
    console.log("none to show!!!");
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';

    let listStart = ((button - 1) * 10);
    let listEnd = (listStart + 10);
    // console.log(listStart);
    // console.log(listEnd);
    console.log(list.length);

    // Display the block of students requested
    for(let i = listStart; i < listEnd; i++) {
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
  console.log(`numStudents: ${numStudents}`);


  for(let i = 0; i < numStudents; i += 10) {
    numPages++;
  }
  console.log(`numPages: ${numPages}`);


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
