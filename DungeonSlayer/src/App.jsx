import { BrowserRouter, Routes, Route } from "react-router-dom/dist";
import Menu from "./Menu/Menu";
import Game from "./Game/Game";
import HowToPlay from "./HowToPlay/HowToPlay";

export default function App()
{
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Menu/>}/>
                        <Route path="/Game"  element={<Game/>}/>
                        <Route path="/HowToPlay" element={<HowToPlay/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}