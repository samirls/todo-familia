import './loading.css'
import loadingImage from '../../img/loading.svg'

function Loading() {
  return (
    <div className='loader_container'>
      <img className='loader' src={loadingImage} alt="loading" />
    </div>
  )
}

export default Loading