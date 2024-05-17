import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import attent from './assets/attent.svg';
import plus from './assets/plus.svg';
import rubl from './assets/rubl.svg';
import valuta from './assets/valuta.svg';
import { message } from 'antd';
import axios from 'axios';

const Blank = styled.div`
  width: 550px;
  min-width: 320px;
  height: 710px;
  border: 1px solid #F2F2F5;
  border-radius: 12px;
  background-color: #FFFFFF;
  box-sizing: border-box;
  padding: 40px;
  display: block;
  margin: 0 auto;
  box-shadow: 5px 2px 5px 2px gray;
  @media screen and (max-width: 550px) {
    width: 320px;
    height: 850px; 
    padding: 15px;
  }
`
const ConInput = styled.div`
  width: 288px;
  height: 52px;
  border: 1px solid #E4E4EB;
  border-radius: 8px;
  background-color: #FAFAFC;
  color: #8F90A6;
  display: inline-flex;
  justify-content: space-between;
`
const Icon = styled.img`
  height: 20px;
  margin: 0 auto;
  margin-top: 16px;
  display: block;
`
const ConInputVal = styled.input`
  width: 74px;
  height: 20px;
  border: none;
  border-radius: 0px;
  background-color: #FAFAFC;
  color: #8F90A6;
  margin: 16px;
  &:focus {
    outline: none;
  }
`
const ConInputRub = styled.input`
  width: 74px;
  height: 20px;
  border: none;
  border-radius: 0px;
  background-color: #FAFAFC;
  color: #8F90A6;
  margin: 16px;
  &:focus {
    outline: none;
  }
`
const Vertical = styled.div`
  border-left: 1px solid #E4E4EB;
  min-height: 52px;
  display: inline-block;
`
const LittleCartContainer = styled.div`
  display: flex;
  width: 470px;
  gap: 10px;
  margin-top: 30px;
`
const LittleCart = styled.div`
  width: 116px;
  height: 80px;
  border-radius: 8px;
  background-color: #6698FA;
  color: #FFFFFF;
  font-size: 12px;
  display: flex;
  flex-flow: column-reverse;
  align-items: flex-start;
  gap: 3px;
  box-sizing: border-box;
  padding: 5px;
  cursor: pointer;
`
const NewCart = styled.div`
  width: 116px;
  height: 80px;
  border-radius: 8px;
  background-color: #F2F2F5;
  border: 2px solid #3E7BFA;
  color: #555770;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
`
const CartContainer = styled.div`
  position: relative;
  width: 470px;
  height: 208px;
  display: block;
  margin-top: 30px;
  @media screen and (max-width: 550px) {
    width: 288px;
    height: 310px; 
  }
`
const Cart = styled.div`
  width: 324px;
  height: 208px;
  border-radius: 12px;
  background: linear-gradient(135deg, #A6C8FF 0%, #0043CE 100%);
  color: #FFFFFF;
  position: absolute;
  font-size: 12px;
  z-index: 100;
  p {margin: 5px 0 5px};
  @media screen and (max-width: 550px) {
    width: 288px; 
  }
`
const CartDataContainer = styled.div`
  margin: 16px;
  margin-top: 48px;
`
const BackCart = styled.div`
  width: 288px;
  height: 200px;
  border-radius: 12px;
  background-color: #F2F2F5;
  color: #555770;
  position: absolute;
  font-size: 12px;
  right: 0px;
  p {margin: 5px 0 5px};
  @media screen and (max-width: 550px) {
    bottom: 0px; 
  }
`
const BackCartLine = styled.div`
  width: 288px;
  height: 40px;
  margin-top: 20px;
  opacity: 0.3;
  border-radius: 0px;
  background-color: #C7C9D9;
`
const NumberImput = styled.input`
  width: 284px;
  height: 38px;
  border-radius: 8px;
  font-size: 16px;
  border: 2px solid #3E7BFA;
  box-sizing: border-box;
  padding: 8px;
  @media screen and (max-width: 550px) {
    width: 248px;
  }
`
const DateInput = styled.input`
  width: 72px;
  height: 38px;
  border-radius: 8px;
  font-size: 16px;
  border: 2px solid #0043CE;
  box-sizing: border-box;
  padding: 8px;
`
const CvvContainer = styled.div`
  width: 104px;
  height: 112px;
  margin-left: 170px;
  @media screen and (max-width: 550px) {
    margin-left: 30px;
    margin-top: 50px;
  }
`
const CvvInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  p {
    font-size: 10px;
  }
  @media screen and (max-width: 550px) {
    width: 180px;
    grid-template-columns: 1fr 5fr;
    p {
    margin: 0 10px;
    }
  }
