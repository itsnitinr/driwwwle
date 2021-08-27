import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PostCarousel = ({ images, title }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          left: '20px',
        }}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', right: '50px' }}
        onClick={onClick}
      />
    );
  }

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image}>
          <Image
            className="rounded-lg shadow-4xl"
            src={image}
            width={1000}
            height={550}
            alt={title}
          />
        </div>
      ))}
    </Slider>
  );
};

export default PostCarousel;
