import "./rating.css"
const getOutline = (isBlank:boolean)=>{
    return isBlank ? "var(--color-foreground)" : "var(--color-black)";
}
const hateIcon = (size: number, isBlank: boolean) => {
    let fillColor = isBlank ? "none" : "#c9acc8";
    let outlineColor = getOutline(isBlank)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="rating-icon" viewBox="0 0 45.1 64.3" height={size} width={size + (size * .1)}>
            <path fill={fillColor} stroke={fillColor} strokeLinecap="round" strokeWidth="1.5" d="M17.6 60.3A20 20 0 0 1 3.3 41.6c0-5.5 1-8.6 5-16.3 1.9-3.8 3.7-8 3.8-9.2l.4-2.1 1.3 1.2c2.4 2.3 3.5 5 3.7 10.1.2 3.6.5 4.8 1 5q1.9.4 5.1-6.2 3-6.4.4-14.3c-.6-1.8-1-3.4-.9-3.6.5-.4 8.4 7.5 10.7 10.7a40 40 0 0 1 8 23.9c0 4.8-.2 5.5-1.7 8.7a19.5 19.5 0 0 1-22.5 10.8zm-1.3-8.8c1-4.7 5.5-7 9.3-4.8 1.7 1 3.2 3.3 3.2 4.9q0 1 .8 1.4c2.6 1 1.9-4.4-1-7-5.1-4.7-13.2-2.5-14.5 4-.6 3.2 1.5 4.7 2.2 1.5zm-2-10 1-2c.2-.9 0-1.3-1.4-2.1-2.2-1.3-2.6-1-2.6 1.4 0 2.8 1.7 4.3 3 2.6zm19-.2c.8-.9 1-2.7.5-4.2-.5-1.3-4 .6-4 2.1 0 1.2 1.3 2.9 2.1 2.9q.6-.1 1.3-.8z" />
            <path d="M20.1 1.1a1 1 0 0 0-1.4 1.2l.7 1.5c3.7 8.5 6.2 14.4.6 22.5q.1-10.4-8.7-16.3a1 1 0 0 0-1.4 1c1.3 4.7-.7 8.1-3.1 12.4C4.2 27.8 1 33.3 1 41.7c0 11.9 9.7 21.6 21.5 21.6 12 0 21.6-9.7 21.6-21.6 0-16.3-8.5-30.7-24-40.6m2.5 60.3A19.7 19.7 0 0 1 2.9 41.7c0-8 2.9-13 5.5-17.4 2.2-3.7 4.1-7 3.7-11.3q7.3 6 5.8 16.2 0 .6.5 1 .7.2 1.1-.3c8.4-9.7 6-16.5 2.2-25.4a45 45 0 0 1 20.5 37.2c0 10.9-8.8 19.7-19.6 19.7" fill={outlineColor} />
            <path d="M15 38.9v-.7l-3-1.5q-.6.8-.7 2.2.1 2.6 1.9 2.8 1.7-.2 1.9-2.8M32 41.7c1 0 1.8-1.2 1.8-2.8q0-1.4-.7-2.2l-3 1.5v.7c0 1.6.8 2.8 1.8 2.8m-9.3 1.9A8.4 8.4 0 0 0 14 52a1 1 0 1 0 1.9 0A6.6 6.6 0 0 1 29 52a1 1 0 1 0 1.9 0c0-4.6-3.8-8.4-8.4-8.4" fill={outlineColor} />
        </svg>

    )
}

