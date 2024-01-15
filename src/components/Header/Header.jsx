import './Header.css'
import SelectUser from '../SelectUser/SelectUser';

function Header() {
	return (
		<>
			<img className='logo' src="/logo.svg" alt="Логотип журнала" />
			<SelectUser />
		</>
	);
}

export default Header;