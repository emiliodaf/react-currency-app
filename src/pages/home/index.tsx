import { useEffect, useState } from 'react'
import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'

// https://coinlib.io/api/v1/coinlist?key=dd8caea5f1f9cdb0&pref

interface CoinProps {
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedPrice: string;
    formatedMarket: string;
}

interface DataProps {
    coins: CoinProps[];
}


export function Home(){
  const[coins, setCoins] = useState<CoinProps[]>([])

useEffect(() => {
    function getData(){
    fetch('https://sujeitoprogramador.com/api-cripto/?key=dd8caea5f1f9cdb0&pref=BRL')
    .then(response => response.json())
    .then((data: DataProps) => {
       let coinsData = data.coins.slice(0, 15);

    let price = intl.NumberFormat("pt-BR", {
        style:"currency",
        currency: "BRL",
    })



       const formatResult = coinsData.map((item) => {
        const formated = {
            ...item,
            formatedPrice: price.format(Number(item.price)),
            formatedMarket: price.format(Number(item.market_cap)),
        }

      
        return formated;

       })

       
       setCoins(formatResult);
    })

        

 }

 getData();


}, [])


    return(
        <main className={styles.container}>
         <form className={styles.form}>
            <input 
            placeholder='Type coin symbol: BTC... '
            />
            <button type='submit'>
                <BiSearch size={30} color="#fff" />

            </button>
         </form>
          <table>
        <thead>
            <tr>
                <th scope='col'>Coin</th>
                <th scope='col'>Market Value</th>
                <th scope='col'>Price</th>
                <th scope='col'>Volume</th>
            </tr>
        </thead>
            <tbody id='tbody'>
             <tr className={styles.tr}>
                <td className={styles.tdLabel} data-label="Coin">
                    <Link className={styles.Link} to="/detail/btc">
                    <span>Bitcoin</span> | BTC
                    </Link>
                </td>
                <td className={styles.tdLabel} data-label="Market Value">
                    R$29500
                </td>
                <td className={styles.tdLabel} data-label="Price">
                    R$40.1225
                </td>
                <td className={styles.tdProfit} data-label="Volume">
                   <span>+5.8</span>
                </td>
             </tr>
            </tbody>

          </table>


        </main>
    )
}