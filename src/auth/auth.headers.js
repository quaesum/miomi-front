export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return { Authorization: user.data,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            };
    } else {
        return {};
    }
}

export const authHeaderPhoto = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return { Authorization: user.data, 
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': 'http://localhost:3000' };
    } else {
        return {};
    }
}