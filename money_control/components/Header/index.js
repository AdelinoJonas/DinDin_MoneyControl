import './styles.css';
import logo from '../../assets/logo.svg';

function Header(){
    return(
        <header>
            <img src={logo} alt="logo" />
        </header>
    );
}

export default Header;