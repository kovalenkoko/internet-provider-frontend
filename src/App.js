import React, {useContext, useEffect, useState} from 'react'
import {Route, Routes} from "react-router";
import {ROUTES} from "./routes";
import "./App.css"
import { UserContext} from "./user-context";



function App() {

   // const {data, toggleData} = useContext(UserContext)
    const [data, toggleData] = useState(null)
    useEffect(() => {
        const storage = localStorage.getItem('data')
        if (storage) {
            toggleData(JSON.parse(storage))
        }
    }, [])
    return (
        <div className="App">
            <UserContext.Provider value={{data, toggleData}}>
                <Routes>
                    {ROUTES.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
