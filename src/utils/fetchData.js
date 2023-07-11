
export const exerciseOption = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '89543416a7msh8c3aab897df4e94p1bfee6jsn950540d61ab4',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};


export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}