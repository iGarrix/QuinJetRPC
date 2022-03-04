export type FieldParamsGender = {
    value?: string,
    field: string,
    touched?: boolean | null,
    error?: string | null,
    className?: string,
    errorClassName?: string,
    placeholder?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export const gender = ['Male', 'Female'];