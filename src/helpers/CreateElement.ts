export default class CreateElement {
    constructor(public tagName: string, public text = '', public className: string| string[] ) {
        this.tagName = tagName;
        this.text = text ? text : '';
        this.className = className
        // .join(' ').split(','); //почему то создавались через запятую без этого
    }

    getElement() {
        const element = document.createElement(`${this.tagName}`);
        if (typeof this.className === 'string') {
          element.classList.add(this.className)
        } else {
        this.className.forEach((n) => element.classList.add(n));
        }
        element.innerHTML = this.text;
        return element;
    }
}
