type SpinnerProps = {
    message?: string
}

export default function Spinner({ message }: SpinnerProps) {
    return (
        <div className="spinner-container">
            <div className="spinner" />
            {message}
        </div>
    )
}