import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Cau hinh MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode='system'>
      <ConfirmProvider defaultOptions={{
        allowClose: false
      }}>
        <CssBaseline/>
        <App />
        <ToastContainer position='bottom-left' theme='colored' />
      </ConfirmProvider>
    </CssVarsProvider>
  // </React.StrictMode>
)
