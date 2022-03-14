import Component from './core/Component.js';
import AutoInput from "./components/autocomplete-input.js";
import AutoList from './components/autocomplete-list.js';

export default class App extends Component {

  setup() {
    this.$state = {
      result : [],
      searchText : '',
      activeIndex : 0,
      activeList : false
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
    const {fetchMovies, $state, handleInputEvents, setActiveList, setClearState, setActiveIndex } = this;
    const $autoInput = this.$target.querySelector('[data-component="autocomplete-input"]');
    const $autoList = this.$target.querySelector('[data-component="autocomplete-list"]');
    new AutoInput($autoInput, {
      searchText : $state.searchText,
      setActiveList : setActiveList.bind(this),
      setClearState : setClearState.bind(this),
      handleInputEvents : handleInputEvents.bind(this),
      fetchMovies : fetchMovies.bind(this)
    });

    new AutoList($autoList, {
      result : $state.result,
      activeIndex : $state.activeIndex,
      activeList : $state.activeList,
      setActiveIndex : setActiveIndex.bind(this),
    });
  }

  setActiveList(value) {
    this.setState({
      activeList : value
    })
  }

  setClearState(){
    this.setState({
      result : [],
      searchText : '',
    })
  }

  setActiveIndex(index) {
    console.log(index,'asdfawsdfsadfsadf')
    this.setState({
      activeIndex : index,
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


        if((this.$state.result.length === (activeIndex + 1 )) && action === 'ARROW_DOWN'
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

  filterData(data, searchText) {
    console.log(data,'data)');
    return data.filter((x) => x.city.toLowerCase().includes(searchText.toLowerCase()));
  }

  fetchMovies (value) {
    fetch(`https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`)
    .then((res) => res.json())
    .then((data) => {
      const filterData = this.filterData(data, value);
      this.setState({
        result : filterData,
        searchText : value,
        activeList : true,
      })
    })
  }

}

