export default class Dom {
  static getElementByTemplate(template) {
    if (template) {
      const div = document.createElement('div');
      div.innerHTML = template;

      return div.childNodes[0];
    }
    return null;
  }
}



// function getDocumentFragment() {
//   return new DocumentFragment();
// }
