import React from 'react';
import ReactDOM from 'react-dom/client';
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import Error from "./components/Error";


const router = createMemoryRouter([
    {
        path: "/key",
        element: <UseYourKey/>,
        errorElement: <Error/>
    },
    {
        path: "/",
        element: <App/>,
        loader: async () => {
            const {key} = await chrome.storage.sync.get(["key"])
            if (!key) {
                return redirect("/key")
            }
            return json({key})
        },
        errorElement: <Error/>
    },
    {
        path: "/error",
        element: <Error/>
    }
])

const index = document.createElement('div');
index.id = 'index';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <RouterProvider router={router}/>
);