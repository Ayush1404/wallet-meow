import { RecoilRoot } from 'recoil'
import './App.css'
import Wallet from './components/Wallet'
import SheetProvider from './components/SheetProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RecoilRoot >
    <SheetProvider />
      <ToastContainer 
        position='bottom-left'
      />
      <Wallet />
    </RecoilRoot>
  )
}

export default App