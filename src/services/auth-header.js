export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user')); // get user

    if (user && user.accessToken) {

        return { 'x-access-token': user.accessToken };
    }
    else {
        return {}
    }
}