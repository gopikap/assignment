import { Typography } from '@mui/material';

interface PageHeadingProps {
    title: string
}

function PageHeading(props:PageHeadingProps){
    return (
        <div style={{marginTop: 10}}>
            <Typography component="h1" variant='h4' color="secondary" >{props.title} </Typography>
        </div>
        
    )
}

export default PageHeading;