type SpinnerProps = {
    message?: string
    className?: string
}

export default function Spinner({ message, className }: SpinnerProps) {
    return (
        <div className={"spinner-container" + (className ? " " + className : "")}>
            <div className="spinner" />
            {message}
        </div>
    )
}