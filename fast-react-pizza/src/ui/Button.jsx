function Button({ children,disabled }){
    return (
        <button className="input" disabled={disabled}>{children}</button>
    )
}
export default Button