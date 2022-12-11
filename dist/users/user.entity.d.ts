export declare type PasswordLessUser = Omit<User, "password">;
export declare enum UserRole {
    EMPLOYEE = "Employee",
    ADMIN = "Admin",
    PROJETCTMANAGER = "ProjectManager"
}
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
}
