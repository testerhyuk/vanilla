import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import './css/Detail.css'
import Nav from './Nav';
import Footer from './Footer';
import RecentWatched from './RecentWatched';

export default function Detail() {
    const location = useLocation();
    
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(location.state.price);
    const [tab, setTab] = useState(0);

    const handleQuantityPlus = () => {
        setQuantity(quantity+1)
    }

    const handleQuantityMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity-1)
        }
    }

    useEffect(() => {
        setPrice(location.state.price * quantity)
    }, [location.state.price, quantity])

    useEffect(() => {
        let watched = sessionStorage.getItem('watched')
        watched = JSON.parse(watched)
        watched.unshift([location.state.productId, location.state.title, price])
        watched = [...new Set(watched.join("|").split("|"))]
                    .map((v) => v.split(","))
        watched = Array.from(watched)
        sessionStorage.setItem('watched', JSON.stringify(watched))
        window.dispatchEvent(new Event("storage"));
    })


  return (
    <>
        <Nav />
        <section className='productDetail'>
            <div className='imgInfo'>
                <img 
                    src={"https://codingapple1.github.io/shop/shoes" + (location.state.productId+1) + ".jpg"}
                    alt={'product' + location.state.productId}
                    className='productImg'
                />
            </div>
            <div className='buyInfo'>
                <div>
                    <h2 className='productTitle'>{location.state.title}</h2>
                </div>
                <div>
                    <h2 className='ProductPrice'>{location.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</h2>
                </div>
                <div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>?????? ??????</td>
                                    <td className='prod_info_dt'>????????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>?????????</td>
                                    <td className='prod_info_dt'>?????? ??????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='detailInfo'>
                        <table className='review'>
                            <tbody>
                                <tr>
                                    <td className='prod_info'>?????? ??????</td>
                                    <td className='prod_info_dt'>?????? 1???, ?????? 2??? ??????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='totalPriceSection'>
                    <span className='totalPrice'>??? ??????</span>
                    <span className='varPrice'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</span>
                </div>
                <div className='buyButton'>
                    <div className='quantity_box'>
                        <span className='quantity'>??????</span>
                        <input className='prod_quantity' type='text' value={quantity} readOnly={true} />
                        <div className='quantity_button'>
                            <FontAwesomeIcon icon={faAngleUp} className="quantity_plus" onClick={handleQuantityPlus} />
                            <FontAwesomeIcon icon={faAngleDown} className="quantity_minus" onClick={handleQuantityMinus} />
                        </div>
                    </div>
                    <div className='buy_ctn'>
                        <Link 
                            to={`/cart`}
                            style={{ textDecoration: "none" }}
                            state={{
                                productId: location.state.productId, 
                                title: location.state.title,
                                price: location.state.price,
                                quantity: quantity
                        }}>
                        <button type='button' className='cart_button'>????????????</button>
                        </Link>
                        <button type='button' className='buy_button'>????????????</button>
                    </div>
                </div>
            </div>
            {/* ??? UI */}
        </section>
        <div className='tabUI'>
            <ul className='menuTab'>
                <li>
                    <span 
                        className={'tabBox' + (tab===0 ? ' active' : '')}
                        onClick={() => setTab(0)}
                    >
                        ??????
                    </span>
                </li>
                <li>
                    <span 
                        className={'tabBox' + (tab===1 ? ' active' : '')}
                        onClick={() => setTab(1)}
                    >
                        Q&A
                    </span>
                </li>
            </ul>
        </div>
        <div className='tabDetail'>
            { 
                tab === 0 ? <div>????????? ?????????</div>
                : <div>Q&A??? ?????????</div>
            }
        </div>
        <Footer />
        <RecentWatched />
    </>
  )
}