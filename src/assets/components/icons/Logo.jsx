import JWT from "../../icons/jwt.svg";

export default function Logo ({ width, height }) {
    return (
        <img
            src={JWT}
            alt=""
            style={{
                width: width + "px",
                height: height + "px"
            }}
        />
    )
}