export type FieldParams = {
    value?: string,
    field: string,
    touched?: boolean | null,
    error?: string | null,
    className?: string,
    errorClassName?: string,
    placeholder?: string,
    type?: "text"|"email"|"password",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};