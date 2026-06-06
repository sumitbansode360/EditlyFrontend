export interface SignupType{
    emailSent: boolean;
    setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
    registeredEmail: string;
    setRegisteredEmail: React.Dispatch<React.SetStateAction<string>>;
}