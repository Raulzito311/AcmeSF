export class Cookie {
    static find(name: string): string|null {
        console.log('cookie: ' + document.cookie);

        const decodedCookie = decodeURIComponent(document.cookie);

        console.log('decoded cookie: ' + decodedCookie);
        
        // const ca = decodedCookie.split(';');
        // for (let i = 0; i < ca.length; i++) {
        //     let c = ca[i];
        //     while (c.charAt(0) == ' ') {
        //         c = c.substring(1);
        //     }
        //     if (c.indexOf(name) == 0) {
        //         return c.substring(name.length, c.length);
        //     }
        // }

        return null;
    }
}