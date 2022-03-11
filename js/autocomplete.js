let moives = [];
let timer ;
const moivesListElement = document.querySelector('.autocomplete-list');
const moivesInputElement = document.querySelector('.autocomplete-input');


function fetchMovies(value) {
  fetch(`https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=${value}`)
  .then((res) => res.json())
  .then((data) => {
    movies = data.map(el => el.text);
    loadData(movies, moivesListElement);
  })
}

function loadData(data, element) {
  if(data) {
    element.innerHTML = '';
    let innerElement = '';
    data.forEach((item) => {
      innerElement += `
        <li className="list-item" >${item}</li>
      `;
    })

    element.innerHTML = innerElement;
  }
}

function hightlightedItem(action, resultItems, activeItem, activeIndex ) {
  if((resultItems.length === (activeIndex + 1)) &&  action === 'ARROW_DOWN'  //마지막에서 down
      || (activeIndex === 0 && action === 'ARROW_UP')) {
      return true;
    }
  
    let newIndex = action === 'ARROW_UP' ?  activeIndex - 1 : activeIndex + 1;

    activeItem.classList.remove('highlight');

    return resultItems[newIndex].classList.add('highlight');
}


function filterData(data, searchText) {
  return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
}

const handleInputEvents = ((e) => {

  let keyCodes = {
    'ARROW_DOWN': 40,
    'ARROW_UP': 38,
    'ENTER': 13,
    'ESC': 27
  }; //keycodes


  let resultItems = Array.from(moivesListElement.children);
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
})


moivesInputElement.addEventListener("input", function() {
  if(timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => { //debouncing
    fetchMovies(moivesInputElement.value);
    const filteredData = filterData(movies, moivesInputElement.value);
    loadData(filteredData, moivesListElement);
  }, 300);
})

moivesInputElement.addEventListener('keyup', (e) => (
  handleInputEvents(e)
))

moivesInputElement.addEventListener('focusin', (e) => (
  handleInputEvents(e)
))



// moivesInputElement.addEventListener('focusout', (e) => (
//   handleInputEvents(e)
// ))

