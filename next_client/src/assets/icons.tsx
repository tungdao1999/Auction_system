import { IconProps } from "@/types/icon-props";

export const IconLogo = ({ className }: IconProps) => {
    return (
        <svg width="40px" height="40px" viewBox="0 0 1024 1024" className={className}
            version="1.1" xmlns="http://www.w3.org/2000/svg">

            <path d="M484.32 375.24C575.25 255.5 857.87 527.6 788.67 581.07c-94.76 73.21-491.01 39.99-304.35-205.83z" fill="#1C80AA" />
            <path d="M401.03 749.89l-4.85 133.8-77.69 21.37h66.36l19.42 35.27 4.86-35.27 40.46 6.14-38.84-25.89 8.09-114.91-17.81-20.51zM524.36 771.23l10.48 133.48-74.73 30.11 65.92-7.59 23.33 32.82 0.79-35.6 40.89 1.48-41.54-21.28-5.11-115.08-20.03-18.34z" fill="#3B5174" />
            <path d="M224.73 264.77l-24 50.19a21.7 21.7 0 0 1-37.73 2.5l-31.57-48.27a21.7 21.7 0 0 1 17.41-33.57l55.61-1.92a21.7 21.7 0 0 1 20.28 31.07z" fill="#DE7B56" />
            <path d="M900.53 638.76c-18.3 86.91-221.86 208.13-478 171.54C150.46 771.44 26 281.88 315 103.56c161.25-99.49 326.71 5 356.8 130.37C713 405.47 583.15 534.58 749.57 609c86.91 38.91 164.43-34.33 150.96 29.76z" fill="#FDD2BE" />
            <path d="M365.86 264.78m-32.45 0a32.45 32.45 0 1 0 64.9 0 32.45 32.45 0 1 0-64.9 0Z" fill="" />
            <path d="M512.24 366c137.48-60.86 253.34 314 166.92 327.31C560.81 711.56 230 490.92 512.24 366zM223.3 530c-9.34-2.6-17.2-12.8-23.94-31a195 195 0 0 1-7.64-27 7.28 7.28 0 0 1 14.3-2.79c4.79 24.5 15 46.44 21.91 46.93 1.12 0.08 11.43-0.5 27.23-45.51a7.28 7.28 0 1 1 13.74 4.82c-13.61 38.77-27 56.31-42 55.22a18.18 18.18 0 0 1-3.6-0.67zM340.8 590.36c-9.63 1.14-20.77-5.32-33.92-19.63a195 195 0 0 1-17.32-22.11 7.28 7.28 0 0 1 12.17-8c13.73 20.85 31.53 37.27 38.07 35.12 1.07-0.35 10.38-4.8 7.93-52.44a7.28 7.28 0 1 1 14.55-0.75c2.11 41-3.59 62.33-17.95 67a18.18 18.18 0 0 1-3.53 0.81zM261.5 659.71c-9-0.19-18.35-7.55-28.56-22.35a180.41 180.41 0 0 1-13-22.49 6.74 6.74 0 0 1 12.18-5.77c9.9 20.88 24.1 38.21 30.37 37.08 1-0.18 10.13-3.07 14-47a6.74 6.74 0 1 1 13.43 1.18c-3.34 37.87-11.31 56.66-25.07 59.12a16.82 16.82 0 0 1-3.35 0.23zM389.28 722.29c-9.26 2.85-21.38-1.51-36.89-13.22a195 195 0 0 1-21-18.64 7.28 7.28 0 0 1 10.53-10.06c17.25 18.05 37.7 31 43.75 27.71 1-0.54 9.35-6.59-1.61-53a7.28 7.28 0 1 1 14.17-3.35c9.44 40 7.65 62-5.63 69.16a18.18 18.18 0 0 1-3.32 1.4z" fill="#22B0C3" />
        </svg>
    );
}

export const IconSearch = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 3C5.36 3 2 6.36 2 10.5S5.36 18 9.5 18c2.21 0 4.21-.89 5.66-2.34l4.79 4.79c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-4.79-4.79C15.11 13.71 16 11.71 16 9.5 16 6.36 12.64 3 9.5 3zM9.5 16C6.46 16 4 13.54 4 10.5S6.46 5 9.5 5s5.5 2.46 5.5 5.5S12.54 16 9.5 16z" fill="currentColor"/>
        </svg>
    );
}

export const IconCart = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4H2V2h5l1.6 3.2L8.4 7H20v2H9.6l-1.6-3.2L7 4zm0 4h13v2H7V8zm0 4h13v2H7v-2zm0 4h13v2H7v-2z" fill="currentColor"/>
        </svg>
    );
}

export const IconUser = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z" fill="currentColor"/>
        </svg>
    );
}

export const IconAuctionHammer = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83-3.54-3.54c-.39-.39-1.02-.39-1.41 0L2.29 7.13c-.39.39-.39 1.02 0 1.41l3.54 3.54L4.71 14H2v2h3v3h2v-3h3v-2H7.41l1.83-1.83 3.54 3.54c.39.39 1.02.39 1.41 0l7.34-7.34c.39-.39.39-1.02 0-1.41zM6.41 8L8 6.41l1.59 1.59L8 10.59 6.41 8zm10.83 10.83L9.71 12.29l1.59-1.59 7.54 7.54-1.59 1.59z" fill="currentColor"/>
    </svg>
    );
}

export const IconWarehouse = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6h-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM4 4h12v16H4V4zm16 12h-4v-4h4v4zm0-6h-4V8h4v2z" fill="currentColor"/>
            </svg>
    );
}

export const IconOrders = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6h-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM4 4h12v16H4V4zm16 12h-4v-4h4v4zm0-6h-4V8h4v2z" fill="currentColor"/>
        </svg>
    );
}

export const IconDashboard = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
        </svg>
    );
}

export const IconProducts = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6h-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM4 4h12v16H4V4zm16 12h-4v-4h4v4zm0-6h-4V8h4v2z" fill="currentColor"/>
        </svg>
    );
}

export const IconMessages = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 4h16v12H4V4zm0 16v-4h16v4H4z" fill="currentColor"/>
        </svg>
    );
}

export const IconSettings = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.7-.98l-.38-2.65A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.7.98l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.39 1.09.72 1.7.98l.38 2.65A.5.5 0 0 0 10 22h4a.5.5 0 0 0 .5-.42l.38-2.65a7.03 7.03 0 0 0 1.7-.98l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.11-1.65zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z" fill="currentColor"/>
        </svg>
    );
}

export const IConSidebarToggle = ({ className }: IconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
        </svg>
    );
}