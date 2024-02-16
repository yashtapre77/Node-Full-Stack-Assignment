import querystring from 'querystring';
import fetch from 'node-fetch';

const baseUrl = 'https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6';

let recordList = [];

const createRequestUrl = (offset) => {
    const parameters = {
        'api-key': '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
        format: 'json',
        offset,
        limit: 10,
        'filters[deliverystatus]': 'Delivery',
        'filters[divisionname]': 'Nagpur City',
    };
    return baseUrl + '?' + querystring.stringify(parameters);
};

const fetchData = (requestUrl) => {
    console.log("Fetching data from:", requestUrl); 
    return fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data); 
            return data; 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; 
        });
};

const processDataAndPrint = (dataArray) => {
    recordList = dataArray.reduce((acc, data) => [...acc, ...data.records], []);
    console.log(`Total records received: ${recordList.length}`);
    const pincodeList = recordList.map(record => ({
        pincode: record.pincode,
        name: record.officename,
    }));
    console.log(pincodeList);
};

const fetchSpecificOffsets = () => {
    const offsets = [31, 51, 61];
    const fetchPromises = offsets.map(offset => fetchData(createRequestUrl(offset)));
    Promise.all(fetchPromises)
        .then(processDataAndPrint)
        .catch(error => console.error('Error fetching data:', error));
};

fetchSpecificOffsets();