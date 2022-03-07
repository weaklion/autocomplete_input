import Component from './core/Component.js';
import AutoInput from "./components/autocomplete-input.js";
import AutoList from './components/autocomplete-list.js';

export default class App extends Component {

  setup() {
    this.$state = {
      movies : [],
      searchText : '',
    }
  };

  template () {
    return `
      <section class="container">
        <div class="autocomplete">
          <div data-component="autocomplete-input"></div>
          <div data-component="autocomplete-list"></div>
        </div>
      </section>
    
    `
  }

  mounted() {
    const { moviesTextList , fetchMovies, $state } = this;
    const $autoInput = this.$target.querySelector('[data-component="autocomplete-input"]');
    const $autoList = this.$target.querySelector('[data-component="autocomplete-list"]');

    new AutoInput($autoInput, {
      inputValue : $state.searchText,
      filterMovies : $state.filterMovies,
      fetchMovies : fetchMovies.bind(this)
    });

    new AutoList($autoList, {
      moviesTextList : $state.movies
    });
  }

  fetchMovies (value) {
    fetch(`https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data,'asdfasdf');
      this.setState({
        movies : data
      })
    })
  }


}