import { updateElement } from './updateElement.js';

export default class Component {
  $target;
  $props;
  $state;
  constructor ($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
  
  }
  setup () {};
  mounted () {};
  template () { return ; }
  render () {
    const { $target } = this;

    //기존 node를 복제하고 새로운 탬플릿에 채워 넣음.
    const newNode = $target.cloneNode(true);
    newNode.innerHTML = this.template();

    //diff 알고리즘
    const oldChildNodes = [...$target.childNodes] ;
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for(let i=0; i < max ; i++) {
      updateElement($target, newChildNodes[i], oldChildNodes[i]);
    }
    this.mounted();
  }
  setEvent() {}
  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render(); 
    //state가 변경되면 render가 된다.
  }

  addEvent (eventType, selector, callback) {
    const children = [ ...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, event => {
      if(!isTarget(event.target)) return false;
      callback(event);
    })
  }
}