import { useState } from "react";
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/authActions/authActions';
import { useNavigate } from "react-router-dom";

import FormInput from "@/UiKit/FormInput";
import AppLabel300k from "@/UiKit/AppLabel300k";
;import FormButton from "@/UiKit/FormButton/FormButton";

import './index.scss'

interface RegistrationData {
  login: string,
  username: string,
  password: string
}

const RegisterSection = () => {

  const [ login, setLogin ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordRepeat, setPasswordRepeat ] = useState('');
  const [ phrase, setPhrase ] = useState('');

  const dispatch = useDispatch();

  const handleInput = (name: string, value: string) => {
    switch (name) {
      case 'login':
        setLogin(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'password':
        setPassword(value);
        break
      case 'password-repeat':
        setPasswordRepeat(value);
        break;
      case 'phrase':
        setPhrase(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    // if (password !== passwordRepeat) {
    //   console.log(password, passwordRepeat)
    //   console.log('Пароли не совпадают');
    //   // throw Error('Пароли не совпадают')
    // }

    const body: RegistrationData = {
      "login": login,
      "username": name,
      "password": password
    };

    dispatch(registerUser(body) as any)
  }

  const navigate = useNavigate();
  
  return (
    <div className="login-section">
      <div className='login-section__inner'>
          <AppLabel300k size='medium'/>
          <span className="login-section__inner__head-text">
            Привет! Это 300к чат, возможно, на сокетах...
            Зарегистрируйся, чтобы войти
          </span>
          <FormInput type='login' onChange={handleInput}/>
          <FormInput type='name' onChange={handleInput}/>
          <FormInput type='password' onChange={handleInput}/>
          <FormInput type='password-repeat' onChange={handleInput}/>
          <input
            className='login-section__inner__input--secret-phrase' 
            placeholder='Секретная фраза (Пока не работает)'
            // сделать мидлвар на проверку из списка
            value={phrase}
            onChange={(e) => handleInput('phrase', e.target.value)}
          />
          <div className='login-section__inner__buttons'>
            <FormButton 
              color='light' 
              text='Войти'
              onClick={() => navigate('/login')}
            />
            <FormButton 
              color='dark' 
              text='Регистрация'
              onClick={handleSubmit} 
            />
          </div>
      </div>
    </div>
  );
}

export default RegisterSection;