import Carousel from 'react-bootstrap/Carousel';
import CustomCarouselImage from './CustomCarouselImage';
import { useNavigate } from 'react-router-dom';

const HomeCarousel = () => {
    const navigate = useNavigate()
    return (
        <div className="home-carousel-container">
            <Carousel fade interval={3700} className="carousel">
                <Carousel.Item style={{ cursor: 'pointer' }} onClick={() => {
                    navigate('/properties?city=Tenerife')
                }}>
                    <CustomCarouselImage imageUrl='https://a.cdn-hotels.com/gdcs/production58/d1295/5f9d4694-8ce6-4ad8-8bf7-87b4678b67ef.jpg?impolicy=fcrop&w=800&h=533&q=large' />
                    <Carousel.Caption>
                        <h3 className='text-with-background text-black rounded-3'>
                            Annunci immobiliari a Tenerife</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ cursor: 'pointer' }} onClick={() => {
                    navigate('/properties?city=Dubai')
                }}>
                    <CustomCarouselImage imageUrl='https://images.wallpaperscraft.com/image/single/dubai_united_arab_emirates_sea_83651_2560x1440.jpg' />
                    <Carousel.Caption>
                        <h3 className='text-with-background text-black rounded-3'>
                            Annunci immobiliari a Dubai</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{ cursor: 'pointer' }} onClick={() => {
                    navigate('/properties?city=Bali')
                }}>
                    <CustomCarouselImage imageUrl='https://digital.ihg.com/is/image/ihg/intercontinental-bali-8338027557-16x9?' />
                    <Carousel.Caption>
                        <h3 className='text-with-background text-black rounded-3'>
                            Annunci immobiliari a Bali</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default HomeCarousel;
