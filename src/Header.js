import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

	export default function Header() {
		const {setUserInfo,userInfo} = useContext(UserContext);
		useEffect(() => {
			if (userInfo?.token) { 
				fetch('http://localhost:4000/profile', {
					credentials: 'include',
				}).then(response => {
					response.json().then(userInfo => {
						setUserInfo(userInfo);
					});
				});
			}
		}, []);
	
	
	function logout() {
		const confirmLogout = window.confirm("Вы уверены, что хотите выйти?");
	
		if (confirmLogout) {
			fetch('https://blog-app-1jc3.onrender.com/logout', {
				credentials: 'include',
				method: 'POST',
			});
			setUserInfo(null);
			window.location.href = '/';
		}
	}
	
	const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Блог</Link>
      <nav>
        {username && (
          <>
            <Link className="header-btn" to="/create">Создать пост</Link>
            <Link className="header-btn" onClick={logout}>Выход</Link>
          </>
        )}
        {!username && (
          <>
            <Link className="header-btn" to="/login">Вход</Link>
            <Link className="header-btn" to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
}

