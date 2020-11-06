import {fetchUtils} from 'react-admin';
import {stringify} from "query-string";


const apiUrl = "http://localhost:8080";
const httpClient = fetchUtils.fetchJson;


export const myDataProvider = {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage -1]),
            filter: JSON.stringify(params.filter)
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({json}) => (
            {
                data: json.content,
                total: parseInt(json.totalElements, 10)

            }));
    },
    getOne: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({headers, json}) => ({
            data: json
        }))
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({json}) => ({data: json}));
    },

    getManyReference: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({headers, json}) => ({
            data: json,
            total: parseInt(json.totalElements, 10)
        }));
    },

    update: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        }).then(() => ({
            data: {...params.data, id: ""}
        }))
    },
    create: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(() => ({
            data: {...params.data, id: ""}
        }))
    },
    delete: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data)
        }).then(() => ({
            data: {...params.data, id: ""}
        }))
    },

    deleteMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: "DELETE",
                    body: JSON.stringify(params.data)
                })
            )
        ).then(responses => ({
            data: responses.map(response => response.json)
        }))
    }
};

