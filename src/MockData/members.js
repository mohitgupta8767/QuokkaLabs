let MEMBER_DATA = [
    {
        key: "GF4G1W",
        member_id: "GF4G1W",
        name: "Mohit Gupta",
        email: "mohit@example.com",
        address: "123 Church Road, Bengaluru",
        organization: "ABC Pvt Ltd",
        designation: "Software Engineer",
        contact: "9999999999",
        isBlock: false,
    },
    {
        key: "66ZKQF",
        member_id: "66ZKQF",
        name: "Ankit",
        email: "ankit@gmail.com",
        address: "456, Mg Road, Delhi",
        organization: "XYZ Inc",
        designation: "UI Designer",
        contact: "9639639632",
        isBlock: true
    },
]

export const LOGIN_CREDENTIALS = [{
    id: 1,
    email: "test@gmail.com",
    password: "Test@123"
}]

export const getMemberData = () => {
    return [...MEMBER_DATA];
}

export const setMembersData = (newMemberData) => {
    MEMBER_DATA = newMemberData;
}