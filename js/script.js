// Study guide for this project
// https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const page = document.querySelector('.page'); // used for appendPageLinks function
const studentItems = document.querySelectorAll('.student-item');

let selectedPage = 0;

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

const showPage = (list, page) => {
  // Reset page to hide all students
  for(let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  }

  // Display the block of students requested
  for(let i = 0; i < 10; i++) {
    list[i].style.display = 'block';
  }



}
showPage(studentItems, selectedPage);



/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

function appendPageLinks() {
  const linksDiv = document.createElement('div');
  const linksUl = document.createElement('ul');
  linksDiv.className = 'pagination';
  linksDiv.appendChild(linksUl);

  // Find total number of students
  let numStudents = studentItems.length;
  console.log(`Number of students is: ${numStudents}`);

  let numPages = 0;

  for(let i = 0; i < numStudents; i += 10) {
    numPages++;
  }
  console.log(`Number of pages: ${numPages}  (${numStudents}/10 = ${numPages -1} + 1 for remaining students)`);


  for(let i = 0; i < numPages; i++) {
    let button = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = '#';

    if(i === selectedPage) {
      anchor.className = 'active';
    }

    anchor.textContent = i + 1;
    button.appendChild(anchor);
    linksUl.appendChild(button);

    console.log(button);

    button.addEventListener('click', (e) => {
      console.log(e.target.textContent);
      selectedPage = e.target.textContent
      console.log(selectedPage);
      showPage(studentItems, selectedPage);
    });
  }



  page.appendChild(linksDiv);
}

appendPageLinks();
