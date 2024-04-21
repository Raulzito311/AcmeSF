export class View {
    private id: string;

    constructor(id: string) {
        this.id = id;

        this.load();
    }

    protected async load(): Promise<void> {
        const main = document.querySelector('main')!;

        const html = await fetch(`/src/${this.id}/${this.id}.html`);
    
        main.innerHTML = await html.text();

        await import(`../${this.id}/${this.id}.css`);
    }
    
}