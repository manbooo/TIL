import Link from 'next/link'

const linkStyle = {
    marginRight: '1rem'
}

const Header= () => {
    return (
        <div>
            <Link href="/"><a style={linkStyle}>HOME</a></Link>
            <Link href="/about"><a style={linkStyle}>ABOUT</a></Link>
            <Link prefetch href="/ssr-test"><a style={linkStyle}>SSR 테스트</a></Link>
        </div>
    )
}

export default Header
