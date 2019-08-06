# Project 2 - Full Stack JavaScript Techdegree

### List Pagination and Filtering
This project utilizes a progressive enhancement approach to add pagination and search filtering features to a student list page.

***
## View project
:mag: Live version available at [nickhericks.github.io/techdegree-project-2/](https://nickhericks.github.io/techdegree-project-2/)

<br><br>

<img src="https://res.cloudinary.com/dtqevfsxh/image/upload/v1550132316/portfolio/list-pagination-and-filtering.gif" width="500px">

## Project objective
Without JavaScript, this page displays a long list of students. I have enhanced the usability of the page by using unobtrusive JavaScript to dynamically divide the list into "pages". Each 'page' now only displays 10 students at a time.

## Features
In addition to completing the basic requirements for this techdegree project, I also built additional features and functionality using JavaScript such as:

- [x] Added a search feature to filter/find students
- [x] Updated pagination results based on search
- [x] Created fallback message for when no search results are available

## Code example
An example of one of the JavaScript functions in this project:
1. showPage function takes a list array and a button element as arguments.
2. All students in the list are given a display of 'none'.
3. If the list (when filtered) is empty, a 'no match' message is displayed.
4. Else the button text is used to decide which students will be displayed.

```javascript
const showPage = (list, button) => {
  // Hide all student elements
  for(let i = 0; i < fullStudentList.length; i++) {
    fullStudentList[i].style.display = 'none';
  }
  // If no results in filtered list, display 'no match' message
  if(list.length === 0) {
    noResultsDiv.style.display = 'block';
  }
  // else display students based on page button selection
  else {
    let indexStart = ((button - 1) * maxStudentsPerPage);
    let indexEnd = (indexStart + maxStudentsPerPage);
    for(let i = indexStart; i < indexEnd && i < list.length; i++) {
      list[i].style.display = 'block';
    }
    noResultsDiv.style.display = 'none';
  }
}
```

## Acknowledgements
This project was built as part of the [Full Stack JavaScript Techdegree](https://join.teamtreehouse.com/techdegree/) offered by [Treehouse](https://teamtreehouse.com) :raised_hands:
