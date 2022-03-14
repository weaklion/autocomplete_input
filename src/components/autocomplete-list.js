import Component from '../core/Component.js';

export default class AutoList extends Component {


  template() {
    const { result, activeIndex ,activeList } = this.$props;
    return `<ul class="autocomplete-list" style="visibility:${ activeList ? 'visible' : 'hidden'}">
      ${result.map((el,idx) => `
        <li 
          key="${idx}"
          class="${ idx === activeIndex ? 'active' : ''}"
          id="result-item"
        >
          ${el.city} 
        </li>`
      ).join(' ')}
    </ul>`
  }

  setEvent() {

    const { setActiveIndex } = this.$props;

    this.addEvent('click', '#result-item', ({target}) => {
      console.log(target.key,'target');
    })
  }

}