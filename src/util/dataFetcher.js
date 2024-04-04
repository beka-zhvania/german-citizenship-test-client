import axios from 'axios'



export async function getDataFromDB(url) {
    try {
        const response = await axios.get(url);
        console.log('response.data', response.data)//TODO:DELETE
        return response.data; 
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
}

export async function postDataToDB(url, data) {
    try {
        const response = await axios.post(url, data);
        console.log("posting", data, "to", url)//TODO:DELETE
        return response.data; 
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; 
    }
}