`
const CvvInput = styled.input`
  width: 72px;
  height: 38px;
  border-radius: 8px;
  border: 2px solid #C7C9D9;
  box-sizing: border-box;
  padding: 8px;
`
const Link = styled.a`
  color: #3E7BFA;
  cursor: pointer;
`
const SaveContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 10fr;
  gap: 5px;
  font-size: 14px;
  p {margin: 3px};
  @media screen and (max-width: 550px) {
    font-size: 12px; 
  }
`
const Check = styled.input`
  margin: 8px;
  height: 20px;
  cursor: pointer;
`
const ButtonSub = styled.button`
  width: 141px;
  height: 52px;
  border-radius: 100px;
  padding: 14px, 32px, 14px, 32px;
  background-color: #3E7BFA;
  border: #3E7BFA;
  color: #FFFFFF;
  font-size: 16px;
  margin-top: 30px;
  @media screen and (max-width: 550px) {
    width: 287px;
  }
`
interface Card {
  num: string;
  mm: string;
  gg: string;
}

const App: React.FC = () => {
  const [carts, setCarts] = useState<Card[]>([])
  const [valutaVal, setValutaVal] = useState<string | number>('')
  const [rubliVal, setRubliVal] = useState<string | number>('')
  const [cartNumber, setCartNumber] = useState<string | number>('')
  const [cartMm, setCartMm] = useState<string | number>('')
  const [cartGg, setCartGg] = useState<string | number>('')
  const [cvv, setCvv] = useState<string | number>('')
  const [saveCart, setSaveCart] = useState(true)
  const re = /^[0-9\b]+$/;
  const [messageApi, contextHolder] = message.useMessage();
  const [sumError, setSumError] = useState(false)
  const [cartNumberError, setCartNumberError] = useState(false)
  const [cartMmError, setCartMmError] = useState(false)
  const [cartGgError, setCartGgError] = useState(false)
  const [cvvError, setCvvError] = useState(false)

  const info = (type: 'error' | 'success', message:string) => {
    messageApi.open({
      type: type,
      content: message,
    });
  }

  const errorClear = () => {
    setSumError(false);
    setCartNumberError(false);
    setCartMmError(false);
    setCartGgError(false);
    setCvvError(false);
  }

  const fetchCarts = async () => {
        try {
            const response = await axios.get('https://lavarel/api/cards')
            setCarts (response.data);
        } catch (error) {
            setCarts ([]);
        }
  }

  useEffect(() => {
    fetchCarts();
  }, [])

  const submitCart = async () => {
    const sendData = {
        count: +rubliVal,
        num: +cartNumber,
        mm: +cartMm,
        gg: +cartGg,
        cvv: +cvv,
    }
    
      if (+rubliVal < 1) setSumError(true);
      if (String(cartNumber).length !== 16) setCartNumberError(true);
      if (String(cartMm).length !== 2 || (sendData.mm < 5 && sendData.gg <= 24)) setCartMmError(true);
      if (String(cartGg).length !== 2 || sendData.gg < 24) setCartGgError(true);
      if (String(cvv).length !== 3) setCvvError(true);

    if ( 
          +rubliVal < 1 
        || (String(cartNumber).length !== 16)
        || (String(cartMm).length !== 2 || (sendData.mm < 5 && sendData.gg <= 24))
        || (String(cartGg).length !== 2 || sendData.gg < 24)
        || (String(cvv).length !== 3) 
        ) 
      {
        info('error', 'Проверьте правильность ввода данных');
        return;
    }  

    if (saveCart) {
      try {
        await axios.post('https://lavarel/api/cards', sendData)
        .then(response => {
              if (response.status !== 201) info('error', 'Не удалось сохранить карту');
          info('success', 'Карта сохранена');
        })
        .then(() => {
          setRubliVal(''); 
          setValutaVal('');
          setCartNumber('');
          setCartMm('');
          setCartGg('');
          setCvv('');
          })
        .then(fetchCarts)
      } catch (error) {
        info('error', 'Не удалось сохранить карту');
      }
    }

    if (rubliVal) {
    try {
      // - pay function
      info('success', 'Платеж выполнен');
    } catch (error) {
      info('error', 'Платеж не выполнен');
    }
  }
}

  return (
    <>
    {contextHolder}
    <Blank>
      <h2>Пополнить банковской картой</h2>

      <p style={{color: '#555770', fontSize: 12, marginTop: 30, marginBottom: 10}}>УКАЖИТЕ СУММУ</p>

      <ConInput style={sumError? { border: 'solid 3px red'} : {}}>
          <ConInputVal placeholder='0000.00' value={valutaVal} onChange={(e) => {
            if (e.target.value === '' || re.test(e.target.value)) {
              setRubliVal(+e.target.value*15); 
              setValutaVal(e.target.value);
              setSumError(false);
            }
          }
        }/>
          <Icon src={valuta}/>
          <Vertical/>
          <ConInputRub placeholder='0000.00' value={rubliVal} onChange={(e) => {
            if (e.target.value === '' || re.test(e.target.value)) {
              setRubliVal(+e.target.value);
              setSumError(false);
            }
         }
      }
          />
          <Icon src={rubl}/>
      </ConInput>

      <LittleCartContainer>

      
      {carts.map((cart) => (
          <LittleCart onClick={() => {
                setCartNumber(cart.num);
                setCartMm(cart.mm);
                setCartGg(cart.gg);
                errorClear();
              }}>
              <p>{cart.mm} / {cart.gg}</p>
              <p>&#8226; &#8226; &#8226; &#8226;  {cart.num.toString().slice(12)}</p>
          </LittleCart>
        ))}

          <NewCart onClick={() => {
                setCartNumber('');
                setCartMm('');
                setCartGg('');
                setCvv('');
                errorClear();
              }}>
                <Icon src={plus} style={{height: 28, marginTop: 23}}/>
                <p>Новая кaрта</p>
          </NewCart>

      </LittleCartContainer>
      
        <CartContainer>
            <Cart>
              <CartDataContainer>
                <p>НОМЕР КАРТЫ</p>
                <NumberImput 
                    placeholder='Номер карты'
                    value={cartNumber} 
                    onChange={(e) => {
                            if (e.target.value === '' || re.test(e.target.value) && (e.target.value.length <= 16)) {
                              setCartNumber(e.target.value);
                              setCartNumberError(false);
                            }
                        }
                      }
                style={cartNumberError? { border: 'solid 3px red'} : {}}
                />
                <p>ДЕЙСТВУЕТ ДО</p>
                <DateInput 
                    placeholder='мм'
                    value={cartMm} 
                    onChange={(e) => {
                      if (e.target.value === '' || re.test(e.target.value) && (e.target.value.length < 3) && (+e.target.value <= 12)) {
                        setCartMm(e.target.value);
                        setCartMmError(false);
                    }
                  }
                }
                style={cartMmError? { border: 'solid 3px red'} : {}}
                />
                /
                <DateInput
                  placeholder='гг' 
                  value={cartGg} 
                  onChange={(e) => {
                      if (e.target.value === '' || re.test(e.target.value) && (e.target.value.length < 3)) {
                        setCartGg(e.target.value);
                        setCartGgError(false);
                        setCartMmError(false);
                      }
                  }
                }
                style={cartGgError? { border: 'solid 3px red'} : {}}
                />
              </CartDataContainer>
          </Cart>

          <BackCart>
            <BackCartLine/>
            <CvvContainer>
              <p>CVV/CVC</p>
              <CvvInputContainer>
              <CvvInput value={cvv} onChange={(e) => {
                  if (e.target.value === '' || re.test(e.target.value) && (e.target.value.length <= 3)) {
                    setCvv (+e.target.value);
                    setCvvError(false);
                  }
                }
              }
              style={cvvError? { border: 'solid 3px red'} : {}}
              />
              <p>три цифры с обратной стороны карты</p>
              </CvvInputContainer>
            </CvvContainer>
          </BackCart>
        </CartContainer>

        <SaveContainer>
        <Check type='checkbox' checked={saveCart} onChange={()=>setSaveCart(!saveCart)}/>
        <div>
        <p>Запомнить эту карту. Это безопасно.<img src={attent}/></p>
        <p>Сохраняя карту, вы соглашаетесь с <Link>условиями привязки карты.</Link></p>
        </div>
        </SaveContainer>

      <ButtonSub onClick={submitCart}>Оплатить</ButtonSub>

    </Blank>
    </>
  )
}

export default App
