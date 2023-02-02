import axios from 'axios';

enum HTTPMethods {
	Post = 'POST',
	Get = 'GET',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE'
}

export type AxiosOptions = { [key: string]: any };

const handlerFactory = () => {
	const handle = (method: HTTPMethods) => async (url: string, options?: AxiosOptions) =>
		axios({
			url,
			method,
			...options
		}).then((res) => res.data);

	return {
		post: handle(HTTPMethods.Post),
		get: handle(HTTPMethods.Get),
		put: handle(HTTPMethods.Put),
		patch: handle(HTTPMethods.Patch),
		destroy: handle(HTTPMethods.Delete)
	};
};

export default handlerFactory();
