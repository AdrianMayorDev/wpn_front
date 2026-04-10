import { createContext } from "react";
import { SignupFormValues } from "./SignupContextProvider";

interface SignupContextProps {
	values: SignupFormValues;
	setValue: (field: keyof SignupFormValues, value: string | boolean) => void;
	handleSubmit: () => void;
}

const SignupFormContext = createContext<SignupContextProps | undefined>(undefined);

export default SignupFormContext;
