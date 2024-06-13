import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEIGHT_HEADER = '50px'
const COLUMN_HEIGHT_FOOTER = '56px'

// Create a theme instance.
const theme = extendTheme({
  // direction: 'rtl',
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEIGHT_HEADER,
    columnFooterHeight: COLUMN_HEIGHT_FOOTER
  },
  colorSchemes: {
    light: {
      // palette: { Mycustom
      //   primary: {
      //     main: '#0f0f0f'
      //   },
      //   secondary: deepOrange,
      //   background: {
      //     default: '#ffffff'
      //   }
      // }
      // palette: {
      //   primary: teal,
      //   secondary: deepOrange
      // }
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      // palette: { Mycustom
      //   primary: {
      //     main: '#f1f1f1'
      //   },
      //   secondary: orange,
      //   background: {
      //     default: '#0f0f0f'
      //   }
      // }
      // palette: {
      //   primary: cyan,
      //   secondary: orange
      // }
      // spacing: (factor) => `${0.25 * factor}rem`
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root : {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover' : {
            borderWidth: '1px'
          }
        }
      }
    },
    MuiInputLabel : {
      styleOverrides: {
        // root : ({theme}) =>{
        //   return {
        //     // color: theme.palette.primary.main,
        //     fontSize: '0.875rem'
        //   }
        // }
        root : {
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // root: ({theme}) => {
        //   return {
        //     // color: theme.palette.primary.main,
        //     fontSize: '0.875rem',
        //     // '.MuiOutlinedInput-notchedOutline' : {
        //     //   borderColor: theme.palette.primary.light
        //     // },
        //     // '&:hover': {
        //     //   '.MuiOutlinedInput-notchedOutline' : {
        //     //     borderColor: theme.palette.primary.light
        //     //   }
        //     // },
        //     '& fieldset': { borderWidth: '0.5px !important' },
        //     '&:hover fieldset, &.Mui-focused fieldset' : { borderWidth: '1px !important' }
        //   }
        // }
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset, &.Mui-focused fieldset' : { borderWidth: '1px !important' }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar' : {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb' : {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover' : {
            backgroundColor: '#f1f1f1',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides : {
        root: {
          '&.MuiTypography-body1' : { fontSize : '0.875rem' }
        }
      }
    }
  }
})

export default theme