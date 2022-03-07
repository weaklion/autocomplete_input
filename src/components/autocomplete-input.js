import Component from '../core/Component.js';

export default class AutoInput extends Component {

  template() {

    return `<input 
      type="text" 
      class="autocomplete-input"
       placeholder="search"
      >`
  }


  setEvent() {
    //inputEvent
    let timer ;
    const {  fetchMovies } = this.$props;

    this.addEvent('input', '.autocomplete-input', ({target}) => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        console.log(target.value,'targetvalue');
        fetchMovies(target.value);
      },400)
    })
  }
}