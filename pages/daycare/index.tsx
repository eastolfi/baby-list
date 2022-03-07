import { useEffect, useState } from 'react';

import Divider from '@material-ui/core/Divider';

import Layout from '../../components/Layout';
import { TextField } from '@material-ui/core';

interface Data {
    firstNap: string;
    [key: string]: string;
}

export default function TaskListPage() {
    const [ firstNap, setFirstNap ] = useState('');
    const [ secondNap, setSecondNap ] = useState('');
    const [ firstMeal, setFirstMeal ] = useState('');
    const [ secondMeal, setSecondMeal ] = useState('');
    const [ ingredients, setIngredients ] = useState('');

    useEffect(() => {
        const i: Data = JSON.parse(localStorage.getItem('today') || '{}');

        setFirstNap(i.firstNap || '');
        setSecondNap(i.secondNap || '');
        setFirstMeal(i.firstMeal || '');
        setSecondMeal(i.secondMeal || '');
        setIngredients(i.ingredients || '');
    }, [])

    useEffect(() => {
        updateData('firstNap', firstNap)
    }, [ firstNap ])
    useEffect(() => {
        updateData('secondNap', secondNap)
    }, [ secondNap ])
    useEffect(() => {
        updateData('firstMeal', firstMeal)
    }, [ firstMeal ])
    useEffect(() => {
        updateData('secondMeal', secondMeal)
    }, [ secondMeal ])
    useEffect(() => {
        updateData('ingredients', ingredients)
    }, [ ingredients ])

    const updateData = (key: string, value: string) => {
        const i = JSON.parse(localStorage.getItem('today') || '{}');
        i[key] = value;
        localStorage.setItem('today', JSON.stringify(i))
    }

    return (
        <Layout>
            <div className="flex flex-col items-center">
                <TextField
                    id="outlined-basic"
                    label="Siesta 1"
                    variant="outlined"
                    type='time'
                    value={ firstNap }
                    onChange={ event => setFirstNap(event.target.value) } />
                
                <TextField
                    id="outlined-basic3"
                    label="Siesta 2"
                    variant="outlined"
                    type='time'
                    value={ secondNap }
                    onChange={ event => setSecondNap(event.target.value) } />
                    
                <TextField
                    id="outlined-basic2"
                    label="Comida 1"
                    variant="outlined"
                    type='time'
                    value={ firstMeal }
                    onChange={ event => setFirstMeal(event.target.value) } />

                <TextField
                    id="outlined-basic4"
                    label="Comida 2"
                    variant="outlined"
                    type='time'
                    value={ secondMeal }
                    onChange={ event => setSecondMeal(event.target.value) } />

                <TextField
                        id="outlined-multiline-static"
                        label="Alimentos"
                        multiline
                        rows={4}
                        defaultValue="Pollo Patatas Zanahoria"
                        value={ ingredients }
                        onChange={ event => setIngredients(event.target.value) } />

                {/* <TimePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /> */}

                <Divider className="w-full" variant="middle" />

                
            </div>
        </Layout>
    )
}
