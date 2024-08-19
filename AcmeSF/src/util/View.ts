export class View {
    private id: string;
    private parentTag: string;

    constructor(id: string, parentTag: string = 'main') {
        this.id = id;
        this.parentTag = parentTag;
    }

    public async load(): Promise<void> {
        const element = <HTMLElement> document.querySelector(this.parentTag);

        const html = await fetch(`/src/${this.id}/${this.id}.html`);
    
        element.innerHTML = await html.text();

        await import(`../${this.id}/${this.id}.css`);
    }

    public alert(message: string, type: string, shouldDisapear: boolean = true): void {
        const alertContainer = <HTMLElement> document.querySelector('#alert-container');
        
        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add(`alert-${type}`);

        alert.innerText = message;

        alertContainer.appendChild(alert);
        
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
                }, 550);
            }, 1500);
        }
    }
    
}