import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  //extends view
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return; //if no button return immedietely
      // console.log(btn);
      const goToPage = +btn.dataset.goto; //get page from button pass number into controller
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    //data gets passed into the render method which is on the main view module/class every other view inherits it
    const curPage = this._data.page; //data is the state.search object page gets update through getsearch results method
    //render method will call this
    //num of results divided by number of results per page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); //data is the search object passed into the paination view in the controller
    console.log(numPages);

    //page 1. there are other pages
    if (curPage === 1 && numPages > 1) {
      //check to see
      return `<button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    //other page
    if (curPage < numPages) {
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto = "${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //page 1 and there are no other pages
    //if no pages return nothing
    return "";
  }
}

export default new PaginationView();
