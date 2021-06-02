export class Languages {
    public label: string;
    public code: string;

    constructor(label: string, code: string) {
        this.label = label;
        this.code = code;
    }
    public static get ES(): Languages { return langES; };
    public static get FR(): Languages { return langFR; };

    public static findBy(label: string): Languages {
        return [langES, langFR].find((lang: Languages) => lang.label === label) || langES;
    }
}

const langES = new Languages('ES', 'esES');
const langFR = new Languages('FR', 'frFR');
