import Image from 'next/image';
import Slider from 'react-slick';
import "./Slider_buttons.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PostCarousel = ({ images, title }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    className: 'group',
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
        className={className + '  group-hover:opacity-100 transition'}
        style={{
          ...style,
          display: 'block',
          left: '3vw',
          zIndex: 100,
        }}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className + '  group-hover:opacity-100 transition'}
        style={{ ...style, display: 'block', right: '3vw', zIndex: 100 }}
        onClick={onClick}
      />
    );
  }

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image} className="group">
          <img className="rounded-lg w-full h-auto" src={image} alt={title} />
        </div>
      ))}
    </Slider>
  );
};

export default PostCarousel;
