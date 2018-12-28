// Study guide for this project
// https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const page = document.querySelector('.page'); // used for appendPageLinks function
const studentItems = document.querySelectorAll('.student-item');

let selectedButton = 1;

// Use JS to create and append search to the page
const pageHeader = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
searchDiv.innerHTML = `
  <input placeholder="Search for students...">
  <button>Search</button>
`;
pageHeader.appendChild(searchDiv);


/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const showPage = (list, button) => {
  // Reset page to hide all students
  for(let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  }

  let listStart = ((button - 1) * 10);
  let listEnd = (listStart + 10);
  console.log(listStart);
  console.log(listEnd);
  console.log(list.length);

  // Display the block of students requested
  for(let i = listStart; i < listEnd; i++) {
    list[i].style.display = 'block';
  }



}
showPage(studentItems, selectedButton);



/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

function appendPageLinks(studentList) {
  // Create elements
  const linksDiv = document.createElement('div');  // Create div element
  const linksUl = document.createElement('ul');    // Create ul element
  linksDiv.className = 'pagination';               // Give class to div
  linksDiv.appendChild(linksUl);                   // Append ul to div

  let numPages = 0;                                // Reset numPages

  // Find total number of students
  let numStudents = studentList.length;
  // console.log(`Number of students is: ${numStudents}`);
  console.log(`numStudents: ${numStudents}`);


  for(let i = 0; i < numStudents; i += 10) {
    numPages++;
  }
  // console.log(`Number of pages: ${numPages}  (${numStudents}/10 = ${numPages -1} + 1 for remaining students)`);
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

    //console.log(button);
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

appendPageLinks(studentItems);
