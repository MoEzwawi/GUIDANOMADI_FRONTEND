import Carousel from 'react-bootstrap/Carousel';
import CustomCarouselImage from './CustomCarouselImage';

const HomeCarousel = () => {
    return (
        <div className="home-carousel-container">
            <Carousel fade interval={3700} className="carousel">
                <Carousel.Item>
                    <CustomCarouselImage imageUrl='https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRZGHg8_gRbATV7P0G-VLHUEMS4fUWFaf7URN02MPICjyUngrRhJqj1mARM2cV8vKSOWRufE3SEv66_-tZ_VNvRp8WlhOl_nFAr6_gHlA' />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <CustomCarouselImage imageUrl='https://lh5.googleusercontent.com/p/AF1QipM3NE7SwUbxFOOqvEk8y1nhvzwWD0FysnBWJTvP=w675-h390-n-k-no' />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <CustomCarouselImage imageUrl='https://lh5.googleusercontent.com/p/AF1QipMeTMP4wkVkLLhbKbwUSL0116sXNlp9QywbNLcd=w675-h390-n-k-no' />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default HomeCarousel;
