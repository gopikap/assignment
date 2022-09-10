import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Base from './Components/Layout/Base';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
	palette: {
		primary: {
			main: '#0c0d26'
		},
		secondary: {
			main: '#1a1d63'
		},
	},
	typography: {
		// Tell Material-UI what's the font-size on the html element is.
		htmlFontSize: 18
	}
});
export const endPoint = 'http://localhost:3001';
function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className="App">			
					<Base />										
				</div>
			</BrowserRouter>			
		</ThemeProvider>
		
	);
}

export default App;
