import Component from '../core/Component.js';

export default class AutoInput extends Component {

  mounted() {
    const autoInput = this.$target.children[0].children[0];
    autoInput.focus();
    const val = autoInput.value;
    autoInput.value ='';
    autoInput.value = val;

  }

  template() {

    const { searchText } = this.$props;

    return `
      <div class="inputWrap">
        <input 
          value="${searchText}"
          type="text" 
          class="autocomplete-input"
          id="auto-input"
          placeholder="search"
          autocomplete="off"
        >
        <button 
          class="btnClear" 
          style="visibility:${ searchText.length > 0 ? 'visible' : 'hidden' }"></button>
      <div>
      `
  }

  setEvent() {
    //inputEvent
    let timer ;
    const { fetchMovies, handleInputEvents, setClearState, setActiveList } = this.$props;
    this.addEvent('input', '.autocomplete-input', ({target}) => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fetchMovies(target.value);
      },600)
    })

    this.addEvent('keyup', '.autocomplete-input', (event) => {
      handleInputEvents(event);
    })

    this.addEvent('focus', '.autocomplete-input', (event) => {
      handleInputEvents(event);
    })

    this.addEvent('blur', '.autocomplete-input', () => {
      setActiveList(false)    
    })

    this.addEvent('click', '.btnClear', () => {
      setClearState();
    })
  }
}