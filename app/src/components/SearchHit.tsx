export const SearchHit = ({ hit }: any) => {
    return <>
        <img
            src={`http://localhost:11011/uploads/${hit.id}?w=100`}
            alt=""
        />
    </>
}
