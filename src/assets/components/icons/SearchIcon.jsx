import Search from "../../icons/search.svg";

export default function SearchIcon ({ width, height, center }) {
    return (
        <img
            className={ center ? "mx-auto" : "" }
            src={Search}
            alt="Search"
            style={{
                width: width + "px",
                height: height + "px"
            }}
        />
    )
}