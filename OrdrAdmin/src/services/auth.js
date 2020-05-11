import api from './api';
export async function signIn(email, password){
    const user = await api.get(`/user?email=${email}&senha=${password}`);
    return user.data;
}