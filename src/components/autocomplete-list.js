import Component from '../core/Component.js';

export default class AutoList extends Component {


  template() {
    const { movies, activeIndex ,activeList } = this.$props;
    return `<ul class="autocomplete-list" style="visibility:${ activeList ? 'visible' : 'hidden'}">
      ${movies.map((el,idx) => `
        <li 
          key="${idx}"
          class="${ idx === activeIndex ? 'active' : ''}"
        >
          ${el.text} 
        </li>`
      ).join(' ')}
    </ul>`
  }

  setActiveList(value) {
    this.setState({
      activeList : value
    })
  }

  setEvent() {
    
  }

}