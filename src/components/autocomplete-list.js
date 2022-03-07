import Component from '../core/Component.js';

export default class AutoList extends Component {

  template() {
    const { moviesTextList } = this.$props;
    return `<ul class="autocomplete-list">
      ${moviesTextList.map(el => `
        <li> ${el.text} </li>`
      ).join(' ')}
    </ul>`
  }

  setEvent() {
    //inputEvent
  }
}