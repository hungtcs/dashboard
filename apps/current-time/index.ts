declare function onDestroy(callback: () => void): void;
declare function getContanerElement(): HTMLElement;

class CurrentTime {
  private readonly container = getContanerElement();

  constructor() {
    this.container.innerText = new Date().toLocaleString();
    const timer = setInterval(() => {
      this.container.innerText = new Date().toLocaleString();
    }, 1000);

    onDestroy(() => {
      console.log('clear interval');
      window.clearInterval(timer);
    });
  }

}

export default CurrentTime;
