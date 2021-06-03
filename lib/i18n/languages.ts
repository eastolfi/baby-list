export class Languages {
    public label: string;
    public code: string;

    constructor(label: string, code: string) {
        this.label = label;
        this.code = code;
    }
    public static get ES(): Languages { return langES; };
    public static get FR(): Languages { return langFR; };

    public static findByCode(code: string): Languages {
        return [langES, langFR].find((lang: Languages) => lang.code === code) || langES;
    }
    public static findByLabel(label: string): Languages {
        return [langES, langFR].find((lang: Languages) => lang.label === label) || langES;
    }

    public static fromNavigator(): string {
        const lang = navigator.language.split('-')[0];

        if (lang === 'fr') {
            return 'FR';
        } else {
            return 'ES';
        }
    }
}

const langES = new Languages('ES', 'esES');
const langFR = new Languages('FR', 'frFR');
