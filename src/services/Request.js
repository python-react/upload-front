
export default class Request {
    uploadFile = (file) => {
        const formData = new FormData()
        formData.append('file', file)

        return fetch('http://localhost:5000', {
            method: 'post',
            body: formData,
        });

    }
}

