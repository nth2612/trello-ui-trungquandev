import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  // direction: 'rtl',
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
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
      palette: {
        primary: teal,
        secondary: deepOrange
      }
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
      palette: {
        primary: cyan,
        secondary: orange
      }
      // spacing: (factor) => `${0.25 * factor}rem`
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root : {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel : {
      styleOverrides: {
        root : ({theme}) =>{
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({theme}) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline' : {
              borderColor: theme.palette.primary.light
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline' : {
                borderColor: theme.palette.primary.light
              }
            },
            '& fieldset': {
              borderWidth: '1px !important'
            }
          }
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
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover' : {
            backgroundColor: '#00b894',
            borderRadius: '8px'
          }
        }
      }
    }
  }
})

export default theme