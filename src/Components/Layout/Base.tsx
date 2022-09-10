import ResponsiveAppBar from './AppBarComponet';
import Container from '@mui/material/Container';
import DropzoneContainer from '../Dropzone';
import TestDetails from '../TestDetails';
import { Route, Routes, useLocation } from "react-router-dom";
import DataList from '../DataList';
import PageHeading from './PageHeading';

export interface IPages {
    name: string,
    link:string
}

const pages = [{name: 'Details', link:''},{name:'Import', link:'uploadCsv'}, {name:'List',link:'list'}];
const Base = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const matchingPage = pages.filter(x => x.link.toString().includes(pathname.split("/")[1]));
    return (
        <div>
            <ResponsiveAppBar pages={pages} />  
            <Container>
                <PageHeading title={matchingPage[0].name} />
                <Container sx={{ marginTop: 5 }}>
                    <Routes>
                        <Route path="/uploadCsv" element={<DropzoneContainer />} />
                        <Route path="/list" element={<DataList />} />
                        <Route path="/" element={<TestDetails />} />
                    </Routes>
                </Container>
            </Container>          
            
        </div>
    )
};

export default Base;