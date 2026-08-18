/* eslint-disable react/prop-types */
export default function FormInput({
    type,
    placeholder,
    name,
    className,
    onChange,
    errors,
    isHidePass,
    setIsHidePass,
}) {
    return (
        <div className="relative">
            <input
                type={type === "password" ? (isHidePass ? "password" : "text") : type}
                placeholder={placeholder}
                name={name}
                className={className}
                onChange={onChange}
            />
            {errors[name] && <span className="text-red-700">{errors[name]}</span>}
            {type === "password" && (
                <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 p-1"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsHidePass(!isHidePass);
                    }}
                >
                    {isHidePass ? (
                        <i className="fa-regular fa-eye"></i>
                    ) : (
                        <i className="fa-regular fa-eye-slash"></i>
                    )}

                </button>
            )}
        </div>
    );
}