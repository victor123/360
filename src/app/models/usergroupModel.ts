export class UserRolegroup {
    id:any;
    reminderModule:string;
    groupname: string;
    email:string;
    GroupName:string;
    active:any;
    module:string;
    usergroup:string;
    GroupDescription:string;
    role:Role[];
    groupAdmin:GroupAdmin[];

}

export class Role {
    User: any;
}

export class GroupAdmin {
    Admin:any
}
