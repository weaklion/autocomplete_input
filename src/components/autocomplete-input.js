import Component from '../core/Component.js';

export default class AutoInput extends Component {

  template() {

    const { inputValue } = this.$props;

    return `<input 
      value="${inputValue}"
      type="text" 
      class="autocomplete-input"
       placeholder="search"
      >`
  }




  setEvent() {
    //inputEvent
    let timer ;
    const {  fetchMovies, handleInputEvents } = this.$props;

    this.addEvent('input', '.autocomplete-input', ({target}) => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        console.log(target.value,'targetvalue');
        fetchMovies(target.value);
      },400)
    })

    this.addEvent('keyup', '.autocomplete-input', (event) => {
      handleInputEvents(event);
    })

    this.addEvent('focusin', '.autocomplete-input', (event) => {
      handleInputEvents(event);
    })
  }
}