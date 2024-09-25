export class User {

    name: string;
    email: string;
    mobileNumber: number;
    password: string;
    accountStatus : string = "ACTIVE";


    constructor(name: string, email: string, mobileNumber: number, password: string) {
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
        // this.accountStatus = accountStatus;
    }


    // displayInfo(): void {
    //     console.log(`Name: ${this.name}`);
    //     console.log(`Email: ${this.email}`);
    //     console.log(`Phone: ${this.mobileNumber}`);
    // }
}