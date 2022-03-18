import ContentLoader from 'react-content-loader'

const FormLoader = (props: any) => (
    <ContentLoader
        speed={2}
        width={340}
        height={84}
        viewBox='0 0 340 84'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        {...props}
    >
        <rect x='11' y='10' rx='0' ry='0' width='107' height='27' />
        <circle cx='154' cy='24' r='13' />
        <rect x='11' y='53' rx='0' ry='0' width='107' height='27' />
        <circle cx='154' cy='67' r='13' />
    </ContentLoader>
)

export default FormLoader
