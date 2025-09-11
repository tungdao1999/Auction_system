export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                minHeight: '100vh',
                minWidth: '100vw',
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </div>
    );
}