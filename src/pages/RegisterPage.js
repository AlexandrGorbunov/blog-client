import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('https://blog-app-1jc3.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('Регистрация прошла успешно');
    } else {
      alert('Не удалось зарегистрировать');
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h2>Укажите логин и пароль для регистрации</h2>
      <input type="text"
             placeholder="Логин"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="Пароль"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Зарегистрировать</button>
    </form>
  );
}

