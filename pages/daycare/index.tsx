import { useEffect, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';

import Layout from '../../components/Layout';

class DaycareData {
    public static currentVersion = '0.0.1';

    public version: string;
    public firstNap: string;
    public secondNap: string;
    public firstMeal: string;
    public secondMeal: string;
    public ingredients: string;

    constructor(data: { [key: string]: string; }) {
        this.version = data['version'] || '';
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
        const current = this.version;
        const next = DaycareData.currentVersion;

        if (this.shouldMigrate()) {
            if (current === '') {
                if (next === '0.0.1') {
                    this.migrate000To001();
                }
            }

            this.save();
        }
    }

    public save(): void {
        localStorage.setItem('today', JSON.stringify(this))
    }

    private shouldMigrate(): boolean {
        return DaycareData.currentVersion !== this.version;
    }

    private migrate000To001(): void {
        this.migrateVersion();
    }

    private migrateVersion(): void {
        this.version = DaycareData.currentVersion;
    }
}

export default function DaycarePage() {
    const [ currentDay, setCurrentDay ] = useState('2022-03-08');
    const [ firstNap, setFirstNap ] = useState('');
    const [ secondNap, setSecondNap ] = useState('');
    const [ firstMeal, setFirstMeal ] = useState('');
    const [ secondMeal, setSecondMeal ] = useState('');
    const [ ingredients, setIngredients ] = useState('');
    
    const ingredientsList = ['Pollo', 'Ternera', 'Pescado', 'Patatas', 'Zanahoria', 'Brocoli', 'Judías Verdes', 'Espinacas', 'Yogurt'];
    const selectedIngredients = ingredients.split('\n');

    useEffect(() => {
        const { version, firstNap, secondNap, firstMeal, secondMeal, ingredients } = DaycareData.load();

        DaycareData.updateData('version', version)

        setFirstNap(firstNap);
        setSecondNap(secondNap);
        setFirstMeal(firstMeal);
        setSecondMeal(secondMeal);
        setIngredients(ingredients);
    }, [])

    useEffect(() => {
        DaycareData.updateData('firstNap', firstNap)
    }, [ firstNap ])
    useEffect(() => {
        DaycareData.updateData('secondNap', secondNap)
    }, [ secondNap ])
    useEffect(() => {
        DaycareData.updateData('firstMeal', firstMeal)
    }, [ firstMeal ])
    useEffect(() => {
        DaycareData.updateData('secondMeal', secondMeal)
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
                    <div className="w-1/4">
                        <TextField
                            id="currentDay"
                            label="Día"
                            variant="outlined"
                            className='w-full'
                            type='date'
                            value={ currentDay }
                            onChange={ event => setCurrentDay(event.target.value) } />
                    </div>

                    <Divider className="w-full my-5" variant="middle" />
                </div>

                <div className="flex flex-row w-full gap-3">
                    <div className="w-1/2">
                        <TextField
                            id="firstNap"
                            label="Siesta 1"
                            variant="outlined"
                            className='w-full'
                            type='time'
                            value={ firstNap }
                            onChange={ event => setFirstNap(event.target.value) } />
                    </div>

                    <div className="w-1/2">
                        <TextField
                            id="secondNap"
                            label="Siesta 2"
                            variant="outlined"
                            className='w-full'
                            type='time'
                            value={ secondNap }
                            onChange={ event => setSecondNap(event.target.value) } />
                    </div>
                </div>
                
                <div className="flex flex-row w-full gap-3">
                    <div className="w-1/2">
                        <TextField
                            id="firstMeal"
                            label="Comida 1"
                            variant="outlined"
                            className='w-full'
                            type='time'
                            value={ firstMeal }
                            onChange={ event => setFirstMeal(event.target.value) } />
                    </div>

                    <div className="w-1/2">
                        <TextField
                            id="secondMeal"
                            label="Comida 2"
                            variant="outlined"
                            className='w-full'
                            type='time'
                            value={ secondMeal }
                            onChange={ event => setSecondMeal(event.target.value) } />
                    </div>
                </div>

                {/* <TimePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /> */}

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