const dislikeIcon = (size: number, isBlank: boolean) => {
    let outlineColor = getOutline(isBlank)

    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size + (size * .1)} className="rating-icon" viewBox="5 -10 53.6 69.3">
            <ellipse cx="40.9" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.4 -24)" />
            <ellipse cx="59.6" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.4 -24)" />
            <path d="M44.6 10.4c-2.3-5.1-9-19-12.8-19s-10.4 13.9-12.7 19C13.5 11-1.8 13-3 16.6c-1.2 3.6 10 14.3 14 18-1 5.5-3.8 20.7-.8 22.9q.7.4 1.7.4c4.7 0 17.2-6.8 19.8-8.3C34.4 51.1 47 58 51.6 58q1 0 1.7-.4c3-2.2.3-17.4-.8-22.9 4-3.7 15.2-14.4 14-18-1-3.5-16.4-5.6-22-6.2m6.2 23.2a1 1 0 0 0-.3.9c2 9.5 3.1 20.4 1.7 21.5h-.6a73 73 0 0 1-19.8-8.4l-.4.1A73 73 0 0 1 12 56.1l-.6-.1c-1.3-1-.5-10.8 1.7-21.5q0-.6-.3-1C5.6 27-1.7 19-1.2 17.3s11.3-4 21-5q.5 0 .8-.6c4-8.9 9.4-18.4 11.2-18.4s7.3 9.5 11.3 18.4q.2.5.7.6c9.7 1 20.5 3.3 21 5 .5 1.5-6 9-14 16.4" fill={outlineColor} />
            <circle cx="50.3" cy="59.4" r="3.8" fill={outlineColor} transform="translate(-18.4 -24)" />
        </svg>

    )
}

