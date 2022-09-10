import { Card, CardContent, List, ListItem, ListItemText, Typography, } from '@mui/material';

const TestDetails = () => {
    const points = [
        'The frontend will have a drag and drop box - to drag csv',
        'The csv file for example can have two columns: name and age',
        'The csv file that the user dragged in will be uploaded to the server and get processed by the backend',
        'Store the parsed data to backend',
        'Show the list of inserted data'
    ];
    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Assignment
                </Typography>
                <List dense={true} sx={{fontSize:15}}>
                    {
                        points.map((eachPoint, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={eachPoint}
                                    />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </CardContent>
        </Card>
    )
}

export default TestDetails;