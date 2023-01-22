export default class CreateSVG {
    getSVG(color:string, id:number) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('icon');
        svg.classList.add('icon' + id);
        svg.setAttribute('style', `fill:${color};`);
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#1');
        svg.appendChild(use);
        return svg;
    }
}
