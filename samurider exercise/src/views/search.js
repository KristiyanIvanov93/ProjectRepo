import { searchByQuery } from "../data/motors.js";
import { createSubmitHandler } from "../data/util.js";
import { html, render, page } from "../lib.js";


const searchTemplate = (onSearch, result) => html`
       <section id="search">

<div class="form">
  <h4>Search</h4>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
${result ? showResultTemp(result) : console.error('no')
    }
        </section>
`;

const showResultTemp = (result) => html`
<div class="search-result">
${result.length ? result.map(x => html` 
  <div class="motorcycle">
  <img src=${x.imageUrl} alt="example1" />
  <h3 class="model">${x.model}</h3>
  <a class="details-btn" href="/catalog/${x._id}">More Info</a>
  </div>` )
        : html` <h2 class="no-avaliable">No result.</h2>`}
  <!--If there are matches display a div with information about every motorcycle-->
  </div>
`

export function showSearch(ctx) {
    render(searchTemplate(createSubmitHandler(onSearch)))
};

async function onSearch(data, form) {
    const { search } = data;
    if (!search){
return alert('Search field is empty!')
    }
    const result = await searchByQuery(search);

    render(searchTemplate(createSubmitHandler(onSearch), result));
};

