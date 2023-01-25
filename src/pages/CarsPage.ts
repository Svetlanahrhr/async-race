import Cars from '../main/Cars';
import CreateElement from '../helpers/CreateElement';
import Model from '../model';
interface ICar {
  color: string;
  id: number;
  name: string;
}

export default class CarsPage {
  private pageNumber: number = 1;

  async render(){
    const wrapper = new CreateElement('div', '', 'wrapper').getElement();

    const inputCreate = new CreateElement('input', '', ['input-color','create']).getElement()
    inputCreate.id = 'create'
    const inputColorCreate = new CreateElement('input', '', 'input-color').getElement() as HTMLInputElement;
    inputColorCreate.id = 'createColor'
    const inputUpdate = new CreateElement('input', '', 'input-color').getElement()
    const inputColorUpdate = new CreateElement('input', '', 'update-color').getElement() as HTMLInputElement;
    inputUpdate.id = 'update'
    inputColorCreate.type = 'color';
    inputColorUpdate.type = 'color';
    const createBtn = new CreateElement('button', 'create', ['btn','create-btn']).getElement();
    const updateBtn = new CreateElement('button', 'update', ['update','btn','update-btn',]).getElement() as HTMLInputElement;
    updateBtn.disabled = true;
    const br = new CreateElement('br', '', 'br').getElement();

    const startRaceBtn = new CreateElement('button', 'Start Race', ['start-race',]).getElement() as HTMLButtonElement;



    wrapper.append(inputCreate)
    wrapper.append(inputColorCreate)
    wrapper.append(createBtn)
    wrapper.append(br)
    wrapper.append(inputUpdate)
    wrapper.append(inputColorUpdate)
    wrapper.append(updateBtn)
    wrapper.append(startRaceBtn)

    const {counCars} = await new Cars(wrapper).getCars(this.pageNumber);

    const h2= new CreateElement('h2', `Garage (${counCars})`, 'title').getElement();
    const h3 = new CreateElement('h3', `Page number #${this.pageNumber}`, 'title').getElement();
    wrapper.prepend(h3)
    wrapper.prepend(h2)

    const prevBtn = new CreateElement('button', 'prev', ['prev-btn','btn-action']).getElement();
    const nextBtn = new CreateElement('button', 'next', ['next-btn', 'btn-action']).getElement();

    wrapper.append(prevBtn)
    wrapper.append(nextBtn)

    return wrapper;
  }
}
