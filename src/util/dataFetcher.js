import axios from 'axios'



export async function getDataFromDB(url, federalState) {
    try {


        // Create a query object if federalState is provided or use Berlin as a default
        const query = federalState ? { state: federalState } : { state : "Berlin"};

        // Construct the query string from the query object
        const queryString = new URLSearchParams(query).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await axios.get(fullUrl);
        //console.log('response.data', response.data)
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



