import { useEffect, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import format from 'date-fns/format'; 
import parse from 'date-fns/parse'; 

import Layout from '../../components/Layout';

const parseDateTime = (time: string) => {
    if (!time) return null;

    const [ hours, mins ] = time.split(':');
    const d = new Date();
    d.setHours(+hours, +mins);
    return d;
}
const parseDate = (date: string): Date | null => {
    if (!date) return null;

    return parse(date, 'dd/MM/yyyy', new Date());
}
const formatDateTime = (date: Date | null): string => {
    return date ? format(date, 'HH:mm') : ''
}
const formatDate = (date: Date | null): string => {
    return date ? format(date, 'dd/MM/yyyy') : ''
}

class DaycareData {
    public static currentVersion = '0.0.2';
    public static versions = ['0.0.1', '0.0.2']

    public version: string;
    public date: string;
    public firstNap: string;
    public secondNap: string;
    public firstMeal: string;
    public secondMeal: string;
    public ingredients: string;

    constructor(data: { [key: string]: string; }) {
        this.version = data['version'] || '';
        this.date = data['date'] || '';
        this.firstNap = data['firstNap'] || '';
        this.secondNap = data['secondNap'] || '';
        this.firstMeal = data['firstMeal'] || '';
        this.secondMeal = data['secondMeal'] || '';
        this.ingredients = data['ingredients'] || '';

        this.migrate();
    }

    public static load(): DaycareData {
        const i: { [key: string]: string; } = JSON.parse(localStorage.getItem('today') || '{}');

        return new DaycareData(i);
    }

    public static updateData(key: string, value: string): void {
        const data = DaycareData.load();

        (data as any)[key] = value;

        data.save();
    }

    public migrate(): void {
        DaycareData.versions.forEach(nextVersion => {
            if (this.shouldMigrate()) {
                if (this.version === '' && nextVersion === '0.0.1') {
                    this.migrate000To001();
                } else if (this.version === '0.0.1' && nextVersion === '0.0.2') {
                    this.migrate001To002();
                }
    
                this.migrateVersion(nextVersion);
            }
        })

        this.save();
    }

    public save(): void {
        localStorage.setItem('today', JSON.stringify(this))
    }

    private shouldMigrate(): boolean {
        return DaycareData.currentVersion !== this.version;
    }

    private migrate000To001(): void {
        // Do nothing, its just for setting the initial version
    }

    private migrate001To002(): void {
        this.date = formatDate(new Date())
    }

    private migrateVersion(version: string): void {
        this.version = version;
    }
}

export default function DaycarePage() {
    const [ currentDay, setCurrentDay ] = useState(new Date() as Date | null);
    const [ firstNap, setFirstNap ] = useState(null as Date | null);
    const [ secondNap, setSecondNap ] = useState(null as Date | null);
    const [ firstMeal, setFirstMeal ] = useState(null as Date | null);
    const [ secondMeal, setSecondMeal ] = useState(null as Date | null);
    const [ ingredients, setIngredients ] = useState('');
    
    const ingredientsList = ['Pollo', 'Ternera', 'Pescado', 'Patatas', 'Zanahoria', 'Brocoli', 'Judías Verdes', 'Espinacas', 'Yogurt'];
    const selectedIngredients = ingredients.split('\n');

    useEffect(() => {
        const { version, date, firstNap, secondNap, firstMeal, secondMeal, ingredients } = DaycareData.load();

        DaycareData.updateData('version', version)

        setCurrentDay(parseDate(date));
        setFirstNap(parseDateTime(firstNap));
        setSecondNap(parseDateTime(secondNap));
        setFirstMeal(parseDateTime(firstMeal));
        setSecondMeal(parseDateTime(secondMeal));
        setIngredients(ingredients);
    }, [])

    useEffect(() => {
        DaycareData.updateData('date', formatDate(currentDay))
    }, [ currentDay ])
    useEffect(() => {
        DaycareData.updateData('firstNap', formatDateTime(firstNap))
    }, [ firstNap ])
    useEffect(() => {
        DaycareData.updateData('secondNap', formatDateTime(secondNap))
    }, [ secondNap ])
    useEffect(() => {
        DaycareData.updateData('firstMeal', formatDateTime(firstMeal))
    }, [ firstMeal ])
    useEffect(() => {
        DaycareData.updateData('secondMeal', formatDateTime(secondMeal))
    }, [ secondMeal ])
    useEffect(() => {
        DaycareData.updateData('ingredients', ingredients)
    }, [ ingredients ])

    const updateIngredients = (ingredient: string, added: boolean) => {
        setIngredients((current: string) => {
            const values = current.split('\n');

            if (added) {
                values.push(ingredient);
            } else {
                const position = values.indexOf(ingredient);
                values.splice(position, 1);
            }

            return values.join('\n');
        })
    }

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <div className="flex flex-row flex-wrap justify-center w-full gap-3">
                    <div className="sm:w-full">
                        <KeyboardDatePicker
                            id="currentDay"
                            variant="dialog"
                            margin="normal"
                            label="Día"
                            className='w-full'
                            format="dd/MM/yyyy"
                            value={currentDay}
                            onChange={ event => setCurrentDay(event as Date) }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </div>

                    <Divider className="w-full my-5" variant="middle" />
                </div>

                <div className="flex flex-row w-full gap-3">
                    <div className="w-1/2">
                        <KeyboardTimePicker
                            margin="normal"
                            id="firstNap"
                            label="Siesta 1"
                            value={firstNap}
                            onChange={ event => setFirstNap(event as Date) }
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }} />
                    </div>

                    <div className="w-1/2">
                        <KeyboardTimePicker
                            margin="normal"
                            id="secondNap"
                            label="Siesta 2"
                            value={secondNap}
                            onChange={ event => setSecondNap(event as Date) }
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }} />
                    </div>
                </div>
                
                <div className="flex flex-row w-full gap-3">
                    <div className="w-1/2">
                        <KeyboardTimePicker
                            margin="normal"
                            id="firstMeal"
                            label="Comida 1"
                            value={firstMeal}
                            onChange={ event => setFirstMeal(event as Date) }
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }} />
                    </div>

                    <div className="w-1/2">
                        <KeyboardTimePicker
                            margin="normal"
                            id="secondMeal"
                            label="Comida 2"
                            value={secondMeal}
                            onChange={ event => setSecondMeal(event as Date) }
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }} />
                    </div>
                </div>

                <Divider className="w-full my-5" variant="middle" />

                <div className="flex flex-row justify-between flex-wrap gap-3 w-full">
                    {ingredientsList.map((ingredient: string) => {
                        // Change to chips?
                        const selected = selectedIngredients.indexOf(ingredient) !== -1;
                        return (<div className='' key={ingredient}>
                            <ToggleButton
                                value={ ingredient }
                                selected={ selected }
                                onChange={() => {
                                    updateIngredients(ingredient, !selected);
                                }}
                            >
                                { ingredient }
                            </ToggleButton>
                        </div>)
                    })}
                </div>
            </div>
        </Layout>
    )
}
