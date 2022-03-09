import Component from './core/Component.js';
import AutoInput from "./components/autocomplete-input.js";
import AutoList from './components/autocomplete-list.js';

export default class App extends Component {

  setup() {
    this.$state = {
      movies : [],
      searchText : '',
      activeIndex : 0,
      activeList : true
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
    const {fetchMovies, $state, handleInputEvents, setActiveList, setClearState } = this;
    const $autoInput = this.$target.querySelector('[data-component="autocomplete-input"]');
    const $autoList = this.$target.querySelector('[data-component="autocomplete-list"]');
    new AutoInput($autoInput, {
      searchText : $state.searchText,
      filterMovies : $state.filterMovies,
      setActiveList : setActiveList.bind(this),
      setClearState : setClearState.bind(this),
      handleInputEvents : handleInputEvents.bind(this),
      fetchMovies : fetchMovies.bind(this)
    });

    new AutoList($autoList, {
      movies : $state.movies,
      activeIndex : $state.activeIndex,
      activeList : $state.activeList,
    });
  }

  setActiveList(value) {
    this.setState({
      activeList : value
    })
  }

  setClearState(){
    this.setState({
      movies : [],
      searchText : '',
    })
  }

  
  handleInputEvents(event) {
    let keyCodes = {
      'ARROW_DOWN': 40,
      'ARROW_UP': 38,
      'ENTER': 13,
    }; //keycodes
    let action = Object.keys(keyCodes).find
    (key => keyCodes[key] === event.keyCode);

    const activeIndex = this.$state.activeIndex;

    switch(action) {
      case 'ARROW_DOWN' : //down
      case 'ARROW_UP' : //up


        if((this.$state.movies.length === (activeIndex + 1 )) && action === 'ARROW_DOWN'
        || (activeIndex === 0 && action === 'ARROW_UP')) {
          this.setState({
            activeIndex : 0
          })
          break;
        }

        this.setState({
          activeIndex : action === 'ARROW_UP'? activeIndex - 1 : activeIndex + 1
        });
        return ; 
      default :
        return ;
    }
  }
  fetchMovies (value) {
    fetch(`https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=${value}`)
    .then((res) => res.json())
    .then((data) => {

      this.setState({
        movies : data,
        searchText : value
      })
    })
  }

}

