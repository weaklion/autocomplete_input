import Component from '../core/Component.js';

export default class AutoList extends Component {

  template() {
    const { moviesTextList, active } = this.$props;
    return `<ul class="autocomplete-list">
      ${moviesTextList.map((el,idx) => `
        <li class="${ idx === active ? 'active' : ''}"> ${el.text} </li>`
      ).join(' ')}
    </ul>`
  }

  hightlightedItem (action, resultItems, activeItem, activeIndex ) {
    if((resultItems.length === (activeIndex + 1)) &&  action === 'ARROW_DOWN'  //마지막에서 down
        || (activeIndex === 0 && action === 'ARROW_UP')) {
        return true;
      }
    
      let newIndex = action === 'ARROW_UP' ?  activeIndex - 1 : activeIndex + 1;
  
      activeItem.classList.remove('highlight');
  
      return resultItems[newIndex].classList.add('highlight');
  }

  // 아니면 그냥 배열에다가 active줘서 active 되면 style되는 형식으로 해도 될듯.
  // 차라리 그게 낫겟다.
  // handleInputEvent에서 active부여한 다음에 active 되면 스타일 변경되는 형식으로 하자. 

  handleInputEvents (target) {
    let keyCodes = {
      'ARROW_DOWN': 40,
      'ARROW_UP': 38,
      'ENTER': 13,
    }; //keycodes

    console.log(target);

    let resultItems = Array.from(target.children);
    console.log(resultItems);
    let action = Object.keys(keyCodes).find(key => keyCodes[key] === e.keycode);
    let activeItem = resultItems.filter(item => item.classList.contains('highlight'));

    switch(action) {
      case 'ARROW_DOWN' : //down
      case 'ARROW_UP' : //up
        if(!activeItem) {
          return resultItems[0].classList.add('hightlight');
        }

        const activeIndex = resultItems.indexOf(activeItem);
        return hightlightedItem(action, resultItems, activeItem, activeIndex);
      case 'ENTER' : //enter
        if(!activeItem) {
          activeItem = resultItems[0];
        }
        return activeItem.click();
      default :
      return ;
    }
  }
  


  setEvent() {
    //inputEvent

    this.addEvent('keyup', '.autocomplete-list', ({target}) => {
      handleInputEvents(target)
    })

    this.addEvent('.focusin', '.autocomplete-list', ({target}) => {
      handleInputEvents(target);
    })
  }
}