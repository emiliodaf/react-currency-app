import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

export function Notfound(){
    return(
        <div className={styles.container}>
            <h1>Pagina do not exist</h1>
            <Link to="/">
              Go to Cripto coins
            </Link>
        </div>
    )
}