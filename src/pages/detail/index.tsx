import {useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './detail.module.css'


interface CoinProp{
   symbol: string;
   name: string;
   price: string;
   market_cap: string;
   low_24h: string;
   high_24h: string;
   total_volume_24h: string;
   delta_24h: string;
   formatedPrice: string;
   formatedMarket: string;
   formatedLowPrice: string;
   formatedHighPrice: string;
   error?: string;
}

    export function Detail(){
        const { cripto } = useParams();
        const { detail, setDetail } = useState<CoinProp>()
        const { loading, setLoading } = useState(true);

        const navigate = useNavigate();

    useEffect(() => {
        function getData(){
        fetch(`https://sujeitoprogramador.com/api-cripto/?key=dd8caea5f1f9cdb0&symbol=${cripto}`)
        .then(response => response.json())
        .then((data: CoinProp) => {
            console.log(data);

            if(data.error){
                navigate("/")
            }

            const price = Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
               })

            const resultData = {
                ...data,
                formatedPrice: price.format(Number(data.price)),
                formatedMarket: price.format(Number(data.market_cap)), 
                formatedLowPrice: price.format(Number(data.low_24h)),
                formatedHighPrice: price.format(Number(data.high_24h)),

            }

           setDetail(resultData);
           setLoading(false);
            

         })
        }

    getData();

    }, [cripto])

    if(loading){
        return(
            <div className={styles.container}>
                <h4 className={styles.center}>Loading Data...</h4>
            </div>
        )
    }



   return(
        <div className={styles.container}>
            <h1 className={styles.center}>{detail?.name}</h1>
            <p className={styles.center}>{detail?.symbol}</p>

            <section className={styles.content}>
                <p>
                    <strong>Price</strong> {detail?.formatedPrice}
                </p>
                <p>
                    <strong>Higuer Price 24h</strong> {detail?.formatedHighprice}
                </p>
                <p>
                    <strong>Lower Price 24h</strong> {detail?.formatedLowprice}
                </p>
                <p>
                    <strong>Delta 24h</strong>
                    <span className={Number(detail?.delta_24) >= 0 ? styles.profit : styles.loss}>
                    {detail?.delta_24}
                    </span>
                </p>
                <p>
                    <strong>Market Value</strong> {detail?.formatedMarket}
                </p>
            </section>
        </div>
    )
}