import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
const navigate = useNavigate();


const handleLogout = () => {
localStorage.removeItem('token');
navigate('/login');
};


return (
<nav style={{ padding: '10px', background: '#eee' }}>
<Link to="/">Dashboard</Link> | <Link to="/new">New Complaint</Link>
<button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
</nav>
);
}


export default Navbar;