class Model {
    private static url: string = 'http://127.0.0.1:3000';
    static errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }
    async fetchData(source: string) {
        let url = Model.url;
        console.log(url);

        url = `${url}/${source}`;

        console.log(url);

        const response = await fetch(url);
        if (response.ok) {
            // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            const json = await response.json();
            return json;
        } else {
            Model.errorHandler(response);
        }
    }

    async getData(source: string) {
        return await this.fetchData(source);
    }
}

export default Model;
