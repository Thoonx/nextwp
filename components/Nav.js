import Link from 'next/link'

const Nav = () => (
    <ul>
        <li><Link href="/"><a href="/">Home</a></Link></li>
        <li><Link href="/posts"><a href="/posts">Posts</a></Link></li>

        <style jsx>{`
        ul{
            background: #3d40f2;
            color: white;
            display: inline-block;
            margin: 0;
            padding: 8px 20px;
            border-radius: 50px;
            position: fixed;
            top: 20px;
            right: 20px;
            box-shadow: 9px 15px 23px #3d40f252;
            z-index: 2;
        }    

        ul li{
            padding: 15px 10px;
            list-style: none;
            display: inline-block;
        }
        ul li:nth-child(odd){
            
    border-right: 1px solid #5254ff;
        }
        `}</style>
    </ul>
)

export default Nav 