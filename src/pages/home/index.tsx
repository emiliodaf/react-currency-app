import { FormEvent, useEffect, useState } from 'react'
import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

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
  const[inputValue, setInputValue] = useState("")
  const navigate = useNavigate();

useEffect(() => {
    function getData(){
    fetch('https://sujeitoprogramador.com/api-cripto/?key=dd8caea5f1f9cdb0&pref=BRL')
    .then(response => response.json())
    .then((data: DataProps) => {
       const coinsData = data.coins.slice(0, 15);

       const price = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
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


function handleSearch(e: FormEvent){
    e.preventDefault();
    if(inputValue === "") return;
    
    navigate(`/detail/${inputValue}`)

}




    return(
        <main className={styles.container}>
         <form className={styles.form} onSubmit={handleSearch}>
            <input 
            placeholder='Type coin symbol: BTC... '
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
              {coins.map(coin => (
                 <tr key={coin.name} className={styles.tr}>
                 <td className={styles.tdLabel} data-label="Coin">
                     <Link className={styles.Link} to="/detail/btc">
                     <span>{coin.name}</span> | {coin.symbol}
                     </Link>
                 </td>
                 <td className={styles.tdLabel} data-label="Market Value">
                    {coin.formatedMarket}
                 </td>
                 <td className={styles.tdLabel} data-label="Price">
                    {coin.formatedPrice}
                 </td>
                 <td className={Number(coin?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLossc} data-label="Volume">
                    <span>{coin.delta_24h}</span>
                 </td>
              </tr>
              ))}
            </tbody>

          </table>

        </main>
    )
}