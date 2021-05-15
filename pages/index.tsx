import Layout from '../components/Layout'
import type { TypeA } from '../types'

const Example: TypeA = {
    name: 'next',
}

export default function Home() {
    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>
                    <p>{Example.name}</p>
                </h1>
            </div>
        </Layout>
    )
}
