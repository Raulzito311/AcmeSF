export class View {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    public async load(): Promise<void> {
        const main = <HTMLElement> document.querySelector('main');

        const html = await fetch(`/src/${this.id}/${this.id}.html`);
    
        main.innerHTML = await html.text();

        await import(`../${this.id}/${this.id}.css`);
    }

    public alert(message: string, type: string, shouldDisapear: boolean = true): void {
        const main = <HTMLElement> document.querySelector('main');
        
        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add(`alert-${type}`);

        alert.innerText = message;

        main.appendChild(alert);

        
        if (shouldDisapear) {
            setTimeout(() => {
                alert.style.opacity = '1';
                const fadeEffect = setInterval(() => {
                    if (Number(alert.style.opacity) < 0.1) {
                        clearInterval(fadeEffect);
                    } else {
                        alert.style.opacity = (Number(alert.style.opacity) - 0.1).toString();
                    }
                }, 50);
                setTimeout(() => {
                    alert.remove();
                }, 600);
            }, 2500);
        }
    }
    
}