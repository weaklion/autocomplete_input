import Component from './core/Component.js';
import AutoInput from "./components/autocomplete-input.js";
import AutoList from './components/autocomplete-list.js';

export default class App extends Component {

  setup() {
    this.$state = {
      movies : [],
      searchText : '',
      active : null,
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
    const {fetchMovies, $state, handleInputEvents } = this;
    const $autoInput = this.$target.querySelector('[data-component="autocomplete-input"]');
    const $autoList = this.$target.querySelector('[data-component="autocomplete-list"]');

    new AutoInput($autoInput, {
      inputValue : $state.searchText,
      filterMovies : $state.filterMovies,
      active : $state.active,
      handleInputEvents : handleInputEvents.bind(this),
      fetchMovies : fetchMovies.bind(this)
    });

    new AutoList($autoList, {
      moviesTextList : $state.movies
    });
  }

  handleInputEvents(event) {
    let keyCodes = {
      'ARROW_DOWN': 40,
      'ARROW_UP': 38,
      'ENTER': 13,
    }; //keycodes
    let action = Object.keys(keyCodes).find
    (key => keyCodes[key] === event.keyCode);

    const active = this.$state.active;

    console.log(action,'action');
    switch(action) {
      case 'ARROW_DOWN' : //down
      case 'ARROW_UP' : //up
        if(!active) {
          this.setState({
            active : 0
          })
        }

        if((this.$state.movies.length === (active + 1 )) && action === 'ARROW_DOWN'
          || (active === 0 && action === 'ARROW_UP')) {
            this.setState({
              active : 0
            })
          }

          this.setState({
            active : action === 'ARROW_UP'? active - 1 : active + 1
          });
      
      case 'ENTER' : //enter
        if(!active) {
          this.setState({
            active : 0
          })
        }
        return 
      default :
      return ;
    }
  }

  fetchMovies (value) {
    fetch(`https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data,'asdfasdf');
      this.setState({
        movies : data,
        searchText : value
      })
    })
  }


}