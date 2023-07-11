import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => {
        logout();
    }
    return ( 
        <header>
            <div className="container">
                <Link to='/'>Workout App</Link>
                <nav>
                    {user &&
                    (
                    <>
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                        <button>             
                                <Link to='/explore'>Explore Exercises</Link>
                        </button>
                    </>

                    )}
                    
                    {!user &&
                    (<div>
                        <Link to='/login'>Log in</Link>
                        <Link to='/signup'>Sign up</Link>
                    </div>)}
                    
                </nav>
            </div>
        </header>
     );
}
 
export default Navbar;