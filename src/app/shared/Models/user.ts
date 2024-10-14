export class User {

    name: string;
    email: string;
    mobileNumber: number;
    password: string;
    accountStatus ?: string;
    img ?: File;



    constructor(name: string, email: string, mobileNumber: number, password: string) {
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
    }
}