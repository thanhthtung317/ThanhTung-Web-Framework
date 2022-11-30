import { Model } from '../models/Model';
type HasId = {
  id?: number;
};

export abstract class View<T extends Model<K>, K extends HasId> {
  constructor(protected parent: Element, protected model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regions: { [key: string]: Element } = {};

  regionsMap(): { [key: string]: string } {
    return {};
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');

    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
    
    this.parent.append(templateElement.content);
  }
}
