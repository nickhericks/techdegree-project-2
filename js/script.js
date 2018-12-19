// Study guide for this project
// https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const page = document.querySelector('.page'); // used for appendPageLinks function


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
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/
function showPage() {

}


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
function appendPageLinks() {
  const pageLinks = document.createElement('div');
  pageLinks.className = 'pagination';





  page.appendChild(pageLinks);
}

appendPageLinks();



console.log(page);
