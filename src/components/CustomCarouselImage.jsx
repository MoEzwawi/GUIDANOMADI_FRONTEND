const CustomCarouselImage = ({ imageUrl }) => {
    return (
        <img
            className="d-block w-100 crsl-img"
            src={imageUrl}
            alt='carousel component'
        />
    );
}

export default CustomCarouselImage;
