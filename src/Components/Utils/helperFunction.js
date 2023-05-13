const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const generateMemberId = () => {
    const randomString = generateRandomString(6);
    // const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return randomString;
}

export const getLoggedInUser = () => {
    const currentUser = localStorage.getItem("currentUser")
    return (currentUser ? JSON.parse(currentUser) : {})
}

export const setLoginUser = (userObj) => {
    localStorage.setItem("currentUser", JSON.stringify(userObj))
}