const neutralIcon = (size: number, isBlank: boolean) => {
    let fillColor = isBlank ? "none" : "#8cc2c0";
    let outlineColor = getOutline(isBlank)

    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size + (size * .1)} className="rating-icon" viewBox="5 -10 53.6 69.3">
            <path d="m11.7 48.8-.2-.3a43 43 0 0 1 1.2-14l.3-2-1.2-1.1L6.5 26q-4-4.5-4-5.7l.1-.4a43 43 0 0 1 15.6-3.6c.2 0 .2-.1.8-1.3 3.2-7 6.7-12.6 7.8-12.6q.8.1 2.5 2.6a79 79 0 0 1 6.2 11.4l1.6.2c7 .9 12.8 2.3 14 3.3q.3.3 0 .8a47 47 0 0 1-10.4 11.7c-.1.2 0 .4.2 2 1.4 7.3 1.9 13.6 1 14.4q-.4.3-2.8-.4a78 78 0 0 1-12.3-5.7l-1.2.5a74 74 0 0 1-11.4 5.3q-1.8.6-2.5.3zm21-13.1c.5-.3.5-1 0-1.3H20.9q-.5.4-.1 1c.2.4 0 .4 6.1.4zm-12.5-6.3q1-.4 1-2 0-1.2-.6-1.8c-1.2-1-2.5.7-2 2.5q.2 1.1 1 1.3h.6zm14 0q.5-.3.7-.9c.5-1 .2-2.7-.7-3.1h-.9q-1 .5-1 2 0 1.6 1.2 2z" fill={fillColor} stroke={fillColor} strokeWidth="1.99999999" strokeLinecap="round" strokeMiterlimit="4" transform="translate(-4.4 -10)scale(1.35)" />
            <ellipse cx="40.6" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.2 -24)" />
            <ellipse cx="59.4" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.2 -24)" />
            <path d="M44.6 10.4c-2.3-5.1-9-19-12.8-19s-10.4 13.9-12.7 19C13.5 11-1.8 13-3 16.6c-1.2 3.6 10 14.3 14 18-1 5.5-3.8 20.7-.8 22.9q.7.4 1.7.4c4.7 0 17.2-6.8 19.8-8.3C34.4 51.1 47 58 51.6 58q1 0 1.7-.4c3-2.2.3-17.4-.8-22.9 4-3.7 15.2-14.4 14-18-1-3.5-16.4-5.6-22-6.2m6.2 23.2a1 1 0 0 0-.3.9c2 9.5 3.1 20.4 1.7 21.5h-.6a73 73 0 0 1-19.8-8.4l-.4.1A73 73 0 0 1 12 56.1l-.6-.1c-1.3-1-.5-10.8 1.7-21.5q0-.6-.3-1C5.6 27-1.7 19-1.2 17.3s11.3-4 21-5q.5 0 .8-.6c4-8.9 9.4-18.4 11.2-18.4s7.3 9.5 11.3 18.4q.2.5.7.6c9.7 1 20.5 3.3 21 5 .5 1.5-6 9-14 16.4" fill={outlineColor} />
            <path d="M39.3 36.3h-15a1 1 0 1 0 0 2h15a1 1 0 1 0 0-2" fill={outlineColor} />
        </svg>

    )
}
const likeIcon = (size: number, isBlank: boolean) => {
    let fillColor = isBlank ? "none" : "#c9acc8";
    let outlineColor = getOutline(isBlank)

    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size + (size * .1)} className="rating-icon" viewBox="5 -10 53.6 69.3">
            <path d="M11.8 48.8c-1-.3-.5-6.8 1-14.3l.2-1.8c0-.2 0-.3-1-1.2-4.4-4-8.3-8.5-9.3-10.3q-.4-1 0-1.3c1-1 6.8-2.4 13.7-3.3q1.6 0 1.9-.3l.4-.6c1.5-3.4 3.7-7.5 5.2-9.9q2.3-3.7 3.1-3.3t3 3.6a98 98 0 0 1 5.4 10.2l1.6.3c6.8.8 13 2.3 14 3.3q.4.4 0 1.2c-1 2-4.7 6-9.2 10.3-1.3 1.3-1.3 1-1 2.6 1 5 1.7 11.1 1.5 13.3q-.1 1.5-.6 1.6c-1.4.2-6.7-2-12.8-5.3l-2-1-2.4 1.2c-5 2.7-9.5 4.6-11.6 5h-1zM28.1 37a5 5 0 0 0 3.4-3.5q.6-2-.5-2-.6 0-.7.7c-.2 1.3-.5 1.8-1 2.4a3.4 3.4 0 0 1-5 0q-.7-.8-1-2.3 0-.8-.6-.8-1 0-.7 1.7a5 5 0 0 0 6.1 3.8zm-7.8-7.6c1-.5 1.3-2.2.7-3.3q-.2-.6-.8-.7-.9-.4-1.5.8c-.2.5-.3 1.5-.1 2q.4 1.3 1.3 1.3zm13.8 0q.5 0 .9-.9c.2-.5.2-1.7 0-2.3-.7-1.4-2-1.2-2.5.3-.4 1.2 0 2.6.9 3h.7z" fill={fillColor} stroke={fillColor} strokeWidth="1.99999999" strokeLinecap="round" strokeMiterlimit="4" transform="translate(-4.4 -10)scale(1.35)" />
            <ellipse cx="40.9" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.4 -24)" />
            <ellipse cx="59.6" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.4 -24)" />
            <path d="M44.6 10.4c-2.3-5.1-9-19-12.8-19s-10.4 13.9-12.7 19C13.5 11-1.8 13-3 16.6c-1.2 3.6 10 14.3 14 18-1 5.5-3.8 20.7-.8 22.9q.7.4 1.7.4c4.7 0 17.2-6.8 19.8-8.3C34.4 51.1 47 58 51.6 58q1 0 1.7-.4c3-2.2.3-17.4-.8-22.9 4-3.7 15.2-14.4 14-18-1-3.5-16.4-5.6-22-6.2m6.2 23.2a1 1 0 0 0-.3.9c2 9.5 3.1 20.4 1.7 21.5h-.6a73 73 0 0 1-19.8-8.4l-.4.1A73 73 0 0 1 12 56.1l-.6-.1c-1.3-1-.5-10.8 1.7-21.5q0-.6-.3-1C5.6 27-1.7 19-1.2 17.3s11.3-4 21-5q.5 0 .8-.6c4-8.9 9.4-18.4 11.2-18.4s7.3 9.5 11.3 18.4q.2.5.7.6c9.7 1 20.5 3.3 21 5 .5 1.5-6 9-14 16.4" fill={outlineColor} />
            <path d="M37.4 32.6a1 1 0 0 0-.9 1 4.7 4.7 0 0 1-9.4 0 1 1 0 1 0-1.8 0 6.6 6.6 0 0 0 13 0q0-1-.9-1" fill={outlineColor} />        </svg>

    )
}
const loveIcon = (size: number, isBlank: boolean) => {
    let fillColor = isBlank ? "none" : "#ffdc54";
    let outlineColor = getOutline(isBlank)

    return (<svg xmlns="http://www.w3.org/2000/svg" height={size} width={size + (size * .1)} className="rating-icon" viewBox="5 -10 53.6 69.3">
        <path d="M11.7 48.3c-.4-1 .1-7.8.8-11.8l.7-4L9 28.4q-6.7-6.9-6.3-8.1c.3-.9 5.8-2.3 12.2-3.2l3.4-.5 2.3-4.4a41 41 0 0 1 5.5-8.9c.7-.7.8-.7 1.3-.2 1 1 3.3 4.6 5.6 9 1.2 2.3 2.4 4.3 2.6 4.4s2.6.6 5.3 1a27 27 0 0 1 9.7 2.5l.6.6-1.4 2c-.7 1-3.1 3.8-5.3 6l-4 4 .2 1.3.8 5.5c.4 2.5.6 5.1.6 6.7l-.1 2.6h-1.3c-1.4-.1-5.8-2-10.5-4.4L27 42.4 21.8 45c-7 3.4-9.7 4.3-10.1 3.3zm17.6-10.7c3.7-.7 7.2-4.8 5.6-6.5-.5-.5-15.6-.5-16 0-1 1 .2 3.8 2.3 5.2q3.3 2.3 8.1 1.3zm-8.5-8.4c.6-.7.7-2 .4-3q-.7-1.6-2-.7c-1.3.9-.9 4 .6 4q.6 0 1-.3zm13.9-.1c.8-.7.7-2.6 0-3.4q-.6-.6-1-.6-.2 0-.9.6c-.7.7-.7 2.3 0 3.2q.7 1.1 1.9.2z" fill={fillColor} stroke={fillColor} strokeWidth="1.99999999" strokeLinecap="round" strokeMiterlimit="4" transform="translate(-4.4 -10)scale(1.35)" />
        <ellipse cx="40.6" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.2 -24)" />
        <ellipse cx="59.4" cy="50.9" rx="1.9" ry="2.8" fill={outlineColor} transform="translate(-18.2 -24)" />
        <path d="M41.2 31.7H22.4a2 2 0 0 0-1.8 2.3c.1.3 2 7 11.2 7S43 34.3 43 34a2 2 0 0 0-1.8-2.3" fill={outlineColor} />
        <path d="M44.6 10.4c-2.3-5.1-9-19-12.8-19s-10.4 13.9-12.7 19C13.5 11-1.8 13-3 16.6c-1.2 3.6 10 14.3 14 18-1 5.5-3.8 20.7-.8 22.9q.7.4 1.7.4c4.7 0 17.2-6.8 19.8-8.3C34.4 51.1 47 58 51.6 58q1 0 1.7-.4c3-2.2.3-17.4-.8-22.9 4-3.7 15.2-14.4 14-18-1-3.5-16.4-5.6-22-6.2m6.2 23.2a1 1 0 0 0-.3.9c2 9.5 3.1 20.4 1.7 21.5h-.6a73 73 0 0 1-19.8-8.4l-.4.1A73 73 0 0 1 12 56.1l-.6-.1c-1.3-1-.5-10.8 1.7-21.5q0-.6-.3-1C5.6 27-1.7 19-1.2 17.3s11.3-4 21-5q.5 0 .8-.6c4-8.9 9.4-18.4 11.2-18.4s7.3 9.5 11.3 18.4q.2.5.7.6c9.7 1 20.5 3.3 21 5 .5 1.5-6 9-14 16.4" fill={outlineColor} />
    </svg>
    )
}

const getRatingIcon = (rating: number, size: number, isBlank: boolean) => {
    switch (rating) {
        case -1:
            return hateIcon(size, isBlank)
        case 1:
            return dislikeIcon(size, isBlank)
        case 2:
            return neutralIcon(size, isBlank)
        case 3:
            return likeIcon(size, isBlank)
        case 4:
            return loveIcon(size, isBlank)
        default:
            return neutralIcon(size, isBlank)
    }
}

export { hateIcon, dislikeIcon, neutralIcon, likeIcon, loveIcon, getRatingIcon }