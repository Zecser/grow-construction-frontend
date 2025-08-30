import { useEffect, useState } from "react"
import api from "../../../lib/api"
import swal from 'sweetalert';
const useFetchImages = () => {
    const [fetchDatas, setFetchDatas] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await api.get('/gallery')
                setFetchDatas(response.data)
            } catch (error: any) {
                swal(error.response?.data.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    return { fetchDatas,isLoading }
}

export default useFetchImages