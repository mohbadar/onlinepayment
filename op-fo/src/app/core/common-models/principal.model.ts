export class Principal {
    authenticated: Promise<boolean>;
    public authorities: Authority[] = [];
    public credentials: any;
 
    constructor(authenticated: Promise<boolean>, authorities: any[], credentials: any) {
        this.authenticated = authenticated;
        authorities.map(
            authority => this.authorities.push(new Authority(authority)))
        this.credentials = credentials;
    }
 
    isAdmin() {
        return this.authorities.some(
          (auth: Authority) => auth.authority.indexOf('ADMIN') > -1)
    }

	hasAuthority(requestAuthArray: Array<string>) {
        // requestAuthArray.every(reqAuth =>{
        //     if(!this.authorities.includes(new Authority(reqAuth))){
        //         return false;
        //     }
        // })
        // return true;
		return requestAuthArray.every((a) => {
			return this.authorities.some((auth: Authority) => auth.authority.indexOf(a) > -1)
		});
	}
}
 
export class Authority {
    public authority: String;
 
    constructor(authority: String) {
        this.authority = authority;
    }
}
