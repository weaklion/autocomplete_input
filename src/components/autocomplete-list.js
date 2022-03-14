import Component from '../core/Component.js';

export default class AutoList extends Component {


  template() {
    const { result, activeIndex ,activeList } = this.$props;
    return `<ul class="autocomplete-list" style="visibility:${ activeList ? 'visible' : 'hidden'}">
      ${result.map((el,idx) => `
        <li 
          data-key="${idx}"
          class="${ idx === activeIndex ? 'active' : ''}"
          id="list-item"
        >
          ${el.city} 
        </li>`
      ).join(' ')}
    </ul>`
  }

  setEvent() {

    const { setActiveIndex } = this.$props;

    this.addEvent('click', '#list-item', ({target}) => {
      setActiveIndex(target.dataset.key*1);
    })
  }

}