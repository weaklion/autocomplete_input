function updateAttributes(oldNode, newNode) {
  //달라지거나 추가된 props 반영
  for(const {name, value} of [...newNode.attributes]) {
    if(value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }

  //없어진 props 제거 
  for(const {name} of [ ...oldNode.attributes ]) {
    if(newNode.getAttribute(name) !== undefined) continue;
    oldNode.removeAttribute(name);
  }
}

// oldNode만 있는 경우(oldNode && !newNode)
// oldNode를 parent에서 제거한다.
// newNode만 있는 경우(!oldNode && newNode)
// newNode를 parent에 추가한다.
// oldNode와 newNode 모두 text 타입일 경우(typeof oldNode === "string" && typeof newNode === "string")
// oldNode의 내용과 newNode의 내용이 다르다면, oldNode의 내용을 newNode의 내용으로 교체한다.
// oldNode와 newNode의 태그 이름(type)이 다를 경우(oldNode.type !== newNode.type)
// 둘 중에 하나가 String일 경우에도 해당
// oldNode를 제거하고, 해당 위치에 newNode를 추가한다.
// oldNode와 newNode의 태그 이름(type)이 똑같을 경우(oldNode.type === newNode.type)
// newNode와 oldNode의 attribute를 비교하여 변경된 부분만 반영한다.
// oldNode의 attribute 중 newNode에 없는 것은 모두 제거한다.
// newNode의 attribute에서 변경된 내용만 oldNode의 attribute에 반영한다.
// newNode와 oldNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
export function updateElement(parent, newNode, oldNode) {
  // oldNode만 존재할시
  if(!newNode && oldNode) return oldNode.remove();
  //newNode만 존재할 시 
  if(newNode && !oldNode) return parent.appendChild(newNode);
  //oldNode와 newNode모두 text타입일 경우
  if(newNode instanceof Text && oldNode instanceof Text) {
    if(oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue
    return ;
  }
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode,index);
    return;
  }
  updateAttributes(oldNode, newNode);

  const newChildren = [ ...newNode.childNodes ];
  const oldChildren = [ ...oldNode.childNodes ];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for(let i=0; i< maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
  
}