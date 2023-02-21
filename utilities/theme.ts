import {createTheme} from "@mui/material";

// This is just an example for now, customize this later as needed
declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

export const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});
