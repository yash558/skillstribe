import React, { useEffect, useState } from "react";
import yoga from "../../assets/Yoga.png";
import "./create.css";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import * as aladinjs from 'aladinjs'
import * as Alaio from '../../service/alaio'

const Create = () => {
  let signUpLink = 'https://demo.alacritys.net/';
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  let [mnemonic_code, set_mnemonic_code] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  let history = useNavigate()
  const alert = useAlert()

  const getUser = async (username) => {
    setLoading(true)
    if (username !== '' || username !== null) {
      let user = await Alaio.loadUser(username)
      if (user) {
        let storage = JSON.parse(localStorage.getItem('User'))
        if (user.person === storage.username) {
          alert.success('Successfully Logged In!')
          await localStorage.setItem('role', user.role)
          await localStorage.setItem('image', user.imageURL)
          history.push('/account')
        } else setError('An Error Occured, please try again!')
      } else {
        history.push('account-info-setup')
      }
    } else setError('No username set')
  }

  const onSubmit = async () => {
    //If user uses a mnemonic phrase
    if (mnemonic_code.includes(' ')) {
      mnemonic_code = await encryptMnemonic(mnemonic_code, pass).catch(
        (err) => {
          console.log(err)
        },
      )
    }

    await axios
      .post('https://euapi.alacritys.net/users/login', {
        email,
        password: pass,
        mnemonic_code,
      })
      .then(async (response) => {
        if (response.status === 200) {
          let activeKey = await Alaio.getUserKeys(
            mnemonic_code,
            pass,
          ).then((res) => res.data.data.activeKey)
          localStorage.setItem('keys', JSON.stringify(activeKey))
          let rpc = Alaio.makeRPC()
          let username = await rpc
            .history_get_key_accounts(activeKey.pub_key)
            .then(async (response) => {
              return response.account_names[0]
            })
          if (username !== '') {
            console.log('res', response)
            await localStorage.removeItem('User')
            await setUsername(username)

            let data = {
              accPrivateKey: response.data.data.accPrivateKey,
              account: response.data.data.account,
              mnemonicCode: response.data.data.mnemonicCode,
              profileInfo: response.data.data.profileInfo,
              publicKeychain: response.data.data.publicKeychain,
              username: username,
            }
            await localStorage.setItem('User', JSON.stringify(data))

            //?Check to see if the user already has a an account in skillstribe
            await getUser(username)
          } else {
            setError(
              'Please make sure your credentials are correct.',
            )
            return
          }
        } else {
          //! Check to see if the user has already created an account
          return
        }
      })
      .catch((error) => {
        console.log('here', error)
        alert.error(`An error occured: ${error}`)
        setError('An error occured, please try again')
      })
  }

  const encryptMnemonic = async (mnemonic, password) => {
    return aladinjs.encryptMnemonic(mnemonic, password)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'))
    if (user === null) {
      console.log('no data')
      return
    }
  }, [])

  return (
    <>
      <div className="create d-flex flex-row justify-content-between col-10 ">
        <div className="create_left">
          <img src={yoga} alt="" className="create-img" />
        </div>
        <div className="create_right">
          <div className="create_account">
            <h2>Create an Account</h2>
          </div>
          <div className="create_details">
            <label htmlFor="">Mnemonic</label>
            <textarea placeholder="Mnemonics"
					value={mnemonic_code}
					onChange={(e) => set_mnemonic_code(e.target.value)} name="" id="" cols="30" rows="4"></textarea>
            <label htmlFor="">Enter Password</label>
            <input type="search" />
            <Link to="/account">
              {" "}
              <button className="mt-3 login-btn justify-content-center">
                Login
              </button>
            </Link>
            <div className="or">
              <div className="line1"></div>
              <p className="text-center mt-3 mx-2">or</p>
              <div className="line1"></div>
            </div>
            <button><a target="_blank" href={signUpLink}>Sign Up with Alacrity</a></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
