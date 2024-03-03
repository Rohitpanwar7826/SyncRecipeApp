
import loaderSvg from '../../assets/loader.svg'
const styleLoderImage = {
  height: 100,
  width: 100
}
const Loader = () => {
  return (
    <div className='w-100 h-100'>
      <img style={styleLoderImage} src={loaderSvg} alt='LOADING...'/>
    </div>
  )
}

export default Loader