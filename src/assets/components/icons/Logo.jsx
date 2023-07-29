import JWT from "../../icons/jwt.svg";

export default function Logo ({ width, height, center }) {
    return (
        <img
            className={ center ? "mx-auto" : "" }
            src={JWT}
            alt="Jaozo"
            style={{
                width: width + "px",
                height: height + "px"
            }}
        />
    )
}