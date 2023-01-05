class Observer {
  constructor() {
    this.entries = {};
    const config = {
      root: document.getElementById('calendar'),
      threshold: 0.9,
    };
    this.observer = new IntersectionObserver(this.onIntersection, config);
  }

  checkEntry = (entry) => {
    if (!entry.isIntersecting) {
      const id = Number(entry.target.id);
      const callback = this.entries[id];
      const newId = entry.boundingClientRect.x > 0 ? id - 1 : id + 1;
      callback(newId);
    }
  };

  onIntersection = (entries) => {
    entries.forEach(this.checkEntry);
  };

  addEntry = (element, callback) => {
    this.entries[element.id] = callback;
    this.observer.observe(element);
  };
}

export default new Observer();
