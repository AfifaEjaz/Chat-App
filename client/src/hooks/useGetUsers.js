import { useEffect, useState } from "react"
import axios from 'axios'

const useGetAllUsers = () => {

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/allusers", { withCredentials: true })
        .then((json) => { setAllUsers(json.data.users) })
        .catch((err) => console.log(err.message))
    }, [])

    return {allUsers}
}
export default useGetAllUsers