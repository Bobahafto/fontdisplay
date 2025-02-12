import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Graber from '../components/1Graber.jsx'
import Wagenburg from '../components/2Wagenburg.jsx'
import Trigon from '../components/4Trigon.jsx'
import Lausans from '../components/5Lausans.jsx'
import Übung from '../components/FontÜbung.jsx'
import Fructure from '../components/3Fructure.jsx'
import Noodels from '../components/6Noodels.jsx'
import ScrollingText from '../components/InfoSite1.jsx'
import InteractiveAlphabet from '../components/TextInfo.jsx'
import Katan from'../components/7Katan.jsx'
import Trapster from '../components/8Trapster.jsx'
import Alchemo from '../components/9Alchemo.jsx'
import Pixel from '../components/10Pixel.jsx'
import Gtex from '../components/11Gtex.jsx'
import Napoligon from '../components/12Napoligon.jsx'
import Ekmek from '../components/13Ekmek.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Graber />
    <Wagenburg />
    <Fructure />
    <Trigon />
    <Lausans />
    <Noodels />
    <Katan />
    <Trapster />
    <Alchemo />
    <Pixel />
    <Gtex />
    <Napoligon />
    <Ekmek />




  
  </StrictMode>,
)
