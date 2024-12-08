export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return { Authorization: user.data,
            };
    } else {
        return {};
    }
}

export const authHeaderPhoto = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return { Authorization: user.data,
        "Content-Type": "multipart/form-data" };
    } else {
        return {};
    }
}