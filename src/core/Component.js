export default class Component {
  $target;
  $props;
  $state;
  constructor ($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup () {};
  mounted () {};
  template () { return ; }
  render () {
    this.$target.innerHTML = this.template();
    this.mounted ();
  }
  setEvent() {}
  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render(); 
    //state가 변경되면 render가 된다.
  }
}