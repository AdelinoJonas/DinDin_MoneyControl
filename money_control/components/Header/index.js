import logo from '../../assets/logo.svg';
import './styles.css';

function Header(){
    return(
        <header>
            <img src={logo} alt="logo" />
        </header>
    );
}

export default Header;