export default class CreateElement {
    constructor(public tagName: string, public text = '', public className: string ) {
        this.tagName = tagName;
        this.text = text ? text : '';
        this.className = className
        // .join(' ').split(','); //почему то создавались через запятую без этого
    }

    getElement() {
        const element = document.createElement(`${this.tagName}`);
        element.classList.add(this.className)
        // this.className.forEach((n) => element.classList.add(n));
        element.innerHTML = this.text;
        return element;
    }
}
