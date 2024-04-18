import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaRegQuestionCircle } from "react-icons/fa";
import {FaClock, FaInbox, FaDisplay, FaArrowRightFromBracket} from "react-icons/fa6";
function KanbasNavigation() {
    const links = [
        { label: "Account",   icon: <FaRegUserCircle className="fs-2" style={{ color: '#b8b8b8' }}/>  },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" style={{ color: '#ff0000' }}/>  },
        { label: "Courses",   icon: <FaBook className="fs-2" style={{ color: '#ff0000' }}/>           },
        { label: "Calendar",  icon: <FaRegCalendarAlt className="fs-2" style={{ color: '#ff0000' }}/> },
        { label: "Inbox",  icon: <FaInbox className="fs-2" style={{ color: '#ff0000' }}/> },
        { label: "History",  icon: <FaClock className="fs-2" style={{ color: '#ff0000' }}/> },
        { label: "Studio",  icon: <FaDisplay className="fs-2" style={{ color: '#ff0000' }}/> },
        { label: "Commons",  icon: <FaArrowRightFromBracket className="fs-2" style={{ color: '#ff0000' }} /> },

    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;