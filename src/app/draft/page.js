import Link from "next/link";

const Draft = () => {
  return (
    <div>
        <ul>
            <li>
                <Link href='/1'> Draft 1</Link>
            </li>
            <li>
                <Link href='/2'> Draft 2</Link>
            </li>
            <li>
                <Link href='/3'>Draft 3</Link>
            </li>
        </ul>
    </div>
  )
};

export default Draft;