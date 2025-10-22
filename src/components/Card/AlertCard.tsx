type AlertCardProps = {
    children: React.ReactNode
    className?: string
    darken?: boolean
}

export default function AlertCard({ children, className, darken }: AlertCardProps) {
    return (
        <div className={darken ? "darken" : ""}>
            <div className={`alert_card ${className}`}> 
                {children}
            </div>
        </div>
    )
}