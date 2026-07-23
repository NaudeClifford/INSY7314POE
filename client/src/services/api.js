import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api"
});

import { useEffect } from "react";
import api from "./services/api";

function App() {

    useEffect(() => {

        api.get("/users")
            .then(res => console.log(res.data));

    }, []);

    return (
        <h1>MERN Application</h1>
    );
}

export default App;