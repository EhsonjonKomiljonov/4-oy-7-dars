const elMode = document.querySelector(".js-mode");
const elList = document.querySelector(".js-list");

let theme = false;

elMode.addEventListener("click", () => {
  theme = !theme;
  const bg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", bg);
  changeTheme();
});

function changeTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
changeTheme();

const elSelect = document.querySelector(".js-select");

const newOption1 = document.createElement("option");
const newOption2 = document.createElement("option");

newOption1.textContent = "A--Z";
newOption2.textContent = "Z--A";

newOption1.setAttribute("value", "A--Z");
newOption2.setAttribute("value", "Z--A");
elSelect.appendChild(newOption1);
elSelect.appendChild(newOption2);

elSelect.addEventListener("change", () => {
  if (elSelect.value != "default") {
    if (elSelect.value == "A--Z") {
      let booksNameSort = books.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      renderBooks(booksNameSort, elList);
    }
    if (elSelect.value == "Z--A") {
      let booksNameSort = books.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });
      renderBooks(booksNameSort, elList);
    }
  }
});

const renderBooks = (array, node) => {
  node.innerHTML = "";
  array.forEach((el) => {
    let newItem = document.createElement("li");
    let newBox = document.createElement("div");
    let bookImg = document.createElement("img");
    let bookName = document.createElement("h3");
    let bookAuthor = document.createElement("h3");
    let bookLang = document.createElement("p");
    let bookPage = document.createElement("p");
    let bookYear = document.createElement("p");
    let bookLink = document.createElement("a");

    newItem.setAttribute("class", "col-3 px-2 pt-3");
    newBox.setAttribute(
      "class",
      "mx-auto w-100 h-100 border border-2 rounded-3 p-3"
    );
    bookImg.setAttribute("class", "d-block mx-auto w-75 rounded-3 ");
    bookImg.setAttribute("height", "330");
    bookName.setAttribute("class", "text-primary text-center fs-5 my-3");
    bookAuthor.setAttribute("class", "text-center fs-5 my-3 js-author");
    bookLang.setAttribute("class", "text-warning text-center fs-5 my-3");
    bookPage.setAttribute("class", "text-danger text-center fs-5");
    bookYear.setAttribute(
      "class",
      "text-center fs-5 text-white bg-secondary w-50 rounded"
    );
    bookLink.setAttribute("href", el.link);
    bookLink.setAttribute("target", "_blank");
    bookLink.setAttribute("class", "js-link");

    elList.appendChild(newItem);
    newItem.appendChild(newBox);
    newBox.appendChild(bookImg);
    newBox.appendChild(bookName);
    newBox.appendChild(bookAuthor);
    newBox.appendChild(bookLang);
    newBox.appendChild(bookPage);
    newBox.appendChild(bookYear);
    newBox.appendChild(bookLink);

    bookImg.setAttribute("src", el.imageLink);
    bookName.innerHTML = "Name: " + el.title;
    bookAuthor.innerHTML = "Author: " + el.author;
    bookLang.innerHTML = "Languange: " + el.language;
    bookPage.innerHTML = "Pages: " + el.pages;
    bookYear.innerHTML = "Year: " + el.year;
    bookLink.innerHTML = "Read the Book";
  });
};
renderBooks(books, elList);

const elYearSort = document.querySelector(".js-year-sort");

const newOption1Year = document.createElement("option");
const newOption2Year = document.createElement("option");

elYearSort.appendChild(newOption1Year);
elYearSort.appendChild(newOption2Year);

newOption1Year.textContent = "1995 to -1700";
newOption1Year.value = "1995to-1700";

newOption2Year.textContent = "-1700 to 1995";
newOption2Year.value = "-1700to1995";

elYearSort.addEventListener("change", () => {
  if (elYearSort.value == "1995to-1700") {
    books.sort((a, b) => {
      if (a.year < b.year) {
        return 1;
      }
      if (a.year > b.year) {
        return -1;
      }
      return 0;
    });
    renderBooks(books, elList);
  }
  if (elYearSort.value == "-1700to1995") {
    books.sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    });
    renderBooks(books, elList);
  }
});

const elPageSort = document.querySelector(".js-sort-page");

const newOption1Page = document.createElement("option");
const newOption2Page = document.createElement("option");

elPageSort.appendChild(newOption1Page);
elPageSort.appendChild(newOption2Page);

newOption1Page.textContent = "50 to 2500";
newOption1Page.value = "50to2500";

newOption2Page.textContent = "2500 to 50";
newOption2Page.value = "2500to50";

elPageSort.addEventListener("change", () => {
  if (elPageSort.value == "50to2500") {
    books.sort((a, b) => {
      if (a.pages < b.pages) {
        return -1;
      }
      if (a.pages > b.pages) {
        return 1;
      }
      return 0;
    });
    renderBooks(books, elList);
  }
  if (elPageSort.value == "2500to50") {
    books.sort((a, b) => {
      if (a.pages < b.pages) {
        return 1;
      }
      if (a.pages > b.pages) {
        return -1;
      }
      return 0;
    });
    renderBooks(books, elList);
  }
});

const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-search");

let elSearchh = [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

elForm.addEventListener("input", () => {
  elList.innerHTML = "";
  let elInputVal = elInput.value.toLowerCase();
  books.forEach((el) => {
    if (el.title.includes(elInputVal)) {
      elSearchh.push(el);
    }
  });
  renderBooks(elSearchh, elList);
  elSearchh = [];
});

const elLangSort = document.querySelector(".js-lang-sort");

const setLang = new Set();
let sortingLangs = [];

books.forEach((el) => {
  setLang.add(el.language);

  elLangSort.addEventListener("change", () => {
    if (elLangSort.value == el.language) {
      sortingLangs.push(el);
      renderBooks(sortingLangs, elList);
    }
  });
});

setLang.forEach((el) => {
  const newOptionLang = document.createElement("option");

  newOptionLang.value = el;
  newOptionLang.textContent = el;

  elLangSort.appendChild(newOptionLang);
});
