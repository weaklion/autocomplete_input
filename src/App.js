import Component from './core/Component.js';
import AutoInput from "./components/autocomplete-input.js";
import AutoList from './components/autocomplete-list.js';

export default class App extends Component {

  setup() {
    this.$state = {
      moives : [],
      timer : 0
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
    const $autoInput = this.$target.querySelector('[data-component="autocomplete-input"]');
    const $autoList = this.$target.querySelector('[data-component="autocomplete-list"]');

    new AutoInput($autoInput, {

    });

    new AutoList($autoList, {
      
    })


  }
}